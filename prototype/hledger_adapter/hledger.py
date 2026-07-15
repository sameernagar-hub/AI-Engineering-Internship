from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import tempfile
import uuid
from pathlib import Path
from typing import Any

from .errors import AdapterError, EXIT_HLEDGER_DISCOVERY, EXIT_HLEDGER_EXECUTION
from .models import CategoryMap, EngineReports, HledgerBinary, HledgerVersion, LoadedTransactions
from .validation import sha256_file


HLEDGER_FLAGS = ["--no-conf", "--color=no", "--pager=no"]
VERSION_RE = re.compile(r"\bhledger\s+([0-9]+(?:\.[0-9]+){1,3})\b")
LOCAL_DISCOVERY_DISABLE_ENV = "HLEDGER_ADAPTER_DISABLE_LOCAL_DISCOVERY"


def resolve_hledger_binary(explicit: str | None) -> HledgerBinary:
    if explicit:
        candidate = _resolve_candidate(explicit)
        return HledgerBinary(path=candidate, source="argument")

    env_value = os.environ.get("HLEDGER_BIN")
    if env_value:
        candidate = _resolve_candidate(env_value)
        return HledgerBinary(path=candidate, source="environment")

    for executable_name in ("hledger", "hledger.exe"):
        found = shutil.which(executable_name)
        if found:
            candidate = Path(found).resolve()
            if _is_executable_file(candidate):
                return HledgerBinary(path=candidate, source="path")

    winget_candidate = _resolve_windows_winget_binary()
    if winget_candidate:
        return HledgerBinary(path=winget_candidate, source="winget")

    raise AdapterError(
        "HLEDGER_NOT_FOUND",
        "Could not find hledger via --hledger-bin, HLEDGER_BIN, PATH, or local package installs",
        exit_code=EXIT_HLEDGER_DISCOVERY,
    )


def _resolve_candidate(value: str) -> Path:
    path = Path(value).expanduser()
    if not path.is_absolute() and any(separator in value for separator in ("/", "\\")):
        path = (Path.cwd() / path).resolve()
    elif not path.is_absolute():
        found = shutil.which(value)
        path = Path(found).resolve() if found else path.resolve()
    else:
        path = path.resolve()

    if not _is_executable_file(path):
        raise AdapterError(
            "HLEDGER_UNUSABLE",
            "hledger candidate is not an executable regular file",
            exit_code=EXIT_HLEDGER_DISCOVERY,
            detail={"candidate": path.name},
        )
    return path


def _is_executable_file(path: Path) -> bool:
    if not path.exists() or not path.is_file():
        return False
    if os.access(path, os.X_OK):
        return True
    return os.name == "nt" and path.suffix.lower() in {".exe", ".cmd", ".bat"}


def _resolve_windows_winget_binary() -> Path | None:
    if os.name != "nt" or os.environ.get(LOCAL_DISCOVERY_DISABLE_ENV):
        return None
    local_appdata = os.environ.get("LOCALAPPDATA")
    if not local_appdata:
        return None
    packages_root = Path(local_appdata) / "Microsoft" / "WinGet" / "Packages"
    if not packages_root.exists():
        return None

    try:
        package_dirs = sorted(
            packages_root.glob("simonmichael.hledger_*"),
            key=lambda path: path.stat().st_mtime,
            reverse=True,
        )
    except OSError:
        return None

    for package_dir in package_dirs:
        candidate = package_dir / "hledger.exe"
        if _is_executable_file(candidate):
            return candidate.resolve()
    return None


def probe_version(binary: HledgerBinary, category_map: CategoryMap, cwd: Path | None = None) -> HledgerVersion:
    completed = _run_hledger(
        binary=binary,
        args=["--version"],
        category_map=category_map,
        cwd=cwd or Path.cwd(),
        error_code="HLEDGER_UNUSABLE",
        exit_code=EXIT_HLEDGER_DISCOVERY,
    )
    output = completed["stdout"].strip()
    if not output:
        output = completed["stderr"].strip()
    match = VERSION_RE.search(output)
    parsed_version = match.group(1) if match else None
    return HledgerVersion(
        full_text=output,
        parsed_version=parsed_version,
        tested_version_match=parsed_version == category_map.tested_hledger_version,
    )


def run_print_smoke(
    binary: HledgerBinary,
    transactions: LoadedTransactions,
    transaction_paths: list[Path],
    rules_path: Path,
    category_map: CategoryMap,
    keep_scratch: bool,
    prototype_root: Path,
) -> dict[str, Any]:
    reports = run_engine_reports(
        binary=binary,
        transaction_paths=transaction_paths,
        rules_path=rules_path,
        category_map=category_map,
        keep_scratch=keep_scratch,
        prototype_root=prototype_root,
    )
    parsed = reports.print_json
    if not isinstance(parsed, list):
        raise AdapterError(
            "ENGINE_OUTPUT_SCHEMA_MISMATCH",
            "hledger print JSON did not return a transaction list",
            exit_code=EXIT_HLEDGER_EXECUTION,
        )
    posting_count = 0
    for transaction in parsed:
        if not isinstance(transaction, dict) or not isinstance(transaction.get("tpostings"), list):
            raise AdapterError(
                "ENGINE_OUTPUT_SCHEMA_MISMATCH",
                "hledger print JSON transaction shape was unexpected",
                exit_code=EXIT_HLEDGER_EXECUTION,
            )
        posting_count += len(transaction["tpostings"])

    return {
        "operation": "print -O json + balance --flat -O json + incomestatement --depth 3 -O json",
        "transactions_requested": transactions.row_count,
        "transactions_seen": len(parsed),
        "postings_seen": posting_count,
        "rules_sha256": reports.rules_sha256,
        "scratch": {
            "kept": reports.scratch_kept,
            "path": reports.scratch_path,
        },
    }


def run_engine_reports(
    binary: HledgerBinary,
    transaction_paths: list[Path],
    rules_path: Path,
    category_map: CategoryMap,
    keep_scratch: bool,
    prototype_root: Path,
) -> EngineReports:
    before_hashes = {path.resolve(): sha256_file(path) for path in transaction_paths}
    rules_hash = sha256_file(rules_path)

    if keep_scratch:
        scratch_root = prototype_root / ".scratch"
        scratch_root.mkdir(parents=True, exist_ok=True)
        scratch_path = scratch_root / f"reports-{uuid.uuid4().hex[:12]}"
        scratch_path.mkdir(mode=0o700)
        cleanup = None
    else:
        cleanup = tempfile.TemporaryDirectory(prefix="hledger-adapter-")
        scratch_path = Path(cleanup.name)

    try:
        scratch_rules = scratch_path / "hledger.csv.rules"
        shutil.copy2(rules_path, scratch_rules)
        scratch_inputs: list[Path] = []
        for index, source in enumerate(transaction_paths, start=1):
            destination = scratch_path / f"input-{index:03d}.csv"
            shutil.copy2(source, destination)
            scratch_inputs.append(destination)

        report_prefix = ["--rules", str(scratch_rules)]
        for scratch_input in scratch_inputs:
            report_prefix.extend(["-f", str(scratch_input)])

        print_completed = _run_hledger(
            binary=binary,
            args=[*report_prefix, "print", "-O", "json"],
            category_map=category_map,
            cwd=scratch_path,
            error_code="HLEDGER_EXECUTION_FAILED",
            exit_code=EXIT_HLEDGER_EXECUTION,
        )
        balance_completed = _run_hledger(
            binary=binary,
            args=[*report_prefix, "balance", "--flat", "-O", "json"],
            category_map=category_map,
            cwd=scratch_path,
            error_code="HLEDGER_EXECUTION_FAILED",
            exit_code=EXIT_HLEDGER_EXECUTION,
        )
        income_statement_completed = _run_hledger(
            binary=binary,
            args=[*report_prefix, "incomestatement", "--depth", "3", "-O", "json"],
            category_map=category_map,
            cwd=scratch_path,
            error_code="HLEDGER_EXECUTION_FAILED",
            exit_code=EXIT_HLEDGER_EXECUTION,
        )

        if keep_scratch:
            (scratch_path / "hledger_print_stdout.json").write_text(print_completed["stdout"], encoding="utf-8")
            (scratch_path / "hledger_print_stderr.txt").write_text(print_completed["stderr"], encoding="utf-8")
            (scratch_path / "hledger_balance_stdout.json").write_text(balance_completed["stdout"], encoding="utf-8")
            (scratch_path / "hledger_balance_stderr.txt").write_text(balance_completed["stderr"], encoding="utf-8")
            (scratch_path / "hledger_income_statement_stdout.json").write_text(
                income_statement_completed["stdout"],
                encoding="utf-8",
            )
            (scratch_path / "hledger_income_statement_stderr.txt").write_text(
                income_statement_completed["stderr"],
                encoding="utf-8",
            )

        after_hashes = {path.resolve(): sha256_file(path) for path in transaction_paths}
        if before_hashes != after_hashes:
            raise AdapterError(
                "ACCOUNTING_INVARIANT_FAILED",
                "Input file hash changed during smoke run",
                exit_code=EXIT_HLEDGER_EXECUTION,
            )

        return EngineReports(
            print_json=_parse_hledger_json(print_completed["stdout"], "print"),
            balance_json=_parse_hledger_json(balance_completed["stdout"], "balance"),
            income_statement_json=_parse_hledger_json(income_statement_completed["stdout"], "incomestatement"),
            rules_sha256=rules_hash,
            scratch_kept=keep_scratch,
            scratch_path=f".scratch/{scratch_path.name}" if keep_scratch else None,
            operations=("print_json", "account_balances_json", "income_statement_json"),
        )
    finally:
        if cleanup is not None:
            cleanup.cleanup()


def _parse_hledger_json(stdout: str, operation: str) -> Any:
    try:
        return json.loads(stdout)
    except json.JSONDecodeError as exc:
        raise AdapterError(
            "HLEDGER_JSON_INVALID",
            f"hledger {operation} output was not valid JSON",
            exit_code=EXIT_HLEDGER_EXECUTION,
            detail={"line": exc.lineno, "column": exc.colno},
        ) from exc


def _run_hledger(
    binary: HledgerBinary,
    args: list[str],
    category_map: CategoryMap,
    cwd: Path,
    error_code: str,
    exit_code: int,
) -> dict[str, str]:
    env = os.environ.copy()
    env.pop("LEDGER_FILE", None)
    command = [str(binary.path), *HLEDGER_FLAGS, *args]
    try:
        completed = subprocess.run(
            command,
            cwd=str(cwd),
            env=env,
            shell=False,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=category_map.subprocess_timeout_seconds,
            check=False,
        )
    except subprocess.TimeoutExpired as exc:
        raise AdapterError(
            "HLEDGER_TIMEOUT",
            "hledger subprocess timed out",
            exit_code=EXIT_HLEDGER_EXECUTION,
        ) from exc
    except OSError as exc:
        raise AdapterError(error_code, "hledger subprocess could not be started", exit_code=exit_code) from exc

    if len(completed.stdout) > category_map.max_subprocess_output_bytes:
        raise AdapterError(error_code, "hledger stdout exceeded the configured limit", exit_code=exit_code)
    if len(completed.stderr) > category_map.max_subprocess_output_bytes:
        raise AdapterError(error_code, "hledger stderr exceeded the configured limit", exit_code=exit_code)

    try:
        stdout = completed.stdout.decode("utf-8")
        stderr = completed.stderr.decode("utf-8")
    except UnicodeDecodeError as exc:
        raise AdapterError(error_code, "hledger output was not UTF-8", exit_code=exit_code) from exc

    if completed.returncode != 0:
        excerpt = (stderr or stdout).strip().replace("\r", " ").replace("\n", " ")[:500]
        raise AdapterError(
            error_code,
            "hledger subprocess returned a nonzero exit code",
            exit_code=exit_code,
            detail={"returncode": completed.returncode, "excerpt": excerpt},
        )

    return {"stdout": stdout, "stderr": stderr}
