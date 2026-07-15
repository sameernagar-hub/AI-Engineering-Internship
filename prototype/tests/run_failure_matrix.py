from __future__ import annotations

import csv
import json
import os
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any


PROTOTYPE_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = PROTOTYPE_ROOT.parent
FIXTURES = REPO_ROOT / "evidence" / "fixtures"
BASE_TRANSACTIONS = FIXTURES / "synthetic_freelancer_transactions.csv"
BASE_CONTEXT = FIXTURES / "synthetic_freelancer_tax_profile.json"

HEADER = [
    "transaction_id",
    "date",
    "payee",
    "description",
    "account",
    "category",
    "tax_hint",
    "amount_usd",
    "cleared",
    "memo",
]


@dataclass(frozen=True, slots=True)
class Case:
    name: str
    args: list[str]
    expected_exit: int
    expected_code: str | None
    env_path_without_hledger: bool = False


def main() -> int:
    with tempfile.TemporaryDirectory(prefix="hledger-adapter-failures-") as temp_dir:
        temp_root = Path(temp_dir)
        generated = _build_generated_fixtures(temp_root)
        cases = _cases(generated, temp_root)
        before_scratch = _scratch_snapshot()
        results = [_run_case(case, temp_root) for case in cases]
        after_scratch = _scratch_snapshot()

    failed = [result for result in results if result["status"] != "passed"]
    payload = {
        "status": "failed" if failed else "passed",
        "cases": results,
        "scratch_unchanged": before_scratch == after_scratch,
        "case_count": len(results),
        "passed_count": len(results) - len(failed),
        "failed_count": len(failed),
    }
    print(json.dumps(payload, indent=2, sort_keys=True))
    return 1 if failed or before_scratch != after_scratch else 0


def _cases(generated: dict[str, Path], temp_root: Path) -> list[Case]:
    missing = temp_root / "does_not_exist.csv"
    unusable_binary = temp_root / "not-hledger.exe"
    return [
        Case(
            name="valid_input_validate_ok",
            args=[
                "validate",
                "--transactions",
                str(BASE_TRANSACTIONS),
                "--context",
                str(BASE_CONTEXT),
                "--confirm-synthetic",
            ],
            expected_exit=0,
            expected_code=None,
        ),
        Case(
            name="missing_synthetic_ack",
            args=["validate", "--transactions", str(BASE_TRANSACTIONS)],
            expected_exit=2,
            expected_code="SYNTHETIC_CONFIRMATION_REQUIRED",
        ),
        Case(
            name="malformed_date",
            args=_dry_run_args(FIXTURES / "hledger_bad_date.csv", BASE_CONTEXT),
            expected_exit=2,
            expected_code="INPUT_DATE_INVALID",
        ),
        Case(
            name="invalid_amount",
            args=_dry_run_args(FIXTURES / "hledger_bad_amount.csv", BASE_CONTEXT),
            expected_exit=2,
            expected_code="INPUT_AMOUNT_INVALID",
        ),
        Case(
            name="unknown_category",
            args=_dry_run_args(FIXTURES / "hledger_unknown_account.csv", BASE_CONTEXT),
            expected_exit=2,
            expected_code="INPUT_CATEGORY_UNKNOWN",
        ),
        Case(
            name="unknown_source_account",
            args=_dry_run_args(generated["unknown_account"], BASE_CONTEXT),
            expected_exit=2,
            expected_code="INPUT_ACCOUNT_UNKNOWN",
        ),
        Case(
            name="duplicate_transaction_id",
            args=[
                "summarize",
                "--transactions",
                str(BASE_TRANSACTIONS),
                "--transactions",
                str(FIXTURES / "hledger_duplicate_t001.csv"),
                "--context",
                str(BASE_CONTEXT),
                "--dry-run",
                "--confirm-synthetic",
            ],
            expected_exit=2,
            expected_code="INPUT_ID_DUPLICATE",
        ),
        Case(
            name="missing_transaction_file",
            args=_dry_run_args(missing, BASE_CONTEXT),
            expected_exit=2,
            expected_code="INPUT_NOT_FOUND",
        ),
        Case(
            name="tax_hint_mismatch",
            args=_dry_run_args(generated["tax_hint_mismatch"], BASE_CONTEXT),
            expected_exit=2,
            expected_code="INPUT_TAX_HINT_MISMATCH",
        ),
        Case(
            name="wrong_amount_sign",
            args=_dry_run_args(generated["wrong_sign"], BASE_CONTEXT),
            expected_exit=2,
            expected_code="INPUT_SIGN_INVALID",
        ),
        Case(
            name="context_dataset_mismatch",
            args=_dry_run_args(BASE_TRANSACTIONS, generated["context_dataset_mismatch"]),
            expected_exit=2,
            expected_code="CONTEXT_INVALID",
        ),
        Case(
            name="context_negative_mileage",
            args=_dry_run_args(BASE_TRANSACTIONS, generated["context_negative_mileage"]),
            expected_exit=2,
            expected_code="CONTEXT_INVALID",
        ),
        Case(
            name="dry_run_keep_scratch_conflict",
            args=[
                "summarize",
                "--transactions",
                str(BASE_TRANSACTIONS),
                "--context",
                str(BASE_CONTEXT),
                "--dry-run",
                "--keep-scratch",
                "--confirm-synthetic",
            ],
            expected_exit=2,
            expected_code="DRY_RUN_OPTION_CONFLICT",
        ),
        Case(
            name="hledger_not_found",
            args=[
                "summarize",
                "--transactions",
                str(BASE_TRANSACTIONS),
                "--context",
                str(BASE_CONTEXT),
                "--dry-run",
                "--confirm-synthetic",
            ],
            expected_exit=3,
            expected_code="HLEDGER_NOT_FOUND",
            env_path_without_hledger=True,
        ),
        Case(
            name="hledger_unusable_candidate",
            args=[
                "summarize",
                "--transactions",
                str(BASE_TRANSACTIONS),
                "--context",
                str(BASE_CONTEXT),
                "--hledger-bin",
                str(unusable_binary),
                "--dry-run",
                "--confirm-synthetic",
            ],
            expected_exit=3,
            expected_code="HLEDGER_UNUSABLE",
        ),
    ]


def _dry_run_args(transactions: Path, context: Path) -> list[str]:
    return [
        "summarize",
        "--transactions",
        str(transactions),
        "--context",
        str(context),
        "--dry-run",
        "--confirm-synthetic",
    ]


def _build_generated_fixtures(temp_root: Path) -> dict[str, Path]:
    generated = {
        "unknown_account": temp_root / "unknown_account.csv",
        "tax_hint_mismatch": temp_root / "tax_hint_mismatch.csv",
        "wrong_sign": temp_root / "wrong_sign.csv",
        "context_dataset_mismatch": temp_root / "context_dataset_mismatch.json",
        "context_negative_mileage": temp_root / "context_negative_mileage.json",
    }
    _write_csv(
        generated["unknown_account"],
        [
            "TACCT",
            "12-30-2025",
            "Unknown Account Example",
            "Unsupported source account test",
            "Assets:Cash",
            "Expenses:Business:Software",
            "Schedule C software",
            "-10.00",
            "true",
            "Synthetic unknown account test",
        ],
    )
    _write_csv(
        generated["tax_hint_mismatch"],
        [
            "THINT",
            "12-30-2025",
            "Tax Hint Example",
            "Mismatched tax hint test",
            "Assets:Checking",
            "Expenses:Business:Software",
            "Schedule C workspace",
            "-10.00",
            "true",
            "Synthetic tax hint mismatch test",
        ],
    )
    _write_csv(
        generated["wrong_sign"],
        [
            "TSIGN",
            "12-30-2025",
            "Sign Example",
            "Wrong sign test",
            "Assets:Checking",
            "Expenses:Business:Software",
            "Schedule C software",
            "10.00",
            "true",
            "Synthetic sign test",
        ],
    )

    context = json.loads(BASE_CONTEXT.read_text(encoding="utf-8"), parse_float=str)
    mismatched = dict(context)
    mismatched["dataset_id"] = "wrong-dataset"
    generated["context_dataset_mismatch"].write_text(json.dumps(mismatched, indent=2), encoding="utf-8")

    negative_mileage = json.loads(BASE_CONTEXT.read_text(encoding="utf-8"), parse_float=str)
    negative_mileage["schedule_c_expenses"]["business_miles"] = -1
    generated["context_negative_mileage"].write_text(json.dumps(negative_mileage, indent=2), encoding="utf-8")
    return generated


def _write_csv(path: Path, row: list[str]) -> None:
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(HEADER)
        writer.writerow(row)


def _run_case(case: Case, temp_root: Path) -> dict[str, Any]:
    env = os.environ.copy()
    if case.env_path_without_hledger:
        env.pop("HLEDGER_BIN", None)
        env["PATH"] = str(temp_root)
        env["HLEDGER_ADAPTER_DISABLE_LOCAL_DISCOVERY"] = "1"

    completed = subprocess.run(
        [sys.executable, "-m", "hledger_adapter", *case.args],
        cwd=PROTOTYPE_ROOT,
        env=env,
        shell=False,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        check=False,
    )
    observed_code = None
    if completed.returncode == 0:
        stream = completed.stdout
    else:
        stream = completed.stderr
    try:
        payload = json.loads(stream)
        observed_code = payload.get("error", {}).get("code")
    except json.JSONDecodeError:
        payload = {"raw": stream[:500]}

    status = "passed"
    problems = []
    if completed.returncode != case.expected_exit:
        problems.append(f"exit {completed.returncode} != {case.expected_exit}")
    if observed_code != case.expected_code:
        problems.append(f"code {observed_code!r} != {case.expected_code!r}")
    if problems:
        status = "failed"

    return {
        "name": case.name,
        "status": status,
        "expected_exit": case.expected_exit,
        "observed_exit": completed.returncode,
        "expected_code": case.expected_code,
        "observed_code": observed_code,
        "problems": problems,
    }


def _scratch_snapshot() -> list[str] | None:
    scratch = PROTOTYPE_ROOT / ".scratch"
    if not scratch.exists():
        return None
    return sorted(str(path.relative_to(scratch)) for path in scratch.rglob("*"))


if __name__ == "__main__":
    raise SystemExit(main())
