# Day 11 Evaluate Tool 3: Firefly III

Planned phase date: 07-11-2026. Executed early on 07-08-2026 UTC / 07-07-2026 PDT at user request.

## Goal

Evaluate Firefly III as the third Week 2 hands-on tool and the REST/API-backed personal-finance comparator, using the same synthetic freelancer workflow used for hledger and Actual Budget.

## What I Did

- Started Docker Desktop, then ran isolated local containers for `fireflyiii/core:version-6.6.6` and `mariadb:lts`.
- Captured setup, version, workflow, and failure-test evidence under `evidence/commands/`.
- Created a synthetic local Firefly user, a Passport personal-access client, and short-lived API tokens without storing tokens in the repository.
- Added `evidence/fixtures/firefly_day11_evaluate.mjs` to drive Firefly's REST API with the canonical synthetic CSV.
- Created a synthetic checking account with `T000` as the Firefly account opening balance.
- Created 12 synthetic categories and posted the 18 non-opening baseline rows through `/api/v1/transactions`.
- Added standard transaction `TADD`, then exported normalized transaction rows and a summary JSON file.
- Queried Firefly insight endpoints for income and expense by category.
- Ran failure tests for malformed date, invalid amount, unknown category, duplicate transaction, and missing input file.
- Created the completed third tool record at `tool_records/tool_3.md`.

## Evidence Captured

- `tool_records/tool_3.md`
- `notes/day_11_evaluate_firefly_iii.md`
- `evidence/commands/07-08-2026_firefly-iii_setup.txt`
- `evidence/commands/07-08-2026_firefly-iii_version.txt`
- `evidence/commands/07-08-2026_firefly-iii_workflow.txt`
- `evidence/commands/07-08-2026_firefly-iii_failure-tests.txt`
- `evidence/fixtures/firefly_day11_evaluate.mjs`
- `evidence/fixtures/firefly_day11_summary.json`
- `evidence/fixtures/firefly_day11_transactions_after_add.json`
- `evidence/fixtures/firefly_day11_failure_results.json`

## Decisions Made

- Treat Firefly III as the strongest REST-first personal-finance comparator so far.
- Keep Firefly's tax relevance framed as manual bookkeeping/reporting, not tax calculation or filing.
- Model `T000` as the Firefly account opening balance rather than a normal income transaction.
- Any future Firefly wrapper should enforce a category/account allowlist because unknown categories can be auto-created.
- Keep Firefly in prototype consideration if the demo should emphasize REST automation; prefer hledger if the demo should stay lightweight.

## Problems / Open Questions

- Docker/auth setup is materially heavier than hledger and Actual Budget.
- The first app run failed until `APP_KEY` was corrected to exactly 32 characters.
- Firefly REST transaction creation is mutating; no dry-run path was found.
- Unknown categories are convenient but risky for controlled tax-line mappings.
- Firefly has no native Form 1040, Schedule A/B/C/D/E, tax-year package, PDF tax form, MeF, or e-file workflow.
- AGPL-3.0 implications need review before redistributing or network-serving wrappers around Firefly.

## Tomorrow's Starting Point

Execute Day 12 by evaluating a fourth shortlisted tool or backup candidate. The current best breadth move is a tax-specific candidate, likely `tenforty`, to contrast the three bookkeeping/API candidates with a direct tax-calculation surface.
