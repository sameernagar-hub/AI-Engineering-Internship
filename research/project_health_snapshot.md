# Project Health Snapshot

Day 5 artifact for Phase 5: Metadata and Health Snapshot.

Planned phase date: 2026-07-05. Executed on 2026-07-05.

## Purpose

This snapshot normalizes project-health evidence before the Day 7 shortlist decision. It does not decide the final shortlist by itself; it captures comparable signals so the next phase can focus on programmatic surfaces instead of re-litigating basic project viability.

Health signals checked:

- Recent repository activity, package uploads, releases, or project-page updates.
- License posture.
- Contributor and community signals visible from GitHub, SourceForge, PyPI, or official docs.
- Documentation quality and public evidence quality.
- Tax-year support patterns for tax-oriented projects.
- Data/storage format and likely automation substrate.

Dates and counts are visible public-source observations from 2026-07-05. Star, fork, issue, and PR counts should be treated as directional, not permanent facts.

## Shortlist Pressure

- Strongest integration-health candidates: hledger, Firefly III, Actual Budget, Beancount, and GnuCash. hledger has the best mix of plain-text accounting and structured output/API surface; Firefly III and Actual have the best app/API posture; Beancount has the cleanest source data model; GnuCash is the best mature desktop personal-finance representative but carries setup and binding risk.
- Strongest tax-form or tax-calculation candidates: OpenTaxSolver, UsTaxes, tenforty, Filed Open Tax Engine, Tax-Calculator, and PolicyEngine US. They serve different roles: OpenTaxSolver and UsTaxes are consumer-return/form oriented, tenforty wraps tax calculations into Python, Filed Open Tax Engine is new and agent-oriented, and Tax-Calculator/PolicyEngine US are mature model/rules comparators rather than filing tools.
- Reference-only or cautionary tax candidates: IRS Direct File, OpenFile, and IRS Tax Withholding Estimator. They are valuable architecture and source-transparency examples, but not suitable as active filing or production-calculation candidates.
- Supporting infrastructure: ofxtools, beangulp, smart_importer, beancount-import, ledger-autosync, and ofxstatement are useful prototype substrate, especially for CSV/OFX-to-ledger flows, but should not crowd out the main shortlist.

## Core Candidate Matrix

| Candidate | Activity / release health | License | Contributor / community signals | Docs quality | Tax-year pattern | Data / automation substrate | Day 7 implication | Evidence |
|---|---|---|---|---|---|---|---|---|
| GnuCash | Recent GitHub push on 2026-07-03; latest release 5.16 published 2026-06-28. | GPL-family mix, mostly GPL-2.0-or-later. | Large, old project; GitHub check showed about 4.3k stars, 960 forks, 54 open issues, and multiple high-volume long-term contributors. | Mature docs and wiki, including Python binding and external-interface notes. | No annual tax-year support; bookkeeping and reports only. | Local XML or SQL-backed books, import/export formats, optional Python bindings, `gnucash-cli` reports. | Keep as mature desktop/full-app representative; verify Windows automation setup before shortlisting as prototype target. | [GH-GNUCASH], [REL-GNUCASH], [DOC-GNUCASH], [DOC-GNUCASH-PY] |
| Beancount | Recent GitHub push on 2026-05-18; PyPI 3.2.3 uploaded 2026-05-05. | GPL-2.0-only. | About 5.8k stars, 447 forks, 230 open issues; ecosystem includes Fava, beangulp, smart_importer, and beancount-import. | Strong docs for language, tools, and ecosystem; importer docs split across projects. | No tax-year support; accounting data can be mapped externally. | Plain-text ledger files, Python parser/data structures, CLI/query/report tooling. | Strong candidate for transparent data and thin adapters. | [GH-BEANCOUNT], [PYPI-BEANCOUNT], [DOC-BEANCOUNT] |
| Ledger CLI | Recent GitHub push on 2026-07-03; latest release v3.4.1 on 2025-10-26. | BSD-style / BSD-3-Clause-like; GitHub API reports nonstandard "Other". | About 6.0k stars, 543 forks, 10 open issues; old project with long commit history. | Strong manual and C++ API docs, but practical automation is likely CLI/file based. | No tax-year support. | Plain-text journals, CLI reports, possible C++ API. | Keep as canonical CLI accounting baseline; structured output risk needs Day 6 scrutiny. | [GH-LEDGER], [REL-LEDGER], [DOC-LEDGER] |
| hledger | Very recent GitHub activity on 2026-07-05; latest release 1.52.1 on 2026-04-28. | GPL-3.0-or-later. | About 4.6k stars, 390 forks, 339 open issues; active maintainer plus contributors. | Excellent manual, CSV import docs, export docs, and hledger-web API docs. | No direct tax-year support. | Plain-text journals, CLI/TUI/web, CSV rules, JSON output, hledger-web JSON API. | One of the strongest overall integration candidates. | [GH-HLEDGER], [DOC-HLEDGER], [DOC-HLEDGER-WEB], [DOC-HLEDGER-CSV] |
| Firefly III | Recent GitHub push on 2026-07-04; latest release v6.6.6 on 2026-07-01. | AGPL-3.0. | About 23.9k stars, 2.2k forks, 147 open issues; large visible third-party app ecosystem. | Strong product docs and dedicated API docs. | No tax-year support; personal finance only. | Self-hosted app, database-backed storage, JSON REST API, data importer. | Strongest REST-first personal-finance candidate. | [GH-FIREFLY], [REL-FIREFLY], [DOC-FIREFLY], [DOC-FIREFLY-API] |
| Actual Budget | Release docs show 26.7.0 on 2026-07-01; repo page shows about 27.4k stars, 2.6k forks, 166 issues, 44 PRs, and 5,246 commits. | MIT. | Large active community, docs, Discord, many release-note contributors. | Strong community docs, official API docs, and CLI docs; 26.7.0 made the CLI stable. | No tax-year support. | Local-first budget files, sync server, official Node API, stable CLI, JSON/table/CSV-oriented CLI output. | Strong API/CLI-native personal-finance comparator; likely easier to script than desktop-only tools. | [GH-ACTUAL], [DOC-ACTUAL-REL], [DOC-ACTUAL-API], [DOC-ACTUAL-CLI] |
| OpenTaxSolver | SourceForge last update 2026-03-20; 2025 tax-year v23.06 download posted 2026-03-19. | GPL-2.0. | Long-running SourceForge project; visible reviews are mixed and include form-coverage caveats. | Download/revision notes are specific; docs are practical but not API-oriented. | Strong annual pattern: 2025 package includes federal 1040, schedules 1-3/A-D, selected forms, and several state packages. | Local C app, graphical/textual interfaces, source packages, filled/printable tax forms. | Keep as the main legacy tax-form comparator; weak programmatic surface likely limits prototype fit. | [SF-OTS], [REL-OTS-2025] |
| UsTaxes | GitHub commit history shows activity through 2026-07-03; latest GitHub release remains app-v0.1.22 from 2023-04-17. | AGPL-3.0. | About 1.7k stars, 139 forks, 50 issues, and 36-37 PRs. | README is detailed; repo includes docs and schemas. | Explicitly supports tax years 2020-2025 for many income/deduction inputs; partial state coverage. | Client-side web app, localStorage, desktop/Tauri build, schemas, PDF/form workflow. | Strong consumer-return candidate, but stale release tags mean hands-on testing should use source/current app, not releases. | [GH-USTAXES], [COMMITS-USTAXES] |
| HabuTax | Last visible commits and PyPI 0.2.1 are from 2024-02-24. | GPL-2.0. | Small project: about 43 stars, 10 forks, 2 issues; single-maintainer-looking activity. | README explains goals, implemented forms, CLI use, tests, and contributor path. | Implemented forms center on TY2023-era support; annual freshness is weak after 2024. | Python package/CLI, INI-style input files, stdout or `.solution` output, optional PDF fill via pdftk. | Attractive scriptability, but health is weaker than UsTaxes/OpenTaxSolver/tenforty. | [GH-HABUTAX], [PYPI-HABUTAX] |
| Filed Open Tax Engine | Public repo is new and narrow; latest visible commit/release activity around 2026-05-11. | AGPL-3.0 plus visible commercial license file. | Small public footprint: about 22 stars, 5 forks, 0 issues; 443 commits visible. | Strong README and site positioning, especially for agents and single-binary CLI. | Claims TY2025 Form 1040 coverage, 131 input nodes, and future forms/states. | Single binary CLI, JSON inputs/outputs, Zod schemas, local state, claimed MeF XML export. | High demo potential, but must be treated as new/unproven until hands-on accuracy and release cadence are checked. | [GH-FILED-OPENTAX], [DOC-FILED-OPENTAX] |
| PSL Tax-Calculator | Very active: commits on 2026-07-04; release 6.7.1 published 2026-07-03. | CC0-1.0 / public-domain style. | About 301 stars, 163 forks, 16 issues, 1 PR, 10k+ commits; mature PSL project. | Extensive docs, contributor guide, Python API and CLI docs. | Tax policy model with annual parameter/release cadence; not consumer filing. | Python package, CLI, policy/input/output variables, dataframes. | Keep as mature programmatic tax-model comparator; not a filing or form-prep tool. | [GH-TAXCALC], [COMMITS-TAXCALC], [DOC-TAXCALC], [PYPI-TAXCALC] |
| PolicyEngine US | Extremely active: commits on 2026-07-05; PyPI 1.756.8 uploaded 2026-07-05. | AGPL-3.0. | About 148 stars, 210 forks, 1.1k issues, 44 PRs, 23k+ commits. | Strong README and docs posture; README notes direct microsimulation is being migrated to the managed `policyengine.py` bundle. | Broad federal/state tax-benefit rules; not a return-filing product. | Python package, rules-as-code model, household-level calculations, microsimulation inputs. | Keep as rules-engine comparator; not a consumer filing prototype target unless mentor wants policy modeling. | [GH-POLICYENGINE-US], [COMMITS-POLICYENGINE-US], [PYPI-POLICYENGINE-US] |
| IRS Tax Withholding Estimator | Official public codebase with 839 commits; no GitHub releases; README says TWE 2.0 went live 2026-02-27. | Public domain / CC0-1.0. | About 80 stars and 11 forks; official transparency repo. | Strong README and developer setup docs, but legal disclaimer warns not to use repository code as the official estimator. | Current-year withholding estimator, not annual return prep. | Scala/XML-oriented codebase, Fact Graph dependency, W-4/W-4P outputs. | Valuable official reference for transparency, withholding math, and disclaimers; not a shortlist prototype target. | [GH-IRS-TWE] |
| IRS Direct File | Repo had recent public-code movement in June 2026, but IRS page says Direct File is no longer available; no conventional releases. | Public domain / CC0-1.0. | Large public interest: about 4.6k stars and 1.4k forks; public repo is historical/reference-oriented. | High architecture value; active service status is unavailable. | Page documents 2024 eligibility and limited income/credit/deduction support, but active service is discontinued. | Fact Graph, tax form translation, MeF/state-transfer architecture. | Keep as reference architecture only; do not shortlist as active filing path. | [GH-DIRECT-FILE], [LIC-DIRECT-FILE], [IRS-DIRECT-FILE] |
| OpenFile | GitHub page shows activity through 2026-06-03; no releases; public fork of Direct File. | Public domain in US plus CC0-1.0 worldwide. | About 188 stars, 14 forks, 4 issues, 12 PRs. | Docs exist, but project inherits Direct File complexity and warns about accuracy/status. | Direct File-derived; independent annual-support reliability is unproven. | Dockerized Direct File fork with inherited client/state API architecture. | Keep as cautionary fork/reference candidate; do not prioritize for hands-on evaluation unless Direct File architecture is the focus. | [GH-OPENFILE], [LIC-OPENFILE], [DOC-OPENFILE] |
| tenforty | PyPI/GitHub latest visible version v2025.10 on 2026-05-03. | MIT. | About 81 stars, 13 forks, 25 releases; smaller but active. | README is unusually practical, with examples, limitations, validation notes, and development docs. | README supports US federal plus some state calculations; versioning tracks 2025 support; relies on OpenTaxSolver. | Python library over OpenTaxSolver, function calls, Polars/dataframe-friendly batch evaluation. | Strong lightweight programmatic tax bridge, with Windows limitation and OTS dependency to verify. | [GH-TENFORTY], [PYPI-TENFORTY] |

## Supporting and Lower-Priority Candidates

| Candidate | Health snapshot | License | Data / integration surface | Role |
|---|---|---|---|---|
| KMyMoney | Mature KDE project: repo page shows 10,625 commits, about 200 stars and 46 forks; latest release notes found for 5.2.0 on 2025-06-21. | SPDX license copies in `LICENSES/`; exact file-level mix should be cited as KDE/SPDX mix rather than a single license. | Local desktop files; import/export docs include GnuCash, QIF, OFX, CSV, and Woob. | Backup desktop comparator if GnuCash is too heavy. |
| HomeBank | SourceForge last update 2026-06-14; project website emphasizes 28 years of user feedback. | GPL-2.0 per SourceForge. | Desktop app; OFX/QIF/CSV import, duplicate detection, assignment rules. | Lower-priority personal-finance comparator; file-driven, no clear API. |
| Money Manager Ex | Large active desktop project: repo page shows 23,153 commits, v1.9.2 on 2026-01-20, about 2.2k stars and 335 forks. | GPL-2.0 plus an "unknown" secondary license file signal on GitHub. | Nonproprietary SQLite database, CSV/QIF/XML/HTML import/export. | Durable storage comparator; likely weaker than Actual/Firefly for API-style integration. |
| Fava | Active Beancount UI: PyPI 1.30.14 uploaded 2026-06-16; repo page shows 3,457 commits, about 2.5k stars and 388 forks. | MIT. | Web interface over Beancount ledgers, Python package, extension/API docs. | Beancount ecosystem prior art, not standalone shortlist unless bundled with Beancount. |
| Paisa | Healthy but indirect: v0.7.4 on 2025-08-03; repo page shows about 3.2k stars, 205 forks, 79 issues, 10 PRs. | AGPL-3.0-or-later. | Ledger/hledger/Beancount-style files imported into a SQLite-backed web UI. | UI/reporting comparator around plain-text accounting; US tax relevance is indirect. |
| ofxtools | Active OFX library: GitHub release/PyPI 1.1.1 on 2026-06-12; about 343 stars and 74 forks. | GPL-3.0-or-later. | Python OFX parser/client/generator tooling. | Strong import-layer support candidate. |
| ofxparse | Stale package: PyPI 0.21 uploaded 2021-05-31; GitHub latest release 0.20 from 2018 and no recent commit signal. | MIT. | Python OFX parser. | Keep as historical/library comparator only; weaker than ofxtools. |
| QIF parser tooling | rgoring/qif has tiny GitHub footprint and no releases; qifparse 0.5 dates to 2013-11-03. | Mixed GPL variants. | QIF parsing. | Low priority unless QIF becomes necessary. |
| beangulp | GitHub push 2026-05-30; PyPI 0.2.0 from 2025-01-20. | GPL-2.0. | Beancount 3 importer framework. | Important Beancount import substrate. |
| smart_importer | Active enough: GitHub release/PyPI 1.2 in 2025-10-17; GitHub activity into 2026. | MIT. | ML-assisted Beancount importer hooks. | Useful prior art for categorization, not a core candidate. |
| beancount-import | GitHub push 2026-06-06; latest release/PyPI 1.4.0 from 2024-04-19. | GPL-2.0. | Web UI for semi-automatic Beancount import/reconciliation. | Prior art for human-in-the-loop import. |
| ledger-autosync | GitHub release page stale at v1.0.2 from 2020, but PyPI 1.2.0 uploaded 2024-08-22 and repo had 2025 commit activity. | GPL-3.0. | OFX/bank-sync flow into Ledger journals. | Useful prior art; metadata discrepancy should be noted if cited. |
| ofxstatement | GitHub release 0.9.2 from 2024-11-25, but PyPI 0.9.3 uploaded 2025-09-10; about 362 stars, 77 forks, 14 issues. | GPL-3.0. | CLI plus plugin system converting proprietary statement files to OFX. | Strong import-layer prior art, especially for GnuCash/HomeBank workflows. |

## Health Risks to Carry Forward

- GitHub release metadata can understate health for tools that publish elsewhere. Beancount, beangulp, ledger-autosync, Fava, and ofxstatement need PyPI checks alongside GitHub release checks.
- Several tax-form projects are relevant but narrow or stale. HabuTax is scriptable but appears stuck at TY2023-era support; Filed Open Tax Engine is current-looking but has a tiny public footprint; UsTaxes has current commits but stale GitHub releases.
- Public IRS codebases are useful evidence but carry strong disclaimers. IRS Direct File is no longer available, and IRS TWE's repository warns that public repository code is not the official estimator.
- Desktop personal-finance apps are mature but often file-driven. GnuCash, KMyMoney, HomeBank, and Money Manager Ex are useful landscape evidence, but REST/API or plain-text tools are likely easier Week 2 and Week 3 candidates.
- AGPL licensing matters for web/API wrappers. Firefly III, UsTaxes, PolicyEngine US, Paisa, and Filed Open Tax Engine may impose stronger obligations if redistributed or network-served.

## Day 6 Starting Hypotheses

- Evaluate hledger, Beancount, Firefly III, Actual Budget, UsTaxes, OpenTaxSolver, tenforty, and Tax-Calculator first in the programmatic-surface survey.
- Treat GnuCash as a serious desktop candidate only if its Python bindings or CLI reporting can be verified on Windows without major setup drag.
- Treat Direct File, OpenFile, and IRS TWE as architecture/reference entries unless the mentor explicitly wants official-public-code analysis.
- Use ofxtools/ofxstatement/beangulp/smart_importer as supporting integration evidence, not as primary shortlist tools.

## Source Index

- [GH-GNUCASH] GnuCash repository, https://github.com/Gnucash/gnucash, accessed 2026-07-05.
- [REL-GNUCASH] GnuCash releases, https://github.com/Gnucash/gnucash/releases, accessed 2026-07-05.
- [DOC-GNUCASH] GnuCash documentation, https://www.gnucash.org/docs.phtml, accessed 2026-07-05.
- [DOC-GNUCASH-PY] GnuCash Python bindings guide, https://www.gnucash.org/docs/v5/C/gnucash-guide/ch_python_bindings.html, accessed 2026-07-05.
- [GH-BEANCOUNT] Beancount repository, https://github.com/beancount/beancount, accessed 2026-07-05.
- [PYPI-BEANCOUNT] Beancount PyPI, https://pypi.org/project/beancount/, accessed 2026-07-05.
- [DOC-BEANCOUNT] Beancount docs, https://beancount.github.io/docs/, accessed 2026-07-05.
- [GH-LEDGER] Ledger repository, https://github.com/ledger/ledger, accessed 2026-07-05.
- [REL-LEDGER] Ledger releases, https://github.com/ledger/ledger/releases, accessed 2026-07-05.
- [DOC-LEDGER] Ledger manual, https://ledger-cli.org/doc/ledger3.html, accessed 2026-07-05.
- [GH-HLEDGER] hledger repository, https://github.com/simonmichael/hledger, accessed 2026-07-05.
- [DOC-HLEDGER] hledger manual, https://hledger.org/manual.html, accessed 2026-07-05.
- [DOC-HLEDGER-WEB] hledger-web docs, https://hledger.org/1.52/hledger-web.html, accessed 2026-07-05.
- [DOC-HLEDGER-CSV] hledger CSV import docs, https://hledger.org/import-csv.html, accessed 2026-07-05.
- [GH-FIREFLY] Firefly III repository, https://github.com/firefly-iii/firefly-iii, accessed 2026-07-05.
- [REL-FIREFLY] Firefly III releases, https://github.com/firefly-iii/firefly-iii/releases, accessed 2026-07-05.
- [DOC-FIREFLY] Firefly III docs, https://docs.firefly-iii.org/, accessed 2026-07-05.
- [DOC-FIREFLY-API] Firefly III API docs, https://api-docs.firefly-iii.org/, accessed 2026-07-05.
- [GH-ACTUAL] Actual Budget repository, https://github.com/actualbudget/actual, accessed 2026-07-05.
- [DOC-ACTUAL-REL] Actual Budget release notes, https://actualbudget.org/docs/releases/, accessed 2026-07-05.
- [DOC-ACTUAL-API] Actual Budget API docs, https://actualbudget.org/docs/api/, accessed 2026-07-05.
- [DOC-ACTUAL-CLI] Actual Budget CLI docs, https://actualbudget.org/docs/api/cli/, accessed 2026-07-05.
- [SF-OTS] OpenTaxSolver SourceForge project, https://sourceforge.net/projects/opentaxsolver/, accessed 2026-07-05.
- [REL-OTS-2025] OpenTaxSolver 2025 download page, https://opentaxsolver.sourceforge.net/download2025.html, accessed 2026-07-05.
- [GH-USTAXES] UsTaxes repository, https://github.com/ustaxes/UsTaxes, accessed 2026-07-05.
- [COMMITS-USTAXES] UsTaxes commits, https://github.com/ustaxes/UsTaxes/commits/master/, accessed 2026-07-05.
- [GH-HABUTAX] HabuTax repository, https://github.com/habutax/habutax, accessed 2026-07-05.
- [PYPI-HABUTAX] HabuTax PyPI, https://pypi.org/project/habutax/, accessed 2026-07-05.
- [GH-FILED-OPENTAX] Filed Open Tax Engine repository, https://github.com/filedcom/opentax, accessed 2026-07-05.
- [DOC-FILED-OPENTAX] Filed Open Tax Engine website, https://opentax.filed.com/, accessed 2026-07-05.
- [GH-TAXCALC] PSL Tax-Calculator repository, https://github.com/PSLmodels/Tax-Calculator, accessed 2026-07-05.
- [COMMITS-TAXCALC] PSL Tax-Calculator commits, https://github.com/PSLmodels/Tax-Calculator/commits/master/, accessed 2026-07-05.
- [DOC-TAXCALC] PSL Tax-Calculator docs, https://taxcalc.pslmodels.org/, accessed 2026-07-05.
- [PYPI-TAXCALC] taxcalc PyPI, https://pypi.org/project/taxcalc/, accessed 2026-07-05.
- [GH-POLICYENGINE-US] PolicyEngine US repository, https://github.com/PolicyEngine/policyengine-us, accessed 2026-07-05.
- [COMMITS-POLICYENGINE-US] PolicyEngine US commits, https://github.com/PolicyEngine/policyengine-us/commits/main/, accessed 2026-07-05.
- [PYPI-POLICYENGINE-US] policyengine-us PyPI, https://pypi.org/project/policyengine-us/, accessed 2026-07-05.
- [GH-IRS-TWE] IRS Tax Withholding Estimator repository, https://github.com/IRS-Public/tax-withholding-estimator, accessed 2026-07-05.
- [GH-DIRECT-FILE] IRS Direct File repository, https://github.com/IRS-Public/direct-file, accessed 2026-07-05.
- [LIC-DIRECT-FILE] IRS Direct File license, https://github.com/IRS-Public/direct-file/blob/main/LICENSE, accessed 2026-07-05.
- [IRS-DIRECT-FILE] IRS Direct File status page, https://www.irs.gov/filing/irs-direct-file-for-free, accessed 2026-07-05.
- [GH-OPENFILE] OpenFile repository, https://github.com/openfiletax/openfile, accessed 2026-07-05.
- [LIC-OPENFILE] OpenFile license, https://github.com/openfiletax/openfile/blob/main/LICENSE, accessed 2026-07-05.
- [DOC-OPENFILE] OpenFile docs, https://docs.openfile.tax/en/latest/reference.html, accessed 2026-07-05.
- [GH-TENFORTY] tenforty repository, https://github.com/mmacpherson/tenforty, accessed 2026-07-05.
- [PYPI-TENFORTY] tenforty PyPI, https://pypi.org/project/tenforty/, accessed 2026-07-05.
- [GH-KMYMONEY] KMyMoney repository, https://github.com/KDE/kmymoney, accessed 2026-07-05.
- [REL-KMYMONEY] KMyMoney 5.2.0 release notes, https://kmymoney.org/2025/06/21/kmymoney-5-2-0-released.html, accessed 2026-07-05.
- [DOC-KMYMONEY-IMPORT] KMyMoney import/export docs, https://docs.kde.org/trunk_kf6/en/kmymoney/kmymoney/details.impexp.html, accessed 2026-07-05.
- [SF-HOMEBANK] HomeBank SourceForge project, https://sourceforge.net/projects/homebank/, accessed 2026-07-05.
- [DOC-HOMEBANK] HomeBank website, https://www.gethomebank.org/, accessed 2026-07-05.
- [GH-MMEX] Money Manager Ex repository, https://github.com/moneymanagerex/moneymanagerex, accessed 2026-07-05.
- [DOC-MMEX-IMPORT] Money Manager Ex import/export docs, https://moneymanagerex.org/docs/features/importexport/, accessed 2026-07-05.
- [GH-FAVA] Fava repository, https://github.com/beancount/fava, accessed 2026-07-05.
- [PYPI-FAVA] Fava PyPI, https://pypi.org/project/fava/, accessed 2026-07-05.
- [DOC-FAVA] Fava docs, https://beancount.github.io/fava/, accessed 2026-07-05.
- [GH-PAISA] Paisa repository, https://github.com/ananthakumaran/paisa, accessed 2026-07-05.
- [DOC-PAISA] Paisa docs, https://paisa.fyi/, accessed 2026-07-05.
- [GH-OFXTOOLS] ofxtools repository, https://github.com/csingley/ofxtools, accessed 2026-07-05.
- [PYPI-OFXTOOLS] ofxtools PyPI, https://pypi.org/project/ofxtools/, accessed 2026-07-05.
- [GH-OFXPARSE] ofxparse repository, https://github.com/jseutter/ofxparse, accessed 2026-07-05.
- [PYPI-OFXPARSE] ofxparse PyPI, https://pypi.org/project/ofxparse/, accessed 2026-07-05.
- [PYPI-QIFPARSE] qifparse PyPI, https://pypi.org/project/qifparse/, accessed 2026-07-05.
- [GH-BEANGULP] beangulp repository, https://github.com/beancount/beangulp, accessed 2026-07-05.
- [PYPI-BEANGULP] beangulp PyPI, https://pypi.org/project/beangulp/, accessed 2026-07-05.
- [GH-SMART-IMPORTER] smart_importer repository, https://github.com/beancount/smart_importer, accessed 2026-07-05.
- [PYPI-SMART-IMPORTER] smart-importer PyPI, https://pypi.org/project/smart-importer/, accessed 2026-07-05.
- [GH-BEANCOUNT-IMPORT] beancount-import repository, https://github.com/jbms/beancount-import, accessed 2026-07-05.
- [PYPI-BEANCOUNT-IMPORT] beancount-import PyPI, https://pypi.org/project/beancount-import/, accessed 2026-07-05.
- [GH-LEDGER-AUTOSYNC] ledger-autosync repository, https://github.com/egh/ledger-autosync, accessed 2026-07-05.
- [PYPI-LEDGER-AUTOSYNC] ledger-autosync PyPI, https://pypi.org/project/ledger-autosync/, accessed 2026-07-05.
- [GH-OFXSTATEMENT] ofxstatement repository, https://github.com/kedder/ofxstatement, accessed 2026-07-05.
- [PYPI-OFXSTATEMENT] ofxstatement PyPI, https://pypi.org/project/ofxstatement/, accessed 2026-07-05.
