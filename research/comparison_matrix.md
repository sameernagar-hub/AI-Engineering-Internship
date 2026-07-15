# Comparison Matrix

Day 14 artifact for Phase 14: Prototype Target Selection.

Planned phase date: 07-14-2026. Executed early on 07-09-2026 UTC / 07-08-2026 PDT at user request.

## Purpose

Compare the five Week 2 hands-on evaluations and choose the tool target that gives Week 3 the best combination of prototype value, feasibility, safety, and demo clarity.

Primary evidence base:

- `tool_records/tool_1.md`: hledger Day 9 evaluation.
- `tool_records/tool_2.md`: Actual Budget Day 10 evaluation.
- `tool_records/tool_3.md`: Firefly III Day 11 evaluation.
- `tool_records/tool_4.md`: tenforty Day 12 evaluation.
- `tool_records/tool_5.md`: Filed Open Tax Engine Day 13 evaluation.
- `research/evaluation_checklist.md`: shared workflow, expected totals, and failure-test checklist.

## Executive Read

The five tools split into three useful roles:

| Role | Strongest candidates | Main finding |
|---|---|---|
| Bookkeeping-to-report adapter | hledger, Actual Budget, Firefly III | All three can ingest or model the synthetic freelancer facts and emit structured summaries, but hledger has the lowest setup cost and most transparent data path. |
| Tax-liability calculator | tenforty | Strong structured Python calculation surface, but it needs a separate summarization layer and has no transaction store, forms, payments/refunds, PDFs, or e-file path. |
| Form-level tax engine | Filed Open Tax Engine | Highest form-level tax upside, with 1040/Schedule C/SE line outputs and MeF export, but validation/export noise and project maturity make it risky as the first Week 3 build target. |

Decision: use hledger as the primary Week 3 prototype target. Use Actual Budget as the backup target because it preserves the same transaction-to-summary demo shape with an official Node API and MIT license. Keep tenforty and Filed Open Tax Engine in the report as tax-specific findings and possible future components, not the first prototype target.

## Scoring Method

Scores are 1-5, where 5 is strongest for the Week 3 prototype. The total is directional; the decision also considers whether a candidate can support the planned one-week demo without making unsupported tax or filing claims.

| Dimension | Meaning |
|---|---|
| Prototype value | How well the tool proves the research question through a real programmatic surface and useful synthetic-data workflow. |
| Feasibility | Likelihood of building a small, repeatable Week 3 adapter with local setup and predictable dependencies. |
| Safety | Quality of scratch-data support, failure behavior, validation/dry-run options, and guardrail needs. |
| Demo clarity | How easily a reviewer can understand, run, and inspect the integration end to end. |

## Prototype Selection Score Matrix

| Candidate | Prototype value | Feasibility | Safety | Demo clarity | Total | Prototype role | Main risks |
|---|---:|---:|---:|---:|---:|---|---|
| hledger | 4 | 5 | 4 | 5 | 18 | Primary target | No native tax calculation/forms; wrapper must reject unknown categories and duplicate IDs before hledger accepts them. |
| Filed Open Tax Engine | 5 | 4 | 3 | 4 | 16 | High-upside tax-engine candidate | Young project, AGPL/commercial licensing, validation/export noise, duplicate inputs accepted, malformed date strings accepted. |
| Actual Budget | 4 | 4 | 3 | 4 | 15 | Backup target | No tax forms; direct adds accepted unknown category IDs and duplicate imported IDs; app-owned local data model. |
| tenforty | 4 | 3 | 4 | 4 | 15 | Tax-calculation component candidate | Native Windows install failed; no transaction import; no payments/refund model; suspicious effective-rate output needs wrapper checks. |
| Firefly III | 4 | 3 | 3 | 4 | 14 | REST-first comparator | Docker/auth setup, AGPL obligations, no transaction dry-run found, unknown categories can auto-create. |

## Cross-Tool Capability Matrix

| Capability | hledger | Actual Budget | Firefly III | tenforty | Filed Open Tax Engine |
|---|---|---|---|---|---|
| Primary surface tested | CLI, CSV rules, JSON export | Node API, CLI metadata | REST JSON API | Python library | CLI, JSON form entries, validation, MeF export |
| Baseline data load | CSV through rules | Scratch local budget | Docker API instance | Tax profile summary | Tax profile/form entries |
| Standard add test | `TADD` row changed checking balance | `TADD` changed checking balance | `TADD` changed checking balance | Re-run after reduced Schedule C net | Second return with added expense |
| Balance workflow | Strong | Strong | Strong | Not applicable | Not applicable |
| Report workflow | Strong accounting reports | Wrapper summary over API data | API insights plus wrapper summary | Tax liability report | 1040/Schedule C/SE line outputs |
| Structured output | JSON tested | JSON objects tested | JSON API tested | Pydantic/Polars serialization tested | JSON and forced MeF XML tested |
| Tax-line support | Manual account/category mapping | Manual category/note mapping | Manual category/tag/note mapping | Aggregate tax inputs | Form-entry and line-level tax fields |
| Form 1040 coverage | Unsupported | Unsupported | Unsupported | Partial calculation outputs | Strong within tested TY2025 scope |
| Schedule C coverage | Manual income/expense report | Manual category summary | Manual category summary | Net self-employment income input | Gross receipts and expense lines tested |
| Estimated payments/refund | Manual tracking only | Manual tracking only | Manual tracking only | Unsupported | Estimated payments and refund output tested |
| E-file/MeF path | Unsupported | Unsupported | Unsupported | Unsupported | MeF export exists but was blocked without `--force` |
| Local scratch safety | Excellent | Good | Good with Docker | Excellent in Linux container | Good with isolated working directory |
| Setup friction | Low | Low to moderate | Moderate to high | Moderate | Low to moderate |
| License note | GPL-3.0-or-later | MIT | AGPL-3.0 | MIT plus OpenTaxSolver dependency review | AGPL-3.0/commercial dual license |

## Comparable Workflow Results

| Measure | hledger | Actual Budget | Firefly III | tenforty | Filed Open Tax Engine |
|---|---:|---:|---:|---:|---:|
| Baseline checking balance | `8964.77` | `8964.77` | `8964.77` | N/A | N/A |
| After-`TADD` checking balance | `8939.78` | `8939.78` | `8939.78` | N/A | N/A |
| Baseline Schedule C-style net before mileage | `9107.02` | `9107.02` | `9107.02` | `9107.02` input | `9107.02` mapped |
| After-`TADD` Schedule C-style net before mileage | `9082.03` | `9082.03` | `9082.03` | `9082.03` input | `9082.03` mapped |
| Baseline federal total tax | N/A | N/A | N/A | `1286.78` | `1286.7809` |
| After-`TADD` federal total tax | N/A | N/A | N/A | `1283.25` | `1283.2500` |
| Baseline refund/payment result | N/A | N/A | N/A | Not modeled | Refund `412.2191` |

## Failure Behavior Comparison

| Failure area | hledger | Actual Budget | Firefly III | tenforty | Filed Open Tax Engine |
|---|---|---|---|---|---|
| Malformed date | Rejected with clear parse guidance | Rejected, but verbose expression stack | HTTP 422 field-level error | Not applicable | Malformed DOB string accepted |
| Invalid amount | Rejected with parse details | Rejected NaN integer amount | HTTP 422 field-level error | Pydantic validation error | Rejected string gross receipts |
| Unknown category/account | Accepted implicit account | Direct add accepted bogus category as uncategorized | Auto-created unknown category | Not applicable | Unknown node type rejected |
| Missing file/state | Clear missing file error | Missing budget error | Wrapper caught missing fixture | Wrapper caught missing profile | Missing return path error |
| Duplicate source ID/form | Duplicate transaction ID accepted | Import dry-run reconciled; direct add duplicated | Duplicate hash rejected when configured | Not applicable | Duplicate 1099-INT accepted and double-counted |

## Candidate Notes

### hledger

hledger is the strongest Week 3 target because it already completed the full transaction workflow with local files, deterministic CLI calls, and JSON output. It is not a tax-preparation engine, so the prototype should frame itself as bookkeeping-to-tax-summary infrastructure: validate categories, run read-only reports, and return normalized summaries suitable for later tax calculation or report writing.

### Actual Budget

Actual Budget is the best backup because it keeps the same demonstration shape as hledger while using an official Node API instead of a plain-text CLI. It is also MIT-licensed and easy to run locally. The prototype would need stronger wrapper validation around categories and imported IDs than the raw API enforced during Day 10.

### Firefly III

Firefly III is the clearest REST-first comparator, but Docker, auth, database state, AGPL licensing, and lack of a transaction dry-run endpoint add overhead. It should remain important in the report's "best REST API" category, but it is not the lowest-risk Week 3 prototype.

### tenforty

tenforty is the strongest compact tax-calculation component. It should be preserved as a future second-stage adapter idea, especially for converting hledger/Actual/Firefly summaries into federal tax-liability estimates. As a standalone Week 3 target, it does not exercise transaction import, balances, or tax-form generation, and native Windows setup failed.

### Filed Open Tax Engine

Filed Open Tax Engine has the highest tax-form upside. It is the only evaluated tool that produced 1040 line outputs, Schedule C/SE-style calculations, payments/refund outputs, validation summaries, graph/schema inspection, and MeF XML evidence in one CLI. It should not be the primary Week 3 target unless the mentor explicitly prioritizes form-level experimentation over reliability, because validation/export noise and maturity risk would dominate the prototype.

## Decision Summary

- Primary prototype target: hledger.
- Backup prototype target: Actual Budget.
- Tax-specific future component: tenforty.
- High-upside form-engine research candidate: Filed Open Tax Engine.
- REST-first comparator for the final report: Firefly III.

## Day 21 Implementation Lessons

The Week 3 prototype confirmed the hledger selection. The successful parts were not hledger alone; they came from placing a strict adapter around hledger's permissive accounting model.

| Lesson | Evidence | Impact on original decision |
|---|---|---|
| hledger remained the fastest path to a transparent prototype. | The adapter reached a repeatable synthetic CSV -> read-only CLI reports -> normalized JSON -> summary workflow. | Confirms hledger as the primary target. |
| Wrapper validation is mandatory. | The Day 19 matrix verifies expected failures for unknown categories/accounts, duplicate IDs, tax-hint mismatches, wrong signs, malformed dates, missing files, and synthetic acknowledgement. | Keeps the hledger safety score at 4 rather than raising it to 5; the raw tool still accepts too much without the wrapper. |
| The local binary boundary must be visible to reviewers. | Day 20 and Day 21 runs on the current machine correctly report `HLEDGER_NOT_FOUND` when hledger is not configured. | Confirms that replay mode and documented setup are product requirements, not convenience features. |
| JSON is the right frozen output contract. | The UI and demo wrapper can consume counts, balances, Schedule C-style totals, warnings, limitations, and failure-matrix results directly. | Defers optional Markdown rendering until report polish. |
| The prototype proves infrastructure, not tax preparation. | The adapter preserves mileage and estimated-payment facts but does not choose rates, calculate liability, produce forms, or file. | Confirms tenforty and Filed Open Tax Engine as future tax-specific components rather than replacements for the hledger bookkeeping adapter. |

## Day 15 Starting Point

Start `prototype/design.md` by defining a small hledger CLI adapter:

- Input: canonical synthetic CSV plus a strict category/tax-hint allowlist.
- Operations: validate fixture, generate or reuse hledger rules, run `print`, `balance`, and `incomestatement`, then normalize JSON/text output.
- Output: checking balance, income/expense categories, Schedule C-style summary, unmapped tax facts, and wrapper warnings.
- Guardrails: synthetic-only fixtures, scratch output directory, duplicate ID detection, unknown category rejection, no mutation of user files, and clear GPL scope note.
