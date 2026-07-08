# Day 9 Evaluate Tool 1: hledger

Planned phase date: 07-09-2026. Executed early on 07-08-2026 UTC / 07-07-2026 PDT at user request.

## Goal

Perform the first deep Week 2 evaluation by installing or running hledger, exercising the shared synthetic workflow, testing failure behavior, and filling the first tool record.

## What I Did

- Downloaded the official hledger `1.52.1` Windows release ZIP into a temporary directory instead of installing it globally.
- Captured setup and version evidence for Windows 11 Home, PowerShell 5.1, Winget availability, and the temp hledger binary.
- Added hledger-specific CSV rules and bad-input fixtures under `evidence/fixtures/`.
- Loaded the canonical synthetic freelancer CSV through hledger CSV rules.
- Ran common workflow checks: print converted entries, list accounts, compute checking balance, run an income statement, add `TADD`, and export JSON.
- Ran failure tests for malformed date, invalid amount, unknown account/category, missing input file, and duplicate transaction ID.
- Created the first completed tool record at `tool_records/tool_1.md`.

## Evidence Captured

- `tool_records/tool_1.md`
- `evidence/commands/07-08-2026_hledger_setup.txt`
- `evidence/commands/07-08-2026_hledger_version.txt`
- `evidence/commands/07-08-2026_hledger_workflow.txt`
- `evidence/commands/07-08-2026_hledger_failure-tests.txt`
- `evidence/fixtures/hledger_synthetic_freelancer.rules`
- `evidence/fixtures/hledger_synthetic_freelancer_tadd.csv`
- `evidence/fixtures/hledger_bad_date.csv`
- `evidence/fixtures/hledger_bad_amount.csv`
- `evidence/fixtures/hledger_unknown_account.csv`
- `evidence/fixtures/hledger_duplicate_t001.csv`
- `evidence/fixtures/hledger_day9_baseline_print.json`
- `evidence/fixtures/hledger_day9_baseline_checking_balance.json`
- `evidence/fixtures/hledger_day9_with_tadd_print.json`

## Decisions Made

- Treat hledger as a strong prototype candidate for a low-risk file/CLI/JSON adapter.
- Keep hledger's tax relevance framed as tax-adjacent bookkeeping and reporting, not tax calculation or filing.
- Preserve tax hints as CSV-to-journal comments for now, but do not treat them as authoritative tax-line mappings.
- Any future wrapper should validate duplicate transaction IDs and unknown categories before passing data to hledger.

## Problems / Open Questions

- hledger accepts unknown accounts/categories by default, which is convenient for bookkeeping but risky for controlled tax workflows.
- hledger does not reject duplicate transaction IDs in this CSV/code workflow.
- JSON export is strong but nested and hledger-specific, so a prototype wrapper should normalize it.
- The hledger-web JSON API remains untested locally; Day 14 can decide whether CLI JSON is enough.

## Tomorrow's Starting Point

Execute Day 10 by evaluating Actual Budget against the shared dataset, using hledger's completed record as the comparison baseline.
