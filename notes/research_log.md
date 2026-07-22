# Research Log

This is the rolling daily research log. Add one entry at the end of each work session before moving to the next phase.

Use direct links to tool records, evidence files, source URLs, and commands whenever a note supports a later report claim.

## Entry Template

```md
## MM-DD-YYYY - Phase N: Title

### Goal

What today was supposed to accomplish.

### What I Did

- Concrete research, setup, or implementation steps completed.

### Evidence Captured

- Source links, command outputs, screenshots, metadata snapshots, or local files created.

### Decisions Made

- Choices that affect the shortlist, evaluation method, prototype direction, or report framing.

### Problems / Open Questions

- Gaps, confusing findings, tool failures, mentor questions, or follow-up searches.

### Tomorrow's Starting Point

- The first concrete action for the next phase.
```

## 07-02-2026 - Phase 2: Workspace and Evidence System

### Goal

Create the research workspace so future findings, command output, source links, and tool evaluations have consistent homes.

### What I Did

- Created the main workspace folders and trackable README files.
- Added evidence subfolders for commands, repository metadata, documentation notes, screenshots, and synthetic fixtures.
- Created `tool_records/template.md`.
- Created `notes/source_citation_conventions.md`.
- Wrote the Day 2 exit note at `notes/day_02_workspace_and_evidence.md`.

### Evidence Captured

- `tool_records/template.md`
- `notes/source_citation_conventions.md`
- `notes/day_02_workspace_and_evidence.md`
- `evidence/README.md`

### Decisions Made

- Use a dedicated citation convention with compact source IDs.
- Store local command and metadata evidence in purpose-specific evidence folders.
- Keep future tool evaluations in one template-driven file per tool.

### Problems / Open Questions

- None for this phase.

### Tomorrow's Starting Point

Create `research/longlist.md` for the starter candidate tools.

## 07-03-2026 - Maintenance: Changelog and Brief Alignment

### Goal

Create a persistent changelog and compare the repository plan against the attached internship brief.

### What I Did

- Extracted text from `[private source]/intern_project_description.pdf` with `pypdf`.
- Searched the execution plan, day-by-day plan, README, day notes, research log, and tool template for brief-specific requirements.
- Created `CHANGELOG.md` and backfilled Day 1 and Day 2 entries.
- Created `notes/internship_brief_alignment.md`.
- Updated the execution plan, day-by-day plan, README, and tool-record template with missing or implicit brief details.

### Evidence Captured

- `CHANGELOG.md`
- `notes/internship_brief_alignment.md`
- `codex_execution_plan_ai_tax_tooling.md`
- `day_by_day_ai_tax_tooling_phases.md`
- `tool_records/template.md`

### Decisions Made

- Keep the attached PDF out of the repository by default.
- Track third-party wrappers, exact tax-form coverage prompts, stated non-goals, annual tax-year support, and mentorship/logistics terms explicitly.
- Update `CHANGELOG.md` after every meaningful work session going forward.

### Problems / Open Questions

- `pdfinfo` was not installed, so PDF inspection used Python and `pypdf`.

### Tomorrow's Starting Point

Execute Phase 3 by creating `research/longlist.md` for the starter candidate tools.

## 07-04-2026 - Phase 3: Starter Tool Inventory

### Goal

Turn the starter candidate list into a structured longlist with first-pass metadata, docs links, release/status notes, licenses, categories, integration surfaces, and immediately visible wrappers or adjacent tools.

### What I Did

- Created `research/longlist.md` as the Day 3 exit artifact.
- Checked primary project, documentation, release, license, PyPI, and official government pages for the starter candidates.
- Captured first-pass entries for GnuCash, Beancount, Ledger CLI, hledger, Firefly III, OpenTaxSolver, IRS Direct File posture, OFX/QIF parser tooling, and CSV-to-ledger tooling.
- Added immediate adjacent prior art including piecash, beangulp, smart_importer, beancount-import, ledger-autosync, Firefly III Data Importer, and OpenFile.

### Evidence Captured

- `research/longlist.md`
- Source links and compact citation IDs inside `research/longlist.md`
- Primary source families checked: GitHub repositories/releases, PyPI package pages, official documentation sites, SourceForge project/download pages, and IRS Direct File pages.

### Decisions Made

- Treat IRS Direct File as reference architecture and schema/API prior art, not as an active filing candidate.
- Treat OFX/QIF and CSV-to-ledger tooling as adjacent import infrastructure rather than standalone tax or bookkeeping candidates.
- Keep both API-first and plain-text/CLI-first paths alive until the Day 7 shortlist decision.

### Problems / Open Questions

- OpenTaxSolver appears tax-form-relevant but may not expose a clean programmatic API.
- GnuCash Python bindings are optional/build-dependent and need local verification before being considered easy to automate.
- ledger-autosync has newer PyPI metadata than its GitHub latest-release page, so package/release metadata needs reconciliation during the health snapshot.
- OpenFile may deserve promotion to the longlist during Day 4 discovery because it is an active-looking fork of IRS Direct File, but accuracy and status caveats are prominent.

### Tomorrow's Starting Point

Execute Day 4 discovery search: expand the longlist with credible additional tools and create `research/exclusions.md` for closed-source, abandoned, irrelevant, or non-consumer candidates.

## 07-05-2026 - Phase 4: Discovery Search

### Goal

Find credible open-source tools not listed in the original brief, expand the longlist, and document exclusions.

### What I Did

- Searched for open-source US tax calculators, 1040/form generators, tax-benefit rules engines, withholding estimators, personal-finance apps, plain-text-accounting interfaces, and import/export tooling.
- Checked primary sources including GitHub repositories, official docs, IRS repositories/pages, PyPI pages, SourceForge pages, and project websites.
- Expanded `research/longlist.md` with newly discovered candidates and prior-art tools.
- Created `research/exclusions.md` for tools excluded because of license, scope, health, maturity, narrowness, or lack of public inspectability.
- Wrote the Day 4 exit note at `notes/day_04_discovery_search.md`.

### Evidence Captured

- `research/longlist.md`
- `research/exclusions.md`
- `notes/day_04_discovery_search.md`
- Source links and citation IDs embedded in the longlist and exclusions file.

### Decisions Made

- Promote UsTaxes, HabuTax, Filed Open Tax Engine, Tax-Calculator, PolicyEngine US, IRS Tax Withholding Estimator, tenforty, and OpenFile as tax-specific or tax-model candidates.
- Promote Actual Budget, KMyMoney, HomeBank, Money Manager Ex, Fava, Paisa, and ofxstatement as personal-finance, UI, or import-layer comparators.
- Treat OpenFile as a cautionary Direct File fork, not as an active filing-channel candidate.
- Treat Tax-Calculator and PolicyEngine US as programmatic tax-model comparators rather than consumer filing tools.
- Exclude or defer Akaunting, ERPNext, Maybe Finance, OpenTaxForms, Python-Taxes, TaxStuff, Kresus, ezBookkeeping, Skrooge, NBER TAXSIM, IRS Free File Fillable Forms, and closed commercial tax products.

### Problems / Open Questions

- New tax-engine candidates need health and accuracy scrutiny before shortlisting.
- Exact license details for KMyMoney and OpenFile need verification.
- Desktop personal-finance tools may be file-format-only, making them weaker for API-style integration.

### Tomorrow's Starting Point

Execute Day 5 by creating `research/project_health_snapshot.md` and normalizing release dates, recent activity, licenses, contributor signals, documentation quality, annual tax-year support, and data-format evidence for plausible candidates.

## 07-05-2026 - Phase 5: Metadata and Health Snapshot

### Goal

Gather comparable project-health evidence before choosing the shortlist.

### What I Did

- Created `research/project_health_snapshot.md` as the Day 5 exit artifact.
- Checked GitHub, PyPI, SourceForge, IRS, and official project documentation sources for health, release, license, docs, tax-year, and data-format evidence.
- Split candidates into core shortlist-pressure targets and supporting/lower-priority comparators.
- Wrote the Day 5 exit note at `notes/day_05_metadata_health_snapshot.md`.

### Evidence Captured

- `research/project_health_snapshot.md`
- `notes/day_05_metadata_health_snapshot.md`
- Source links and compact citation IDs inside the snapshot.

### Decisions Made

- Prioritize hledger, Firefly III, Actual Budget, Beancount, GnuCash, OpenTaxSolver, UsTaxes, tenforty, Tax-Calculator, and PolicyEngine US for Day 6 surface review.
- Treat IRS Direct File, OpenFile, and IRS Tax Withholding Estimator as reference/cautionary entries.
- Treat import tools such as ofxtools, ofxstatement, beangulp, smart_importer, beancount-import, and ledger-autosync as supporting infrastructure.

### Problems / Open Questions

- Some projects publish outside GitHub, so GitHub release metadata alone is not reliable.
- GnuCash automation on Windows needs local verification.
- Filed Open Tax Engine is promising but too new to trust without hands-on validation.

### Tomorrow's Starting Point

Execute Day 6 by creating `research/programmatic_surface_survey.md` and comparing documented/inferred automation surfaces across the strongest candidates.

## 07-06-2026 - Phase 6: Programmatic Surface Survey

### Goal

Compare how each plausible candidate can be driven from code before installing anything.

### What I Did

- Created `research/programmatic_surface_survey.md` as the Day 6 exit artifact.
- Checked official documentation, API docs, repositories, source architecture notes, and existing Day 5 evidence for the strongest candidates.
- Classified surfaces by whether they are documented stable, documented but constrained, experimental/new, inferred, reference-only, or unclear.
- Compared structured input/output support across CLI, library, REST API, plugin, file-format, schema, database, and report-export surfaces.

### Evidence Captured

- `research/programmatic_surface_survey.md`
- `notes/day_06_programmatic_surface_survey.md`
- Source links and compact citation IDs embedded in the survey.

### Decisions Made

- Prioritize hledger, Actual Budget, Firefly III, Beancount, tenforty, and Filed Open Tax Engine for the Day 7 shortlist discussion.
- Treat OpenTaxSolver and UsTaxes as important tax-form candidates with weaker external API surfaces.
- Treat GnuCash as a mature desktop comparator requiring local CLI/binding verification.
- Treat Tax-Calculator and PolicyEngine US as policy/rules comparators, not filing products.
- Keep IRS Direct File, OpenFile, and IRS Tax Withholding Estimator as reference-only architecture evidence.

### Problems / Open Questions

- The Day 7 shortlist needs to decide whether both Actual and Firefly are necessary.
- Filed Open Tax Engine needs hands-on accuracy and maturity checks before it can be recommended.
- Beancount v2/v3 tooling differences need verification.
- GnuCash remains promising but likely setup-heavy on Windows.

### Tomorrow's Starting Point

Execute Day 7 by creating `research/shortlist.md`, scoring candidates, and selecting 3-5 tools for Week 2 hands-on evaluation.

## 07-07-2026 - Phase 7: Shortlist Decision

### Goal

Choose 3-5 tools for deep Week 2 evaluation and document a defensible selection rationale.

### What I Did

- Created `research/shortlist.md` as the Day 7 exit artifact.
- Scored plausible candidates across relevance, integration surface, project health, tax workflow fit, and demo potential.
- Selected hledger, Actual Budget, Firefly III, tenforty, and Filed Open Tax Engine for Week 2 hands-on evaluation.
- Created `notes/day_07_shortlist_decision.md` as the Day 7 exit note.
- Identified backup candidates and replacement conditions for Beancount, OpenTaxSolver, UsTaxes, and GnuCash.

### Evidence Captured

- `research/shortlist.md`
- `notes/day_07_shortlist_decision.md`
- Prior evidence from `research/longlist.md`, `research/project_health_snapshot.md`, `research/programmatic_surface_survey.md`, and `research/exclusions.md`.

### Decisions Made

- Use hledger for the plain-text accounting slot.
- Use Actual Budget and Firefly III to compare local-first API/CLI integration against REST JSON integration.
- Use tenforty and Filed Open Tax Engine for tax-oriented coverage.
- Keep Beancount as the first plain-text backup and OpenTaxSolver as the first mature tax-form backup.

### Problems / Open Questions

- Filed Open Tax Engine needs skeptical hands-on maturity and accuracy checks.
- Firefly III setup cost may affect Week 2 timing.
- tenforty's OpenTaxSolver dependency path needs local verification.

### Tomorrow's Starting Point

Execute Day 8 by creating the synthetic dataset and evaluation checklist for the five shortlisted tools.

## 07-07-2026 - Phase 8: Evaluation Harness and Synthetic Data

### Goal

Prepare shared synthetic fixtures and a repeatable evaluation checklist for the Week 2 hands-on tool evaluations.

### What I Did

- Created `evidence/synthetic_dataset.md` as the Day 8 synthetic dataset artifact.
- Created `evidence/fixtures/synthetic_freelancer_transactions.csv` and `evidence/fixtures/synthetic_freelancer_tax_profile.json`.
- Created `research/evaluation_checklist.md` with setup, workflow, tax-coverage, failure-testing, evidence, and tool-record checklists.
- Created `notes/day_08_evaluation_harness_and_synthetic_data.md` as the Day 8 exit note.
- Defined expected totals for the baseline dataset and standard add-transaction test.

### Evidence Captured

- `evidence/synthetic_dataset.md`
- `evidence/fixtures/synthetic_freelancer_transactions.csv`
- `evidence/fixtures/synthetic_freelancer_tax_profile.json`
- `research/evaluation_checklist.md`
- `notes/day_08_evaluation_harness_and_synthetic_data.md`

### Decisions Made

- Use a 2025 single-freelancer scenario with Schedule C-style income and expenses, interest income, charitable contribution placeholders, estimated tax payments, and mileage metadata.
- Keep mileage separate from cash transactions and assign no deduction value.
- Use `TADD` as the standard add-transaction test outside the baseline CSV.
- Start Day 9 with hledger to validate the shared dataset through the fastest likely file/CLI path.

### Problems / Open Questions

- Tax hints remain evaluation labels, not authoritative tax treatment.
- Tax-oriented tools may need manual assumptions when mapping from the bookkeeping fixture to form-like inputs.
- App/API-backed tools may need account/category setup before import.

### Tomorrow's Starting Point

Execute Day 9 by evaluating hledger with the shared dataset and filling the first tool record.

## 07-08-2026 - Phase 9: Evaluate Tool 1

### Goal

Evaluate hledger as the first Week 2 hands-on tool and refine the shared evaluation method.

### What I Did

- Downloaded the official hledger `1.52.1` Windows release binary to a temporary directory.
- Captured setup and version evidence without performing a global install.
- Added hledger CSV rules, an add-transaction fixture, bad-input fixtures, and JSON export artifacts.
- Ran the shared workflow: load data, add `TADD`, list accounts, compute balance, run report, and export results.
- Ran failure tests for bad date, bad amount, unknown account/category, missing file, and duplicate transaction ID.
- Created `tool_records/tool_1.md` and the Day 9 exit note.

### Evidence Captured

- `tool_records/tool_1.md`
- `notes/day_09_evaluate_hledger.md`
- `evidence/commands/07-08-2026_hledger_setup.txt`
- `evidence/commands/07-08-2026_hledger_version.txt`
- `evidence/commands/07-08-2026_hledger_workflow.txt`
- `evidence/commands/07-08-2026_hledger_failure-tests.txt`
- hledger-specific fixtures and JSON outputs under `evidence/fixtures/`

### Decisions Made

- Keep hledger as a leading low-risk prototype candidate for a file/CLI/JSON adapter.
- Treat hledger as tax-adjacent bookkeeping, not tax-preparation or filing software.
- Validate duplicate IDs and unknown categories in any future wrapper because hledger accepts them by default.

### Problems / Open Questions

- hledger-web's JSON API remains untested locally.
- hledger JSON output is machine-readable but needs normalization for a clean prototype API.
- GPL-3.0-or-later implications should be reviewed before any redistributed wrapper or hosted service.

### Tomorrow's Starting Point

Execute Day 10 by evaluating Actual Budget with the shared synthetic dataset and comparing its local-first API/CLI behavior against hledger.

## 07-08-2026 - Phase 10: Evaluate Tool 2

### Goal

Evaluate Actual Budget as the second Week 2 hands-on tool using the shared synthetic freelancer dataset and the same workflow/failure checklist used for hledger.

### What I Did

- Installed `@actual-app/api@26.7.0` and `@actual-app/cli@26.7.0` in a temporary npm directory.
- Created `evidence/fixtures/actual_day10_evaluate.mjs` to drive the official Actual Node API against a scratch local budget.
- Loaded the 19 baseline synthetic transactions, then added standard transaction `TADD`.
- Queried accounts, categories, transactions, and account balance through the API.
- Exported normalized JSON summaries and transaction rows for comparison with hledger.
- Tested malformed date, invalid amount, unknown category, duplicate imported ID through `importTransactions` dry-run and direct `addTransactions`, and missing budget load.
- Created `tool_records/tool_2.md` and the Day 10 exit note.

### Evidence Captured

- `tool_records/tool_2.md`
- `notes/day_10_evaluate_actual.md`
- `evidence/commands/07-08-2026_actual_setup.txt`
- `evidence/commands/07-08-2026_actual_version.txt`
- `evidence/commands/07-08-2026_actual_workflow.txt`
- `evidence/commands/07-08-2026_actual_failure-tests.txt`
- `evidence/fixtures/actual_day10_evaluate.mjs`
- `evidence/fixtures/actual_day10_summary.json`
- `evidence/fixtures/actual_day10_transactions_after_add.json`

### Decisions Made

- Keep Actual Budget as a strong local-first app/API candidate and possible prototype backup.
- Treat Actual's tax relevance as manual tax-adjacent bookkeeping and reporting, not tax preparation.
- Prefer `importTransactions` when reconciliation and duplicate imported-ID behavior matters.
- Require wrapper-side validation before `addTransactions` because direct adds accepted an unknown category id and duplicate imported ID.

### Problems / Open Questions

- `runImport` logged an unauthorized cloud upload during local evaluation even though the local budget worked.
- Bad-date errors are correct but verbose; a wrapper should normalize them.
- Category paths need wrapper-side reconstruction because Actual stores category groups and leaf names separately.
- Actual has no native Form 1040, schedules, PDF tax form, MeF, or e-file workflow.

### Tomorrow's Starting Point

Execute Day 11 by evaluating Firefly III as the REST/API-backed personal-finance comparator.

## 07-08-2026 - Phase 11: Evaluate Tool 3

### Goal

Evaluate Firefly III as the third Week 2 hands-on tool and the REST/API-backed personal-finance comparator.

### What I Did

- Started Docker Desktop and ran isolated local `fireflyiii/core:version-6.6.6` plus `mariadb:lts` containers.
- Created a synthetic local Firefly user, Passport personal-access client, and short-lived API tokens without storing tokens in the repository.
- Added `evidence/fixtures/firefly_day11_evaluate.mjs` to drive the Firefly REST API with the shared synthetic freelancer dataset.
- Modeled `T000` as the Firefly account opening balance, created 12 categories, and posted the 18 non-opening baseline rows through `/api/v1/transactions`.
- Added standard transaction `TADD`, queried account balance and insight endpoints, and exported normalized JSON.
- Ran failure tests for malformed date, invalid amount, unknown category, duplicate transaction, and missing input file.
- Created `tool_records/tool_3.md` and the Day 11 exit note.

### Evidence Captured

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

### Decisions Made

- Keep Firefly III as the strongest REST-first bookkeeping/API comparator.
- Treat Firefly's tax relevance as manual tax-adjacent bookkeeping and reporting, not tax calculation or filing.
- Require wrapper-side allowlists for controlled tax categories because Firefly can auto-create unknown categories.
- Consider Firefly for a REST-focused prototype, but keep hledger as the lower-friction local/file adapter candidate.

### Problems / Open Questions

- Docker/auth setup is heavier than hledger and Actual Budget.
- The first app run failed until `APP_KEY` was corrected to exactly 32 characters.
- No REST transaction dry-run path was found.
- Firefly has no native Form 1040, schedules, PDF tax form, MeF, or e-file workflow.
- AGPL-3.0 implications need review before redistributed or hosted wrapper work.

### Tomorrow's Starting Point

Execute Day 12 by evaluating a fourth shortlisted tool or backup candidate, preferably a tax-specific candidate such as `tenforty` to balance the three bookkeeping/API evaluations.

## 07-08-2026 - Phase 12: Evaluate Tool 4

### Goal

Evaluate tenforty as the fourth Week 2 hands-on tool and the first direct tax-calculation library candidate.

### What I Did

- Verified current tenforty source/package docs and installed `tenforty==2025.10`.
- Attempted native Windows setup in an isolated Python `3.14.5` venv; install failed while building the native extension and reported missing Microsoft C++ Build Tools.
- Started Docker Desktop and completed the evaluation in a disposable `python:3.12-slim` Linux container.
- Added `evidence/fixtures/tenforty_day12_evaluate.py` to map the shared synthetic tax profile into tenforty calls.
- Mapped Schedule C net before mileage to the runtime `self_employment_income` argument, and mapped interest income to `taxable_interest`.
- Re-ran the profile after the standard `TADD` software expense by reducing Schedule C net income from `9107.02` to `9082.03`.
- Exported normalized JSON summaries, a scenario grid, and failure-test results.
- Created `tool_records/tool_4.md` and the Day 12 exit note.

### Evidence Captured

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

### Decisions Made

- Keep tenforty as the leading tax-calculation component candidate, not a standalone bookkeeping or filing target.
- Treat the best prototype idea as a two-stage flow: controlled bookkeeping summaries from hledger/Actual/Firefly, then tenforty tax calculations.
- Keep estimated payments, mileage, and charity-under-standard-deduction as explicit unmapped facts unless a later wrapper defines policy.
- Require wrapper-side domain validation and output sanity checks before exposing tenforty results to users.

### Problems / Open Questions

- Native Windows remains a blocker unless using WSL/Docker/Colab or resolving build/runtime issues.
- The visible README argument table omits the runtime `self_employment_income` argument that best matches the synthetic Schedule C net input.
- `federal_effective_tax_rate` appeared inconsistent in SE-tax-only cases; the wrapper recomputation from federal total tax over AGI was about `15.0652%`, while tenforty returned `128678000000000.0`.
- Negative self-employment income was accepted and produced negative AGI, so wrapper validation is needed.
- tenforty does not model transaction import, estimated payments/refunds, PDF forms, or e-file submission.

### Tomorrow's Starting Point

Execute Day 13 by evaluating Filed Open Tax Engine as the fifth tax-specific CLI/JSON candidate, or by closing gaps across the four complete records if the comparison already has enough variety.

## 07-08-2026 - Phase 13: Evaluate Tool 5

### Goal

Evaluate Filed Open Tax Engine as the fifth shortlisted tool and the form-level CLI/JSON tax-engine candidate.

### What I Did

- Downloaded the official `v2.0.2` Windows x64 binary into `%TEMP%` and verified its SHA-256 hash.
- Captured CLI help, version, node list, node schema inspection, and Schedule C dependency graph evidence.
- Added `evidence/fixtures/filed_opentax_day13_evaluate.mjs` to run the CLI from an isolated temp working directory.
- Mapped the synthetic freelancer profile to `general`, `f1099int`, `f1040es`, and `schedule_c` form entries.
- Modeled `TADD` as an added Schedule C Part V software expense in a second return.
- Captured baseline, after-add, forced Schedule A charity, validation, MeF export, and failure-test outputs.
- Created `tool_records/tool_5.md` and the Day 13 exit note.

### Evidence Captured

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

### Decisions Made

- Keep Filed Open Tax Engine as the strongest form-level tax-engine candidate but preserve a maturity warning.
- Treat successful `return get` calculation separately from validation-clean or file-ready status.
- Require wrapper-side checks for supported years, date formats, duplicate source forms, local state directory isolation, and validation/export gating.
- Carry AGPL/commercial license implications into prototype target selection.

### Problems / Open Questions

- Validation/export reported many reject-level rules that looked unrelated to the synthetic return.
- A malformed date string was accepted for `taxpayer_dob`.
- Duplicate 1099-INT entries were accepted and double-counted.
- The baseline emitted an `f2441` executor warning even without dependent-care inputs.
- CLI JSON arguments need shell-safe invocation; PowerShell inline JSON was fragile.

### Tomorrow's Starting Point

Execute Day 14 by building a comparison matrix across all five evaluated tools and choosing the Week 3 prototype target plus backup.

## 07-08-2026 - Phase 14: Prototype Target Selection

### Goal

Build the Week 2 comparison matrix and choose the Week 3 prototype target and backup target.

### What I Did

- Reviewed all five completed tool records.
- Compared hledger, Actual Budget, Firefly III, tenforty, and Filed Open Tax Engine across prototype value, feasibility, safety, and demo clarity.
- Created `research/comparison_matrix.md`.
- Created `research/prototype_target_decision.md`.
- Created `notes/day_14_prototype_target_selection.md`.
- Updated the README repository status.

### Evidence Captured

- `research/comparison_matrix.md`
- `research/prototype_target_decision.md`
- `notes/day_14_prototype_target_selection.md`
- Week 2 tool records under `tool_records/`

### Decisions Made

- Select hledger as the primary Week 3 prototype target.
- Select Actual Budget as the backup target.
- Frame the prototype as a safe bookkeeping-to-tax-summary adapter, not a tax-preparation or filing product.
- Defer tenforty to a possible future tax-calculation component and Filed Open Tax Engine to form-level research/future extension status.
- Keep Firefly III as the report's strongest REST-first comparator rather than the prototype target.

### Problems / Open Questions

- Day 15 needs to decide whether hledger rules are static fixtures, generated from mapping config, or both.
- The prototype needs a clean hledger binary discovery/setup story.
- GPL obligations should be described before distributing or packaging the adapter.

### Tomorrow's Starting Point

Execute Day 15 by creating `prototype/design.md`, defining the hledger adapter schema and guardrails, and updating the prototype README outline.

## 07-11-2026 - Phase 15: Prototype Design

### Goal

Design the smallest useful hledger integration, freeze its input/output and safety contracts, and make the Week 3 build scope concrete.

### What I Did

- Reviewed the Day 14 decision and Day 9 hledger workflow, JSON, and failure evidence.
- Created `prototype/design.md` with the architecture, CLI, schemas, validation, hledger boundary, normalized output, error taxonomy, safety defaults, tests, and phase handoff.
- Replaced the prototype placeholder README with a design-stage README draft.
- Selected a Python 3.11+ standard-library CLI and a stateless, read-only subprocess model.
- Chose one committed static hledger rules file plus a separate versioned JSON category map.
- Defined optional synthetic context ingestion for mileage without using profile totals or calculating a deduction.
- Defined exact reconciliation and acceptance totals for the baseline and `TADD` scenarios.

### Evidence Captured

- `prototype/design.md`
- `prototype/README.md`
- `notes/day_15_prototype_design.md`
- `research/prototype_target_decision.md`
- `tool_records/tool_1.md`
- Day 9 hledger command and JSON evidence under `evidence/`

### Decisions Made

- Keep the selected local hledger CLI/JSON shape; do not add REST, hledger-web, or a generic multi-backend abstraction.
- Use strict wrapper preflight because hledger accepted unknown categories and duplicate IDs.
- Use the category map, not free-text tax hints, to select controlled bookkeeping buckets.
- Use reconciled hledger JSON as the financial source; never copy expected totals from the profile into results.
- Keep exact money as decimal strings and decode hledger mantissa/scale rather than binary floats.
- Preserve mileage only as an unmapped, unpriced fact.
- Use fresh scratch copies, argument-array subprocesses, path redaction, atomic new-file output, and no input mutation.
- Discover hledger by explicit flag, `HLEDGER_BIN`, then `PATH`; do not download or bundle it.
- Keep the prototype explicitly outside tax calculation, advice, forms, refunds, validation, and filing.

### Problems / Open Questions

- The workspace does not currently expose hledger on `PATH`, so Day 16 must establish an explicit safe run path for the smoke call.
- Only hledger 1.52.1 has been tested.
- The tested rules do not map the source `cleared` field into hledger.
- Synthetic-only use cannot be proven automatically; the design uses documented fixtures and a required custom-run acknowledgement.
- GPL implications need review before any future binary bundling or combined distribution.

### Tomorrow's Starting Point

Execute Day 16 by scaffolding the Python adapter, committing the category map and static rules, implementing configuration/fixture loading and hledger discovery/version capture, and adding a fixed-fixture read-only smoke call. The polished demo remains a later Week 3 slice.

## 07-13-2026 - Phase 16: Adapter Skeleton

### Goal

Create the first working adapter layer around the selected hledger target, with committed configuration, CLI help, fixture loading, binary discovery/version capture, and a real read-only smoke call.

### What I Did

- Added a Python 3.11+ standard-library package under `prototype/hledger_adapter/`.
- Added `prototype/pyproject.toml`, `prototype/.gitignore`, `prototype/config/category_map.json`, and `prototype/config/hledger.csv.rules`.
- Implemented structured errors and exit paths for validation, hledger discovery, hledger execution, and internal failures.
- Implemented `validate`, `smoke`, `demo`, and `summarize --dry-run`.
- Loaded and validated the committed category map, canonical 19-row transaction CSV, and optional synthetic tax-profile context.
- Implemented hledger discovery by explicit `--hledger-bin`, `HLEDGER_BIN`, then `PATH`.
- Probed hledger with `--version` using the same isolation flags planned for report commands.
- Ran a read-only hledger `print -O json` smoke call through scratch copies of the CSV and rules file.

### Evidence Captured

- `prototype/hledger_adapter/`
- `prototype/config/category_map.json`
- `prototype/config/hledger.csv.rules`
- `prototype/pyproject.toml`
- `prototype/.gitignore`
- `notes/day_16_adapter_skeleton.md`
- `evidence/commands/07-13-2026_hledger-adapter_day16_smoke.txt`

### Verification

- `python -m hledger_adapter --help`
- `python -m compileall hledger_adapter`
- `python -m hledger_adapter validate --transactions ../evidence/fixtures/synthetic_freelancer_transactions.csv --context ../evidence/fixtures/synthetic_freelancer_tax_profile.json --confirm-synthetic`
- `python -m hledger_adapter summarize --transactions ../evidence/fixtures/synthetic_freelancer_transactions.csv --context ../evidence/fixtures/synthetic_freelancer_tax_profile.json --hledger-bin <explicit hledger 1.52.1 path> --dry-run --confirm-synthetic`
- `python -m hledger_adapter demo --hledger-bin <explicit hledger 1.52.1 path>`

The smoke call detected `hledger 1.52.1-g3834a163b-20260428, windows-x86_64`, matched the tested `1.52.1` baseline, and returned 19 transactions with 38 postings.

### Decisions Made

- Keep `smoke` as an explicit Day 16 backend-proof command while full `summarize` remains a later normalized-output command.
- Keep the demo pinned to repository synthetic fixtures so it does not require `--confirm-synthetic`.
- Require `--confirm-synthetic` for custom validate/smoke/summarize inputs.
- Do not scan temporary directories for hledger; the Day 9 executable was used only as an explicit `--hledger-bin` value for verification.
- Keep default scratch ephemeral and ignore only `prototype/.scratch/` for explicit kept runs.

### Problems / Open Questions

- hledger is still not generally available on `PATH`; the smoke proof used the retained Day 9 executable path explicitly.
- The Day 16 smoke verifies hledger invocation and JSON shape only. It does not yet normalize postings, check every amount invariant, or calculate summary totals.
- Only hledger 1.52.1 has been verified hands-on.

### Tomorrow's Starting Point

Execute Day 17 by converting hledger `print -O json` into normalized transaction/account structures, reconciling every source row to balanced USD postings, and proving the initial account-loading/checking-balance invariants.

## 07-13-2026 - Phase 17: Transaction and Account Reconciliation

### Goal

Implement the first half of the demo workflow above backend invocation: account loading, transaction normalization, multi-file transaction import, input preflight, and structured output.

### What I Did

- Extended the validated CSV model to retain structured source transaction records after preflight.
- Added a hledger report runner that executes `print -O json` and `balance --flat -O json` through copied scratch inputs and committed rules.
- Added `prototype/hledger_adapter/normalize.py` to decode hledger decimal mantissa/scale amounts, normalize transactions/accounts, and enforce reconciliation invariants.
- Updated `demo` and `smoke` to emit normalized transactions, account balances, counts, engine report metadata, and reconciliation status.
- Verified the baseline fixture and the baseline plus `TADD` multi-file scenario.

### Evidence Captured

- `prototype/hledger_adapter/models.py`
- `prototype/hledger_adapter/validation.py`
- `prototype/hledger_adapter/hledger.py`
- `prototype/hledger_adapter/normalize.py`
- `prototype/hledger_adapter/cli.py`
- `notes/day_17_transaction_account_reconciliation.md`
- `evidence/commands/07-13-2026_hledger-adapter_day17_reconciliation.txt`

### Verification

- `python -m compileall hledger_adapter`
- `python -m hledger_adapter --help`
- `python -m hledger_adapter demo --hledger-bin <explicit hledger 1.52.1 path>`
- `python -m hledger_adapter smoke --transactions ../evidence/fixtures/synthetic_freelancer_transactions.csv --transactions ../evidence/fixtures/hledger_synthetic_freelancer_tadd.csv --context ../evidence/fixtures/synthetic_freelancer_tax_profile.json --hledger-bin <explicit hledger 1.52.1 path> --confirm-synthetic`
- `python -m hledger_adapter summarize --transactions ../evidence/fixtures/synthetic_freelancer_transactions.csv --context ../evidence/fixtures/synthetic_freelancer_tax_profile.json --hledger-bin <explicit hledger 1.52.1 path> --dry-run --confirm-synthetic`

The baseline run returned 19 transactions, 38 postings, 14 accounts, checking balance `8964.77`, and passed reconciliation. The `TADD` run returned 20 transactions, 40 postings, 14 accounts, checking balance `8939.78`, software balance `263.99`, and passed reconciliation.

### Decisions Made

- Keep Day 17 output focused on normalized transactions and accounts; summary totals remain Day 18.
- Use hledger amount `decimalMantissa` and `decimalPlaces`, not `floatingPoint`, for every decoded amount.
- Validate hledger output shape and accounting invariants before emitting normalized transaction/account data.
- Treat hledger `balance --flat -O json` as the account-loading source for this phase.
- Keep raw hledger JSON out of canonical output and only retain it when `--keep-scratch` is explicit.

### Problems / Open Questions

- hledger is still not installed on `PATH`; verification still uses the explicit retained Day 9 executable.
- The income-statement report and Schedule C-style/tax-adjacent summaries are not implemented yet.
- More failure fixtures should be automated during Day 19 rather than kept as manual checks.

### Tomorrow's Starting Point

Execute Day 18 by deriving balances and report summaries from reconciled postings, adding the income-statement cross-check, and emitting the controlled Schedule C-style and tax-adjacent sections.

## 07-13-2026 - Phase 18: Balance and Report Summary

### Goal

Implement the second half of the prototype workflow: balance/report summaries, hledger income-statement cross-checks, Schedule C-style bookkeeping buckets, and tax-adjacent facts.

### What I Did

- Extended the hledger runner to execute `incomestatement --depth 3 -O json` in the same scratch directory as `print -O json` and `balance --flat -O json`.
- Added `prototype/hledger_adapter/summary.py` for controlled bucket aggregation over reconciled normalized output.
- Cross-checked mapped revenue and expense buckets against hledger's income-statement JSON.
- Implemented executed `summarize` output and upgraded `demo` to the canonical fixed-fixture end-to-end summary.
- Preserved `smoke` as transaction/account reconciliation without the summary section.
- Added summary warnings, unsupported capability labels, unmapped mileage/charity/payment facts, and provenance.
- Updated README status, the prototype README, the changelog, the Day 18 note, and command evidence.

### Evidence Captured

- `prototype/hledger_adapter/models.py`
- `prototype/hledger_adapter/hledger.py`
- `prototype/hledger_adapter/summary.py`
- `prototype/hledger_adapter/cli.py`
- `prototype/README.md`
- `notes/day_18_balance_report_summary.md`
- `evidence/commands/07-13-2026_hledger-adapter_day18_summary.txt`

### Verification

- `python -m compileall hledger_adapter`
- `python -m hledger_adapter demo --hledger-bin <explicit hledger 1.52.1 path>`
- `python -m hledger_adapter summarize --transactions ../evidence/fixtures/synthetic_freelancer_transactions.csv --transactions ../evidence/fixtures/hledger_synthetic_freelancer_tadd.csv --context ../evidence/fixtures/synthetic_freelancer_tax_profile.json --hledger-bin <explicit hledger 1.52.1 path> --confirm-synthetic`
- `python -m hledger_adapter summarize --transactions ../evidence/fixtures/synthetic_freelancer_transactions.csv --context ../evidence/fixtures/synthetic_freelancer_tax_profile.json --hledger-bin <explicit hledger 1.52.1 path> --dry-run --confirm-synthetic`
- `python -m hledger_adapter smoke --hledger-bin <explicit hledger 1.52.1 path>`
- `python -m hledger_adapter summarize --transactions ../evidence/fixtures/synthetic_freelancer_transactions.csv --hledger-bin <explicit hledger 1.52.1 path> --confirm-synthetic`
- `python -m hledger_adapter --help`
- `Test-Path .scratch`

Baseline result: 19 transactions, 38 postings, 14 accounts, opening balance `1200.00`, checking balance `8964.77`, bookkeeping revenue `10327.75`, bookkeeping expenses `1512.98`, bookkeeping net `8814.77`, Schedule C-style gross receipts `10250.00`, Schedule C-style cash expenses `1142.98`, Schedule C-style net before mileage `9107.02`, interest `77.75`, charity `370.00`, estimated payments `1050.00`, and mileage `78.2`.

Baseline plus `TADD`: 20 transactions, 40 postings, checking balance `8939.78`, software cash expenses `263.99`, Schedule C-style cash expenses `1167.97`, and Schedule C-style net before mileage `9082.03`.

### Decisions Made

- Use hledger's income statement only as a bookkeeping cross-check; do not substitute it for the Schedule C-style result.
- Summarize only controlled category-map buckets and keep labels non-authoritative.
- Preserve mileage quantity without choosing a rate or calculating a deduction.
- Leave Markdown/file-output behavior for later phases.

### Problems / Open Questions

- hledger is still not installed on `PATH`; verification still uses the explicit retained Day 9 executable.
- Day 19 should turn manual failure checks into stable failure behavior and scripted/tested cases.
- The summary layer did not need to parse human-formatted hledger text because the needed report is available as JSON.

### Tomorrow's Starting Point

Execute Day 19 by adding stable failure checks for malformed dates, invalid amounts, unknown categories/accounts, duplicate IDs, missing files, context failures, missing hledger, and dry-run option conflicts.

## 07-13-2026 - Phase 19: Safety and Failure Handling

### Goal

Make the prototype honest and safe by proving clear structured failure behavior for expected bad inputs, policy failures, dry-run conflicts, context failures, and hledger discovery failures.

### What I Did

- Added `prototype/tests/run_failure_matrix.py`, a standard-library subprocess matrix that runs from `prototype/`.
- Reused existing committed bad CSV fixtures for malformed date, invalid amount, unknown category, and duplicate transaction ID checks.
- Generated temporary fixtures for unknown source account, tax-hint mismatch, wrong sign, context dataset mismatch, and negative mileage.
- Added cases for missing synthetic acknowledgement, missing transaction file, dry-run plus kept scratch, missing hledger, and unusable explicit hledger candidate.
- Confirmed preflight failures use `summarize --dry-run` where possible and stop before hledger report execution.
- Confirmed the failure matrix leaves scratch state unchanged.
- Updated `prototype/README.md`, `prototype/design.md`, the day-by-day plan, root README, changelog, Day 19 note, and command evidence.
- Updated Day 20 scope to include a Vercel-ready project execution lab with a generated read-only artifact manifest covering changelog, notes, evidence, prototype, report/deck state, research, tool records, and README files.

### Evidence Captured

- `prototype/tests/run_failure_matrix.py`
- `prototype/README.md`
- `prototype/design.md`
- `day_by_day_ai_tax_tooling_phases.md`
- `notes/day_19_safety_failure_handling.md`
- `evidence/commands/07-13-2026_hledger-adapter_day19_failures.txt`

### Verification

- `python tests/run_failure_matrix.py`
- `python -m compileall hledger_adapter tests`

The matrix reported 15 cases, 15 passed, 0 failed, and `scratch_unchanged: true`.

Verified error codes: `SYNTHETIC_CONFIRMATION_REQUIRED`, `INPUT_DATE_INVALID`, `INPUT_AMOUNT_INVALID`, `INPUT_CATEGORY_UNKNOWN`, `INPUT_ACCOUNT_UNKNOWN`, `INPUT_ID_DUPLICATE`, `INPUT_NOT_FOUND`, `INPUT_TAX_HINT_MISMATCH`, `INPUT_SIGN_INVALID`, `CONTEXT_INVALID`, `DRY_RUN_OPTION_CONFLICT`, `HLEDGER_NOT_FOUND`, and `HLEDGER_UNUSABLE`.

### Decisions Made

- Keep Day 19 focused on stable safety/failure behavior rather than UI implementation.
- Move the requested live project execution lab into Day 20 demo packaging, where it naturally belongs.
- Plan the execution lab as a Vercel-ready read-only app backed by a generated project manifest, so it can show repository artifacts without leaking host paths or secrets.
- Leave hledger timeout and corrupted-engine-output simulation for later hardening if time remains.

### Problems / Open Questions

- The failure matrix does not yet simulate backend timeouts, malformed hledger JSON, or reconciliation mutations.
- Day 20 needs to choose the lightest frontend stack that fits the repository and Vercel target.
- The execution lab should display live/local workflow status during development while staying static or serverless-friendly for Vercel.

### Tomorrow's Starting Point

Execute Day 20 by adding demo packaging and a Vercel-ready project execution lab scaffold for the full project trail.

## 07-13-2026 - Phase 20 UI Scope Refinement

### Goal

Make the Day 20 UI requirement specific enough to build: a functioning project execution lab, not a regular dashboard.

### What I Did

- Added `prototype/day20_project_lab_ui_brief.md`.
- Updated the day-by-day plan to require local live execution, Vercel verified replay, command-to-result progression, `about`/`why` manifests, artifact categories, evidence traceability, and Git contribution guidance.
- Updated `prototype/design.md`, `prototype/README.md`, root `README.md`, and `CHANGELOG.md` with the refined Day 20 scope.

### Decisions Made

- The Day 20 app should open on the synthetic prototype workflow, not on a generic landing page.
- Local development should support a real run of the pinned synthetic demo and failure matrix from the UI.
- Vercel deployment should use verified replay from committed command evidence when hledger cannot execute in the deployed environment.
- The manifest should include both artifact inventory and rationale: what each major artifact is for and why it matters.
- The UI should include a Git contribution path so future reviewers or collaborators can see how to branch, run checks, commit, push, and review.
- Copy should stay tied to this project and avoid generic filler or prompt-related wording.

### Evidence Captured

- `prototype/day20_project_lab_ui_brief.md`
- `day_by_day_ai_tax_tooling_phases.md`
- `prototype/design.md`
- `prototype/README.md`
- `README.md`
- `CHANGELOG.md`

### Tomorrow's Starting Point

Execute Day 20 by building the project execution lab UI and manifest generator.

## 07-14-2026 - Phase 20: Demo Packaging and Project Execution Lab UI

### Goal

Make the prototype runnable and inspectable through a one-command demo package and a Vercel-ready project execution lab.

### What I Did

- Added `prototype/run_day20_demo.py` to run the canonical synthetic adapter demo and safety failure matrix as one JSON-emitting workflow.
- Added the Next.js app in `prototype/execution_lab/`.
- Added generated manifests at `prototype/execution_lab/data/project-manifest.json` and `prototype/execution_lab/public/project-manifest.json`.
- Built the lab UI around run/replay controls, execution steps, result totals, safety matrix status, evidence links, artifact groups, unsupported capabilities, and Git contribution guidance.
- Added `/api/run` for local live execution and Vercel-safe replay behavior.
- Updated README, prototype README, prototype design, changelog, and the Day 20 exit note.

### Evidence Captured

- `prototype/run_day20_demo.py`
- `prototype/execution_lab/`
- `notes/day_20_demo_packaging_execution_lab.md`

### Verification

- `python -m compileall hledger_adapter tests run_day20_demo.py`
- `python tests/run_failure_matrix.py`
- `python run_day20_demo.py --json`
- `npm run build` from `prototype/execution_lab/`
- `http://localhost:3000` returned HTTP 200.
- `http://localhost:3000/project-manifest.json` returned HTTP 200.
- `POST http://localhost:3000/api/run` returned HTTP 200; the adapter demo reported `HLEDGER_NOT_FOUND` because hledger is not configured locally, while the failure matrix passed.

### Decisions Made

- Keep hledger as a local prerequisite and make verified replay the deployed review path.
- Keep the execution lab self-contained under `prototype/execution_lab/`.
- Pin TypeScript to `5.9.3` for a stable Next build.

### Problems / Open Questions

- Live hledger execution still requires a configured hledger binary.
- npm reports two moderate advisories; no forced audit fix was applied.

### Tomorrow's Starting Point

Execute Day 21 by reviewing the prototype package from a clean state and writing the prototype retrospective.

## 07-14-2026 - Phase 21: Prototype Review and Freeze

### Goal

Freeze the hledger prototype for report writing, fix blocker-level execution-lab layout gaps, and capture the implementation lessons.

### What I Did

- Reviewed the packaged demo entrypoints and kept the documented hledger setup boundary visible.
- Refined the execution lab homepage around live testing: synthetic input table, command interface, enlarged phase lifecycle, output table, and failure-matrix result.
- Moved project scope, evidence, artifacts, changelog, and contribution guidance into separate tabs.
- Added `prototype/retrospective.md`.
- Updated `research/comparison_matrix.md` with Day 21 implementation lessons.
- Updated README, prototype README, prototype design, and changelog for the frozen state.

### Evidence Captured

- `prototype/retrospective.md`
- `prototype/execution_lab/app/lab-client.tsx`
- `prototype/execution_lab/app/globals.css`
- `prototype/execution_lab/scripts/generate-manifest.mjs`
- `research/comparison_matrix.md`

### Verification

- `python -m compileall hledger_adapter tests run_day20_demo.py`
- `python tests/run_failure_matrix.py`
- `python run_day20_demo.py --json`
- `npm run build` from `prototype/execution_lab/`

The current machine still lacks hledger, so the packaged live demo reports `HLEDGER_NOT_FOUND` for the adapter command while the safety failure matrix passes.

### Decision Made

Freeze the prototype feature set for report writing. Optional Markdown output is deferred because the JSON contract and execution lab already carry the strongest integration evidence.

### Next Starting Point

Use the frozen prototype, comparison lessons, and retrospective to draft the final report and deck.

## 07-15-2026 - Phase 22: Report Structure and Prototype UI Refinement

### Goal

Execute the Day 22 report-structure phase early and make the prototype execution lab easier to inspect from the lifecycle.

### What I Did

- Added `report/outline.md` with the final report skeleton and missing-evidence checklist.
- Added `notes/day_22_report_structure.md`.
- Pulled structured findings from the five tool records, comparison matrix, prototype decision, retrospective, and internship brief alignment into the report outline.
- Updated the execution lab lifecycle so each phase opens a popup with the phase command, command output, status, key outputs, and evidence links.
- Added a prototype architecture tab backed by the generated manifest.
- Updated app metadata and copy so the UI aligns with the internship repo/report framing rather than older Day 20-only wording.

### Evidence Captured

- `report/outline.md`
- `notes/day_22_report_structure.md`
- `prototype/execution_lab/app/lab-client.tsx`
- `prototype/execution_lab/app/globals.css`
- `prototype/execution_lab/scripts/generate-manifest.mjs`
- `prototype/execution_lab/app/types.ts`

### Verification

- `npm run generate:manifest` from `prototype/execution_lab/` passed.
- `python -m compileall hledger_adapter tests run_day20_demo.py` passed.
- `python tests/run_failure_matrix.py` passed 15/15 cases and kept scratch unchanged.
- `npm run build` from `prototype/execution_lab/` passed.
- `python run_day20_demo.py --json` returned the documented local boundary: the adapter command reported `HLEDGER_NOT_FOUND` because hledger is not configured on this machine, while the safety failure matrix passed.
- Local dev server HTTP checks for `/` and `/project-manifest.json` on `http://127.0.0.1:3005` returned 200; the manifest reported 11 lifecycle phases and 4 architecture layers.
- Browser-level click verification was not available in this session because no controllable browser backend was exposed.

### Decisions Made

- Keep the UI minimalist by replacing the visible contribution tab with an architecture tab, while leaving contribution metadata available in the manifest.
- Treat final public release/project-health claims as point-in-time and refreshable before publication.

### Problems / Open Questions

- The local environment still lacks hledger on `PATH`; live hledger execution remains a documented setup boundary.

### Next Starting Point

Draft the report introduction, method, and landscape sections from `report/outline.md`.

## 07-16-2026 - Phase 23: Landscape and Method Draft

### Goal

Draft the opening half of the written report: research question, motivation, evaluation method, open-source landscape, and shortlist rationale.

### What I Did

- Added `report/opening_sections_draft.md` with prose for the introduction, method, and landscape sections.
- Framed the report around the missing bridge between bookkeeping systems, tax calculation tools, form-level engines, and filing-adjacent artifacts.
- Described the evidence-first method and shared evaluation rubric.
- Summarized the synthetic-data workflow and failure-testing method.
- Organized the landscape into import infrastructure, plain-text accounting, personal-finance apps, tax calculation/policy models, form-level tax engines, and filing/submission reference points.
- Updated `README.md`, `report/README.md`, and `report/outline.md` to reference the Day 23 draft.
- Added the Day 23 exit note at `notes/day_23_landscape_and_method_draft.md`.

### Evidence Captured

- `report/opening_sections_draft.md`
- `notes/day_23_landscape_and_method_draft.md`
- `report/outline.md`
- `report/README.md`
- `README.md`

### Decisions Made

- Keep the Day 23 draft in a separate file instead of replacing the outline.
- Avoid claiming public release/project-health metadata was refreshed during this phase.
- Preserve the central recommendation frame: a validated bookkeeping fact layer is the near-term integration win.

### Problems / Open Questions

- Public metadata should be refreshed before final publication if the report uses latest/current wording.
- The final report still needs a decision about which tables stay in the body versus appendix.
- Mentor or reviewer feedback may adjust the opening framing.

### Tomorrow's Starting Point

Execute Day 24 by drafting the per-tool findings from the five completed tool records.

## 07-16-2026 - Phase 24: Tool Evaluation Draft

### Goal

Draft the per-tool report findings for the five hands-on evaluated tools.

### What I Did

- Added `report/tool_evaluations_draft.md`.
- Drafted sections for hledger, Actual Budget, Firefly III, tenforty, and Filed Open Tax Engine.
- Covered each tool's role, programmatic surface, synthetic workflow result, safety/failure behavior, health/licensing posture, and integration fit.
- Kept the comparison argument mostly out of this draft so Day 25 can focus on recommendations.
- Added `notes/day_24_tool_evaluation_draft.md`.
- Updated `README.md`, `report/README.md`, and `report/outline.md`.

### Evidence Captured

- `report/tool_evaluations_draft.md`
- `notes/day_24_tool_evaluation_draft.md`
- `report/outline.md`
- `report/README.md`
- `README.md`

### Decisions Made

- Treat hledger as the primary bookkeeping-to-summary prototype finding.
- Treat Actual Budget as the local app/API backup finding.
- Treat Firefly III as the REST-first comparator finding.
- Treat tenforty as the tax-calculation component finding.
- Treat Filed Open Tax Engine as the high-upside but cautious form-level finding.

### Problems / Open Questions

- Day 25 still needs explicit recommendations by use case.
- Final publication still needs a public metadata refresh if current/latest wording remains.
- License analysis remains a final-report caveat, especially for GPL, AGPL, and dual commercial licensing.

### Tomorrow's Starting Point

Execute Day 25 by drafting cross-tool comparison and recommendation prose from `research/comparison_matrix.md`, `report/opening_sections_draft.md`, and `report/tool_evaluations_draft.md`.

## 07-16-2026 - Phase 25: Comparison and Recommendation Draft

### Goal

Turn the evaluated-tool findings into a clear comparison and recommendation.

### What I Did

- Added `report/comparison_recommendation_draft.md`.
- Built a final comparison table for hledger, Actual Budget, Firefly III, tenforty, and Filed Open Tax Engine.
- Drafted capability, safety, and licensing/deployment comparisons.
- Separated recommendations by use case: transparent bookkeeping, local app/API integration, REST API integration, tax-liability scenarios, tax-form experimentation, and production filing/live automation.
- Explained why hledger was chosen as the prototype target.
- Added `notes/day_25_comparison_and_recommendation_draft.md`.
- Updated `README.md`, `report/README.md`, and `report/outline.md`.

### Evidence Captured

- `report/comparison_recommendation_draft.md`
- `notes/day_25_comparison_and_recommendation_draft.md`
- `report/outline.md`
- `report/README.md`
- `README.md`

### Decisions Made

- Recommend a layered architecture rather than a single universal winner.
- Use hledger as the prototype-backed transparent bookkeeping fact layer.
- Keep Actual Budget as the local app/API alternative.
- Keep Firefly III as the REST API comparator.
- Keep tenforty as the downstream tax-liability component.
- Keep Filed Open Tax Engine as high-upside but cautious form-level experimentation.
- Avoid production filing, live taxpayer data, GUI scraping, and forced export claims.

### Problems / Open Questions

- Day 26 still needs the prototype writeup.
- Final report revision still needs metadata refresh, citation cleanup, and table-density decisions.
- License wording still needs a careful final pass.

### Tomorrow's Starting Point

Execute Day 26 by drafting the prototype section from the frozen hledger adapter and execution lab evidence.

## 07-16-2026 - Phase 26: Prototype Writeup

### Goal

Draft the prototype section of the report and make sure it matches the frozen prototype behavior.

### What I Did

- Added `report/prototype_writeup_draft.md`.
- Covered the hledger adapter architecture, demo workflow, setup summary, sample output, safety choices, limitations, and proof statement.
- Ran the packaged demo with `python run_day20_demo.py --json`.
- Updated `README.md`, `report/README.md`, `report/outline.md`, and `prototype/README.md`.
- Added `notes/day_26_prototype_writeup.md`.

### Evidence Captured

- `report/prototype_writeup_draft.md`
- `notes/day_26_prototype_writeup.md`
- `report/outline.md`
- `report/README.md`
- `prototype/README.md`
- `README.md`

### Decisions Made

- Treat the execution lab as a reviewer surface, not a production service.
- Keep the report wording centered on validated bookkeeping-to-summary infrastructure.
- Keep JSON as the canonical output contract and leave optional Markdown deferred.
- Use the Day 26 live run as the sample-output evidence for the prototype section.

### Verification

- `python run_day20_demo.py --json` passed locally.
- Live output reported 19 transactions, 38 postings, 14 accounts, checking balance `8964.77`, Schedule C-style net before mileage `9107.02`, hledger `1.52.1`, reconciliation `passed`, and 15/15 failure-matrix cases passed.
- `git diff --check`
- Non-ASCII scan over the new and updated Markdown files.

### Problems / Open Questions

- Day 27 still needs full report revision and consolidation.
- Final report publication still needs public metadata refresh if current/latest language remains.
- Final screenshots or execution-lab figures remain optional.

### Tomorrow's Starting Point

Execute Day 27 by consolidating the report drafts, tightening prose, checking citations/evidence links, removing unsupported claims, and deciding table placement.

## 07-16-2026 - Phase 27: Report Revision

### Goal

Create a mentor-reviewable full report draft from the existing section drafts.

### What I Did

- Added `report/full_report_draft.md`.
- Consolidated the Day 23 opening draft, Day 24 tool evaluation draft, Day 25 comparison/recommendation draft, and Day 26 prototype writeup.
- Added executive summary, limitations, future work, evidence index, and publication checklist sections.
- Standardized tool names, recommendation roles, and scope limitations.
- Kept public release/project-health claims framed as point-in-time evidence pending final refresh.
- Added `notes/day_27_report_revision.md`.
- Updated `README.md`, `report/README.md`, and `report/outline.md`.

### Evidence Captured

- `report/full_report_draft.md`
- `notes/day_27_report_revision.md`
- `report/outline.md`
- `report/README.md`
- `README.md`

### Decisions Made

- Use `report/full_report_draft.md` as the main mentor-review entrypoint.
- Keep the earlier section drafts as supporting artifacts instead of deleting or replacing them.
- Preserve the conservative architecture recommendation: validated bookkeeping fact layer first, tax calculation/form engines later.
- Leave final public metadata refresh and table-density decisions in the publication checklist.

### Verification

- Checked key local evidence paths referenced by the full report.
- `git diff --check`
- Non-ASCII scan over the new and updated Markdown files.

### Problems / Open Questions

- Day 28 still needs the presentation outline.
- Final publication still needs public metadata refresh if current/latest language remains.
- Final report polish still needs table-density and screenshot/figure decisions.

### Tomorrow's Starting Point

Execute Day 28 by drafting `deck/outline.md` from `report/full_report_draft.md`.

## 07-16-2026 - Final Verification and README Refresh

### Goal

Recheck the current project picture, including the prototype, README files, generated execution-lab manifest, and report state before committing and pushing.

### What I Did

- Reviewed the root README, prototype README, report README, and execution-lab manifest state.
- Refreshed `prototype/README.md` from future-tense prototype wording to current implemented behavior.
- Updated `prototype/execution_lab/scripts/generate-manifest.mjs` so the execution lab reports Phase 27 and points next to the deck outline.
- Regenerated the execution-lab manifests.

### Evidence Captured

- `prototype/README.md`
- `prototype/execution_lab/scripts/generate-manifest.mjs`
- `prototype/execution_lab/data/project-manifest.json`
- `prototype/execution_lab/public/project-manifest.json`

### Verification

- `python -m compileall hledger_adapter tests run_day20_demo.py`
- `python tests/run_failure_matrix.py`
- `python run_day20_demo.py --json`
- `npm run generate:manifest`
- `npm run build`
- `git diff --check`
- Non-ASCII scan over the main updated Markdown files.

### Decisions Made

- Keep `report/full_report_draft.md` as the current report entrypoint.
- Keep the next project action as the presentation deck outline.
- Commit the report drafts, README refresh, regenerated manifests, and project logs together.

### Problems / Open Questions

- None for the verification pass.

### Tomorrow's Starting Point

Execute Day 28 by drafting `deck/outline.md`.

## 07-20-2026 - Phase 28: Deck Outline

### Goal

Translate the Day 27 full report draft into a coherent 20-30 minute presentation outline.

### What I Did

- Added `deck/outline.md` as the Day 28 exit artifact.
- Built an 18-slide presentation structure with timing guidance.
- Kept the story aligned to the full report: research question, safety boundary, evidence method, ecosystem map, five-tool comparison, hledger prototype, recommendation, limitations, and next steps.
- Decided where the prototype demo appears in the talk.
- Chose the priority comparison visuals for Day 29.
- Added `notes/day_28_deck_outline.md`.
- Updated README/status files and the execution-lab manifest source to point next to Day 29 deck build work.

### Evidence Captured

- `deck/outline.md`
- `notes/day_28_deck_outline.md`
- `deck/README.md`
- `README.md`
- `prototype/README.md`
- `prototype/execution_lab/scripts/generate-manifest.mjs`
- `CHANGELOG.md`

### Decisions Made

- Place the prototype demo after the cross-tool comparison and before the final recommendation.
- Prioritize six visuals: ecosystem role map, five-tool role matrix, capability gap ladder, prototype architecture flow, demo result/safety readout, and recommendation table.
- Keep dense evidence paths and full matrices as appendix candidates rather than main-slide material.

### Problems / Open Questions

- Day 29 still needs the actual deck build and slide visuals.
- Execution-lab screenshots may be useful for the deck but are not yet captured.
- Final publication still needs metadata refresh if current/latest wording remains.

### Tomorrow's Starting Point

Execute Day 29 by building the draft deck from `deck/outline.md`.

## 07-20-2026 - Phase 29: Deck Build

### Goal

Build the actual presentation deck from the Day 28 slide outline.

### What I Did

- Added `deck/open_source_tax_tooling_draft_deck.pptx` as the Day 29 draft deck.
- Built an 18-slide PowerPoint deck aligned to `deck/outline.md` and `report/full_report_draft.md`.
- Included the project story from research question through recommendation, with the prototype demo and demo readout in the middle of the talk.
- Added speaker notes with source pointers and demo guidance.
- Used the current local `python run_day20_demo.py --json` output for the demo result slide.
- Added `notes/day_29_deck_build.md`.
- Updated README/status files and the execution-lab manifest source to point next to Day 30 final QA and rehearsal.

### Evidence Captured

- `deck/open_source_tax_tooling_draft_deck.pptx`
- `notes/day_29_deck_build.md`
- `deck/README.md`
- `README.md`
- `prototype/README.md`
- `prototype/execution_lab/scripts/generate-manifest.mjs`
- `CHANGELOG.md`

### Decisions Made

- Keep the draft as an editable local PowerPoint deck.
- Use the restrained Codex Grid visual system so the presentation feels like a technical evidence deck rather than a marketing deck.
- Keep dense evidence paths in speaker notes and reserve appendix material for Day 30 only if needed.
- Defer optional execution-lab screenshots unless final rehearsal shows they would improve clarity.

### Verification

- `python run_day20_demo.py --json` passed locally with hledger `1.52.1`, 19 transactions, 38 postings, 14 accounts, checking balance `8964.77`, and 15/15 failure-matrix cases passed.
- Rendered the exported PowerPoint deck and inspected the contact sheet.
- `slides_test.py` reported no overflow.
- `npm run generate:manifest`
- `npm run build`
- `git diff --check`
- Non-ASCII scan over the new and updated Markdown files.

### Problems / Open Questions

- Day 30 still needs final consistency QA and timed rehearsal.
- Final public metadata refresh remains open if current/latest wording stays in the final report or deck notes.
- Execution-lab screenshots remain optional.

### Tomorrow's Starting Point

Execute Day 30 by running final QA and rehearsal across the report, prototype, deck, README files, and synthetic-data boundary.

## 07-20-2026 - Phase 30: Final QA and Rehearsal

### Goal

Verify that all deliverables are consistent, runnable, and safe to package for final delivery.

### What I Did

- Added `notes/day_30_final_qa_rehearsal.md` as the Day 30 exit artifact and final QA checklist.
- Re-ran the root prototype demo and direct failure matrix.
- Recompiled the Python adapter and tests.
- Reinstalled execution-lab dependencies from the lockfile with `npm ci`.
- Rebuilt the execution lab and regenerated the public/data manifests.
- Rendered the PowerPoint deck, ran the deck overflow test, and inspected the rendered contact sheet.
- Checked the deck against the Day 28 timing plan: 29 minutes for the full 18-slide walkthrough, with the documented 20 minute compressed path still available.
- Reviewed report/deck/prototype status wording and updated files that still pointed to Day 30 as future work.
- Redacted host-specific absolute paths from historical command evidence, JSON fixtures, notes, and one tool record.
- Re-ran host-path and credential-like scans.

### Evidence Captured

- `notes/day_30_final_qa_rehearsal.md`
- `README.md`
- `deck/README.md`
- `prototype/README.md`
- `report/full_report_draft.md`
- `prototype/execution_lab/scripts/generate-manifest.mjs`
- `prototype/execution_lab/data/project-manifest.json`
- `prototype/execution_lab/public/project-manifest.json`
- Historical evidence and fixture files with host-path redactions.

### Decisions Made

- Keep the draft PowerPoint deck as the editable final-delivery deck candidate; no layout edits were needed after render and overflow QA.
- Keep optional execution-lab screenshots out of the deck for now because the current deck already carries the demo path and verified result slide.
- Carry the public metadata refresh into Day 31 only if the final report keeps current/latest public-project wording.

### Verification

- `python run_day20_demo.py --json` passed locally with hledger `1.52.1`, 19 transactions, 38 postings, 14 accounts, checking balance `8964.77`, reconciliation `passed`, and 15/15 failure-matrix cases passed.
- `python tests/run_failure_matrix.py` passed 15/15 cases and reported `scratch_unchanged: true`.
- `python -m compileall prototype/hledger_adapter prototype/tests run_day20_demo.py prototype/run_day20_demo.py` completed successfully.
- `npm ci` completed from the lockfile and reported 0 vulnerabilities.
- `npm run build` completed successfully.
- `slides_test.py` reported no deck overflow.
- The deck rendered to 18 slide PNGs and a contact sheet for visual inspection.
- Host-path scan returned no local-user path matches after redaction.
- Credential-like scan returned only expected non-secret code references, placeholder labels, or `[redacted]` evidence.
- Unpacked PPTX internal scan returned no host-path or credential-like matches.

### Problems / Open Questions

- Public release, license, and activity metadata should still be refreshed before external publication if the final report keeps current/latest claims.

### Tomorrow's Starting Point

Execute Day 31 by finalizing the report, prototype repository, deck, and mentor summary for delivery.

## 07-22-2026 - Phase 31: Final Delivery

### Goal

Finalize the report, prototype repository, presentation deck, and mentor summary, deploy the execution lab to Vercel, then commit and push the completed project.

### What I Did

- Created `report/final_report.md` from the consolidated report draft and updated it with final status, Day 31 metadata refresh, and delivery checklist wording.
- Copied the editable PowerPoint deck to `deck/open_source_tax_tooling_final_deck.pptx`.
- Added `notes/mentor_summary.md`.
- Added `notes/day_31_final_delivery.md`.
- Added `notes/public_metadata_refresh_2026-07-22.md`.
- Rewrote the root README into a full project overview, final deliverable map, scope/safety statement, prototype guide, execution-lab guide, repository map, verification commands, and deployment reference.
- Updated `report/README.md`, `deck/README.md`, and `prototype/README.md` to point to final delivery artifacts.
- Updated the execution-lab manifest source to show `Phase 31 - final delivery complete`.
- Made the manifest generator use committed manifests when `VERCEL=1`, because Vercel production builds do not have the full parent repository available for artifact crawling.
- Deployed the execution lab to Vercel at `https://executionlab.vercel.app`.

### Evidence Captured

- `README.md`
- `report/final_report.md`
- `deck/open_source_tax_tooling_final_deck.pptx`
- `notes/mentor_summary.md`
- `notes/day_31_final_delivery.md`
- `notes/public_metadata_refresh_2026-07-22.md`
- `prototype/execution_lab/scripts/generate-manifest.mjs`
- `prototype/execution_lab/data/project-manifest.json`
- `prototype/execution_lab/public/project-manifest.json`

### Decisions Made

- Preserve draft artifacts as history, but make `report/final_report.md` and `deck/open_source_tax_tooling_final_deck.pptx` the reviewer-facing final files.
- Keep the prototype frozen and avoid adding optional Markdown output or tax-calculation behavior during final delivery.
- Use committed manifests in Vercel builds, while local builds still regenerate manifests from the full repository.
- Treat `https://executionlab.vercel.app` as the production review URL.

### Verification

- `python run_day20_demo.py --json` passed locally with hledger `1.52.1`, 19 transactions, 38 postings, 14 accounts, checking balance `8964.77`, reconciliation `passed`, and 15/15 failure-matrix cases passed.
- `python -m compileall prototype/hledger_adapter prototype/tests run_day20_demo.py prototype/run_day20_demo.py` completed successfully.
- `npm run build` completed successfully locally.
- Vercel-mode build simulation with `VERCEL=1 npm run build` completed successfully.
- `vercel --prod --yes` completed successfully.

### Problems / Open Questions

- No required Day 31 blockers remain.
- Optional post-internship work can include a PDF deck export, screenshots, hledger-to-tenforty experiment, larger synthetic datasets, and deeper GPL/AGPL review.

### Tomorrow's Starting Point

The internship project is complete and ready for mentor review or portfolio use.
