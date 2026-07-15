# Final Report Outline

Day 22 planned date: 07-22-2026. Executed early on 07-15-2026 at user request.

## Working Title

Open-Source Consumer Tax Tooling and Programmatic Integration Surfaces

## Report Thesis

The open-source ecosystem has strong bookkeeping and personal-finance integration surfaces, emerging tax-calculation libraries, and at least one promising form-level federal tax engine, but no evaluated project currently combines low-friction consumer bookkeeping, complete US tax-return preparation, validation-clean filing artifacts, and production-ready third-party integration. The safest prototype path is a thin wrapper that turns synthetic bookkeeping records into normalized tax-adjacent facts while staying explicit about what is not tax preparation.

## Primary Evidence Base

- Internship scope and deliverables: `README.md`, `notes/internship_brief_alignment.md`, `codex_execution_plan_ai_tax_tooling.md`.
- Daily execution plan: `day_by_day_ai_tax_tooling_phases.md`.
- Tool records: `tool_records/tool_1.md` through `tool_records/tool_5.md`.
- Shared evaluation assets: `research/evaluation_checklist.md`, `evidence/synthetic_dataset.md`, `evidence/fixtures/`.
- Comparison and decision artifacts: `research/comparison_matrix.md`, `research/prototype_target_decision.md`.
- Prototype artifacts: `prototype/design.md`, `prototype/README.md`, `prototype/run_day20_demo.py`, `prototype/execution_lab/`, `prototype/retrospective.md`.

## 1. Introduction

Purpose:

- State the internship research question from `README.md`.
- Explain why consumer tax/bookkeeping integration matters: financial data lives in bookkeeping systems, tax preparation needs structured facts, and AI/tooling workflows need safe programmatic surfaces.
- Define the project as educational research and prototype work, not production tax software.

Facts to pull:

- Internship deliverables: written report, small synthetic-data prototype, and 20-30 minute deck.
- Scope: consumer/freelancer-oriented workflows, US tax focus where practical, non-US or adjacent tools only as comparators.
- Data policy: synthetic data only; no real taxpayer data, account data, PII, secrets, or filing credentials.

Missing evidence before final prose:

- Add final mentor/reviewer framing if a mentor check-in produces wording changes.

## 2. Method

Purpose:

- Describe the evidence-first method: longlist, health snapshot, programmatic-surface survey, shortlist, shared synthetic workflow, failure tests, comparison matrix, prototype decision.
- Explain that final claims are written from tool records and command evidence, not memory.

Rubric dimensions:

- Identity, license, release activity, project health.
- Programmatic surface quality: CLI, library/API, REST, plugin, file format, schema, database, export.
- Setup and first useful operation.
- Structured input/output.
- Workflow coverage across bookkeeping, reporting, tax-line mapping, forms, payments/refunds, and submission-adjacent paths.
- Safety and failure behavior.
- Prototype/demo fit.

Evidence pointers:

- `research/longlist.md`
- `research/project_health_snapshot.md`
- `research/programmatic_surface_survey.md`
- `research/shortlist.md`
- `research/evaluation_checklist.md`

Missing evidence before final prose:

- Refresh any public release/project-health metadata immediately before publication if the report makes "latest" claims.

## 3. Landscape

Purpose:

- Organize the ecosystem by integration role rather than by popularity.

Landscape buckets:

- Plain-text accounting and CLI/file workflows: hledger, Ledger CLI, Beancount, GnuCash-adjacent tooling.
- Local-first budgeting/personal-finance app APIs: Actual Budget.
- Self-hosted REST personal finance systems: Firefly III.
- Tax calculation libraries: tenforty and Open Tax Solver-adjacent work.
- Form-level federal tax engines: Filed Open Tax Engine and IRS-form/schema-adjacent projects.
- Import/export prior art: OFX/QIF parsers, CSV-to-ledger pipelines, Firefly Data Importer, hledger/Beancount import helpers.
- Government or policy reference points: IRS Direct File posture as context, not a third-party filing API surface.

Likely figures/tables:

- Ecosystem map by "bookkeeping -> tax calculation -> form/output -> filing/submission-adjacent".
- Programmatic-surface table by CLI/API/REST/schema/file format.

Missing evidence before final prose:

- Decide whether to include excluded candidates in the main report or appendix only.

## 4. Tool Evaluations

Purpose:

- Summarize each hands-on evaluation with the same structure: what it is, how it was driven, what worked, where it failed, and how it fits integration work.

### 4.1 hledger

Structured facts:

- Mature plain-text accounting tool; GPL-3.0-or-later.
- Strong CLI, CSV rules, JSON export, and local-file workflow.
- Day 9 loaded the synthetic CSV, generated 19 balanced transactions, produced JSON `print` and `balance` outputs, and reported baseline checking balance `8964.77`.
- Strong for bookkeeping-to-report infrastructure; no native Form 1040, refund, PDF, or e-file path.
- Failure behavior was clear for malformed date, invalid amount, and missing file, but permissive for unknown categories and duplicate IDs.

Evidence:

- `tool_records/tool_1.md`
- `evidence/commands/07-08-2026_hledger_workflow.txt`
- `evidence/commands/07-08-2026_hledger_failure-tests.txt`

### 4.2 Actual Budget

Structured facts:

- MIT-licensed local-first personal finance app with official Node API and stable CLI.
- Day 10 created a scratch local budget, imported synthetic transactions, read balances, and exported normalized JSON.
- Strong app/API candidate; no native tax forms or tax calculation.
- Direct-add paths accepted unknown category IDs and duplicate imported IDs, so wrapper validation is required.

Evidence:

- `tool_records/tool_2.md`
- `evidence/fixtures/actual_day10_summary.json`
- `evidence/commands/07-08-2026_actual_workflow.txt`

### 4.3 Firefly III

Structured facts:

- AGPL-3.0 self-hosted personal-finance manager with strongest REST JSON surface among evaluated bookkeeping tools.
- Day 11 used Docker, API auth, and REST endpoints to post synthetic transactions, read account balance, and query insights.
- Strong REST comparator, but setup/auth/AGPL overhead is heavier than hledger or Actual.
- No native tax forms; category auto-create behavior needs wrapper controls.

Evidence:

- `tool_records/tool_3.md`
- `evidence/fixtures/firefly_day11_summary.json`
- `evidence/commands/07-08-2026_firefly-iii_workflow.txt`

### 4.4 tenforty

Structured facts:

- MIT Python library over Open Tax Solver logic; direct tax-calculation component.
- Day 12 mapped summarized synthetic profile facts into `evaluate_return`.
- Produced federal total tax `1286.78` baseline and `1283.25` after the `TADD` expense adjustment.
- Strong calculation component, but no transaction import, account/balance workflow, payment/refund model, complete form output, PDF, or e-file path.
- Native Windows installation failed; Linux container evaluation worked.

Evidence:

- `tool_records/tool_4.md`
- `evidence/fixtures/tenforty_day12_summary.json`
- `evidence/commands/07-08-2026_tenforty_workflow.txt`

### 4.5 Filed Open Tax Engine

Structured facts:

- AGPL/commercial federal 1040 CLI with JSON form entries, schema inspection, validation, dependency graph output, and MeF XML export.
- Day 13 mapped the synthetic profile into TY2025 return entries and produced 1040/Schedule C/SE-style line outputs.
- Baseline total tax was `1286.7809`, payments `1699.00`, refund `412.2191`.
- Highest form-level upside, but new/maturity risk, validation/export noise, duplicate input acceptance, malformed date acceptance, and license constraints make it a cautious recommendation.

Evidence:

- `tool_records/tool_5.md`
- `evidence/fixtures/filed_opentax_day13_summary.json`
- `evidence/fixtures/filed_opentax_day13_baseline_mef.xml`
- `evidence/commands/07-08-2026_filed-opentax_workflow.txt`

## 5. Cross-Tool Comparison

Purpose:

- Compare tools on the same workflow rather than presenting isolated anecdotes.

Core findings:

- hledger, Actual Budget, and Firefly III all support transaction-to-balance and transaction-to-summary workflows, but none are tax-preparation engines.
- tenforty and Filed Open Tax Engine handle tax-calculation/form concepts, but neither imports raw bookkeeping transactions.
- All candidates require wrapper-side guardrails for production-like use.
- License posture matters: MIT candidates are easier for wrappers; GPL/AGPL candidates need careful distribution and hosting analysis.

Tables to include:

- Prototype selection score matrix from `research/comparison_matrix.md`.
- Capability matrix across bookkeeping, reporting, tax-line support, Form 1040, Schedule C, payments/refunds, MeF/e-file, and setup friction.
- Failure behavior comparison.

Missing evidence before final prose:

- Decide whether to collapse full tables in the report and move detailed evidence to appendices.

## 6. Prototype

Purpose:

- Explain the hledger adapter as the concrete proof-of-integration.

Prototype architecture:

- Synthetic CSV and context fixture.
- Strict Python preflight over dates, amounts, signs, IDs, accounts, categories, tax hints, and synthetic acknowledgement.
- Temporary scratch copies and static hledger CSV rules.
- Read-only `hledger print -O json`, `balance --flat -O json`, and `incomestatement --depth 3 -O json`.
- JSON reconciliation and controlled summary aggregation.
- Day 20/21 execution lab for local live run or verified replay.

Validated outputs:

- 19 transactions, 38 postings, 14 accounts.
- Ending checking balance `8964.77`.
- Bookkeeping revenue `10327.75`, expenses `1512.98`, net `8814.77`.
- Schedule C-style gross receipts `10250.00`, cash expenses before mileage `1142.98`, net before mileage `9107.02`.
- Interest `77.75`, cash charity `370.00`, estimated payments tracked `1050.00`, business miles preserved but not monetized.
- Failure matrix: 15/15 cases passed and scratch unchanged.

Evidence:

- `prototype/design.md`
- `prototype/README.md`
- `prototype/run_day20_demo.py`
- `prototype/execution_lab/`
- `prototype/retrospective.md`
- `evidence/commands/07-13-2026_hledger-adapter_day18_summary.txt`
- `evidence/commands/07-13-2026_hledger-adapter_day19_failures.txt`

Missing evidence before final prose:

- Capture final screenshots or rendered figures from the execution lab if the report will include visuals.

## 7. Recommendation

Purpose:

- State the recommended integration path and alternatives.

Recommended path:

- Use hledger as the primary prototype-backed pattern for a conservative bookkeeping-to-summary adapter.
- Use Actual Budget as the backup when an MIT-licensed app/API workflow is preferred.
- Treat Firefly III as the strongest REST API comparator, not the lowest-friction prototype target.
- Treat tenforty as a future tax-calculation component downstream of bookkeeping summaries.
- Treat Filed Open Tax Engine as the high-upside form-level candidate requiring additional validation, maturity, and licensing review.

Likely wording:

- "The near-term integration win is not a filing bot; it is a validated bookkeeping fact layer that can feed tax-aware tools later."

## 8. Limitations

Purpose:

- Prevent overclaiming.

Limitations:

- Synthetic data only.
- No tax advice, official tax treatment decisions, tax return preparation, PDF generation, MeF submission, or refund guarantee in the prototype.
- hledger is a separate GPL-3.0-or-later binary and is not bundled.
- The current local machine does not have hledger on `PATH`; live execution reaches the documented `HLEDGER_NOT_FOUND` boundary unless configured.
- Tool evaluations are point-in-time snapshots and may change with new releases.
- Week 2/3 depth favored five hands-on candidates over exhaustive testing of every open-source project.
- State tax coverage, foreign filer cases, Schedule D/E depth, credits, and production filing workflows remain incomplete or untested.

## 9. Future Work

Purpose:

- Turn remaining gaps into concrete follow-up work.

Future work:

- Refresh public release/project-health metadata before publication.
- Add report screenshots/figures from the execution lab.
- Optionally pair hledger summaries with tenforty for tax-liability scenario output, with wrapper sanity checks.
- Revisit Filed Open Tax Engine after validation/export behavior and supported-year scope are clearer.
- Evaluate hledger-web or Actual Budget API as alternate integration surfaces if the next goal is a service-style workflow.
- Add deeper license analysis for GPL/AGPL distribution, embedding, and hosted-service models.
- Expand the synthetic dataset for capital gains, rental income, credits, state taxes, and multi-account workflows.

## 10. Appendices

Candidates:

- Tool-record evidence index.
- Command transcript index.
- Synthetic dataset schema and expected totals.
- Failure-test matrix.
- Prototype JSON output schema.
- Changelog highlights by phase.

## Missing Evidence Checklist

- Final execution-lab screenshots or report figures.
- Mentor or reviewer feedback, if available before final delivery.
- Last-minute refresh of public release dates and license notes for "latest/current" claims.
- Decision on table density in the main report versus appendix.
- Final deck alignment after report draft exists.
