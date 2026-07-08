# Tool Record: hledger

## Status

| Field | Value |
|---|---|
| Tool slug | `hledger` |
| Category | bookkeeping / adjacent infrastructure |
| Record status | complete draft |
| Last updated | 07-08-2026 UTC / 07-07-2026 PDT |
| Evaluator | Codex |
| Evaluation phase | Phase 9 |

## One-Sentence Summary

hledger is a mature plain-text accounting tool with a strong CLI, CSV rules, and JSON export surface, making it a high-feasibility integration target for tax-adjacent bookkeeping reports but not a native US tax return tool.

## Identity

| Field | Value | Evidence |
|---|---|---|
| Primary project URL | https://hledger.org/ | [HLEDGER-HOME] |
| Source repository | https://github.com/simonmichael/hledger | [HLEDGER-REPO] |
| Documentation | https://hledger.org/1.52/hledger.html | [HLEDGER-MANUAL] |
| License | GPL-3.0-or-later | [HLEDGER-REPO] |
| Latest visible release | Stable release `1.52.1`, release notes dated 2026-04-28; local binary reported `hledger 1.52.1-g3834a163b-20260428, windows-x86_64`. | [HLEDGER-INSTALL], [HLEDGER-RELEASE-NOTES], `evidence/commands/07-08-2026_hledger_version.txt` |
| Main implementation language | Haskell | [HLEDGER-REPO] |
| Package/distribution channel | Official GitHub release binaries; project docs also list package managers such as Winget, Scoop, Chocolatey, Docker, and Homebrew. | [HLEDGER-INSTALL], `evidence/commands/07-08-2026_hledger_setup.txt` |
| Maintainer or organization | Simon Michael and contributors | [HLEDGER-REPO], [HLEDGER-RELEASE-NOTES] |

## Research Fit

- Workflow category: Plain-text accounting, CLI reporting, and import/export infrastructure.
- Consumer/freelancer relevance: Strong for freelancers who can maintain accounts/categories and export reports from bank-like CSV data.
- US tax relevance: Indirect. The tool can summarize Schedule C-style income/expenses, interest, charitable contributions, and estimated payments if those categories are modeled in accounts or tags.
- Non-US comparator value: Strong as a general plain-text accounting integration pattern, but it is not country-specific.
- Why included: It offers the fastest low-setup path to test file/CLI/JSON integration against the shared synthetic dataset.
- Why this might be excluded later: It does not calculate taxes, generate Form 1040 schedules, or provide e-file/submission workflows.

## Programmatic Surface

| Surface | Present? | Stability | Input shape | Output shape | Evidence |
|---|---:|---|---|---|---|
| CLI | yes | documented stable | Command arguments plus journal/CSV/rules files | Text, JSON, CSV/TSV, HTML, SQL depending on command | [HLEDGER-MANUAL], `evidence/commands/07-08-2026_hledger_workflow.txt` |
| Library/API import | partial | documented ecosystem, not tested | Haskell packages/source modules | Haskell data structures | [HLEDGER-REPO] |
| REST or HTTP API | yes through hledger-web | documented, not tested locally | HTTP routes over a journal | JSON | [HLEDGER-WEB] |
| Plugin or extension system | yes | documented | `hledger-*` add-on commands in PATH | Command-specific | [HLEDGER-MANUAL] |
| File format or schema | yes | documented stable | hledger/ledger journals, CSV/SSV/TSV with rules | Journal entries and reports | [HLEDGER-MANUAL], `evidence/fixtures/hledger_synthetic_freelancer.rules` |
| Database access | not primary | not tested | N/A | SQL export is available for some commands | [HLEDGER-MANUAL] |
| Export format | yes | documented and tested for JSON | CLI report command | JSON tested; text tested | [HLEDGER-MANUAL], `evidence/fixtures/hledger_day9_baseline_print.json` |

Notes:

- Documented surfaces: CLI, journal files, CSV rules, report export, add-on commands, and hledger-web.
- Inferred surfaces: Haskell package/library embedding may be possible but was not part of this Windows CLI evaluation.
- Missing or unclear surfaces: No native tax-form schema, no IRS form generation, and no built-in duplicate transaction ID validation in this workflow.

## Prior Art and Existing Integrations

- Third-party wrappers: Not deeply evaluated on Day 9.
- Package bindings: Haskell source/packages exist upstream; not tested as an importable library.
- Plugins/extensions: hledger add-on commands and hledger-web are part of the ecosystem.
- Example automation scripts: CSV rules and CLI report commands are the main automation pattern for this evaluation.
- Related ecosystem tools: Ledger, Beancount, hledger-web, hledger-ui, and plain-text-accounting import tools.
- Evidence: `research/programmatic_surface_survey.md`, [HLEDGER-MANUAL], [HLEDGER-WEB].

## Setup and First Useful Operation

Environment:

- OS: Microsoft Windows 11 Home, 64-bit.
- Runtime/package manager: PowerShell 5.1; Winget was present but not used.
- Tool version: `hledger 1.52.1-g3834a163b-20260428, windows-x86_64`.
- Install source: Official GitHub release ZIP downloaded to a temporary directory; no global install was performed.

Commands attempted:

```text
See:
- evidence/commands/07-08-2026_hledger_setup.txt
- evidence/commands/07-08-2026_hledger_version.txt
- evidence/commands/07-08-2026_hledger_workflow.txt
- evidence/commands/07-08-2026_hledger_failure-tests.txt
```

Results:

- Time to first useful operation: A few minutes, including release ZIP download, extraction, rules-file creation, and first successful `print` from CSV.
- First useful operation: `hledger --rules evidence\fixtures\hledger_synthetic_freelancer.rules -f evidence\fixtures\synthetic_freelancer_transactions.csv print`.
- First useful output: Balanced journal entries generated from the canonical synthetic CSV.
- Setup friction: Low. Main friction was writing the hledger CSV rules file and keeping PowerShell argument/error handling clean.
- Evidence files: Listed above.

## Synthetic Workflow Results

| Operation | Result | Structured output? | Evidence |
|---|---|---:|---|
| Load data | Success. hledger read the canonical CSV through `hledger_synthetic_freelancer.rules` and generated 19 balanced transactions. | yes | `evidence/commands/07-08-2026_hledger_workflow.txt` |
| Add transaction | Success. Adding `hledger_synthetic_freelancer_tadd.csv` changed checking from `USD8964.77` to `USD8939.78`. | yes | `evidence/commands/07-08-2026_hledger_workflow.txt`, `evidence/fixtures/hledger_day9_with_tadd_print.json` |
| List accounts | Success. Output included all expected synthetic accounts/categories. | text | `evidence/commands/07-08-2026_hledger_workflow.txt` |
| Compute balance | Success. Baseline checking balance was `USD8964.77`; after `TADD`, it was `USD8939.78`. | yes | `evidence/commands/07-08-2026_hledger_workflow.txt`, `evidence/fixtures/hledger_day9_baseline_checking_balance.json` |
| Run report | Success. `incomestatement --depth 3` reported revenues of `USD10327.75`, expenses of `USD1512.98`, and net of `USD8814.77`. Estimated tax payments are tracked outside income statement expenses. | text | `evidence/commands/07-08-2026_hledger_workflow.txt` |
| Export result | Success. `print -O json` and `balance ... -O json` produced machine-readable JSON. | yes | `evidence/fixtures/hledger_day9_baseline_print.json`, `evidence/fixtures/hledger_day9_baseline_checking_balance.json` |

## Workflow Coverage

| Capability | Coverage | Notes | Evidence |
|---|---|---|---|
| Bookkeeping | strong | Double-entry records generated from CSV with account/category mappings. | `evidence/commands/07-08-2026_hledger_workflow.txt` |
| Reporting | strong | Balance and income statement reports worked immediately. | `evidence/commands/07-08-2026_hledger_workflow.txt` |
| Tax-line mapping | partial/manual | Tax hints can be preserved as comments/tags, but no authoritative tax-line model exists. | `evidence/fixtures/hledger_synthetic_freelancer.rules` |
| Form 1040 | unsupported | No native federal return form workflow. | [HLEDGER-MANUAL] |
| Schedule A | partial/manual | Charitable contributions can be tracked in accounts. | `evidence/commands/07-08-2026_hledger_workflow.txt` |
| Schedule B | partial/manual | Interest income can be tracked in accounts. | `evidence/commands/07-08-2026_hledger_workflow.txt` |
| Schedule C | partial/manual | Business income and expenses can be reported by account. | `evidence/commands/07-08-2026_hledger_workflow.txt` |
| Schedule D | unsupported unless user models data | No capital-gains tax-form workflow tested. | [HLEDGER-MANUAL] |
| Schedule E | unsupported unless user models data | No rental/royalty tax-form workflow tested. | [HLEDGER-MANUAL] |
| Common credits | unsupported | No credit calculation workflow. | [HLEDGER-MANUAL] |
| Tax form generation | unsupported | No Form 1040/PDF generation path found in this evaluation. | [HLEDGER-MANUAL] |
| Tax-year support | not applicable | General date-based accounting, not annual tax package support. | [HLEDGER-MANUAL] |
| E-file or submission path | unsupported | No MeF/e-file workflow. | [HLEDGER-MANUAL] |
| Import from banks/files | strong | CSV rules are a first-class import path. | [HLEDGER-MANUAL], `evidence/fixtures/hledger_synthetic_freelancer.rules` |
| Export for other systems | strong | JSON export tested; docs describe additional output formats. | `evidence/fixtures/hledger_day9_baseline_print.json`, [HLEDGER-MANUAL] |

Stated non-goals and exclusions:

- State returns: Unsupported.
- Foreign filers: Not applicable to core accounting engine.
- Business returns: Unsupported as tax forms; bookkeeping can model business accounts.
- Production filing: Unsupported.
- Other: hledger is an accounting/reporting tool, not a consumer tax-preparation product.

## Safety and Failure Behavior

| Area | Finding | Evidence |
|---|---|---|
| Dry-run or validation mode | Most report commands are read-only by default; this evaluation did not use mutating `import` or `add`. | `evidence/commands/07-08-2026_hledger_workflow.txt` |
| Scratch/test data support | Excellent for isolated local files and temp binaries. | `evidence/commands/07-08-2026_hledger_setup.txt` |
| Destructive operations | None in the tested workflow. | `evidence/commands/07-08-2026_hledger_workflow.txt` |
| Bad date handling | Rejected `13-40-2025` with field-specific date-format guidance. | `evidence/commands/07-08-2026_hledger_failure-tests.txt` |
| Invalid amount handling | Rejected `not-a-number` with rule details and parse-error location. | `evidence/commands/07-08-2026_hledger_failure-tests.txt` |
| Unknown account handling | Accepted implicitly and created/listed `Expenses:Business:Imaginary Category` under default settings. | `evidence/commands/07-08-2026_hledger_failure-tests.txt` |
| Missing file handling | Rejected missing CSV with a clear file-not-found message. | `evidence/commands/07-08-2026_hledger_failure-tests.txt` |
| Duplicate transaction ID | Accepted duplicate `T001`; both transactions printed under `code:T001`. A wrapper must enforce uniqueness if IDs matter. | `evidence/commands/07-08-2026_hledger_failure-tests.txt` |
| Error clarity | Strong for malformed date, invalid amount, and missing file; permissive account and ID behavior requires wrapper guardrails. | `evidence/commands/07-08-2026_hledger_failure-tests.txt` |

## Project Health

| Signal | Finding | Evidence |
|---|---|---|
| Recent commits | Prior Day 5 snapshot found active development around 07-05-2026. | `research/project_health_snapshot.md` |
| Release cadence | Official docs list current stable `1.52.1`; release notes show `2026-04-28 hledger-1.52.1`. | [HLEDGER-INSTALL], [HLEDGER-RELEASE-NOTES] |
| Annual tax-year support pattern | Not applicable; hledger is not a tax-year-specific filing tool. | [HLEDGER-MANUAL] |
| Issue/PR activity | Prior Day 5 snapshot captured strong repository/community signals. | `research/project_health_snapshot.md` |
| Contributor signals | Release notes and repo show maintained project with contributors. | [HLEDGER-RELEASE-NOTES], [HLEDGER-REPO] |
| Documentation quality | Excellent. Manual, install page, CSV import docs, export docs, and hledger-web docs are substantial. | [HLEDGER-MANUAL], [HLEDGER-INSTALL], [HLEDGER-WEB] |
| Data format durability | Strong. Plain text journal plus CSV rules are transparent and version-control friendly. | [HLEDGER-MANUAL] |
| License constraints | GPL-3.0-or-later. Fine for local evaluation; redistribution or embedding needs license review. | [HLEDGER-REPO] |

## Integration Assessment

- Best integration shape: Thin CLI wrapper that generates or validates hledger CSV rules/journals, runs read-only reports, and parses JSON output.
- Thin-wrapper feasibility: High. The Day 9 workflow used only local files and deterministic CLI calls.
- Structured I/O quality: Strong, though JSON is hledger-shaped and nested; a wrapper should normalize it for downstream consumers.
- Agent-consumable workflow fit: Strong for synthetic bookkeeping analysis, account summaries, and report generation.
- Main blockers: No native tax form coverage, permissive account creation, no duplicate transaction ID enforcement, and GPL obligations if distributing a derived/service integration.
- Best demo idea: CSV-to-hledger-to-JSON report pipeline that maps synthetic freelancer transactions into accounts and returns checking balance plus Schedule C-style income/expense summaries.
- Prototype suitability: Very high as a low-risk file/CLI prototype target; lower if the final prototype must demonstrate true tax calculation or filing.

## Scores

| Criterion | Score | Rationale |
|---|---:|---|
| Relevance to research question | 4 | Excellent for bookkeeping/API-style integration; indirect for tax prep. |
| Programmatic surface quality | 5 | CLI, CSV rules, JSON export, and hledger-web create multiple automation paths. |
| Setup feasibility | 5 | Official Windows binary worked from a temp folder without global install. |
| Structured input/output | 4 | CSV/rules input and JSON output worked; output normalization is still needed. |
| Workflow coverage | 4 | Covered all common bookkeeping operations; tax-form operations unsupported. |
| Safety and failure clarity | 4 | Bad date/amount/missing file errors were clear; unknown accounts and duplicate IDs are permissive. |
| Project health | 5 | Mature, active, documented project with a current stable release. |
| Prototype/demo potential | 5 | Strongest low-setup candidate for a reliable synthetic-data CLI demo. |

## Evidence Index

- [x] Official project page: [HLEDGER-HOME] https://hledger.org/
- [x] Source repository: [HLEDGER-REPO] https://github.com/simonmichael/hledger
- [x] License: [HLEDGER-REPO] https://github.com/simonmichael/hledger
- [x] Release/version: [HLEDGER-INSTALL] https://hledger.org/install.html, [HLEDGER-RELEASE-NOTES] https://hledger.org/release-notes.html, `evidence/commands/07-08-2026_hledger_version.txt`
- [x] Documentation: [HLEDGER-MANUAL] https://hledger.org/1.52/hledger.html, [HLEDGER-WEB] https://hledger.org/1.52/hledger-web.html
- [x] Command output: `evidence/commands/07-08-2026_hledger_setup.txt`, `evidence/commands/07-08-2026_hledger_workflow.txt`, `evidence/commands/07-08-2026_hledger_failure-tests.txt`
- [x] Metadata snapshot: `research/project_health_snapshot.md`
- [ ] Screenshots, if any: Not needed for CLI-only Day 9 evaluation.

## Open Questions

- Should Day 14 prototype selection test hledger-web's JSON API, or is the CLI/JSON path enough?
- Should a wrapper generate strict account declarations to catch unknown categories before hledger accepts them?
- Should transaction IDs be enforced outside hledger with a preflight duplicate check?
- Which normalized JSON shape should the Week 3 prototype expose if hledger becomes the prototype target?
- How should GPL-3.0-or-later obligations be described if the prototype wraps or redistributes hledger?

## Decision Notes

hledger should remain a leading prototype candidate for the file/CLI/JSON integration path. It is not a tax-preparation engine, but it is excellent for turning synthetic freelancer bookkeeping facts into transparent, repeatable, machine-readable summaries that could feed a tax-oriented layer later.

[HLEDGER-HOME]: https://hledger.org/
[HLEDGER-REPO]: https://github.com/simonmichael/hledger
[HLEDGER-MANUAL]: https://hledger.org/1.52/hledger.html
[HLEDGER-INSTALL]: https://hledger.org/install.html
[HLEDGER-RELEASE-NOTES]: https://hledger.org/release-notes.html
[HLEDGER-WEB]: https://hledger.org/1.52/hledger-web.html
