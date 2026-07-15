from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path
from typing import Any


PROTOTYPE_ROOT = Path(__file__).resolve().parent
REPO_ROOT = PROTOTYPE_ROOT.parent
TIMEOUT_SECONDS = 75

EXECUTION_STEP_IDS = [
    "input_validation",
    "hledger_discovery",
    "version_probe",
    "scratch_setup",
    "print_report",
    "balance_report",
    "income_statement",
    "reconciliation",
    "summary_aggregation",
    "failure_matrix",
    "cleanup",
]


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Run the Day 20 synthetic demo package.")
    parser.add_argument("--hledger-bin", help="Path to a local hledger executable.")
    parser.add_argument("--json", action="store_true", help="Emit machine-readable JSON only.")
    args = parser.parse_args(argv)

    demo_command = [sys.executable, "-m", "hledger_adapter", "demo"]
    demo_display = "python -m hledger_adapter demo"
    if args.hledger_bin:
        demo_command.extend(["--hledger-bin", args.hledger_bin])
        demo_display += " --hledger-bin <configured hledger>"

    matrix_command = [sys.executable, "tests/run_failure_matrix.py"]
    matrix_display = "python tests/run_failure_matrix.py"

    demo = _run_command(
        command_id="adapter_demo",
        label="Canonical synthetic adapter demo",
        command=demo_command,
        display_command=demo_display,
    )
    matrix = _run_command(
        command_id="failure_matrix",
        label="Safety failure matrix",
        command=matrix_command,
        display_command=matrix_display,
    )

    payload = _build_payload(demo, matrix)
    if args.json:
        print(json.dumps(payload, indent=2, sort_keys=True))
    else:
        _print_human_summary(payload)

    return 0 if payload["status"] == "passed" else 1


def _run_command(command_id: str, label: str, command: list[str], display_command: str) -> dict[str, Any]:
    started = time.perf_counter()
    try:
        completed = subprocess.run(
            command,
            cwd=PROTOTYPE_ROOT,
            env=_clean_env(),
            shell=False,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=TIMEOUT_SECONDS,
            check=False,
        )
        elapsed_ms = int((time.perf_counter() - started) * 1000)
        stream = completed.stdout if completed.returncode == 0 else completed.stderr
        parsed = _parse_json(stream)
        return {
            "id": command_id,
            "label": label,
            "command": display_command,
            "status": "passed" if completed.returncode == 0 else "failed",
            "exit_code": completed.returncode,
            "duration_ms": elapsed_ms,
            "payload": parsed,
            "stdout_excerpt": _excerpt(completed.stdout),
            "stderr_excerpt": _excerpt(completed.stderr),
        }
    except subprocess.TimeoutExpired as exc:
        return {
            "id": command_id,
            "label": label,
            "command": display_command,
            "status": "failed",
            "exit_code": None,
            "duration_ms": int((time.perf_counter() - started) * 1000),
            "payload": {
                "status": "error",
                "error": {
                    "code": "DAY20_COMMAND_TIMEOUT",
                    "message": f"Command exceeded {TIMEOUT_SECONDS} seconds.",
                },
            },
            "stdout_excerpt": _excerpt(exc.stdout or ""),
            "stderr_excerpt": _excerpt(exc.stderr or ""),
        }


def _clean_env() -> dict[str, str]:
    env = os.environ.copy()
    env.pop("LEDGER_FILE", None)
    return env


def _parse_json(stream: str) -> dict[str, Any] | list[Any] | None:
    try:
        return json.loads(stream)
    except json.JSONDecodeError:
        return None


def _build_payload(demo: dict[str, Any], matrix: dict[str, Any]) -> dict[str, Any]:
    demo_payload = demo.get("payload") if isinstance(demo.get("payload"), dict) else {}
    matrix_payload = matrix.get("payload") if isinstance(matrix.get("payload"), dict) else {}
    status = "passed" if demo["status"] == "passed" and matrix["status"] == "passed" else "failed"
    return {
        "schema_version": "1.0.0",
        "status": status,
        "mode": "local_live",
        "synthetic_only": True,
        "commands": [demo, matrix],
        "execution_steps": _execution_steps(demo, matrix),
        "summary": _summary_snapshot(demo_payload),
        "failure_matrix": _failure_matrix_snapshot(matrix_payload),
        "warnings": demo_payload.get("warnings", []),
        "limitations": demo_payload.get("limitations", []),
    }


def _execution_steps(demo: dict[str, Any], matrix: dict[str, Any]) -> list[dict[str, Any]]:
    demo_payload = demo.get("payload") if isinstance(demo.get("payload"), dict) else {}
    demo_ok = demo["status"] == "passed"
    matrix_ok = matrix["status"] == "passed"
    error_code = None
    if isinstance(demo_payload, dict):
        error_code = demo_payload.get("error", {}).get("code")

    statuses: dict[str, str] = {}
    if demo_ok:
        for step_id in EXECUTION_STEP_IDS:
            statuses[step_id] = "passed"
    else:
        for step_id in EXECUTION_STEP_IDS:
            statuses[step_id] = "blocked"
        statuses["input_validation"] = "passed" if error_code and not error_code.startswith("INPUT_") else "failed"
        if error_code in {"HLEDGER_NOT_FOUND", "HLEDGER_UNUSABLE"}:
            statuses["hledger_discovery"] = "failed"
        else:
            statuses["hledger_discovery"] = "blocked"

    statuses["failure_matrix"] = "passed" if matrix_ok else "failed"
    if matrix_ok and not demo_ok:
        statuses["cleanup"] = "passed"

    return [
        {
            "id": step_id,
            "status": statuses[step_id],
            "source": "python-runner",
        }
        for step_id in EXECUTION_STEP_IDS
    ]


def _summary_snapshot(payload: dict[str, Any]) -> dict[str, Any]:
    if payload.get("status") != "ok":
        return {}
    summary = payload.get("summary", {})
    schedule_c = summary.get("schedule_c_style", {})
    tax_adjacent = summary.get("tax_adjacent", {})
    bookkeeping = summary.get("bookkeeping_income_statement", {})
    mileage_fact = next(
        (
            item
            for item in payload.get("unmapped_tax_facts", [])
            if isinstance(item, dict) and item.get("code") == "BUSINESS_MILEAGE"
        ),
        {},
    )
    return {
        "transactions": payload.get("counts", {}).get("transactions"),
        "postings": payload.get("counts", {}).get("postings"),
        "accounts": payload.get("counts", {}).get("accounts"),
        "checking_balance": summary.get("checking_balance"),
        "bookkeeping_revenue": bookkeeping.get("revenue"),
        "bookkeeping_expenses": bookkeeping.get("expenses"),
        "bookkeeping_net": bookkeeping.get("net"),
        "schedule_c_gross_receipts": schedule_c.get("gross_receipts"),
        "schedule_c_cash_expenses_before_mileage": schedule_c.get("cash_expenses_before_mileage"),
        "schedule_c_net_before_mileage": schedule_c.get("net_before_mileage"),
        "interest_income": tax_adjacent.get("interest_income"),
        "cash_charitable_contributions": tax_adjacent.get("cash_charitable_contributions"),
        "federal_estimated_payments": tax_adjacent.get("federal_estimated_tax_payments_tracked"),
        "business_miles": mileage_fact.get("value"),
        "reconciliation_status": payload.get("reconciliation", {}).get("status"),
        "hledger_version": payload.get("hledger", {}).get("version"),
    }


def _failure_matrix_snapshot(payload: dict[str, Any]) -> dict[str, Any]:
    if not payload:
        return {}
    return {
        "status": payload.get("status"),
        "case_count": payload.get("case_count"),
        "passed_count": payload.get("passed_count"),
        "failed_count": payload.get("failed_count"),
        "scratch_unchanged": payload.get("scratch_unchanged"),
        "cases": [
            {
                "name": item.get("name"),
                "status": item.get("status"),
                "expected_code": item.get("expected_code"),
                "observed_code": item.get("observed_code"),
            }
            for item in payload.get("cases", [])
        ],
    }


def _excerpt(value: str, limit: int = 4000) -> str:
    redacted = _redact_paths(value or "")
    return redacted[:limit]


def _redact_paths(value: str) -> str:
    if not value:
        return value
    redacted = value.replace(str(REPO_ROOT), "<repo>").replace(str(PROTOTYPE_ROOT), "<prototype>")
    redacted = redacted.replace(str(Path.home()), "<home>")
    redacted = re.sub(r"[A-Za-z]:\\[^\s\"']+", "<local-path>", redacted)
    return redacted


def _print_human_summary(payload: dict[str, Any]) -> None:
    print(f"Day 20 demo package: {payload['status']}")
    for command in payload["commands"]:
        print(f"- {command['label']}: {command['status']} (exit {command['exit_code']})")
    summary = payload.get("summary", {})
    if summary:
        print(f"- Transactions: {summary.get('transactions')}")
        print(f"- Checking balance: {summary.get('checking_balance')}")
        print(f"- Schedule C-style net before mileage: {summary.get('schedule_c_net_before_mileage')}")
    matrix = payload.get("failure_matrix", {})
    if matrix:
        print(
            "- Failure matrix: "
            f"{matrix.get('passed_count')}/{matrix.get('case_count')} passed; "
            f"scratch unchanged: {matrix.get('scratch_unchanged')}"
        )


if __name__ == "__main__":
    raise SystemExit(main())
