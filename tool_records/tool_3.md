# Tool Record: Firefly III

## Status

| Field | Value |
|---|---|
| Tool slug | `firefly-iii` |
| Category | bookkeeping / self-hosted personal finance / adjacent infrastructure |
| Record status | complete draft |
| Last updated | 07-08-2026 UTC / 07-07-2026 PDT |
| Evaluator | Codex |
| Evaluation phase | Phase 11 |

## One-Sentence Summary

Firefly III is a mature self-hosted personal-finance manager with the strongest REST JSON API surface evaluated so far, making it a strong integration comparator for bookkeeping workflows but not a native US tax-preparation or filing tool.

## Identity

| Field | Value | Evidence |
|---|---|---|
| Primary project URL | https://www.firefly-iii.org/ | [FIREFLY-HOME], [FIREFLY-REPO] |
| Source repository | https://github.com/firefly-iii/firefly-iii | [FIREFLY-REPO] |
| Documentation | https://docs.firefly-iii.org/ | [FIREFLY-DOCS] |
| License | GNU Affero General Public License v3. | [FIREFLY-REPO] |
| Latest visible release | v6.6.6, released 07-01-2026; local `/api/v1/about` and `firefly-iii:output-version` both reported `6.6.6`. | [FIREFLY-RELEASES], `evidence/commands/07-08-2026_firefly-iii_version.txt` |
| Main implementation language | PHP / Laravel, with web frontend assets. | [FIREFLY-REPO], `evidence/commands/07-08-2026_firefly-iii_setup.txt` |
| Package/distribution channel | Docker image `fireflyiii/core:version-6.6.6`; source release; self-managed server install paths. | [FIREFLY-DOCKER], [FIREFLY-RELEASES], `evidence/commands/07-08-2026_firefly-iii_version.txt` |
| Maintainer or organization | Firefly III / James Cole and community. | [FIREFLY-REPO], [FIREFLY-HOME] |

## Research Fit

- Workflow category: Self-hosted personal-finance and bookkeeping app with first-class REST JSON API.
- Consumer/freelancer relevance: Strong for tracking accounts, income, expenses, categories, tags, budgets, and reports around a freelancer scenario.
- US tax relevance: Indirect. Tax hints can be preserved in categories, tags, notes, and wrapper-side summaries, but Firefly III does not calculate or generate US tax returns.
- Non-US comparator value: Useful as a country-neutral personal-finance API architecture comparator.
- Why included: It represents the REST-first app/API path, contrasting with hledger's file/CLI workflow and Actual Budget's local-first Node API/CLI workflow.
- Why this might be excluded later: Docker/self-hosting setup, OAuth/PAT setup, AGPL obligations, and lack of native tax forms may be too heavy for a small prototype if a simpler adapter is enough.

## Programmatic Surface

| Surface | Present? | Stability | Input shape | Output shape | Evidence |
|---|---:|---|---|---|---|
| CLI | yes | documented/internal artisan commands | `php artisan` commands inside app container; some require user/token | Text output; CSV/zip-style export paths for `export-data` | `evidence/commands/07-08-2026_firefly-iii_version.txt`, `evidence/commands/07-08-2026_firefly-iii_setup.txt` |
| Library/API import | no official general-purpose library tested | not primary surface | N/A | N/A | [FIREFLY-API], [FIREFLY-API-DOCS] |
| REST or HTTP API | yes | core documented API | Bearer token, JSON request bodies under `/api/v1/*` | JSON / JSON:API-style objects | [FIREFLY-API], [FIREFLY-API-DOCS], `evidence/fixtures/firefly_day11_evaluate.mjs` |
| Plugin or extension system | partial | ecosystem-driven | Rules, webhooks, Data Importer, third-party apps | App/API-specific | [FIREFLY-THIRD-PARTIES], [FIREFLY-DATA-IMPORTER] |
| File format or schema | partial | database/app-owned | CSV/CAMT through Data Importer; API JSON payloads | API JSON; importer outputs; app database | [FIREFLY-DATA-IMPORTER], [FIREFLY-API-DOCS] |
| Database access | yes, but not preferred integration surface | app-owned schema | MariaDB/MySQL used in Day 11 container | SQL tables internal to app | `evidence/commands/07-08-2026_firefly-iii_version.txt` |
| Export format | yes | API and CLI available | API queries, CLI export command options | JSON API responses; CLI export files | `evidence/fixtures/firefly_day11_summary.json`, `evidence/commands/07-08-2026_firefly-iii_version.txt` |

Notes:

- Documented surfaces: REST JSON API, Swagger/OpenAPI docs, personal access/OAuth auth, Data Importer, Docker deployment, artisan commands.
- Inferred surfaces: Direct Laravel/PHP bootstrap can create local tokens for evaluation, but this is not the preferred integration surface.
- Missing or unclear surfaces: No native tax-form schema, no IRS e-file/MeF path, no official language-specific SDK evaluated.

## Prior Art and Existing Integrations

- Third-party wrappers: Official documentation links to a broad third-party app ecosystem around the Firefly III API.
- Package bindings: Not evaluated directly; API docs are sufficient for a thin wrapper.
- Plugins/extensions: Rules, webhooks, Data Importer, and third-party apps are the main extension pattern.
- Example automation scripts: Day 11 added `evidence/fixtures/firefly_day11_evaluate.mjs` as a reproducible REST workflow helper.
- Related ecosystem tools: Firefly III Data Importer imports transactions into Firefly III and is separated from the core app.
- Evidence: [FIREFLY-THIRD-PARTIES], [FIREFLY-DATA-IMPORTER], [FIREFLY-API-DOCS].

## Setup and First Useful Operation

Environment:

- OS: Microsoft Windows 11 / NT `10.0.26200.0`, PowerShell `5.1.26100.8737`.
- Runtime/package manager: Docker `29.5.3`; Docker Compose `v5.1.4`; Node `v24.16.0`; Firefly container PHP `8.5.7`; MariaDB `lts`.
- Tool version: Firefly III `6.6.6`; API `6.6.6`; Docker image digest `sha256:ae69fdd95cdef9038cd7a460a5aec731f14813973e4f096511d5a4ea9ff0e972`.
- Install source: Docker containers `fireflyiii/core:version-6.6.6` and `mariadb:lts`, isolated network and volumes.

Commands attempted:

```text
See:
- evidence/commands/07-08-2026_firefly-iii_setup.txt
- evidence/commands/07-08-2026_firefly-iii_version.txt
- evidence/commands/07-08-2026_firefly-iii_workflow.txt
- evidence/commands/07-08-2026_firefly-iii_failure-tests.txt
```

Results:

- Time to first useful operation: One work session. Setup required starting Docker Desktop, pulling MariaDB and Firefly images, correcting `APP_KEY` length, registering a synthetic local user, creating a Passport personal access client, and generating an evaluation token.
- First useful operation: Authenticated `GET /api/v1/about`, which returned Firefly III `6.6.6`, API `6.6.6`, PHP `8.5.7`, OS `Linux`, driver `mysql`.
- First useful output: After posting the synthetic baseline, Firefly's account API reported checking balance `8964.77`, matching the expected dataset total.
- Setup friction: Moderate to high. Docker was installed but not running; a one-character-short `APP_KEY` caused a Laravel cipher/key-length error; API auth required a synthetic user plus Passport personal-access client/token setup.
- Evidence files: Listed above plus `evidence/fixtures/firefly_day11_summary.json`, `evidence/fixtures/firefly_day11_transactions_after_add.json`, `evidence/fixtures/firefly_day11_failure_results.json`, and `evidence/fixtures/firefly_day11_evaluate.mjs`.

## Synthetic Workflow Results

| Operation | Result | Structured output? | Evidence |
|---|---|---:|---|
| Load data | Success. Created one Firefly asset account with `T000` as `opening_balance`, created 12 categories, and posted the 18 non-opening baseline rows through `/api/v1/transactions`. | yes | `evidence/commands/07-08-2026_firefly-iii_workflow.txt`, `evidence/fixtures/firefly_day11_summary.json` |
| Add transaction | Success. Posted `TADD` as a withdrawal with category `Expenses:Business:Software`; checking balance changed from `8964.77` to `8939.78`. | yes | `evidence/fixtures/firefly_day11_summary.json` |
| List accounts | Success. API returned the synthetic checking account and generated counterpart accounts. | yes | `evidence/fixtures/firefly_day11_summary.json`, `evidence/fixtures/firefly_day11_transactions_after_add.json` |
| List categories | Success. API returned all synthetic categories; unknown-category failure test later auto-created `Expenses:Business:Imaginary Category`. | yes | `evidence/fixtures/firefly_day11_failure_results.json` |
| Compute balance | Success. Account API returned expected baseline and after-add balances exactly. | yes | `evidence/fixtures/firefly_day11_summary.json` |
| Run report | Success. Firefly insight endpoints returned income and expense by category; helper also computed comparable Schedule C-style totals. | yes | `evidence/fixtures/firefly_day11_summary.json` |
| Export result | Success. Helper exported normalized transaction rows and summary JSON from API responses. | yes | `evidence/fixtures/firefly_day11_summary.json`, `evidence/fixtures/firefly_day11_transactions_after_add.json` |

Key comparable totals:

| Measure | Baseline | After `TADD` |
|---|---:|---:|
| Synthetic transaction rows posted through transaction API | 18 | 19 |
| Account opening balance modeled separately from transaction posts | `1200.00` | `1200.00` |
| Ending checking balance | `8964.77` | `8939.78` |
| Freelance gross receipts | `10250.00` | `10250.00` |
| Interest income | `77.75` | `77.75` |
| Schedule C-style cash expenses before mileage | `1142.98` | `1167.97` |
| Schedule C-style net before mileage | `9107.02` | `9082.03` |
| Cash charitable contributions | `370.00` | `370.00` |
| Federal estimated tax payments | `1050.00` | `1050.00` |

## Workflow Coverage

| Capability | Coverage | Notes | Evidence |
|---|---|---|---|
| Bookkeeping | strong | Accounts, categories, tags, counterpart accounts, transactions, balances, and double-entry concepts are first-class. | `evidence/fixtures/firefly_day11_summary.json`, [FIREFLY-REPO] |
| Reporting | strong for personal finance | Insight endpoints returned income/expense by category; tax-specific reports required wrapper aggregation. | `evidence/fixtures/firefly_day11_summary.json`, [FIREFLY-API-DOCS] |
| Tax-line mapping | manual | Tax hints were stored as category names, tags, notes, and wrapper logic; no tax-line schema validation. | `evidence/fixtures/firefly_day11_transactions_after_add.json` |
| Form 1040 | unsupported | Estimated tax payments can be categorized, but no Form 1040 workflow exists. | [FIREFLY-DOCS] |
| Schedule A | partial/manual | Charity expenses can be tracked by category, but no Schedule A form logic. | `evidence/fixtures/firefly_day11_summary.json` |
| Schedule B | partial/manual | Interest income can be tracked by category, but no Schedule B form logic. | `evidence/fixtures/firefly_day11_summary.json` |
| Schedule C | partial/manual | Business income/expense categories and API reports worked well; no Schedule C form or deduction rules. | `evidence/fixtures/firefly_day11_summary.json` |
| Schedule D | unsupported unless user models data | No capital-gains workflow tested. | [FIREFLY-DOCS] |
| Schedule E | unsupported unless user models data | No rental/royalty workflow tested. | [FIREFLY-DOCS] |
| Common credits | unsupported | No credit calculation workflow found. | [FIREFLY-DOCS] |
| Tax form generation | unsupported | No federal PDF form generation path found. | [FIREFLY-DOCS] |
| Tax-year support | date-range only | Reports and API queries can use dates; no annual tax package support. | `evidence/fixtures/firefly_day11_summary.json` |
| E-file or submission path | unsupported | No IRS MeF/e-file workflow. | [FIREFLY-DOCS] |
| Import from banks/files | strong ecosystem but not tested | Data Importer is designed for import workflows; Day 11 used direct REST posting instead. | [FIREFLY-DATA-IMPORTER] |
| Export for other systems | strong | API returned structured JSON; CLI export command exists but was not deeply exercised. | `evidence/commands/07-08-2026_firefly-iii_version.txt`, `evidence/fixtures/firefly_day11_transactions_after_add.json` |

Stated non-goals and exclusions:

- State returns: Unsupported.
- Foreign filers: Not applicable to core personal-finance tracking.
- Business returns: Unsupported as tax returns; business-like bookkeeping categories can be modeled.
- Production filing: Unsupported.
- Other: Firefly III is a self-hosted personal-finance manager, not tax preparation, tax calculation, or tax submission software.

## Safety and Failure Behavior

| Area | Finding | Evidence |
|---|---|---|
| Dry-run or validation mode | No REST dry-run path found for transaction creation; `/transactions` is mutating. | `evidence/fixtures/firefly_day11_evaluate.mjs` |
| Scratch/test data support | Good if Docker is available. Local isolated containers, volumes, and synthetic user worked. | `evidence/commands/07-08-2026_firefly-iii_setup.txt` |
| Destructive operations | Main mutations were isolated to scratch containers. Unknown category test intentionally mutated scratch state by auto-creating a category and transaction. | `evidence/fixtures/firefly_day11_failure_results.json` |
| Bad date handling | Rejected `13-40-2025` with HTTP 422 and field-level `transactions.0.date` error. | `evidence/fixtures/firefly_day11_failure_results.json` |
| Invalid amount handling | Rejected `not-a-number` with HTTP 422 and field-level `transactions.0.amount` error. | `evidence/fixtures/firefly_day11_failure_results.json` |
| Unknown account/category handling | Unknown `category_name` was accepted and auto-created, then transaction was stored. Wrapper-side allowlists are needed for controlled tax categories. | `evidence/fixtures/firefly_day11_failure_results.json` |
| Missing file handling | Missing local fixture failed before API call with clear `ENOENT`; not a Firefly API behavior. | `evidence/fixtures/firefly_day11_failure_results.json` |
| Duplicate transaction ID | Duplicate T001-like transaction was rejected with HTTP 422 when `error_if_duplicate_hash` was true. | `evidence/fixtures/firefly_day11_failure_results.json` |
| Error clarity | Strong for date, amount, and duplicate hash; unknown category auto-create is convenient but risky for tax-controlled mappings. | `evidence/fixtures/firefly_day11_failure_results.json` |

## Project Health

| Signal | Finding | Evidence |
|---|---|---|
| Recent commits | Large active repository; GitHub page showed 23,322 commits during Day 11 check. | [FIREFLY-REPO] |
| Release cadence | v6.6.6 was latest stable release on 07-01-2026; Docker image tag matched the release. | [FIREFLY-RELEASES], `evidence/commands/07-08-2026_firefly-iii_version.txt` |
| Annual tax-year support pattern | Not applicable; releases are app releases, not tax-year packages. | [FIREFLY-DOCS] |
| Issue/PR activity | GitHub page showed active issues/discussions and large user community. | [FIREFLY-REPO] |
| Contributor signals | Mature project with docs, Docker repo, Data Importer, third-party app docs, and sponsor/community channels. | [FIREFLY-REPO], [FIREFLY-DOCKER], [FIREFLY-DATA-IMPORTER] |
| Documentation quality | Strong for deployment and API discovery; API docs gave enough schema detail for Day 11 helper. | [FIREFLY-API], [FIREFLY-API-DOCS] |
| Data format durability | Moderate. API is durable; storage is app/database-owned rather than a simple plain-text accounting file. | `evidence/commands/07-08-2026_firefly-iii_version.txt` |
| License constraints | AGPL-3.0 needs careful review before redistributed wrappers or hosted/network services. | [FIREFLY-REPO] |

## Integration Assessment

- Best integration shape: REST adapter that owns authentication, pre-validates controlled categories/accounts, posts JSON transactions, and exports normalized JSON summaries from transactions plus insight endpoints.
- Thin-wrapper feasibility: High once the server is running and a token exists. The Day 11 helper created accounts/categories, posted transactions, queried reports, and exported JSON with standard `fetch`.
- Structured I/O quality: Excellent. API responses are JSON and include usable IDs, transaction groups, splits, categories, tags, notes, and external IDs.
- Agent-consumable workflow fit: Strong for API automation, moderate for tax workflow because all tax semantics are wrapper-side.
- Main blockers: Docker/server setup, API auth/token lifecycle, AGPL implications, auto-created unknown categories, no native tax forms, no dry-run transaction creation found.
- Best demo idea: REST-first bookkeeping adapter that ingests synthetic CSV, enforces a tax-category allowlist, posts to Firefly, then returns category-level Schedule C-style summaries and raw API links.
- Prototype suitability: High for demonstrating REST API integration; lower than hledger if the prototype must be lightweight and local-file based.

## Scores

| Criterion | Score | Rationale |
|---|---:|---|
| Relevance to research question | 4 | Excellent personal-finance/API comparator; indirect tax relevance. |
| Programmatic surface quality | 5 | Strong documented REST JSON API and OpenAPI-style docs. |
| Setup feasibility | 3 | Docker worked, but startup/auth/key setup is heavier than hledger or Actual. |
| Structured input/output | 5 | JSON request/response model is excellent for wrappers and agents. |
| Workflow coverage | 3 | Bookkeeping workflow worked strongly; native tax workflow is absent. |
| Safety and failure clarity | 4 | 422 validation and duplicate rejection were clear; unknown category auto-create needs wrapper controls. |
| Project health | 5 | Mature, active, well-documented, large user ecosystem. |
| Prototype/demo potential | 4 | Strong REST demo candidate, with setup/licensing tradeoffs. |

## Evidence Index

- [x] Official project page: [FIREFLY-HOME] https://www.firefly-iii.org/
- [x] Source repository: [FIREFLY-REPO] https://github.com/firefly-iii/firefly-iii
- [x] License: [FIREFLY-REPO] https://github.com/firefly-iii/firefly-iii
- [x] Release/version: [FIREFLY-RELEASES] https://github.com/firefly-iii/firefly-iii/releases, `evidence/commands/07-08-2026_firefly-iii_version.txt`
- [x] Documentation: [FIREFLY-DOCS] https://docs.firefly-iii.org/, [FIREFLY-API] https://docs.firefly-iii.org/references/firefly-iii/api/, [FIREFLY-API-DOCS] https://api-docs.firefly-iii.org/
- [x] Command output: `evidence/commands/07-08-2026_firefly-iii_setup.txt`, `evidence/commands/07-08-2026_firefly-iii_version.txt`, `evidence/commands/07-08-2026_firefly-iii_workflow.txt`, `evidence/commands/07-08-2026_firefly-iii_failure-tests.txt`
- [x] Metadata snapshot: `research/project_health_snapshot.md`, `research/programmatic_surface_survey.md`
- [ ] Screenshots, if any: Not needed for API-only Day 11 evaluation.

## Open Questions

- Should a prototype use Firefly III despite Docker/auth setup, or prefer hledger/Actual for lower-friction local demos?
- Is there a supported transaction validation/dry-run endpoint, or should wrappers always validate before mutation?
- What is the safest production path for creating and rotating personal access tokens without a UI-driven setup?
- Should tax-category allowlists be stored in Firefly categories, tags, rules, or entirely in the wrapper?
- Does the Data Importer add enough import realism to justify a separate Day 12/backup evaluation?

## Decision Notes

Firefly III should remain the leading REST-first personal-finance comparator. It is not a tax tool, but it proves that a clean API-backed bookkeeping adapter can ingest synthetic freelancer transactions, preserve tax hints, compute comparable Schedule C-style totals, and expose structured JSON outputs. For a final prototype, Firefly is attractive if the goal is to showcase REST integration; hledger remains simpler if the goal is a lightweight, transparent, file/CLI adapter.

[FIREFLY-HOME]: https://www.firefly-iii.org/
[FIREFLY-REPO]: https://github.com/firefly-iii/firefly-iii
[FIREFLY-DOCS]: https://docs.firefly-iii.org/
[FIREFLY-API]: https://docs.firefly-iii.org/references/firefly-iii/api/
[FIREFLY-API-DOCS]: https://api-docs.firefly-iii.org/
[FIREFLY-RELEASES]: https://github.com/firefly-iii/firefly-iii/releases
[FIREFLY-DOCKER]: https://github.com/firefly-iii/docker
[FIREFLY-DATA-IMPORTER]: https://github.com/firefly-iii/data-importer
[FIREFLY-THIRD-PARTIES]: https://docs.firefly-iii.org/references/firefly-iii/third-parties/apps/
