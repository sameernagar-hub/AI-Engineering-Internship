# Changelog

This file tracks meaningful project updates so the internship work can be backtracked without rereading every note, plan, and commit.

Update this file after every work session that changes project direction, research artifacts, prototype code, report/deck content, or repository structure.

Each entry should answer:

- What changed?
- Why did it change?
- What evidence or files were added?
- What is next?

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
