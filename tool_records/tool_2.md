# Tool Record: Actual Budget

## Status

| Field | Value |
|---|---|
| Tool slug | `actual-budget` |
| Category | bookkeeping / budgeting / adjacent infrastructure |
| Record status | complete draft |
| Last updated | 07-08-2026 UTC / 07-07-2026 PDT |
| Evaluator | Codex |
| Evaluation phase | Phase 10 |

## One-Sentence Summary

Actual Budget is a mature local-first personal finance app with an official Node API and stable CLI, making it a strong app-style integration candidate for budgeting/bookkeeping workflows but not a native US tax preparation tool.

## Identity

| Field | Value | Evidence |
|---|---|---|
| Primary project URL | https://actualbudget.org/ | [ACTUAL-HOME] |
| Source repository | https://github.com/actualbudget/actual | [ACTUAL-REPO] |
| Documentation | https://actualbudget.org/docs/ | [ACTUAL-DOCS] |
| License | MIT; npm package metadata also reported MIT for `@actual-app/api` and `@actual-app/cli`. | [ACTUAL-REPO], `evidence/commands/07-08-2026_actual_version.txt` |
| Latest visible release | npm reported `@actual-app/api@26.7.0` and `@actual-app/cli@26.7.0`; prior Day 5 release-doc evidence showed 26.7.0 on 07-01-2026. | [ACTUAL-RELEASES], `evidence/commands/07-08-2026_actual_version.txt`, `research/project_health_snapshot.md` |
| Main implementation language | TypeScript / JavaScript. | [ACTUAL-REPO] |
| Package/distribution channel | npm packages `@actual-app/api` and `@actual-app/cli`; self-hosted/sync app ecosystem. | [ACTUAL-API], [ACTUAL-CLI], `evidence/commands/07-08-2026_actual_setup.txt` |
| Maintainer or organization | Actual Budget community / actualbudget organization. | [ACTUAL-REPO], [ACTUAL-HOME] |

## Research Fit

- Workflow category: Local-first budgeting and personal finance app with scriptable data access.
- Consumer/freelancer relevance: Strong for maintaining accounts, categories, payees, transactions, and budget/report data around a freelancer cash-flow scenario.
- US tax relevance: Indirect. Tax-relevant categories and hints can be modeled in categories/notes, but Actual does not calculate taxes or generate return forms.
- Non-US comparator value: Useful as a local-first app integration pattern, not country-specific tax logic.
- Why included: It represents a modern personal-finance app surface with an official Node API and stable CLI, contrasting with hledger's plain-text CLI/file workflow and Firefly III's planned REST workflow.
- Why this might be excluded later: It is not tax-specific and the prototype may favor a simpler file/CLI tool if tax-adjacent reporting is the main demo.

## Programmatic Surface

| Surface | Present? | Stability | Input shape | Output shape | Evidence |
|---|---:|---|---|---|---|
| CLI | yes | documented stable as of 26.7.0 | Command arguments, env/config, budget sync/cache options, transaction/category/query commands | JSON by default; table and CSV available | [ACTUAL-CLI], `evidence/commands/07-08-2026_actual_version.txt` |
| Library/API import | yes | documented stable | Node calls through `@actual-app/api`, local data directory, optional sync/server config | JavaScript objects; wrapper can serialize JSON | [ACTUAL-API], [ACTUAL-API-REFERENCE], `evidence/fixtures/actual_day10_evaluate.mjs` |
| REST or HTTP API | no official REST API | explicitly non-REST in prior survey | N/A | N/A | [ACTUAL-API], `research/programmatic_surface_survey.md` |
| Plugin or extension system | partial | community ecosystem, not tested | Community projects and external helpers | Project-specific | [ACTUAL-COMMUNITY] |
| File format or schema | yes, but app-owned | documented as local/sync budget data rather than a public plain-text schema | Local data directory and budget file/cache | App database/budget state | [ACTUAL-API], `evidence/fixtures/actual_day10_summary.json` |
| Database access | not tested as public surface | internal/app-owned | N/A | N/A | [ACTUAL-API] |
| Export format | yes through API/CLI | documented/tested indirectly | API reads or CLI commands | JSON objects from API; CLI JSON/table/CSV documented | [ACTUAL-CLI], `evidence/fixtures/actual_day10_summary.json` |

Notes:

- Documented surfaces: Official Node API, stable CLI, ActualQL/query command, account/category/payee/tag/transaction methods.
- Inferred surfaces: Direct local database access exists internally but was not treated as a supported integration surface.
- Missing or unclear surfaces: No official REST API, no public tax-form schema, no tax calculation or filing output.

## Prior Art and Existing Integrations

- Third-party wrappers: Prior Day 4-6 research found community projects around Actual, including bridge/helper ideas, but none were evaluated on Day 10.
- Package bindings: Official npm packages `@actual-app/api` and `@actual-app/cli` were installed and exercised.
- Plugins/extensions: Community projects exist; not part of this hands-on run.
- Example automation scripts: Day 10 added `evidence/fixtures/actual_day10_evaluate.mjs` as a reproducible local Node API workflow.
- Related ecosystem tools: Actual sync server, CLI, import/export tooling, and community helpers.
- Evidence: [ACTUAL-API], [ACTUAL-CLI], [ACTUAL-COMMUNITY], `research/programmatic_surface_survey.md`.

## Setup and First Useful Operation

Environment:

- OS: Microsoft Windows 11 Home, 64-bit.
- Runtime/package manager: Node `v24.16.0`; npm `11.13.0`; PowerShell 5.1.
- Tool version: `@actual-app/api@26.7.0`; `@actual-app/cli@26.7.0`; `actual --version` reported `26.7.0`.
- Install source: npm install into `C:\Users\nagar\AppData\Local\Temp\actual-day10-eval-recorded`; no global install or server credentials.

Commands attempted:

```text
See:
- evidence/commands/07-08-2026_actual_setup.txt
- evidence/commands/07-08-2026_actual_version.txt
- evidence/commands/07-08-2026_actual_workflow.txt
- evidence/commands/07-08-2026_actual_failure-tests.txt
```

Results:

- Time to first useful operation: Under one work session; npm install took 26 seconds in the recorded setup transcript, and the workflow script completed in about a second once dependencies were installed.
- First useful operation: Created a scratch Actual budget using `actual.runImport`, created/reused category groups and categories, added the 19 baseline synthetic transactions, and read the checking balance.
- First useful output: Baseline checking balance of `8964.77`, matching the shared expected total.
- Setup friction: Low to moderate. npm install worked on Node 24, but it emitted a deprecated `prebuild-install` dependency warning. `runImport` also logged an unauthorized cloud upload during `finish-import`; local budget evaluation still completed with `cloudFileId: null`.
- Evidence files: Listed above plus `evidence/fixtures/actual_day10_summary.json`, `evidence/fixtures/actual_day10_transactions_after_add.json`, and `evidence/fixtures/actual_day10_evaluate.mjs`.

## Synthetic Workflow Results

| Operation | Result | Structured output? | Evidence |
|---|---|---:|---|
| Load data | Success. Created a scratch local budget and loaded the 19 baseline synthetic transactions into one Checking account. | yes | `evidence/commands/07-08-2026_actual_workflow.txt`, `evidence/fixtures/actual_day10_summary.json` |
| Add transaction | Success. Added `TADD` through `addTransactions`; checking balance changed from `8964.77` to `8939.78`. | yes | `evidence/fixtures/actual_day10_summary.json` |
| List accounts | Success. API returned the synthetic Checking account. | yes | `evidence/fixtures/actual_day10_summary.json` |
| List categories | Success. API returned Actual categories, with synthetic category paths reconstructed by the helper from group and leaf names. | yes | `evidence/fixtures/actual_day10_summary.json` |
| Compute balance | Success. `getAccountBalance` returned `8964.77` baseline and `8939.78` after `TADD`. | yes | `evidence/fixtures/actual_day10_summary.json` |
| Run report | Success by wrapper summary. API transactions were grouped into income/expense/tax-hint summaries matching the expected totals. | yes | `evidence/fixtures/actual_day10_summary.json` |
| Export result | Success. The helper exported normalized JSON summaries and transaction rows under `evidence/fixtures/`. | yes | `evidence/fixtures/actual_day10_summary.json`, `evidence/fixtures/actual_day10_transactions_after_add.json` |

Key comparable totals:

| Measure | Actual result |
|---|---:|
| Baseline transaction count | 19 |
| Baseline ending checking balance | `8964.77` |
| After `TADD` transaction count | 20 |
| After `TADD` ending checking balance | `8939.78` |
| After `TADD` Schedule C-style cash expenses before mileage | `1167.97` |
| After `TADD` Schedule C-style net before mileage | `9082.03` |

## Workflow Coverage

| Capability | Coverage | Notes | Evidence |
|---|---|---|---|
| Bookkeeping | strong | Accounts, categories, payees, transactions, notes, and balances are first-class app concepts. | `evidence/fixtures/actual_day10_summary.json`, [ACTUAL-API-REFERENCE] |
| Reporting | moderate | Balances and budget/query data are accessible; tax-style summaries required wrapper aggregation. | `evidence/fixtures/actual_day10_summary.json`, [ACTUAL-CLI] |
| Tax-line mapping | manual | Tax hints were preserved in transaction notes/categories, not validated against a tax schema. | `evidence/fixtures/actual_day10_transactions_after_add.json` |
| Form 1040 | unsupported | No native federal return form workflow. | [ACTUAL-DOCS] |
| Schedule A | partial/manual | Charity category can track cash donations, but no Schedule A form logic. | `evidence/fixtures/actual_day10_summary.json` |
| Schedule B | partial/manual | Interest income category can track interest, but no Schedule B form logic. | `evidence/fixtures/actual_day10_summary.json` |
| Schedule C | partial/manual | Business income and expenses can be grouped by category, but no Schedule C form logic. | `evidence/fixtures/actual_day10_summary.json` |
| Schedule D | unsupported unless user models data | No capital-gains workflow tested. | [ACTUAL-DOCS] |
| Schedule E | unsupported unless user models data | No rental/royalty workflow tested. | [ACTUAL-DOCS] |
| Common credits | unsupported | No credit calculation workflow. | [ACTUAL-DOCS] |
| Tax form generation | unsupported | No Form 1040/PDF generation path found. | [ACTUAL-DOCS] |
| Tax-year support | not applicable | General date-based budgeting/bookkeeping, not annual tax package support. | [ACTUAL-DOCS] |
| E-file or submission path | unsupported | No MeF/e-file workflow. | [ACTUAL-DOCS] |
| Import from banks/files | strong app domain | `importTransactions` supports reconciliation/dry-run behavior; CLI also has import-oriented commands. | `evidence/commands/07-08-2026_actual_failure-tests.txt`, [ACTUAL-CLI] |
| Export for other systems | strong | API returns structured objects and CLI defaults to JSON, with CSV/table options documented. | `evidence/fixtures/actual_day10_summary.json`, [ACTUAL-CLI] |

Stated non-goals and exclusions:

- State returns: Unsupported.
- Foreign filers: Not applicable to core budgeting app.
- Business returns: Unsupported as tax forms; bookkeeping can model business categories.
- Production filing: Unsupported.
- Other: Actual is a personal finance/budgeting app, not a tax-preparation or tax-submission product.

## Safety and Failure Behavior

| Area | Finding | Evidence |
|---|---|---|
| Dry-run or validation mode | `importTransactions` supports a dry-run/reconciliation path; direct `addTransactions` is mutating. | `evidence/commands/07-08-2026_actual_failure-tests.txt` |
| Scratch/test data support | Good. `init({ dataDir })` allowed a temporary data directory and local scratch budget. | `evidence/fixtures/actual_day10_summary.json` |
| Destructive operations | The tested workflow mutated only the scratch budget. Missing-budget load closed the active budget session before reporting a clear error. | `evidence/commands/07-08-2026_actual_failure-tests.txt` |
| Bad date handling | Rejected `13-40-2025` with a "Bad date format" error, but the message included a verbose expression stack. | `evidence/commands/07-08-2026_actual_failure-tests.txt` |
| Invalid amount handling | Rejected `NaN` with a clear integer-amount validation message. | `evidence/commands/07-08-2026_actual_failure-tests.txt` |
| Unknown category handling | `addTransactions` accepted a bogus category id string and the result appeared as uncategorized in the final summary. Wrapper-side category validation is needed. | `evidence/commands/07-08-2026_actual_failure-tests.txt`, `evidence/fixtures/actual_day10_summary.json` |
| Missing file/budget handling | Loading `does-not-exist` returned a clear "Budget not found" message, after the session attempted to load and closed the current budget. | `evidence/commands/07-08-2026_actual_failure-tests.txt` |
| Duplicate transaction ID | `importTransactions` dry-run reconciled duplicate `T001` as an update preview, adding zero rows. Direct `addTransactions` accepted duplicate `T001` and added a second transaction. | `evidence/commands/07-08-2026_actual_failure-tests.txt` |
| Error clarity | Strong for invalid amount and missing budget; mixed for bad date; weak for direct-add category/id safety. | `evidence/commands/07-08-2026_actual_failure-tests.txt` |

## Project Health

| Signal | Finding | Evidence |
|---|---|---|
| Recent commits | Prior Day 5 snapshot found a large, active repository with recent visible activity. | `research/project_health_snapshot.md`, [ACTUAL-REPO] |
| Release cadence | Prior Day 5 evidence and npm both pointed to 26.7.0 in early July 2026; CLI marked stable in the release notes. | `research/project_health_snapshot.md`, [ACTUAL-RELEASES], `evidence/commands/07-08-2026_actual_version.txt` |
| Annual tax-year support pattern | Not applicable; Actual is not a tax-year-specific filing tool. | [ACTUAL-DOCS] |
| Issue/PR activity | Prior snapshot captured large public activity and community signals. | `research/project_health_snapshot.md` |
| Contributor signals | Strong community docs, Discord, release-note contributors, and visible GitHub activity. | `research/project_health_snapshot.md`, [ACTUAL-REPO] |
| Documentation quality | Strong for API/CLI use; official API reference was enough to drive the Day 10 script. | [ACTUAL-API], [ACTUAL-API-REFERENCE], [ACTUAL-CLI] |
| Data format durability | Moderate. Local-first data is durable for the app, but it is not a simple plain-text accounting format like hledger. | [ACTUAL-API], `evidence/fixtures/actual_day10_summary.json` |
| License constraints | MIT is integration-friendly compared with GPL/AGPL candidates. | [ACTUAL-REPO], `evidence/commands/07-08-2026_actual_version.txt` |

## Integration Assessment

- Best integration shape: Node API wrapper that owns a local data directory, validates accounts/categories/imported IDs before mutation, and exports normalized JSON summaries.
- Thin-wrapper feasibility: High. The Day 10 helper created a scratch budget, added transactions, queried balances, and exported JSON without a running server.
- Structured I/O quality: Strong. API objects and CLI JSON are much easier to consume than GUI scraping or text-only reports.
- Agent-consumable workflow fit: Strong for budget/account/transaction workflows; weaker than tax-specific tools for tax-form reasoning.
- Main blockers: No tax-form support, no REST API, app-owned local data format, sync/server semantics to understand, and validation gaps in direct `addTransactions`.
- Best demo idea: Local-first budget adapter that ingests synthetic CSV, creates controlled categories, returns cash balance plus Schedule C-style summaries, and refuses unknown categories/duplicate IDs before calling Actual.
- Prototype suitability: High for a Node/local-app integration demo; lower if the prototype must be tax-form-specific or purely CLI/file-based.

## Scores

| Criterion | Score | Rationale |
|---|---:|---|
| Relevance to research question | 4 | Strong personal-finance and API/CLI integration fit; indirect tax relevance. |
| Programmatic surface quality | 5 | Official Node API plus stable JSON-first CLI are excellent app-style surfaces. |
| Setup feasibility | 4 | npm install and local run worked quickly, with minor dependency warning and sync/import log friction. |
| Structured input/output | 5 | API objects and JSON exports are straightforward to normalize. |
| Workflow coverage | 3 | Common bookkeeping workflow worked; native tax workflow is absent. |
| Safety and failure clarity | 3 | Dry-run import helps, but direct add accepts unknown categories and duplicate imported IDs. |
| Project health | 5 | Large active MIT project with strong docs and current packages. |
| Prototype/demo potential | 4 | Strong local app demo candidate; less transparent than hledger and less REST-native than Firefly III. |

## Evidence Index

- [x] Official project page: [ACTUAL-HOME] https://actualbudget.org/
- [x] Source repository: [ACTUAL-REPO] https://github.com/actualbudget/actual
- [x] License: [ACTUAL-REPO] https://github.com/actualbudget/actual, `evidence/commands/07-08-2026_actual_version.txt`
- [x] Release/version: [ACTUAL-RELEASES] https://actualbudget.org/docs/releases/, `evidence/commands/07-08-2026_actual_version.txt`
- [x] Documentation: [ACTUAL-DOCS] https://actualbudget.org/docs/, [ACTUAL-API] https://actualbudget.org/docs/api/, [ACTUAL-API-REFERENCE] https://actualbudget.org/docs/api/reference/, [ACTUAL-CLI] https://actualbudget.org/docs/api/cli/
- [x] Command output: `evidence/commands/07-08-2026_actual_setup.txt`, `evidence/commands/07-08-2026_actual_version.txt`, `evidence/commands/07-08-2026_actual_workflow.txt`, `evidence/commands/07-08-2026_actual_failure-tests.txt`
- [x] Metadata snapshot: `research/project_health_snapshot.md`, `research/programmatic_surface_survey.md`
- [ ] Screenshots, if any: Not needed for API/CLI-only Day 10 evaluation.

## Open Questions

- Is the unauthorized cloud upload log during local `runImport` expected and harmless, or should a production wrapper use a different create/load path?
- Should a prototype target Actual's Node API directly, or use the stable CLI so the wrapper can remain language-agnostic?
- What is the safest way to preserve full category paths when Actual stores category group and leaf name separately?
- How should wrapper validation handle direct-add versus bank-import reconciliation semantics?
- Would testing a sync-server-backed budget add meaningful evidence, or only setup friction?

## Decision Notes

Actual should remain a strong app/API-style comparator and a plausible prototype backup. Compared with hledger, it has a more realistic personal-finance app model and friendlier structured API, but it is less transparent as a durable data format and has no native tax-form coverage. A future wrapper should validate categories and imported IDs before using `addTransactions`, and should prefer `importTransactions` when reconciliation/deduplication behavior matters.

[ACTUAL-HOME]: https://actualbudget.org/
[ACTUAL-REPO]: https://github.com/actualbudget/actual
[ACTUAL-DOCS]: https://actualbudget.org/docs/
[ACTUAL-API]: https://actualbudget.org/docs/api/
[ACTUAL-API-REFERENCE]: https://actualbudget.org/docs/api/reference/
[ACTUAL-CLI]: https://actualbudget.org/docs/api/cli/
[ACTUAL-RELEASES]: https://actualbudget.org/docs/releases/
[ACTUAL-COMMUNITY]: https://actualbudget.org/docs/community-repos/
