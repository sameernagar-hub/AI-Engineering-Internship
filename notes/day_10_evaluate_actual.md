# Day 10 Evaluate Tool 2: Actual Budget

Planned phase date: 07-10-2026. Executed early on 07-08-2026 UTC / 07-07-2026 PDT at user request.

## Goal

Evaluate Actual Budget as the second Week 2 hands-on tool using the shared synthetic freelancer dataset, with attention to local-first API/CLI setup, structured output, workflow coverage, and failure behavior.

## What I Did

- Installed `@actual-app/api@26.7.0` and `@actual-app/cli@26.7.0` into a temporary npm directory instead of modifying the repository or installing globally.
- Captured Node, npm, Actual CLI, npm package, setup, workflow, and failure-test evidence.
- Added an Actual-specific Node API evaluation helper at `evidence/fixtures/actual_day10_evaluate.mjs`.
- Created a scratch local Actual budget in a temp data directory and loaded the canonical 19 baseline transactions.
- Created/reused Actual category groups and categories, preserving the synthetic tax hints in transaction notes.
- Ran the shared workflow: load data, add `TADD`, list accounts/categories, compute balance, summarize income/expense categories, and export normalized JSON.
- Ran failure tests for malformed date, invalid amount, unknown category, duplicate imported ID through both `importTransactions` dry-run and direct `addTransactions`, and missing budget load.
- Created the completed second tool record at `tool_records/tool_2.md`.

## Evidence Captured

- `tool_records/tool_2.md`
- `evidence/commands/07-08-2026_actual_setup.txt`
- `evidence/commands/07-08-2026_actual_version.txt`
- `evidence/commands/07-08-2026_actual_workflow.txt`
- `evidence/commands/07-08-2026_actual_failure-tests.txt`
- `evidence/fixtures/actual_day10_evaluate.mjs`
- `evidence/fixtures/actual_day10_summary.json`
- `evidence/fixtures/actual_day10_transactions_after_add.json`

## Decisions Made

- Treat Actual Budget as a strong local-first app/API integration candidate, especially where a Node wrapper is acceptable.
- Keep Actual's tax relevance framed as tax-adjacent budgeting/bookkeeping, not tax calculation or filing.
- Prefer `importTransactions` for workflows where duplicate imported IDs should reconcile rather than silently create another row.
- Any future wrapper over `addTransactions` should pre-validate category IDs and imported IDs because direct adds accepted an unknown category id and duplicate `T001`.

## Problems / Open Questions

- `runImport` logged an unauthorized cloud upload during `finish-import` even though local budget creation succeeded; this needs clarification before production-style use.
- Bad date handling rejected the input but returned a verbose expression stack, so a wrapper should normalize that error for users.
- Actual stores category group and leaf name separately, so preserving full tax-like category paths requires wrapper-side mapping.
- Actual has no native Form 1040, Schedule A/B/C/D/E, tax-year package, PDF tax form, MeF, or e-file workflow.

## Tomorrow's Starting Point

Execute Day 11 by evaluating Firefly III as the REST/API-backed personal-finance comparator, using Actual's local-first API record and hledger's file/CLI record as baselines.
