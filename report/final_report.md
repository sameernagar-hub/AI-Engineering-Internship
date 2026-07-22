# Open-Source Consumer Tax Tooling and Programmatic Integration Surfaces

Final Day 31 report package.

Planned final-delivery date: 07-31-2026. Finalized early on 07-22-2026 at user request.

## Final Status

This final report consolidates the Day 23 opening sections, Day 24 tool evaluations, Day 25 comparison and recommendation, and Day 26 prototype writeup into one mentor-reviewable report. Day 30 final QA re-ran the prototype, checked the deck/report/README story for consistency, and verified the synthetic-data boundary on 07-20-2026. Day 31 final delivery added the final artifact entrypoints, mentor summary, public metadata refresh, and publication-ready repository overview on 07-22-2026.

This report is educational research and prototype documentation. It is not tax advice, tax preparation, return validation, filing software, or a recommendation to use any tool with real taxpayer data.

## Publication Refresh

Public release and project-status claims for the five hands-on tools were refreshed on 07-22-2026 from primary project sources and recorded in `notes/public_metadata_refresh_2026-07-22.md`. The refresh did not change the report's recommendation:

| Tool | Refreshed observation |
|---|---|
| hledger | Current stable release remained `1.52.1`, matching the local prototype verification baseline. |
| Actual Budget | Release notes showed `26.7.0` on 2026-07-01 and confirmed the CLI is stable. |
| Firefly III | Latest stable release page showed `v6.6.6` on 2026-07-01, with a separate development prerelease on 2026-07-21. |
| tenforty | PyPI showed `2025.10`, released 2026-05-03, and the GitHub README still framed it as an educational/open-source calculation library. |
| Filed Open Tax Engine | The project still described a federal 1040 TY2025 engine for agents/developers, while its release/license posture remained cautionary: AGPL v3 or commercial license. |

## Executive Summary

This project studied the open-source ecosystem around consumer tax bookkeeping, US tax-return tooling, and programmatic integration surfaces. The core question was: what open-source tools exist around consumer and freelancer tax-adjacent workflows, and how feasible is it to connect representative tools to other software through APIs, CLIs, file formats, schemas, libraries, or comparable interfaces?

The main finding is that the ecosystem has useful parts, but not a complete open-source consumer filing stack. Plain-text accounting and personal-finance tools can ingest or model transactions and produce summaries. Tax calculation libraries can compute liability from summarized facts. Form-level engines can model federal return lines and export filing-adjacent artifacts. No evaluated project combined low-friction bookkeeping, complete US tax-return preparation, validation-clean filing artifacts, and production-ready third-party integration.

The safest near-term integration is therefore a validated bookkeeping fact layer, not a filing bot. The prototype implements that recommendation with a synthetic-only hledger adapter. It validates controlled freelancer transactions, runs read-only hledger reports, reconciles output, and emits normalized JSON with balances, Schedule C-style bookkeeping summaries, tax-adjacent facts, warnings, limitations, and provenance.

Recommended roles:

| Use case | Recommendation |
|---|---|
| Transparent bookkeeping and reportable facts | Use hledger as the prototype-backed pattern. |
| Local app/API integration | Use Actual Budget as the best backup path. |
| REST API integration | Treat Firefly III as the strongest REST comparator. |
| Tax-liability scenarios | Pair bookkeeping summaries with tenforty later. |
| Tax-form experimentation | Explore Filed Open Tax Engine cautiously. |
| Production filing or live taxpayer automation | Do not claim support from this project. |

## 1. Introduction

Consumer tax work does not begin inside a tax form. It usually begins in bank exports, invoices, personal-budgeting categories, estimated payments, receipts, small-business expenses, and bookkeeping records created for day-to-day financial life. A human can bridge those layers manually. Software needs stable inputs, structured outputs, validation boundaries, clear failure modes, and enough semantic meaning to connect tools safely.

This report studies that bridge in the open-source ecosystem. The project focused on consumer and freelancer-oriented workflows, especially US workflows where practical. It also considered adjacent tools and reference projects when they helped explain import infrastructure, tax calculation patterns, form-level workflows, or government filing architecture.

The work was deliberately constrained:

- Only generated synthetic data was used.
- No real taxpayer data, bank data, personally identifiable information, secrets, live filing credentials, or production submission workflows belong in this repository.
- Tool evaluations are point-in-time snapshots backed by local records and command evidence.
- The prototype proves integration infrastructure, not tax preparation.

The report thesis is:

Open-source bookkeeping tools and tax tools expose useful programmatic surfaces, but they rarely cover the full chain from transactions to validated filing artifacts. The practical near-term win is a guarded bookkeeping fact layer that downstream tax-aware tools can consume later.

## 2. Method

The project used an evidence-first funnel:

1. Longlist: identify open-source bookkeeping, personal-finance, import/export, tax calculation, form-level, and official/reference projects.
2. Health snapshot: normalize visible release/activity signals, licenses, documentation quality, community signals, tax-year support, and data or automation substrates.
3. Programmatic-surface survey: compare documented CLIs, APIs, libraries, file formats, schemas, databases, plugins, and structured exports.
4. Shortlist: choose a balanced set for hands-on testing rather than over-weighting one category.
5. Shared synthetic workflow: test comparable operations against the same fictional freelancer facts.
6. Failure testing: record malformed dates, invalid amounts, unknown categories/accounts, missing files, duplicates, and validation boundaries.
7. Comparison and prototype selection: choose a conservative integration target and explain tradeoffs.

The five hands-on tools were:

| Tool | Shortlist role |
|---|---|
| hledger | File/CLI/JSON plain-text accounting path. |
| Actual Budget | Local-first app/API and stable CLI path. |
| Firefly III | REST-first self-hosted personal-finance path. |
| tenforty | Lightweight tax-calculation library path. |
| Filed Open Tax Engine | High-upside form-level federal tax engine path. |

The shared synthetic dataset modeled a 2025 freelancer with checking transactions, freelance income, business expenses, interest income, charitable contributions, estimated payments, and business mileage preserved without assigning a deduction value. The expected baseline checking balance was `8964.77`. A standard added transaction, `TADD`, represented an additional software expense and changed the expected checking balance to `8939.78`.

Evaluation dimensions included identity and health, programmatic surface quality, setup friction, structured input/output, workflow coverage, tax workflow coverage, safety/failure behavior, and integration fit. Scores were directional; qualitative differences mattered more than a single total.

Primary method evidence:

- `research/longlist.md`
- `research/project_health_snapshot.md`
- `research/programmatic_surface_survey.md`
- `research/shortlist.md`
- `research/evaluation_checklist.md`
- `tool_records/tool_1.md` through `tool_records/tool_5.md`
- `research/comparison_matrix.md`
- `research/prototype_target_decision.md`

## 3. Landscape

The open-source landscape is better understood as a chain of roles than as one product category.

| Layer | Representative projects | Main integration pattern |
|---|---|---|
| Import and conversion | hledger CSV rules, ofxtools, ofxstatement, beangulp, smart_importer, beancount-import, ledger-autosync, Firefly III Data Importer | Convert bank exports or CSV/OFX/QIF-style data into bookkeeping records. |
| Plain-text accounting | hledger, Beancount, Ledger CLI, Fava, Paisa | Versionable files, command-line reports, parser libraries, JSON/CSV exports, web views. |
| Personal-finance apps | Actual Budget, Firefly III, GnuCash, KMyMoney, HomeBank, Money Manager Ex | Local APIs, CLIs, REST APIs, desktop files, SQLite/XML stores, import/export flows. |
| Tax calculation and policy models | tenforty, OpenTaxSolver, PSL Tax-Calculator, PolicyEngine US, IRS Tax Withholding Estimator | Python libraries, CLI calculators, policy variables, form-oriented text inputs, rules engines. |
| Form-level tax engines and apps | Filed Open Tax Engine, UsTaxes, HabuTax, OpenTaxSolver, IRS Direct File/OpenFile as references | Form schemas, JSON or text inputs, PDF or MeF-adjacent output, app-internal state. |
| Filing and submission reference points | IRS Direct File posture, MeF XML concepts, Filed export evidence | Government or export-adjacent artifacts rather than general public filing APIs. |

Plain-text accounting tools are strong because they make financial records inspectable and scriptable. hledger stood out because it combined CSV rules, command-line reports, JSON output, and hledger-web documentation. Beancount remained a strong backup because of its explicit ledger language and Python ecosystem. Ledger CLI remained important as a baseline.

Personal-finance applications are closer to consumer workflows. Actual Budget offers a local-first official Node API and stable CLI. Firefly III offers the strongest REST API among evaluated finance apps. Mature desktop tools such as GnuCash, KMyMoney, HomeBank, and Money Manager Ex matter as landscape comparators, but their automation paths are often file-driven, binding-dependent, or less API-first.

Tax calculation and form-level tools solve different problems. tenforty can calculate liability from summarized facts, but it does not import transactions or produce filing artifacts. Filed Open Tax Engine can produce form-level outputs and MeF-adjacent XML evidence, but its maturity, validation/export behavior, and licensing need caution. IRS Direct File and OpenFile are valuable references, not active third-party filing channels for this project.

The landscape conclusion is that the missing layer is connective tissue: validation, normalization, provenance, wrapper-side safety, and honest boundaries around what each underlying tool does not do.

## 4. Tool Evaluations

### 4.1 hledger

hledger is a mature plain-text accounting tool with a strong command-line workflow, CSV rules, JSON export, and an optional web/API surface. It represented the file/CLI/JSON integration path.

The Day 9 evaluation loaded 19 synthetic transactions through hledger CSV rules, produced balanced postings, exported JSON, and computed the expected checking balance of `8964.77`. Adding `TADD` changed the checking balance to `8939.78`. The income statement produced bookkeeping revenue of `10327.75`, expenses of `1512.98`, and net of `8814.77`.

hledger's strengths are transparent files, deterministic CLI calls, JSON output, low setup friction, and strong documentation. Its limits are equally important: it does not prepare Form 1040, calculate tax liability, produce refunds, generate PDFs, create MeF XML, or file electronically.

Failure behavior shaped the prototype. hledger rejected malformed dates, invalid amounts, and missing files, but accepted unknown accounts and duplicate transaction IDs under tested defaults. The prototype closes those gaps with wrapper validation.

Integration fit: hledger is the primary prototype target and recommended transparent bookkeeping layer.

Evidence: `tool_records/tool_1.md`, `evidence/commands/07-08-2026_hledger_workflow.txt`, `evidence/commands/07-08-2026_hledger_failure-tests.txt`, `research/comparison_matrix.md`.

### 4.2 Actual Budget

Actual Budget is a local-first personal-finance application with an official Node API and stable CLI. It represented the app/API-backed local workflow.

The Day 10 evaluation created a scratch local budget, loaded the 19 baseline synthetic transactions, read balances, added `TADD`, and exported normalized JSON. It matched the expected baseline checking balance of `8964.77` and after-`TADD` balance of `8939.78`.

Actual's strongest surfaces are its official Node API and JSON-first CLI. It is MIT-licensed and easier to imagine in wrapper experiments than GPL/AGPL candidates. Its limitations are that it is not a tax tool, it has no native federal form workflow, and direct `addTransactions` accepted a bogus category ID and duplicate imported ID in the tested path.

Integration fit: Actual Budget is the best local app/API backup if a mentor or future user wants an application-style workflow rather than hledger's file/CLI transparency.

Evidence: `tool_records/tool_2.md`, `evidence/fixtures/actual_day10_summary.json`, `evidence/commands/07-08-2026_actual_workflow.txt`, `evidence/commands/07-08-2026_actual_failure-tests.txt`.

### 4.3 Firefly III

Firefly III is a mature self-hosted personal-finance manager with the strongest REST JSON surface among the evaluated bookkeeping tools.

The Day 11 evaluation used Docker, API authentication, and REST endpoints to post synthetic transactions, read account balances, query insight endpoints, and export normalized JSON. Because Firefly models opening balances separately, the helper represented `T000` as an opening balance and posted the remaining baseline rows through the transaction API. It matched the expected baseline and after-`TADD` balances.

Firefly's REST API is its strongest advantage. It exposes account, category, transaction, tag, note, and external-ID concepts through structured JSON. The tradeoffs are Docker/server setup, database state, token management, AGPL-3.0 licensing, no native tax forms, and unknown-category auto-creation.

Integration fit: Firefly III is the best REST-first comparator, not the lowest-friction prototype target.

Evidence: `tool_records/tool_3.md`, `evidence/fixtures/firefly_day11_summary.json`, `evidence/commands/07-08-2026_firefly-iii_workflow.txt`, `evidence/commands/07-08-2026_firefly-iii_failure-tests.txt`.

### 4.4 tenforty

tenforty is a lightweight Python library over Open Tax Solver logic. It represented the tax-liability calculation component.

The Day 12 evaluation ran successfully in a Linux container after native Windows installation failed. The helper mapped the synthetic profile into `evaluate_return`, including filing status, taxable interest, and Schedule C-style net self-employment income. The baseline federal total tax was `1286.78`; after `TADD`, it was `1283.25`.

tenforty's strengths are a compact Python API, structured model/dataframe outputs, and direct calculation relevance. Its limits are no transaction import, no account/balance workflow, no estimated-payment/refund model, no complete form output, no PDF, and no e-file path. The evaluation also found a suspicious effective-rate field, so wrappers should recompute or sanity-check key derived values.

Integration fit: tenforty is the best downstream tax-liability component after a bookkeeping summary layer.

Evidence: `tool_records/tool_4.md`, `evidence/fixtures/tenforty_day12_summary.json`, `evidence/commands/07-08-2026_tenforty_workflow.txt`, `evidence/commands/07-08-2026_tenforty_failure-tests.txt`.

### 4.5 Filed Open Tax Engine

Filed Open Tax Engine is a federal individual tax calculation and form-entry engine exposed through a CLI. It represented high-upside form-level experimentation.

The Day 13 evaluation created a TY2025 return, added `general`, `f1099int`, `f1040es`, and `schedule_c` entries, and ran `return get`. The baseline output included total income `9184.77`, AGI `8541.3795`, total tax `1286.7809`, total payments `1699.00`, and refund `412.2191`. After modeling `TADD`, total tax fell to `1283.2500` and refund increased to `415.7500`.

Filed's strongest surface is form-level CLI/JSON integration: node/schema inspection, form entries, computed line outputs, validation, graph inspection, and MeF XML export evidence. The caution flags are serious: a young public footprint, AGPL/commercial dual licensing, validation/export noise, duplicate 1099-INT acceptance, malformed date acceptance, narrow observed TY2025 support, and forced MeF export warnings.

Integration fit: Filed Open Tax Engine is the richest evaluated form-level candidate, but not the conservative prototype base.

Evidence: `tool_records/tool_5.md`, `evidence/fixtures/filed_opentax_day13_summary.json`, `evidence/fixtures/filed_opentax_day13_baseline_mef.xml`, `evidence/commands/07-08-2026_filed-opentax_workflow.txt`, `evidence/commands/07-08-2026_filed-opentax_failure-tests.txt`.

## 5. Cross-Tool Comparison

The five evaluated tools split into three roles:

| Candidate | Best role | Main limitation | Recommendation posture |
|---|---|---|---|
| hledger | Transparent bookkeeping-to-summary adapter | No native tax calculation or form workflow. | Primary prototype target. |
| Actual Budget | Local-first app/API backup | No native tax forms; direct-add validation gaps. | Best local app/API alternative. |
| Firefly III | REST-first finance comparator | Docker/auth/AGPL overhead; no native tax forms. | Best REST comparator. |
| tenforty | Tax-liability calculation component | Needs summarized inputs; no transaction or filing workflow. | Best downstream calculation component. |
| Filed Open Tax Engine | Form-level tax experimentation | Maturity, validation/export, duplicate/date, and license concerns. | Highest-upside but cautious form candidate. |

Capability summary:

| Capability | hledger | Actual Budget | Firefly III | tenforty | Filed Open Tax Engine |
|---|---|---|---|---|---|
| Transaction import/modeling | Strong | Strong | Strong | Unsupported | Unsupported; summarized form entries |
| Balance workflow | Strong | Strong | Strong | Unsupported | Unsupported |
| Structured output | JSON reports | API objects / CLI JSON | REST JSON | Python model / dataframe | CLI JSON / forced MeF XML |
| Form 1040 support | Unsupported | Unsupported | Unsupported | Partial calculation outputs | Strongest tested form-level output |
| Schedule C support | Manual summaries | Manual summaries | Manual summaries | Net self-employment input | Gross receipts and expense lines tested |
| Payments/refund support | Manual tracking only | Manual tracking only | Manual tracking only | Unsupported | Tested estimated payments and refund output |
| Setup weight | Low | Low to moderate | Moderate to high | Moderate | Low to moderate |

Safety comparison:

- hledger, Actual, and Firefly can organize tax-relevant transactions, but all need category/account allowlists for tax-controlled use.
- tenforty is stateless and structured, but wrappers should validate domains and sanity-check important outputs.
- Filed Open Tax Engine reaches closest to form-level output, but successful calculation must not be confused with validation-clean export or filing readiness.
- Every production-like integration needs wrapper-side checks around source IDs, categories, date formats, supported years, duplicates, and unsupported capabilities.

License and deployment posture also matter. Actual Budget and tenforty are easiest to experiment with from visible license posture, though tenforty's Open Tax Solver relationship still deserves review. hledger is GPL-3.0-or-later and is not bundled in the prototype. Firefly III is AGPL-3.0, which matters for hosted wrappers. Filed Open Tax Engine is AGPL/commercial dual-licensed.

## 6. Prototype

The prototype is a synthetic-only hledger adapter. It uses Python 3.11+ standard-library code to validate controlled inputs, drive hledger through read-only report commands, reconcile output, and emit normalized JSON.

Architecture:

```text
synthetic CSV + synthetic context + category map
  -> wrapper preflight
  -> scratch CSV and static hledger rules
  -> read-only hledger reports
  -> JSON reconciliation
  -> normalized summary JSON
  -> execution lab live run or verified replay
```

The main reviewer command is:

```text
python run_day20_demo.py --json
```

That wrapper runs:

| Command | Purpose |
|---|---|
| `python -m hledger_adapter demo` | Runs the canonical synthetic adapter demo. |
| `python tests/run_failure_matrix.py` | Runs safety cases for bad inputs and hledger discovery failures. |

The Next.js execution lab under `prototype/execution_lab/` exposes the same workflow. Local mode runs the Python demo through `/api/run`; replay mode uses committed command evidence when hledger cannot execute in a deployed environment.

Day 30 local verification passed after the deck build. Summary:

| Measure | Value |
|---|---:|
| Transactions | `19` |
| Postings | `38` |
| Accounts | `14` |
| hledger version | `hledger 1.52.1-g3834a163b-20260428, windows-x86_64` |
| Reconciliation status | `passed` |
| Ending checking balance | `8964.77` |
| Bookkeeping revenue | `10327.75` |
| Bookkeeping expenses | `1512.98` |
| Bookkeeping net | `8814.77` |
| Schedule C-style gross receipts | `10250.00` |
| Schedule C-style cash expenses before mileage | `1142.98` |
| Schedule C-style net before mileage | `9107.02` |
| Interest income | `77.75` |
| Cash charitable contributions | `370.00` |
| Federal estimated payments tracked | `1050.00` |
| Business miles preserved | `78.2` |
| Failure matrix | `15/15` passed |

Safety choices:

- Synthetic-only data boundary.
- Static category map.
- Required synthetic acknowledgement for custom runs.
- Duplicate ID detection.
- Date, decimal money, sign, account, category, and tax-hint validation.
- Scratch-copy execution.
- Read-only hledger commands only.
- Argument-array subprocesses with `shell=False`.
- Host-path redaction.
- Exact decimal string outputs.
- Stable failure matrix.

The prototype proves that a thin wrapper can safely drive an open-source bookkeeping CLI and produce agent-consumable facts from controlled synthetic data. It also proves the project's central architecture claim: useful tax-adjacent integration starts with validated financial facts, not with a claim to file taxes.

Prototype evidence:

- `prototype/design.md`
- `prototype/README.md`
- `prototype/run_day20_demo.py`
- `run_day20_demo.py`
- `prototype/retrospective.md`
- `prototype/execution_lab/`
- `evidence/commands/07-13-2026_hledger-adapter_day18_summary.txt`
- `evidence/commands/07-13-2026_hledger-adapter_day19_failures.txt`

## 7. Recommendation

The recommended near-term integration path is:

1. Use hledger as the prototype-backed pattern for transparent bookkeeping and reportable facts.
2. Use Actual Budget as the backup when a local app/API workflow or MIT license posture is more important.
3. Treat Firefly III as the REST API comparator, not the lowest-friction prototype target.
4. Treat tenforty as a future tax-liability component downstream of bookkeeping summaries.
5. Treat Filed Open Tax Engine as high-upside form-level experimentation requiring caution.
6. Do not claim production filing, tax advice, live taxpayer automation, validation-clean MeF export, or e-file support.

hledger was chosen because it offered the best combination of evidence, feasibility, safety, transparency, and honest scope. Its limits help the project avoid overclaiming: because hledger cannot calculate or file a return, the prototype must remain a bookkeeping fact layer.

Tools or paths to avoid as primary automation targets for this project:

- GUI-only or scrape-oriented workflows.
- Active filing claims from reference-only government code.
- Raw category auto-creation for tax mapping.
- Forced tax-form export as proof of filing readiness.
- Real taxpayer or live financial-account automation.

Final recommendation wording:

Use hledger as the prototype-backed pattern for an open-source bookkeeping fact layer. Treat Actual Budget as the best local app/API alternative, Firefly III as the best REST API comparator, tenforty as the most promising downstream tax-liability component, and Filed Open Tax Engine as the highest-upside but highest-caution form-level candidate. Do not frame any evaluated tool as a complete open-source consumer filing stack.

## 8. Limitations

This report should not be read beyond its evidence:

- The work used synthetic data only.
- The tool evaluations are point-in-time snapshots.
- Public release, health, and project-status claims for the five evaluated tools were refreshed on 07-22-2026; longlist items remain point-in-time unless rechecked.
- The project evaluated five hands-on candidates deeply rather than testing every candidate in the longlist.
- The prototype supports one controlled 2025 USD freelancer fixture.
- The prototype does not handle real taxpayer data, PII, real bank data, secrets, production credentials, or live filing.
- The prototype does not calculate tax liability, decide deductibility, select a mileage rate, generate Form 1040 or schedules, estimate refunds, validate returns, produce PDFs, create reliable MeF filing artifacts, or submit returns.
- hledger is a separate GPL-3.0-or-later executable and is not bundled.
- State taxes, foreign filers, Schedule D/E depth, credits, depreciation, capitalization, multi-account workflows, and production filing workflows remain incomplete or untested.
- License analysis is directional, not legal advice.

## 9. Future Work

High-value follow-up work:

- Add final execution-lab screenshots or figures if the report or deck needs visuals.
- Pair hledger summaries with tenforty in a second-stage liability experiment, with wrapper-side sanity checks.
- Revisit Filed Open Tax Engine after validation/export behavior, supported-year scope, and licensing implications are clearer.
- Evaluate hledger-web or Actual Budget API paths if the next goal is a service-style workflow.
- Add deeper license analysis for GPL/AGPL distribution, embedding, and hosted-service models.
- Expand the synthetic dataset for capital gains, rental income, credits, state taxes, depreciation/capitalization, multiple accounts, and multi-year workflows.
- Export a PDF copy of the final deck if a non-editable sharing format is needed later.

## 10. Evidence Index

Planning and scope:

- `README.md`
- `codex_execution_plan_ai_tax_tooling.md`
- `day_by_day_ai_tax_tooling_phases.md`
- `notes/internship_brief_alignment.md`
- `CHANGELOG.md`
- `notes/research_log.md`

Research and comparison:

- `research/longlist.md`
- `research/exclusions.md`
- `research/project_health_snapshot.md`
- `research/programmatic_surface_survey.md`
- `research/shortlist.md`
- `research/evaluation_checklist.md`
- `research/comparison_matrix.md`
- `research/prototype_target_decision.md`

Hands-on tool records:

- `tool_records/tool_1.md`
- `tool_records/tool_2.md`
- `tool_records/tool_3.md`
- `tool_records/tool_4.md`
- `tool_records/tool_5.md`

Prototype:

- `prototype/design.md`
- `prototype/README.md`
- `prototype/run_day20_demo.py`
- `run_day20_demo.py`
- `prototype/retrospective.md`
- `prototype/execution_lab/`
- `prototype/hledger_adapter/`
- `prototype/tests/run_failure_matrix.py`
- `prototype/config/category_map.json`
- `prototype/config/hledger.csv.rules`

Synthetic data and command evidence:

- `evidence/synthetic_dataset.md`
- `evidence/fixtures/synthetic_freelancer_transactions.csv`
- `evidence/fixtures/synthetic_freelancer_tax_profile.json`
- `evidence/commands/`
- `evidence/fixtures/`

Intermediate report drafts:

- `report/opening_sections_draft.md`
- `report/tool_evaluations_draft.md`
- `report/comparison_recommendation_draft.md`
- `report/prototype_writeup_draft.md`

Final delivery artifacts:

- `report/final_report.md`
- `deck/open_source_tax_tooling_final_deck.pptx`
- `notes/mentor_summary.md`
- `notes/day_31_final_delivery.md`
- `notes/public_metadata_refresh_2026-07-22.md`

## Delivery Checklist

- Public release/activity metadata refreshed for evaluated tools.
- Final report entrypoint created.
- Final editable PowerPoint deck created.
- Mentor summary created.
- Prototype demo and failure matrix re-run.
- Execution lab production build re-run.
- Repository README expanded for reviewer handoff.
- Execution lab deployed to Vercel at https://executionlab.vercel.app.
