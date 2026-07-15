# Changelog

This file tracks meaningful project updates so the internship work can be backtracked without rereading every note, plan, and commit.

Update this file after every work session that changes project direction, research artifacts, prototype code, report/deck content, or repository structure.

Each entry should answer:

- What changed?
- Why did it change?
- What evidence or files were added?
- What is next?

## 07-15-2026 - Local hledger Setup and Live Backend Completion

### What Changed

- Installed hledger `1.52.1` locally with Winget.
- Added Windows Winget package discovery after `--hledger-bin`, `HLEDGER_BIN`, and `PATH` resolution.
- Kept the missing-hledger failure-matrix case deterministic with an explicit local-discovery opt-out.
- Added a repo-root `run_day20_demo.py` wrapper so `python run_day20_demo.py --json` works from the project root.
- Updated the execution lab copy and generated manifest source so `python run_day20_demo.py --json` is the canonical live command.
- Updated README, prototype README, design notes, and report outline current-state text.

### Why

The live Day 20 pipeline needed to run end to end from both the local Python wrapper and the execution lab's `/api/run` backend without asking reviewers to paste an executable path after hledger is installed.

### Evidence / Files

- `prototype/hledger_adapter/hledger.py`
- `prototype/tests/run_failure_matrix.py`
- `prototype/execution_lab/app/lab-client.tsx`
- `prototype/execution_lab/scripts/generate-manifest.mjs`
- `run_day20_demo.py`
- `README.md`
- `prototype/README.md`
- `prototype/design.md`
- `report/outline.md`

### Verification

- `winget search hledger --accept-source-agreements`
- `winget install --id simonmichael.hledger --exact --accept-package-agreements --accept-source-agreements --scope user`
- `hledger --version` via the installed Winget executable
- `npm run generate:manifest` from `prototype/execution_lab/`
- `python -m compileall hledger_adapter tests run_day20_demo.py`
- `python tests/run_failure_matrix.py`
- `python run_day20_demo.py --json`
- `npm run build` from `prototype/execution_lab/`
- Direct `POST /api/run` returned HTTP 200 with `status: passed`
- Production browser click on `Run Synthetic Demo` returned HTTP 200 from `/api/run` and rendered `Last run passed`

### Next

Draft the report introduction, method, and landscape sections from `report/outline.md`, then decide which comparison tables belong in the main body versus appendix.

## 07-15-2026 - Phase 22: Report Structure and Prototype UI Refinement

### What Changed

- Executed the Day 22 report-structure phase early at user request.
- Added `report/outline.md` as the final report skeleton with sections for introduction, method, landscape, tool evaluations, comparison, prototype, recommendation, limitations, future work, appendices, and missing-evidence checks.
- Added `notes/day_22_report_structure.md`.
- Updated the execution lab so lifecycle phases open a focused popup showing the selected phase command, command output, status, key outputs, and evidence.
- Added a prototype architecture tab generated from the repo manifest.
- Updated the execution-lab manifest copy to align with the internship repo and report framing instead of older Day 20-only wording.
- Updated README and prototype README status notes.

### Why

Day 22 needed a complete report skeleton before drafting prose. The UI refinement also makes the prototype easier for a reviewer to inspect: clicking a lifecycle phase now visibly enlarges the phase context and shows the command/output details behind that phase.

### Evidence / Files

- `report/outline.md`
- `notes/day_22_report_structure.md`
- `report/README.md`
- `prototype/execution_lab/app/lab-client.tsx`
- `prototype/execution_lab/app/globals.css`
- `prototype/execution_lab/app/types.ts`
- `prototype/execution_lab/scripts/generate-manifest.mjs`
- `prototype/execution_lab/app/layout.tsx`
- `README.md`
- `prototype/README.md`

### Verification

- `npm run generate:manifest` from `prototype/execution_lab/`
- `python -m compileall hledger_adapter tests run_day20_demo.py`
- `python tests/run_failure_matrix.py`
- `npm run build` from `prototype/execution_lab/`
- `python run_day20_demo.py --json`
- Local dev server HTTP checks for `/` and `/project-manifest.json` on `http://127.0.0.1:3005`

The packaged demo wrapper returned the documented local boundary: the adapter command reported `HLEDGER_NOT_FOUND` because hledger is not configured on this machine, while the safety failure matrix passed 15/15 cases and confirmed scratch was unchanged.

Browser-level click verification was not available in this session because no controllable browser backend was exposed; the UI change was verified through TypeScript/build checks, the running page HTTP 200 response, and the generated manifest containing 11 lifecycle phases and 4 architecture layers.

### Next

Draft the report introduction, method, and landscape sections from `report/outline.md`, then decide which comparison tables belong in the main body versus appendix.

## 07-14-2026 - Phase 21: Prototype Review and Freeze

### What Changed

- Executed the Day 21 prototype freeze early at user request.
- Fixed the execution lab layout so the homepage stays focused on live prototype testing: synthetic inputs, command interface, enlarged execution lifecycle, output tables, and results.
- Moved project details into tabs, including project scope, evidence, artifacts, changelog, and contribution guidance.
- Added a generated synthetic CSV preview and recent changelog entries to the execution-lab manifest without exposing host-absolute paths.
- Tightened `/api/run` input handling for the optional hledger binary path and marked responses `no-store`.
- Added `prototype/retrospective.md`.
- Updated `research/comparison_matrix.md` with Day 21 implementation lessons.

### Why

Day 21 needed to freeze the prototype for report writing and make the reviewer UI stable on desktop and mobile. The prototype now foregrounds the runnable integration and keeps supporting project history in separate tabs.

### Evidence / Files

- `prototype/retrospective.md`
- `prototype/execution_lab/app/lab-client.tsx`
- `prototype/execution_lab/app/globals.css`
- `prototype/execution_lab/scripts/generate-manifest.mjs`
- `prototype/execution_lab/app/api/run/route.ts`
- `research/comparison_matrix.md`

### Verification

- `python -m compileall hledger_adapter tests run_day20_demo.py`
- `python tests/run_failure_matrix.py`
- `python run_day20_demo.py --json`
- `npm run build` from `prototype/execution_lab/`

The current machine still does not have hledger configured, so the packaged live demo reports `HLEDGER_NOT_FOUND` for the adapter run while the failure matrix passes. This remains the documented setup boundary, not a frozen-prototype blocker.

### Next

Use the frozen prototype, retrospective, comparison lessons, and execution lab as inputs to the final report and deck.

## 07-14-2026 - Phase 20: Demo Packaging and Project Execution Lab UI

### What Changed

- Added `prototype/run_day20_demo.py` as the one-command Day 20 demo package for the canonical synthetic adapter demo plus the safety failure matrix.
- Added the Vercel-ready Next.js execution lab under `prototype/execution_lab/`.
- Added generated repo-relative manifests at `prototype/execution_lab/data/project-manifest.json` and `prototype/execution_lab/public/project-manifest.json`.
- Built local live-run behavior through `/api/run` and verified replay behavior for environments without hledger.
- Added UI surfaces for the execution rail, result totals, safety matrix, evidence drawer, artifact manifest, unsupported capabilities, and Git contribution workflow.
- Updated README, prototype README, prototype design, research log, and the Day 20 exit note.

### Why

Day 20 needed to turn the prototype from terminal-only evidence into a runnable reviewer surface. The app now shows how synthetic rows move through validation, hledger discovery, report execution, reconciliation, summary generation, failure handling, evidence, and contribution steps without accepting real data or exposing local paths.

### Evidence / Files

- `prototype/run_day20_demo.py`
- `prototype/execution_lab/`
- `prototype/execution_lab/data/project-manifest.json`
- `prototype/execution_lab/public/project-manifest.json`
- `notes/day_20_demo_packaging_execution_lab.md`

### Verification

- `python -m compileall hledger_adapter tests run_day20_demo.py`
- `python tests/run_failure_matrix.py`
- `python run_day20_demo.py --json`
- `npm run build` from `prototype/execution_lab/`
- Local HTTP checks for `/`, `/project-manifest.json`, and `/api/run`

The current machine does not have hledger configured, so `/api/run` and `run_day20_demo.py --json` report `HLEDGER_NOT_FOUND` for the live adapter demo while the failure matrix passes. This matches the documented setup boundary.

### Next

Execute Day 21 by reviewing the packaged prototype from a clean state, fixing only blockers, and writing the prototype retrospective.

## 07-13-2026 - Phase 20 UI Scope Refinement

### What Changed

- Added `prototype/day20_project_lab_ui_brief.md` as the detailed target for the Day 20 web application.
- Reframed Day 20 from a dashboard to a responsive project execution lab with local live execution, Vercel verified replay, artifact manifests, `about`/`why` rationale entries, evidence traceability, and Git contribution guidance.
- Updated the day-by-day roadmap, prototype design, prototype README, and root README to require command-to-result progression and project-specific content.

### Why

The prototype needs to visibly function for reviewers and justify the AI engineering internship context. Day 20 should show the synthetic adapter run, the failure matrix, and the evidence trail in motion, not just list repository files.

### Evidence / Files

- `prototype/day20_project_lab_ui_brief.md`
- `day_by_day_ai_tax_tooling_phases.md`
- `prototype/design.md`
- `prototype/README.md`
- `README.md`

### Next

Execute Day 20 by building the execution lab UI, manifest generation, local live-run path, Vercel replay path, and contribution workflow panel.

## 07-13-2026 - Phase 19: Safety and Failure Handling

### What Changed

- Added `prototype/tests/run_failure_matrix.py`, a dependency-free subprocess matrix for expected validation, context, policy, dry-run, and hledger-discovery failures.
- Verified 15 cases covering malformed dates, invalid amounts, unknown categories/accounts, duplicate IDs, missing files, tax-hint mismatch, wrong signs, context failures, missing acknowledgement, dry-run kept-scratch conflict, missing hledger, and unusable hledger candidates.
- Confirmed the matrix leaves scratch state unchanged and uses `summarize --dry-run` for preflight failures where possible.
- Updated the prototype README safety/failure sections and the root repository status.
- Updated the Day 20 roadmap to include a Vercel-ready project execution lab for changelog, notes, evidence, prototype status/output, report/deck state, research, tool records, and README artifacts.

### Why

Day 19 needed to prove the adapter fails clearly and safely, not just produce the happy-path summary. The UI roadmap change also ensures the prototype week includes a deployable project-viewing application rather than ending with only terminal output.

### Evidence / Files

- `prototype/tests/run_failure_matrix.py`
- `prototype/README.md`
- `prototype/design.md`
- `day_by_day_ai_tax_tooling_phases.md`
- `notes/day_19_safety_failure_handling.md`
- `evidence/commands/07-13-2026_hledger-adapter_day19_failures.txt`

### Next

Execute Day 20 by adding a one-command demo and a Vercel-ready project execution lab scaffold with a generated read-only artifact manifest.

## 07-13-2026 - Phase 18: Balance and Report Summary

### What Changed

- Extended the hledger runner to execute `incomestatement --depth 3 -O json` alongside `print -O json` and `balance --flat -O json`.
- Added `prototype/hledger_adapter/summary.py` to derive controlled summary buckets from reconciled transactions/accounts and cross-check them against hledger's income statement.
- Implemented executed `summarize` output and upgraded `demo` to the canonical end-to-end fixed-fixture summary.
- Added Schedule C-style gross receipts, cash-expense groupings, net before mileage, interest, charity, federal estimated-payment tracking, preserved mileage facts, warnings, limitations, and provenance.
- Verified the baseline fixture, the baseline plus `TADD` scenario, dry-run behavior, smoke behavior, missing-context mileage handling, and default scratch cleanup.

### Why

Day 18 needed to complete the second half of the demo workflow. The adapter now turns reconciled hledger postings into deterministic, machine-readable bookkeeping and tax-adjacent facts without treating those facts as tax calculations or official tax treatment.

### Evidence / Files

- `prototype/hledger_adapter/hledger.py`
- `prototype/hledger_adapter/models.py`
- `prototype/hledger_adapter/summary.py`
- `prototype/hledger_adapter/cli.py`
- `prototype/README.md`
- `notes/day_18_balance_report_summary.md`
- `evidence/commands/07-13-2026_hledger-adapter_day18_summary.txt`

### Next

Execute Day 19 by adding stable failure checks for malformed dates, invalid amounts, unknown categories/accounts, duplicate IDs, missing files, context failures, missing hledger, and dry-run option conflicts.

## 07-13-2026 - Phase 17: Transaction and Account Reconciliation

### What Changed

- Extended validated CSV loading so each accepted source row is retained as a structured transaction record.
- Added a hledger report runner that executes both `print -O json` and `balance --flat -O json` in one isolated scratch directory.
- Added transaction/account normalization and reconciliation in `prototype/hledger_adapter/normalize.py`.
- Updated `demo` and `smoke` so executed runs now emit normalized transactions, account balances, counts, and reconciliation checks.
- Verified both the 19-row baseline and 20-row baseline-plus-`TADD` scenarios.

### Why

Day 17 needed the first real workflow layer above backend invocation. The adapter now proves that synthetic CSV rows entered hledger as the expected two-posting transactions, that all implied accounts are loaded, and that account balances match reconciled postings before any Day 18 summary totals are calculated.

### Evidence / Files

- `prototype/hledger_adapter/models.py`
- `prototype/hledger_adapter/validation.py`
- `prototype/hledger_adapter/hledger.py`
- `prototype/hledger_adapter/normalize.py`
- `prototype/hledger_adapter/cli.py`
- `notes/day_17_transaction_account_reconciliation.md`
- `evidence/commands/07-13-2026_hledger-adapter_day17_reconciliation.txt`

### Next

Execute Day 18 by deriving controlled balance/report summaries from reconciled postings, including checking balance, bookkeeping income-statement cross-checks, Schedule C-style cash-expense groupings, and tax-adjacent facts.

## 07-13-2026 - Phase 16: Adapter Skeleton

### What Changed

- Scaffolded the Python prototype package under `prototype/hledger_adapter/` with module entry points, CLI parsing, structured adapter errors, and hledger process helpers.
- Added `prototype/pyproject.toml`, `prototype/.gitignore`, `prototype/config/category_map.json`, and `prototype/config/hledger.csv.rules`.
- Implemented category-map loading, synthetic transaction CSV validation, optional context loading, hledger binary discovery, version capture, scratch-copy execution, and a Day 16 read-only `print -O json` smoke call.
- Added working `validate`, `smoke`, `demo`, and `summarize --dry-run` command paths.
- Verified the canonical fixture with the Day 9 hledger 1.52.1 executable supplied via `--hledger-bin`; the smoke call reported 19 transactions and 38 postings.

### Why

Day 16 needed to turn the design contract into a runnable adapter shell without jumping ahead to full summary generation. The implementation proves that the wrapper can load committed configuration, enforce the synthetic fixture boundary, locate/probe hledger safely, and call the real backend through scratch copies.

### Evidence / Files

- `prototype/hledger_adapter/`
- `prototype/config/category_map.json`
- `prototype/config/hledger.csv.rules`
- `prototype/pyproject.toml`
- `prototype/.gitignore`
- `notes/day_16_adapter_skeleton.md`
- `evidence/commands/07-13-2026_hledger-adapter_day16_smoke.txt`

### Next

Execute Day 17 by implementing account loading, transaction normalization from hledger JSON, and reconciliation checks that prove the CSV rows became the expected balanced USD postings.

## 07-11-2026 - Phase 15: Prototype Design

### What Changed

- Designed the smallest useful hledger prototype as a local Python CLI over hledger's CSV, command-line, and JSON surfaces.
- Created an implementation-ready contract covering the CLI, transaction CSV, category map, optional mileage context, normalized JSON, errors, and exit codes.
- Chose one static adapter-owned hledger rules file and a separate strict category map.
- Defined read-only subprocess execution, binary discovery, dry-run behavior, scratch lifecycle, exact-decimal parsing, output reconciliation, and path redaction.
- Defined baseline, `TADD`, failure, safety, and repeatability acceptance criteria.
- Replaced the prototype placeholder README with a design-stage draft and created the Day 15 exit note.

### Why

Week 3 needed a narrow contract before scaffolding code. The design closes hledger's permissive duplicate-ID and unknown-category behavior at the wrapper boundary, keeps Schedule C-style aggregation separate from hledger's broader income statement, and preserves synthetic mileage without pretending to calculate tax treatment.

### Evidence / Files

- `prototype/design.md`
- `prototype/README.md`
- `notes/day_15_prototype_design.md`
- `notes/research_log.md`
- `README.md`
- Supporting Day 9 hledger command/JSON evidence under `evidence/`

### Next

Execute Day 16 by scaffolding the Python adapter, committing the category map and static hledger rules, implementing configuration loading and hledger discovery/version capture, and proving a real read-only smoke call.

## 07-08-2026 - Phase 14: Prototype Target Selection

### What Changed

- Built the Week 2 comparison matrix across hledger, Actual Budget, Firefly III, tenforty, and Filed Open Tax Engine.
- Scored candidates for prototype value, feasibility, safety, and demo clarity.
- Selected hledger as the primary Week 3 prototype target.
- Selected Actual Budget as the backup target.
- Created the Day 14 exit note and updated repository status.

### Why

Week 2 needed to turn five hands-on tool records into a concrete Week 3 build direction. hledger offers the clearest one-week prototype path because it completed the full synthetic transaction workflow with low setup friction, local file safety, and JSON output. Actual Budget is the closest backup because it preserves the same transaction-to-summary workflow through an official Node API.

### Evidence / Files

- `research/comparison_matrix.md`
- `research/prototype_target_decision.md`
- `notes/day_14_prototype_target_selection.md`
- `tool_records/tool_1.md`
- `tool_records/tool_2.md`
- `tool_records/tool_3.md`
- `tool_records/tool_4.md`
- `tool_records/tool_5.md`
- `notes/research_log.md`
- `README.md`

### Next

Execute Day 15 by creating `prototype/design.md`, defining the hledger adapter input/output schemas, documenting guardrails, and updating the prototype README outline.

## 07-08-2026 - Phase 13: Evaluate Tool 5

### What Changed

- Evaluated Filed Open Tax Engine `v2.0.2` against the shared synthetic freelancer tax profile.
- Downloaded the official Windows x64 binary into `%TEMP%` and verified the release SHA-256 hash before use.
- Added a Filed/OpenTax-specific Node evaluation helper and normalized JSON/XML artifacts under `evidence/fixtures/`.
- Captured setup, version/schema, workflow, validation/export, and failure behavior transcripts under `evidence/commands/`.
- Created the completed fifth tool record at `tool_records/tool_5.md`.
- Created the Day 13 exit note at `notes/day_13_evaluate_filed_opentax.md`.
- Updated the rolling research log, fixture index, tool-record index, and README repository status.

### Why

Week 2 needed to finish the fifth shortlisted tool or close evaluation gaps before prototype target selection. Filed Open Tax Engine was evaluated because it is the shortlist's high-upside tax-specific CLI/JSON candidate, with form-entry schemas, 1040 line outputs, validation, dependency graph inspection, and MeF export.

### Evidence / Files

- `tool_records/tool_5.md`
- `notes/day_13_evaluate_filed_opentax.md`
- `evidence/commands/07-08-2026_filed-opentax_setup.txt`
- `evidence/commands/07-08-2026_filed-opentax_version.txt`
- `evidence/commands/07-08-2026_filed-opentax_workflow.txt`
- `evidence/commands/07-08-2026_filed-opentax_failure-tests.txt`
- `evidence/fixtures/filed_opentax_day13_evaluate.mjs`
- `evidence/fixtures/filed_opentax_day13_summary.json`
- `evidence/fixtures/filed_opentax_day13_failure_results.json`
- `evidence/fixtures/filed_opentax_day13_baseline_mef.xml`
- `notes/research_log.md`
- `evidence/fixtures/README.md`
- `tool_records/README.md`
- `README.md`

### Next

Execute Day 14 by building the comparison matrix across hledger, Actual Budget, Firefly III, tenforty, and Filed Open Tax Engine, then choose the primary Week 3 prototype target and backup target.

## 07-08-2026 - Phase 12: Evaluate Tool 4

### What Changed

- Evaluated `tenforty==2025.10` against the shared synthetic freelancer tax profile.
- Captured native Windows setup failure and successful Docker/Linux evaluation evidence.
- Added a tenforty-specific Python evaluation helper and normalized JSON output artifacts under `evidence/fixtures/`.
- Captured setup, version, workflow, and failure behavior transcripts under `evidence/commands/`.
- Created the completed fourth tool record at `tool_records/tool_4.md`.
- Created the Day 12 exit note at `notes/day_12_evaluate_tenforty.md`.
- Updated the rolling research log, fixture index, tool-record index, and README repository status.

### Why

Week 2 needed a direct tax-calculation surface after three bookkeeping or personal-finance integration evaluations. tenforty was evaluated fourth because it wraps Open Tax Solver behind Python functions and provides structured tax-liability outputs from summarized tax inputs.

### Evidence / Files

- `tool_records/tool_4.md`
- `notes/day_12_evaluate_tenforty.md`
- `evidence/commands/07-08-2026_tenforty_setup.txt`
- `evidence/commands/07-08-2026_tenforty_version.txt`
- `evidence/commands/07-08-2026_tenforty_workflow.txt`
- `evidence/commands/07-08-2026_tenforty_failure-tests.txt`
- `evidence/fixtures/tenforty_day12_evaluate.py`
- `evidence/fixtures/tenforty_day12_summary.json`
- `evidence/fixtures/tenforty_day12_scenario_grid.json`
- `evidence/fixtures/tenforty_day12_failure_results.json`
- `notes/research_log.md`
- `evidence/fixtures/README.md`
- `tool_records/README.md`
- `README.md`

### Next

Execute Day 13 by evaluating Filed Open Tax Engine as the fifth candidate, or by closing gaps across the four completed records before Day 14 prototype target selection.

## 07-08-2026 - Phase 11: Evaluate Tool 3

### What Changed

- Evaluated Firefly III `6.6.6` against the shared synthetic freelancer dataset.
- Ran Firefly III and MariaDB in isolated Docker containers, with local-only synthetic auth setup and redacted tokens.
- Added a Firefly-specific REST API evaluation helper and normalized JSON output artifacts under `evidence/fixtures/`.
- Captured setup, version, workflow, and failure behavior transcripts under `evidence/commands/`.
- Created the completed third tool record at `tool_records/tool_3.md`.
- Created the Day 11 exit note at `notes/day_11_evaluate_firefly_iii.md`.
- Updated the rolling research log, fixture index, tool-record index, and README repository status.

### Why

Week 2 needs comparable hands-on records across different integration styles. Firefly III was evaluated third because it represents the true REST JSON, self-hosted personal-finance API path, contrasting with hledger's file/CLI workflow and Actual Budget's local-first Node API/CLI workflow.

### Evidence / Files

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
- `notes/research_log.md`
- `evidence/fixtures/README.md`
- `tool_records/README.md`
- `README.md`

### Next

Execute Day 12 by evaluating a fourth shortlisted tool or backup candidate, preferably a tax-specific candidate such as `tenforty`.

## 07-08-2026 - Phase 10: Evaluate Tool 2

### What Changed

- Evaluated Actual Budget `26.7.0` against the shared synthetic freelancer dataset.
- Installed `@actual-app/api` and `@actual-app/cli` in a temporary npm directory without adding dependency artifacts to the repo.
- Added an Actual-specific Node API evaluation helper and normalized JSON output artifacts under `evidence/fixtures/`.
- Captured setup, version, common workflow, and failure behavior transcripts under `evidence/commands/`.
- Created the completed second tool record at `tool_records/tool_2.md`.
- Created the Day 10 exit note at `notes/day_10_evaluate_actual.md`.
- Updated the rolling research log, fixture index, tool-record index, and README repository status.

### Why

Week 2 needs comparable hands-on records across different integration styles. Actual Budget was evaluated second because it contrasts hledger's file/CLI/JSON workflow with a local-first app model, official Node API, and stable JSON-oriented CLI.

### Evidence / Files

- `tool_records/tool_2.md`
- `notes/day_10_evaluate_actual.md`
- `evidence/commands/07-08-2026_actual_setup.txt`
- `evidence/commands/07-08-2026_actual_version.txt`
- `evidence/commands/07-08-2026_actual_workflow.txt`
- `evidence/commands/07-08-2026_actual_failure-tests.txt`
- `evidence/fixtures/actual_day10_evaluate.mjs`
- `evidence/fixtures/actual_day10_summary.json`
- `evidence/fixtures/actual_day10_transactions_after_add.json`
- `notes/research_log.md`
- `evidence/fixtures/README.md`
- `tool_records/README.md`
- `README.md`

### Next

Execute Day 11 by evaluating Firefly III as the REST/API-backed personal-finance comparator.

## 07-08-2026 - Phase 9: Evaluate Tool 1

### What Changed

- Evaluated hledger `1.52.1` against the shared synthetic freelancer dataset.
- Added hledger-specific CSV rules, `TADD`, bad-input fixtures, and JSON output artifacts under `evidence/fixtures/`.
- Captured setup, version, common workflow, and failure behavior transcripts under `evidence/commands/`.
- Created the completed first tool record at `tool_records/tool_1.md`.
- Created the Day 9 exit note at `notes/day_09_evaluate_hledger.md`.
- Updated the rolling research log, fixture index, tool-record index, and README repository status.

### Why

Week 2 needs comparable hands-on records for each shortlisted tool. hledger was evaluated first because it is the fastest low-setup candidate for validating the shared CSV-to-report workflow and testing whether the evaluation method produces useful evidence.

### Evidence / Files

- `tool_records/tool_1.md`
- `notes/day_09_evaluate_hledger.md`
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
- `notes/research_log.md`
- `README.md`

### Next

Execute Day 10 by evaluating Actual Budget against the same synthetic dataset and comparing its setup, structured output, and failure behavior with hledger.

## 07-07-2026 - Phase 8: Evaluation Harness and Synthetic Data

### What Changed

- Created `evidence/synthetic_dataset.md` with a synthetic 2025 freelancer scenario, canonical transactions, mileage metadata, expected totals, tool adaptation notes, and failure-test inputs.
- Created machine-readable fixtures at `evidence/fixtures/synthetic_freelancer_transactions.csv` and `evidence/fixtures/synthetic_freelancer_tax_profile.json`.
- Created `research/evaluation_checklist.md` with shared setup, workflow, tax-coverage, failure-testing, evidence, and tool-record checklists.
- Created the Day 8 exit note at `notes/day_08_evaluation_harness_and_synthetic_data.md`.
- Updated the rolling research log, fixture README, and README repository status.

### Why

Week 2 needs a shared evaluation harness so hledger, Actual Budget, Firefly III, tenforty, and Filed Open Tax Engine are tested against the same synthetic facts instead of ad hoc examples. The dataset also keeps bookkeeping and tax-oriented tools comparable while respecting their different input surfaces.

### Evidence / Files

- `evidence/synthetic_dataset.md`
- `evidence/fixtures/synthetic_freelancer_transactions.csv`
- `evidence/fixtures/synthetic_freelancer_tax_profile.json`
- `research/evaluation_checklist.md`
- `notes/day_08_evaluation_harness_and_synthetic_data.md`
- `notes/research_log.md`
- `evidence/fixtures/README.md`
- `README.md`

### Next

Execute Day 9 by evaluating hledger against the shared dataset and filling the first tool record.

## 07-07-2026 - Phase 7: Shortlist Decision

### What Changed

- Created `research/shortlist.md` with a score matrix, selection rationale, major exclusions, backups, Week 2 evaluation order, and carry-forward risks.
- Created the Day 7 exit note at `notes/day_07_shortlist_decision.md`.
- Updated `notes/research_log.md` and the README repository status for Phase 7 completion.
- Selected hledger, Actual Budget, Firefly III, tenforty, and Filed Open Tax Engine for Week 2 hands-on evaluation.

### Why

The project needed to turn the Week 1 landscape, health, and programmatic-surface evidence into a concrete Week 2 evaluation target list. The selected tools balance plain-text accounting, personal-finance app integration, REST/API coverage, and tax-specific calculation or form-engine workflows.

### Evidence / Files

- `research/shortlist.md`
- `notes/day_07_shortlist_decision.md`
- `notes/research_log.md`
- `README.md`

### Next

Execute Day 8 by creating `evidence/synthetic_dataset.md` and `research/evaluation_checklist.md` for a shared hands-on evaluation harness.

## 07-06-2026 - Phase 6: Programmatic Surface Survey

### What Changed

- Created `research/programmatic_surface_survey.md` with a documented comparison of CLI, library, REST API, plugin, file-format, schema, database, and structured-output surfaces.
- Created the Day 6 exit note at `notes/day_06_programmatic_surface_survey.md`.
- Updated `notes/research_log.md` and the README repository status for Phase 6 completion.
- Aligned the Day 6 roadmap entry to the created `research/programmatic_surface_survey.md` artifact name.
- Identified hledger, Actual Budget, Firefly III, Beancount, tenforty, and Filed Open Tax Engine as the clearest code-facing candidates going into Day 7.

### Why

The project needed to compare which candidates can be driven from code before spending Week 2 time installing tools. The Day 5 health snapshot showed which projects were alive; Day 6 distinguishes which ones expose realistic automation surfaces.

### Evidence / Files

- `research/programmatic_surface_survey.md`
- `notes/day_06_programmatic_surface_survey.md`
- `notes/research_log.md`
- `research/README.md`
- `day_by_day_ai_tax_tooling_phases.md`
- `README.md`

### Next

Execute Day 7 by creating `research/shortlist.md`, scoring plausible candidates, and choosing 3-5 tools for hands-on evaluation.

## 07-05-2026 - Phase 5: Metadata and Health Snapshot

### What Changed

- Created `research/project_health_snapshot.md` with normalized activity, release/package, license, community, documentation, tax-year, and data-format notes for plausible candidates.
- Created the Day 5 exit note at `notes/day_05_metadata_health_snapshot.md`.
- Updated `notes/research_log.md` and the README repository status for Phase 5 completion.
- Separated core shortlist-pressure candidates from supporting import, UI, and desktop comparators.

### Why

The project needs comparable health evidence before the Day 6 programmatic-surface survey and Day 7 shortlist decision. The Day 4 longlist was broad, but its metadata was uneven across GitHub, PyPI, SourceForge, IRS pages, and project docs.

### Evidence / Files

- `research/project_health_snapshot.md`
- `notes/day_05_metadata_health_snapshot.md`
- `notes/research_log.md`
- `README.md`

### Next

Execute Day 6 by creating `research/programmatic_surface_survey.md` and comparing documented/inferred automation surfaces across the strongest candidates.

## 07-05-2026 - Phase 4: Discovery Search

### What Changed

- Expanded `research/longlist.md` beyond the starter candidates with newly discovered tax-specific, tax-model, personal-finance, UI, and import-layer tools.
- Promoted UsTaxes, HabuTax, Filed Open Tax Engine, PSL Tax-Calculator, PolicyEngine US, IRS Tax Withholding Estimator, tenforty, OpenFile, Actual Budget, KMyMoney, HomeBank, Money Manager Ex, Fava, Paisa, and ofxstatement.
- Created `research/exclusions.md` to record tools excluded or deferred because of license, scope, project health, maturity, narrowness, or lack of open/local inspectability.
- Added the Day 4 exit note and updated the rolling research log.

### Why

The project needed a broader discovery pass before Day 5 health snapshots and the Day 7 shortlist decision. The starter list was strong, but it missed several directly relevant US tax-form and tax-model projects plus stronger API/CLI personal-finance comparators.

### Evidence / Files

- `research/longlist.md`
- `research/exclusions.md`
- `notes/day_04_discovery_search.md`
- `notes/research_log.md`

### Next

Execute Day 5 by creating `research/project_health_snapshot.md` and normalizing release dates, recent commits, licenses, contributor signals, documentation quality, annual tax-year support, and data-format evidence for plausible candidates.

## 07-04-2026 - Phase 3: Starter Tool Inventory

### What Changed

- Created `research/longlist.md` with structured starter entries for GnuCash, Beancount, Ledger CLI, hledger, Firefly III, OpenTaxSolver, IRS Direct File posture, OFX/QIF parser tooling, and CSV-to-ledger tooling.
- Captured first-pass project URLs, docs URLs, licenses, latest visible release/status notes, categories, apparent integration surfaces, and immediately visible wrappers or adjacent tools.
- Added source IDs and access dates inside the longlist so later report claims can trace back to primary sources.
- Updated the research log and README status for Phase 3 completion.

### Why

The project needed a baseline tool inventory before Day 4 discovery, Day 5 health snapshots, Day 6 programmatic-surface comparison, and the Day 7 shortlist decision.

### Evidence / Files

- `research/longlist.md`
- `notes/research_log.md`
- `README.md`

### Next

Execute Day 4 discovery search, expand `research/longlist.md` with credible additional tools, and create `research/exclusions.md` for tools that are closed-source, irrelevant, abandoned, or outside the consumer/freelancer scope.

## 07-03-2026 - Project Tracking and Brief Alignment

### What Changed

- Created this changelog and backfilled entries for Day 1 and Day 2.
- Reviewed the attached internship description PDF against the execution plan, day-by-day phase plan, README, and day notes.
- Added `notes/internship_brief_alignment.md` to capture what the project brief requires and how the repository now tracks it.
- Updated the execution plan, day-by-day plan, README, and tool-record template to make several brief details explicit.

### Why

The project needed one central history file for easier backtracking. The PDF also included details that were partly implicit in the existing plans, such as third-party wrappers, exact US tax-form prompts, tool non-goals, annual tax-year support, and mentorship/logistics expectations.

### Evidence / Files

- `CHANGELOG.md`
- `notes/internship_brief_alignment.md`
- `codex_execution_plan_ai_tax_tooling.md`
- `day_by_day_ai_tax_tooling_phases.md`
- `tool_records/template.md`
- `README.md`

### Next

Execute Day 3 by creating `research/longlist.md` for the starter candidate tools and capturing first-pass metadata, docs links, releases, licenses, categories, and apparent integration surfaces.

## 07-02-2026 - Phase 2: Workspace and Evidence System

### What Changed

- Created the main workspace folders: `research/`, `tool_records/`, `prototype/`, `report/`, `deck/`, `notes/`, and `evidence/`.
- Added README files so each workspace folder is trackable in git and has a defined purpose.
- Created evidence subfolders for commands, repository metadata, documentation notes, screenshots, and synthetic fixtures.
- Created the rolling research log at `notes/research_log.md`.
- Created the source-citation convention at `notes/source_citation_conventions.md`.
- Created the reusable tool-record template at `tool_records/template.md`.
- Wrote the Day 2 exit note at `notes/day_02_workspace_and_evidence.md`.
- Updated the README repository status to show Phase 2 completion.

### Why

Future research needs a consistent home for findings, source links, command output, metadata, screenshots, and evaluation records. The scaffold also keeps the final report evidence-backed instead of memory-driven.

### Evidence / Files

- `notes/day_02_workspace_and_evidence.md`
- `notes/research_log.md`
- `notes/source_citation_conventions.md`
- `tool_records/template.md`
- `evidence/README.md`
- Workspace README files under `research/`, `tool_records/`, `prototype/`, `report/`, `deck/`, and `evidence/`

### Next

Start Phase 3 by building the starter tool inventory in `research/longlist.md`.

## 07-01-2026 - Phase 1: Kickoff and Source Understanding

### What Changed

- Read the project brief and turned it into a concrete execution plan.
- Defined the research question around open-source consumer tax bookkeeping, US tax-return tooling, and programmatic integration surfaces.
- Identified the three final deliverables: written report, prototype integration, and presentation deck.
- Created the month-long execution plan.
- Created the day-by-day phase plan.
- Wrote the Day 1 kickoff note.

### Why

The internship needed a clear scope, timeline, rubric, and daily operating rhythm before research and prototype work could begin.

### Evidence / Files

- `codex_execution_plan_ai_tax_tooling.md`
- `day_by_day_ai_tax_tooling_phases.md`
- `notes/day_01_kickoff.md`
- `README.md`
- `LICENSE`

### Next

Create the research workspace, reusable templates, and citation/evidence conventions for Phase 2.
