# Starter Tool Longlist

Day 3 artifact for Phase 3: Starter Tool Inventory.

Planned phase date: 2026-07-03. Source access date: 2026-07-04. This is a first-pass inventory, not a final health assessment. Release and activity metadata should be normalized in `research/project_health_snapshot.md` during Day 5.

## Summary Matrix

| Candidate | First-pass category | Latest visible release or status | License | Apparent integration surface | Initial disposition |
|---|---|---|---|---|---|
| GnuCash | Bookkeeping / personal finance | 5.16, released 2026-06-28 | Mostly GPL-2.0-or-later, with compatible GPL variants | Desktop app, file/database storage, import/export, optional Python bindings, `gnucash-cli` reports | Keep for full personal-finance system coverage |
| Beancount | Plain-text bookkeeping | 3.2.3 on PyPI, uploaded 2026-05-05 | GPL-2.0-only | Plain-text ledger, Python library, CLI tools, query/report tooling, importer ecosystem | Strong candidate for transparent data and thin adapters |
| Ledger CLI | Plain-text bookkeeping | v3.4.1, released 2025-10-26 | BSD-style / BSD-3-Clause | Command-line reports, plain-text journal, C++ API documentation | Keep as canonical CLI accounting comparator |
| hledger | Plain-text bookkeeping / API-capable reporting | 1.52.1, released 2026-04-28 | GPL-3.0-or-later | CLI, TUI, web UI, CSV import rules, JSON output, hledger-web JSON API | Strong integration candidate |
| Firefly III | Self-hosted personal finance | v6.6.6, released 2026-07-01 | AGPL-3.0 | JSON REST API, Swagger/OpenAPI docs, data importer, third-party app ecosystem | Strong API-native personal-finance candidate |
| OpenTaxSolver | Tax calculation / form preparation | 23.06 for tax year 2025, visible 2026-03-20 | GPL-2.0 | Local GUI/textual app, source-distributed form calculators, print/PDF workflow | Keep as tax-form-oriented comparator |
| IRS Direct File posture | Tax preparation / submission reference | IRS page says Direct File is no longer available; repo has no conventional releases | Public domain / CC0 for released code | Reference source, Fact Graph, MeF XML path, State API JSON/MeF transfer model | Treat as reference architecture, not active filing candidate |
| OFX/QIF parser tooling | Adjacent import infrastructure | ofxtools 1.1.1 on 2026-06-12; ofxparse 0.21 on PyPI; QIF parsers vary | Mixed: GPL-3.0-or-later, MIT, GPL-3.0 | Python parsers/clients/generators for bank-file formats | Keep as import-layer support, not standalone tax tool |
| CSV-to-ledger tooling | Adjacent import infrastructure | beangulp 0.2.0, smart_importer 1.2, beancount-import 1.4.0, ledger-autosync 1.2.0 on PyPI | Mixed: GPL-2.0, MIT, GPL-3.0 | CSV import rules, importer frameworks, ML-assisted categorization, OFX/bank sync | Keep as integration substrate and prior art |

## Candidate Entries

### GnuCash

- Project URL: https://github.com/Gnucash/gnucash
- Docs URL: https://www.gnucash.org/docs.phtml
- License: GnuCash's license file describes a mutually compatible license set, with most source under GPL-2.0-or-later and some files under GPL-2/GPL-3-compatible terms.
- Latest visible release: 5.16, released 2026-06-28.
- Category: bookkeeping / personal finance; tax-adjacent through reports, account structure, and import/export rather than tax calculation or e-file.
- Apparent integration surface:
  - Native files and SQL-backed book storage.
  - Import/export surfaces for common finance data such as QIF, OFX/HBCI/AqBanking, and CSV-style workflows.
  - Optional Python bindings for manipulating GnuCash data. The docs warn that Python support depends on build/package options.
  - `gnucash-cli` report automation is visible in release/user-list material and should be tested locally before relying on it.
- Obvious third-party wrappers / integrations:
  - `piecash` provides a Pythonic interface to GnuCash SQL documents.
  - Small helper projects exist around QIF import and report extraction, but they look uneven and should not be assumed maintained.
- First-pass fit:
  - Useful representative of GUI/full personal-finance software.
  - Integration may be heavier than plain-text tools because install/build flags and data-file locking matter.

### Beancount

- Project URL: https://github.com/beancount/beancount
- Docs URL: https://beancount.github.io/docs/
- License: GPL-2.0-only.
- Latest visible release: 3.2.3 on PyPI, uploaded 2026-05-05.
- Category: plain-text double-entry bookkeeping; tax-adjacent reporting, not tax filing.
- Apparent integration surface:
  - Plain-text ledger language with Python parsing and in-memory data structures.
  - CLI/report tools, SQL-like query tooling, and a web reporting interface.
  - Import scaffolding for converting external bank data to Beancount syntax.
- Obvious third-party wrappers / integrations:
  - `beangulp` is the Beancount 3 importer framework and replaces older `beancount.ingest` patterns.
  - `smart_importer` adds ML-assisted import hooks for predicting payees/postings.
  - `beancount-import` offers a web UI for semi-automatic import and reconciliation.
  - Fava is a widely used web UI in the ecosystem and should be noted during discovery/health review.
- First-pass fit:
  - Strong candidate for a prototype adapter because the source format is explicit, version-controllable, and easy to generate from synthetic data.
  - Needs separate tax-line mapping if the project wants tax-form semantics.

### Ledger CLI

- Project URL: https://github.com/ledger/ledger
- Docs URL: https://ledger-cli.org/doc/ledger3.html
- License: BSD-style license; downstream packages identify it as BSD-3-Clause.
- Latest visible release: v3.4.1, released 2025-10-26.
- Category: plain-text double-entry bookkeeping; tax-adjacent reporting, not tax calculation or submission.
- Apparent integration surface:
  - CLI-first workflow over plain-text journal files.
  - Reports can be driven from shell scripts against generated or edited journal files.
  - C++ API documentation exists, but the first practical integration surface is likely CLI/file based.
- Obvious third-party wrappers / integrations:
  - `ledger-autosync` pulls transactions via bank/OFX flows into Ledger files.
  - `ledger-mode` provides editor integration and workflow support.
  - Curated "awesome ledger" lists suggest a broader helper ecosystem worth reviewing on Day 4.
- First-pass fit:
  - Good baseline for command-line accounting.
  - Prototype value depends on whether output parsing can stay structured enough for reliable automation.

### hledger

- Project URL: https://github.com/simonmichael/hledger
- Docs URL: https://hledger.org/manual.html
- License: GPL-3.0-or-later.
- Latest visible release: 1.52.1, released 2026-04-28.
- Category: plain-text double-entry bookkeeping with stronger built-in API/export story.
- Apparent integration surface:
  - CLI, terminal UI, and web UI over hledger/ledger-style journals.
  - Built-in CSV converter using rules files.
  - JSON output for reports and hledger-web JSON-over-HTTP API.
  - hledger-web documentation mentions an API-only serving mode and routes for version, account names, transactions, prices, commodities, accounts, and account transactions.
- Obvious third-party wrappers / integrations:
  - Many workflows appear to use hledger's own web/API/export surfaces rather than separate wrappers.
  - Ledger and Beancount interoperability is explicit in hledger documentation and should be tested later.
- First-pass fit:
  - One of the most promising integration candidates because it combines plain-text data with structured JSON/API output.
  - Tax coverage is indirect and would need mapping logic.

### Firefly III

- Project URL: https://github.com/firefly-iii/firefly-iii
- Docs URL: https://docs.firefly-iii.org/
- API docs URL: https://api-docs.firefly-iii.org/
- License: AGPL-3.0.
- Latest visible release: v6.6.6, released 2026-07-01.
- Category: self-hosted personal finance / budgeting; tax-adjacent bookkeeping and reporting, not a tax-form or filing system.
- Apparent integration surface:
  - JSON REST API with dedicated API documentation and Swagger/OpenAPI-style interaction.
  - Self-hosted web app, usually Docker-friendly.
  - Data Importer is a separate companion project for importing transactions.
- Obvious third-party wrappers / integrations:
  - Official docs list third-party apps built around the Firefly III API.
  - Firefly III Data Importer is official-adjacent and should be evaluated as part of the import workflow.
- First-pass fit:
  - Strong API-native candidate if the prototype favors REST integration.
  - Heavier setup than plain-text tools and less directly tax-specific.

### OpenTaxSolver

- Project URL: https://sourceforge.net/projects/opentaxsolver/
- Website / download URL: https://opentaxsolver.sourceforge.net/
- License: GPL-2.0.
- Latest visible release: 23.06 for the 2025 tax year, visible on SourceForge 2026-03-20.
- Category: US tax calculation / tax form preparation; prints/fills forms for mailing rather than acting as a general bookkeeping system.
- Apparent integration surface:
  - Local desktop/terminal-style C application with graphical and textual interfaces.
  - Source-distributed form calculators and build scripts inside downloadable packages.
  - Outputs appear oriented around filled/printed forms rather than APIs or structured machine output.
- Obvious third-party wrappers / integrations:
  - None obvious in the first pass.
- First-pass fit:
  - Important because it is closer to actual US tax-form calculation than bookkeeping tools.
  - Likely weak for thin API integration unless the textual interface or generated files can be driven safely from scripts.

### IRS Direct File Posture

- Project URL: https://github.com/IRS-Public/direct-file
- IRS status page: https://www.irs.gov/filing/irs-direct-file-for-free
- License: public domain within the United States and CC0 1.0 worldwide for released code.
- Latest visible release/status:
  - No conventional releases observed.
  - IRS page says Direct File is no longer available.
  - Repository README says the repo is archived/no longer maintained, historical reference only, and not for production systems.
- Category: tax preparation / federal filing reference; not a current open filing channel.
- Apparent integration surface:
  - Reference implementation for interview-based federal return preparation.
  - Fact Graph declarative XML/Scala rules engine.
  - Translation to standard tax forms and IRS Modernized e-File (MeF) path for authorized public use.
  - State API transferring standard MeF XML plus enriched JSON to third-party/state tools.
- Obvious third-party wrappers / integrations:
  - OpenFile is an immediately visible fork based on IRS Direct File. Its README states that it makes no guarantees of accuracy and notes the official Direct File project's suspension.
- First-pass fit:
  - Very useful as architecture and schema prior art.
  - Not suitable as an active tax-submission prototype unless the project explicitly frames it as historical/reference-only.

### OFX/QIF Parser Tooling

- Representative project URLs:
  - ofxtools: https://github.com/csingley/ofxtools
  - ofxparse: https://github.com/jseutter/ofxparse
  - rgoring/qif: https://github.com/rgoring/qif
  - qifparse: https://pypi.org/project/qifparse/
- Docs URL:
  - ofxtools docs: https://ofxtools.readthedocs.io/en/latest/
- Licenses:
  - ofxtools: GPL-3.0-or-later.
  - ofxparse: MIT.
  - rgoring/qif: GPL-3.0.
  - qifparse: not checked beyond PyPI first pass.
- Latest visible releases:
  - ofxtools 1.1.1, released/uploaded 2026-06-12.
  - ofxparse 0.21 on PyPI, uploaded 2021-05-31.
  - rgoring/qif has no conventional GitHub latest release observed in the first pass.
  - qifparse 0.5, released 2013-11-03.
- Category: adjacent import infrastructure for bank/brokerage files.
- Apparent integration surface:
  - Python libraries and command-style tooling for parsing, generating, or downloading financial exchange data.
  - Useful for feeding bookkeeping tools with synthetic OFX/QIF examples.
- Obvious third-party wrappers / integrations:
  - These are themselves integration-layer tools; downstream usage needs discovery.
- First-pass fit:
  - Not a tax tool by itself, but useful for a prototype that demonstrates bank-file ingestion into a ledger or personal-finance app.
  - qifparse looks old; ofxtools appears much more current.

### CSV-to-Ledger Tooling

- Representative project URLs:
  - hledger CSV import tutorial: https://hledger.org/import-csv.html
  - beangulp: https://github.com/beancount/beangulp
  - smart_importer: https://github.com/beancount/smart_importer
  - beancount-import: https://github.com/jbms/beancount-import
  - ledger-autosync: https://github.com/egh/ledger-autosync
- Licenses:
  - hledger CSV import is part of hledger, GPL-3.0-or-later.
  - beangulp: GPL-2.0.
  - smart_importer: MIT.
  - beancount-import: GPL-2.0.
  - ledger-autosync: GPL-3.0.
- Latest visible releases:
  - beangulp 0.2.0 on PyPI, uploaded 2025-01-20.
  - smart_importer v1.2 / PyPI 1.2, released/uploaded 2025-10-17.
  - beancount-import v1.4.0 / PyPI 1.4.0, released/uploaded 2024-04-19.
  - ledger-autosync 1.2.0 on PyPI, uploaded 2024-08-22; GitHub latest release page showed v1.0.2 from 2020, so PyPI/GitHub release metadata should be reconciled later.
- Category: adjacent import automation and prior art for code-driven bookkeeping.
- Apparent integration surface:
  - Rules-based CSV conversion into hledger journals.
  - Beancount import frameworks that emit Beancount entries from external files.
  - ML-assisted categorization hooks for Beancount importers.
  - OFX/bank synchronization workflows for Ledger.
- Obvious third-party wrappers / integrations:
  - These tools are direct prior art for the project prototype.
  - They point toward a practical pattern: normalize CSV/OFX/QIF input into plain-text ledger entries, then compute reports through a mature accounting engine.
- First-pass fit:
  - Very relevant for the prototype even if not evaluated as standalone final candidates.
  - Best treated as supporting infrastructure around Beancount, Ledger, or hledger.

## Immediate Follow-Up Questions

- Should the shortlist prioritize a REST-first path, represented by Firefly III, or a file/CLI-first path, represented by Beancount/hledger/Ledger?
- Can OpenTaxSolver be driven repeatably through textual input/output, or is it better treated as a manual/reference tax-form comparator?
- Does GnuCash's optional Python binding setup work cleanly in the local environment, especially on Windows?
- Is IRS Direct File useful only as reference architecture, or should OpenFile be promoted to the longlist during Day 4 discovery?
- Which import layer is most convincing for a synthetic-data demo: CSV rules, OFX/QIF parsing, or a direct JSON/REST transaction API?

## Source Index

- [REPO-gnucash-001] GnuCash repository, https://github.com/Gnucash/gnucash, accessed 2026-07-04.
  - Used for: source location and project identity.
- [REL-gnucash-001] GnuCash releases, https://github.com/Gnucash/gnucash/releases, accessed 2026-07-04.
  - Observed: 5.16 release on 2026-06-28.
- [DOC-gnucash-001] GnuCash documentation, https://www.gnucash.org/docs.phtml, accessed 2026-07-04.
  - Used for: documentation home.
- [DOC-gnucash-002] GnuCash Python Bindings guide, https://www.gnucash.org/docs/v5/C/gnucash-guide/ch_python_bindings.html, accessed 2026-07-04.
  - Used for: optional Python scripting surface.
- [DOC-gnucash-003] GnuCash external interfaces wiki, https://wiki.gnucash.org/wiki/List_of_external_software_interfaces, accessed 2026-07-04.
  - Used for: QIF/OFX/HBCI/import surface notes.
- [REPO-piecash-001] piecash repository, https://github.com/sdementen/piecash, accessed 2026-07-04.
  - Used for: visible Python interface to GnuCash SQL documents.
- [REPO-beancount-001] Beancount repository, https://github.com/beancount/beancount, accessed 2026-07-04.
  - Used for: source location, license, and project identity.
- [REL-beancount-001] Beancount PyPI page, https://pypi.org/project/beancount/, accessed 2026-07-04.
  - Observed: 3.2.3 release metadata.
- [DOC-beancount-001] Beancount documentation, https://beancount.github.io/docs/, accessed 2026-07-04.
  - Used for: docs home, CLI/report/import surface.
- [REPO-beangulp-001] beangulp repository, https://github.com/beancount/beangulp, accessed 2026-07-04.
  - Used for: importer framework identity and license.
- [REL-beangulp-001] beangulp PyPI page, https://pypi.org/project/beangulp/, accessed 2026-07-04.
  - Observed: 0.2.0 package metadata.
- [REPO-smart-importer-001] smart_importer repository, https://github.com/beancount/smart_importer, accessed 2026-07-04.
  - Used for: ML-assisted import hook identity and license.
- [REL-smart-importer-001] smart-importer PyPI page, https://pypi.org/project/smart-importer/, accessed 2026-07-04.
  - Observed: 1.2 package metadata.
- [REPO-beancount-import-001] beancount-import repository, https://github.com/jbms/beancount-import, accessed 2026-07-04.
  - Used for: import/reconciliation UI identity and license.
- [REL-beancount-import-001] beancount-import PyPI page, https://pypi.org/project/beancount-import/, accessed 2026-07-04.
  - Observed: 1.4.0 package metadata.
- [DOC-ledger-001] Ledger website, https://ledger-cli.org/, accessed 2026-07-04.
  - Used for: project identity, category, and license summary.
- [REPO-ledger-001] Ledger repository, https://github.com/ledger/ledger, accessed 2026-07-04.
  - Used for: source location and latest release link.
- [REL-ledger-001] Ledger releases, https://github.com/ledger/ledger/releases, accessed 2026-07-04.
  - Observed: v3.4.1 release metadata.
- [DOC-ledger-002] Ledger manual, https://ledger-cli.org/doc/ledger3.html, accessed 2026-07-04.
  - Used for: CLI/text journal behavior.
- [DOC-ledger-api-001] Ledger C++ API docs, https://ledger-cli.org/doc/api/, accessed 2026-07-04.
  - Used for: API documentation existence.
- [REPO-ledger-autosync-001] ledger-autosync repository, https://github.com/egh/ledger-autosync, accessed 2026-07-04.
  - Used for: bank/OFX sync prior art.
- [REL-ledger-autosync-001] ledger-autosync PyPI page, https://pypi.org/project/ledger-autosync/, accessed 2026-07-04.
  - Observed: 1.2.0 package metadata.
- [REPO-hledger-001] hledger repository, https://github.com/simonmichael/hledger, accessed 2026-07-04.
  - Used for: source location, license, and release metadata.
- [DOC-hledger-001] hledger manual, https://hledger.org/manual.html, accessed 2026-07-04.
  - Used for: CLI/text accounting behavior.
- [DOC-hledger-api-001] hledger-web manual, https://hledger.org/1.52/hledger-web.html, accessed 2026-07-04.
  - Used for: JSON API notes.
- [DOC-hledger-csv-001] hledger CSV import tutorial, https://hledger.org/import-csv.html, accessed 2026-07-04.
  - Used for: CSV rules import surface.
- [DOC-hledger-export-001] hledger export documentation, https://hledger.org/export.html, accessed 2026-07-04.
  - Used for: structured export surface.
- [REPO-firefly-001] Firefly III repository, https://github.com/firefly-iii/firefly-iii, accessed 2026-07-04.
  - Used for: source location, license, and project identity.
- [REL-firefly-001] Firefly III releases, https://github.com/firefly-iii/firefly-iii/releases, accessed 2026-07-04.
  - Observed: v6.6.6 release metadata.
- [DOC-firefly-001] Firefly III docs, https://docs.firefly-iii.org/, accessed 2026-07-04.
  - Used for: documentation home.
- [DOC-firefly-api-001] Firefly III API docs, https://api-docs.firefly-iii.org/, accessed 2026-07-04.
  - Used for: REST/API surface.
- [DOC-firefly-api-002] Firefly III API feature docs, https://docs.firefly-iii.org/how-to/firefly-iii/features/api/, accessed 2026-07-04.
  - Used for: JSON REST API description.
- [DOC-firefly-third-party-001] Firefly III third-party tools docs, https://docs.firefly-iii.org/references/firefly-iii/third-parties/apps/, accessed 2026-07-04.
  - Used for: visible third-party API ecosystem.
- [REPO-firefly-importer-001] Firefly III Data Importer repository, https://github.com/firefly-iii/data-importer, accessed 2026-07-04.
  - Used for: official-adjacent import tooling.
- [PROJ-ots-001] OpenTaxSolver SourceForge project, https://sourceforge.net/projects/opentaxsolver/, accessed 2026-07-04.
  - Used for: project identity, category, license, last update, and feature summary.
- [DOC-ots-001] OpenTaxSolver website, https://opentaxsolver.sourceforge.net/, accessed 2026-07-04.
  - Used for: project/download home.
- [REL-ots-001] OpenTaxSolver 2025 download page, https://opentaxsolver.sourceforge.net/download2025.html, accessed 2026-07-04.
  - Observed: 23.06 package notes for tax year 2025.
- [REPO-direct-file-001] IRS Direct File repository, https://github.com/IRS-Public/direct-file, accessed 2026-07-04.
  - Used for: source location, status, and architecture notes.
- [DOC-direct-file-001] IRS Direct File status page, https://www.irs.gov/filing/irs-direct-file-for-free, accessed 2026-07-04.
  - Used for: current availability and 2024 eligibility/scope notes.
- [LIC-direct-file-001] IRS Direct File license file, https://raw.githubusercontent.com/IRS-Public/direct-file/main/LICENSE, accessed 2026-07-04.
  - Used for: public-domain/CC0 licensing.
- [REPO-openfile-001] OpenFile repository, https://github.com/openfiletax/openfile, accessed 2026-07-04.
  - Used for: visible Direct File fork and caveat.
- [DOC-openfile-001] OpenFile docs reference, https://docs.openfile.tax/en/latest/reference.html, accessed 2026-07-04.
  - Used for: Direct File fork/reference notes.
- [REPO-ofxtools-001] ofxtools repository, https://github.com/csingley/ofxtools, accessed 2026-07-04.
  - Used for: source location, release metadata, and license.
- [DOC-ofxtools-001] ofxtools docs, https://ofxtools.readthedocs.io/en/latest/, accessed 2026-07-04.
  - Used for: Python OFX tooling surface.
- [REL-ofxtools-001] ofxtools PyPI page, https://pypi.org/project/ofxtools/, accessed 2026-07-04.
  - Observed: 1.1.1 package metadata.
- [REPO-ofxparse-001] ofxparse repository, https://github.com/jseutter/ofxparse, accessed 2026-07-04.
  - Used for: source location and license.
- [REL-ofxparse-001] ofxparse PyPI page, https://pypi.org/project/ofxparse/, accessed 2026-07-04.
  - Observed: 0.21 package metadata.
- [REPO-qif-001] rgoring/qif repository, https://github.com/rgoring/qif, accessed 2026-07-04.
  - Used for: QIF parser identity and license.
- [REL-qifparse-001] qifparse PyPI page, https://pypi.org/project/qifparse/, accessed 2026-07-04.
  - Observed: 0.5 package metadata.
