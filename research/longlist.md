# Tool Longlist

Day 3 artifact for Phase 3: Starter Tool Inventory, expanded during Day 4 discovery search.

Planned starter-inventory date: 2026-07-03. Day 3 source access date: 2026-07-04. Day 4 discovery executed on 2026-07-05 for the planned 2026-07-04 phase. This is still a first-pass inventory, not a final health assessment. Release and activity metadata should be normalized in `research/project_health_snapshot.md` during Day 5.

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
| OpenFile | Direct File fork / tax preparation reference | No releases published; README disclaims accuracy and notes official Direct File suspension | License visible but exact terms not normalized; verify on Day 5 | Dockerized fork of IRS Direct File with client/state API style surfaces inherited from upstream | Promote as cautionary reference/fork candidate |
| OFX/QIF parser tooling | Adjacent import infrastructure | ofxtools 1.1.1 on 2026-06-12; ofxparse 0.21 on PyPI; QIF parsers vary | Mixed: GPL-3.0-or-later, MIT, GPL-3.0 | Python parsers/clients/generators for bank-file formats | Keep as import-layer support, not standalone tax tool |
| CSV-to-ledger tooling | Adjacent import infrastructure | beangulp 0.2.0, smart_importer 1.2, beancount-import 1.4.0, ledger-autosync 1.2.0 on PyPI | Mixed: GPL-2.0, MIT, GPL-3.0 | CSV import rules, importer frameworks, ML-assisted categorization, OFX/bank sync | Keep as integration substrate and prior art |
| UsTaxes | US tax preparation / form generation | README supports tax years 2020-2025; release metadata not normalized yet | AGPL-3.0 | Client-side web app, desktop build, schemas, PDF/form workflow | Promote as direct US 1040 candidate |
| HabuTax | US tax solver / form calculation | Tags visible; package install documented; release metadata not normalized yet | GPL-2.0 | Python package and CLI over INI-style inputs, solution files/stdout, PDF fill path | Promote as scriptable tax-form candidate |
| Filed Open Tax Engine | US federal 1040 calculation engine | v2.0.2, latest visible GitHub release 2026-05-11 | AGPL-3.0 plus commercial license | Single-binary CLI, JSON return data, form-node schemas, agent-oriented docs | Promote with maturity/accuracy caution |
| PSL Tax-Calculator | Federal tax microsimulation | GitHub latest visible release 6.7.1 on 2026-07-03; docs still showed 6.7.0 on 2026-06-24 | CC0-1.0 visible in repo badge; verify license file on Day 5 | Python package, documented Python API, CLI, policy/input/output variables | Keep as programmatic tax-model comparator |
| PolicyEngine US | US tax-benefit rules engine / microsimulation | Active-looking repository; package install documented; release cadence not normalized yet | AGPL-3.0 | Python package, household-level calculations, PolicyEngine/OpenFisca API patterns | Keep as rules-as-code comparator, not filing tool |
| IRS Tax Withholding Estimator | Withholding estimator / official reference | README says TWE 2.0 went live 2026-02-27 | CC0-1.0 / public domain dedication | Web app/codebase, withholding math, W-4/W-4P output, not filing | Keep as official transparency/reference candidate |
| tenforty | Python tax calculation wrapper | Supports 2018-2025 in README; release metadata not normalized yet | MIT | Python library, validated function inputs, dataframe/grid evaluation, OpenTaxSolver-backed calculations | Keep as lightweight programmatic bridge |
| Actual Budget | Local-first personal finance / budgeting | v26.7.0 release notes, released 2026-07-01; GitHub latest visible release 2026-07-02 | MIT | Node API package, stable CLI, import/export ecosystem, local/sync data model | Promote as API/CLI-native personal-finance comparator |
| KMyMoney | Desktop personal finance | 5.2.0 release notes on 2025-06-21; health not normalized yet | KDE SPDX/GPL-family; verify exact SPDX mix on Day 5 | Local app/files, QIF/OFX/CSV import/export, GnuCash importer | Keep as desktop full-app comparator |
| HomeBank | Desktop personal finance | Active website; release metadata not normalized yet | GNU GPL per website | Desktop app, import/export, assignment rules, duplicate detection | Low-priority full-app comparator |
| Money Manager Ex | Desktop/mobile personal finance | Stable release link visible; release metadata not normalized yet | GPL-2.0 | CSV/QIF/XML/HTML import/export, nonproprietary SQLite database | Low-priority full-app comparator |
| Fava | Beancount web UI / ecosystem component | Tags and PyPI badge visible; release metadata not normalized yet | MIT | Web interface over Beancount, Python package, extension/API docs | Keep as Beancount ecosystem prior art |
| Paisa | Plain-text-accounting web UI/reporting | v0.7.4, latest visible GitHub release 2025-08-03 | AGPL-3.0 | Reads Ledger/hledger/Beancount files into SQLite, web reports/charts | Keep as UI/reporting comparator around plain-text accounting |
| ofxstatement | Bank-statement conversion infrastructure | 0.9.2, latest visible GitHub release 2024-11-25 | GPL-3.0 | CLI and plugin system converting proprietary statements to OFX | Keep as import-layer prior art |

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

### OpenFile

- Project URL: https://github.com/openfiletax/openfile
- Docs URL: https://docs.openfile.tax/en/latest/reference.html
- License: repository has a visible license file, but exact terms were not normalized during Day 4; verify before relying on it.
- Latest visible release/status:
  - No GitHub releases were published in the Day 4 pass.
  - README states the project makes no guarantees of accuracy and notes the official Direct File project's suspension.
- Category: Direct File fork / tax preparation reference.
- Apparent integration surface:
  - Dockerized application forked from IRS Direct File.
  - Inherits much of the upstream architecture surface, including client and state-API-oriented components, but should not be treated as equivalent to an IRS-supported filing channel.
- Obvious third-party wrappers / integrations:
  - The tool itself is the visible fork of IRS Direct File.
- First-pass fit:
  - Worth promoting out of the IRS Direct File note because it is a live-looking public fork.
  - Accuracy and release status caveats make it risky as a prototype target until Day 5/6 evidence says otherwise.

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

### UsTaxes

- Project URL: https://github.com/ustaxes/ustaxes
- Website / docs URL: https://ustaxes.org/
- License: AGPL-3.0.
- Latest visible release/status:
  - README states support for many income and deduction inputs for tax years 2020 through 2025.
  - GitHub release metadata was not normalized during Day 4 and should be checked during Day 5.
- Category: US individual income tax preparation / Form 1040 web and desktop application.
- Apparent integration surface:
  - Client-side web application with local browser storage and a desktop build path.
  - Repository includes schemas and source code for form logic and PDF/form output.
  - Docker and Node-based development workflow are documented.
- Obvious third-party wrappers / integrations:
  - None obvious in the Day 4 pass.
- First-pass fit:
  - One of the most directly relevant newly discovered tools because it targets Federal 1040 preparation and is public, inspectable, and local-data oriented.
  - Needs careful accuracy, state-return, and setup review before being shortlisted.

### HabuTax

- Project URL: https://github.com/habutax/habutax
- License: GPL-2.0.
- Latest visible release/status:
  - GitHub showed tags but no normalized release summary in the Day 4 pass.
  - README documents package installation with `pip install habutax`.
- Category: US personal income tax solver / form calculation engine.
- Apparent integration surface:
  - Python package and CLI.
  - Plain-text INI-style input files, interactive prompting for missing inputs, solution file output, and stdout output.
  - PDF filling is available through a `fill-pdfs` command when `pdftk` is installed.
  - Commands exist for listing forms and form inputs.
- Obvious third-party wrappers / integrations:
  - None obvious in the Day 4 pass.
- First-pass fit:
  - Strong candidate for programmatic tax-form experimentation because it is CLI-first and exposes form/input listing behavior.
  - Scope and annual tax-year coverage need Day 5/6 review.

### Filed Open Tax Engine

- Project URL: https://github.com/filedcom/opentax
- Website / docs URL: https://opentax.filed.com/
- License: dual-licensed under AGPL-3.0 and a Filed commercial license.
- Latest visible release: v2.0.2, latest visible GitHub release dated 2026-05-11.
- Category: US federal 1040 calculation engine / agent-oriented deterministic tax calculator.
- Apparent integration surface:
  - Single-binary CLI for macOS, Linux, and Windows.
  - JSON-oriented return creation, form-node insertion, and return retrieval examples.
  - Repository includes form folders, a catalog, CLI code, docs, and agent-oriented skill/plugin material.
- Obvious third-party wrappers / integrations:
  - The project itself is explicitly agent-oriented and publishes MCP/skill-style materials, but those should be treated as project-provided surfaces rather than independent validation.
- First-pass fit:
  - Highly relevant to the internship's AI-agent-consumable integration question.
  - Newer and lower social proof than older tools, so Day 5 should scrutinize tests, release cadence, coverage, and accuracy disclaimers.

### PSL Tax-Calculator

- Project URL: https://github.com/PSLmodels/Tax-Calculator
- Docs URL: https://taxcalc.pslmodels.org/
- License: CC0-1.0 is visible in the repository badge; verify the license file during Day 5.
- Latest visible release:
  - GitHub showed release 6.7.1 with a latest visible date of 2026-07-03.
  - The documentation landing page still showed 6.7.0, dated 2026-06-24, so release metadata should be reconciled during Day 5.
- Category: federal individual income and payroll tax microsimulation / policy model.
- Apparent integration surface:
  - Python package installable with PyPI or conda.
  - Documented Python API, command-line interface, input variables, output variables, and policy/assumption parameters.
  - Can process custom-created filing-unit data as well as prepared sample data for aggregate analysis.
- Obvious third-party wrappers / integrations:
  - Policy Simulation Library ecosystem and TaxData are adjacent infrastructure, but not direct consumer preparation tools.
- First-pass fit:
  - Excellent programmatic comparator for tax calculation and transparent modeling.
  - Not a consumer return-preparation or filing tool, so shortlist value depends on whether the project wants a model comparator.

### PolicyEngine US

- Project URL: https://github.com/PolicyEngine/policyengine-us
- Website / docs URL: https://policyengine.org/us
- Related rules-engine pattern: https://openfisca.org/en/
- License: AGPL-3.0.
- Latest visible release/status:
  - Repository appeared active in July 2026, but release cadence was not normalized during Day 4.
  - README documents installation with `pip install policyengine-us` and notes that direct microsimulation is moving toward the managed `policyengine.py` bundle.
- Category: US federal/state tax-benefit rules engine and microsimulation model.
- Apparent integration surface:
  - Python package containing US tax-benefit rules and household-level calculations.
  - PolicyEngine web app/API and OpenFisca-style JSON/Python API patterns are relevant programmatic comparators.
- Obvious third-party wrappers / integrations:
  - `policyengine.py` is the recommended managed bundle for broader microsimulation workflows.
- First-pass fit:
  - Useful for rules-as-code, variable/parameter modeling, and API/schema comparison.
  - Not a tax filing or consumer bookkeeping tool; should be treated as a comparator rather than a direct prototype target unless tax-calculation modeling becomes central.

### IRS Tax Withholding Estimator

- Project URL: https://github.com/IRS-Public/tax-withholding-estimator
- Official tool URL: https://www.irs.gov/individuals/tax-withholding-estimator
- License: CC0-1.0 / public domain dedication as stated in the repository README.
- Latest visible release/status:
  - README says TWE 2.0 went live on 2026-02-27 and that the public repository exists for transparency, collaboration, and research.
- Category: official federal withholding estimator / W-4 and W-4P recommendation engine.
- Apparent integration surface:
  - Public web-app codebase for estimating federal withholding and pre-populating Forms W-4/W-4P.
  - Architecture and math documentation are linked from the repository.
  - Repository explicitly states it is not a filing tool and should not be used by taxpayers in place of the official IRS tool.
- Obvious third-party wrappers / integrations:
  - None obvious in the Day 4 pass.
- First-pass fit:
  - Strong official reference for transparent tax math and scoped non-filing disclaimers.
  - Not a return-preparation or submission candidate.

### tenforty

- Project URL: https://github.com/mmacpherson/tenforty
- License: MIT.
- Latest visible release/status:
  - README documents support for years 2018 through 2025.
  - Release metadata should be normalized during Day 5.
- Category: Python tax calculation wrapper / educational tax scenario evaluator.
- Apparent integration surface:
  - Python functions `evaluate_return` and `evaluate_returns`.
  - Validated inputs for year, state, filing status, dependents, income types, deductions, and related scenarios.
  - Returns structured Python/Pydantic-style outputs and supports dataframe-style scenario sweeps.
  - Built on top of OpenTaxSolver.
- Obvious third-party wrappers / integrations:
  - It is itself a wrapper over OpenTaxSolver and therefore important prior art if OpenTaxSolver is otherwise hard to automate.
- First-pass fit:
  - Promising bridge between a tax-form-oriented tool and a Python integration surface.
  - Needs direct install/test validation because it inherits limits from OpenTaxSolver and supports only selected states.

### Actual Budget

- Project URL: https://github.com/actualbudget/actual
- Docs URL: https://actualbudget.org/docs/
- API docs URL: https://actualbudget.org/docs/api/
- CLI docs URL: https://actualbudget.org/docs/api/cli/
- License: MIT.
- Latest visible release:
  - Release notes show 26.7.0 with release date 2026-07-01.
  - GitHub showed v26.7.0 as the latest visible release dated 2026-07-02.
- Category: local-first personal finance / budgeting; tax-adjacent through transaction data, reports, imports, and exports.
- Apparent integration surface:
  - Official Node.js API package `@actual-app/api`.
  - Official CLI package `@actual-app/cli`, with JSON, table, and CSV output options in the docs.
  - Import support for bank files including CSV, QIF, OFX, QFX, and CAMT per docs.
  - Community integrations include importers, local REST bridges, a Python API, backup tools, and transaction categorization helpers.
- Obvious third-party wrappers / integrations:
  - Official community-projects docs list bank sync/import projects, a local REST bridge, and a Python API implementation.
- First-pass fit:
  - Strong API/CLI-native personal-finance comparator.
  - Less tax-specific than GnuCash/Beancount workflows, but attractive if the prototype values clean external control surfaces.

### KMyMoney

- Project URL: https://github.com/KDE/kmymoney
- Website URL: https://kmymoney.org/
- Import/export docs: https://docs.kde.org/trunk_kf6/en/kmymoney/kmymoney/details.impexp.html
- License: KDE SPDX license set / GPL-family visible from repository; exact file-level mix should be checked during Day 5.
- Latest visible release: 5.2.0 release notes dated 2025-06-21 were visible in the Day 4 pass.
- Category: desktop personal finance manager.
- Apparent integration surface:
  - Desktop app with local files.
  - Import/export support spans GnuCash XML import, QIF importer/exporter, OFX importer/exporter, CSV importer/exporter, and Woob importer.
  - No obvious stable public API found during Day 4.
- Obvious third-party wrappers / integrations:
  - KMyMoney itself interoperates with common personal-finance file formats and GnuCash files.
- First-pass fit:
  - Useful GUI/full-desktop comparator, especially if GnuCash setup proves too heavy.
  - Weak as a prototype target unless file import/export is sufficient.

### HomeBank

- Project URL: https://www.gethomebank.org/
- Source / download URL: https://sourceforge.net/projects/homebank/
- License: GNU GPL per the project website.
- Latest visible release/status:
  - Active website and SourceForge presence observed; exact release/version metadata should be normalized during Day 5.
- Category: desktop personal accounting / personal finance.
- Apparent integration surface:
  - Desktop app with import/export, templates, category splits, scheduled transactions, duplicate detection, and assignment rules.
  - FAQ/docs mention CSV workflows and common personal-finance bank formats.
  - No obvious stable public API found during Day 4.
- Obvious third-party wrappers / integrations:
  - ofxstatement explicitly targets HomeBank as one destination for generated OFX.
- First-pass fit:
  - Plausible consumer-finance comparator but likely lower priority than GnuCash, KMyMoney, Firefly III, and Actual because automation appears file-driven.

### Money Manager Ex

- Project URL: https://github.com/moneymanagerex/moneymanagerex
- Website / docs URL: https://moneymanagerex.org/
- Import/export docs: https://moneymanagerex.org/docs/features/importexport/
- License: GPL-2.0.
- Latest visible release/status:
  - Stable release links were visible, but exact release metadata should be normalized during Day 5.
- Category: desktop/mobile personal finance manager.
- Apparent integration surface:
  - Desktop and mobile apps backed by a nonproprietary SQLite database.
  - Import/export docs list QIF, CSV, HTML, and XML.
  - CSV importer can accept user-selected field order instead of one fixed column order.
  - No obvious stable public API found during Day 4.
- Obvious third-party wrappers / integrations:
  - Android companion app and shared database/file workflows are visible from the project ecosystem.
- First-pass fit:
  - Useful as a mainstream personal-finance comparator with a durable SQLite/storage story.
  - Likely weaker than Actual/Firefly III for API-style integration.

### Fava

- Project URL: https://github.com/beancount/fava
- Docs URL: https://beancount.github.io/fava/
- License: MIT.
- Latest visible release/status:
  - GitHub showed tags and a PyPI version badge, but exact version/release date should be normalized during Day 5.
- Category: Beancount web UI / plain-text-accounting ecosystem component.
- Apparent integration surface:
  - Python package launched as `fava ledger.beancount`.
  - Web interface over a Beancount ledger.
  - Documentation includes API documentation and extension/plugin namespaces.
- Obvious third-party wrappers / integrations:
  - Fava is already a major Beancount ecosystem integration.
- First-pass fit:
  - Important prior art for turning a plain-text ledger into a richer web workflow.
  - Probably not a standalone shortlist tool unless Beancount is shortlisted and Fava becomes part of the evaluation stack.

### Paisa

- Project URL: https://github.com/ananthakumaran/paisa
- Website / docs URL: https://paisa.fyi/
- Related hledger note: https://hledger.org/paisa.html
- License: AGPL-3.0-or-later.
- Latest visible release: v0.7.4, latest visible GitHub release dated 2025-08-03.
- Category: plain-text-accounting web UI / personal-finance reporting.
- Apparent integration surface:
  - Reads Ledger, hledger, or Beancount files.
  - Uses a SQLite database generated from the source journal.
  - Provides reports, charts, investment tracking, and a web UI.
- Obvious third-party wrappers / integrations:
  - The hledger project documents Paisa as a related web app and notes hledger support caveats.
- First-pass fit:
  - Valuable comparator for UI/reporting on top of plain-text accounting.
  - Focused partly on Indian users and market data, so US tax relevance is indirect.

### ofxstatement

- Project URL: https://github.com/kedder/ofxstatement
- License: GPL-3.0.
- Latest visible release: 0.9.2, latest visible GitHub release dated 2024-11-25.
- Category: bank-statement conversion / adjacent import infrastructure.
- Apparent integration surface:
  - Python CLI `ofxstatement`.
  - Plugin system for converting proprietary bank statement exports to OFX.
  - Intended workflow is export from bank, convert to OFX, then import into accounting software.
- Obvious third-party wrappers / integrations:
  - README lists many bank-specific plugins and a sample plugin project.
- First-pass fit:
  - Strong prior art for synthetic bank-file ingestion into GnuCash, HomeBank, or other OFX-capable tools.
  - Not a standalone tax or bookkeeping tool.

## Immediate Follow-Up Questions

- Should the shortlist prioritize a REST-first path, represented by Firefly III, or a file/CLI-first path, represented by Beancount/hledger/Ledger?
- Can OpenTaxSolver be driven repeatably through textual input/output, or is it better treated as a manual/reference tax-form comparator?
- Does GnuCash's optional Python binding setup work cleanly in the local environment, especially on Windows?
- Does OpenFile's Direct File fork have enough independent accuracy, maintenance, and licensing evidence to evaluate, or should it stay reference-only?
- Which import layer is most convincing for a synthetic-data demo: CSV rules, OFX/QIF parsing, or a direct JSON/REST transaction API?
- Are the newer tax-engine candidates, especially Filed Open Tax Engine, mature enough to evaluate deeply, or should they be treated as promising but unproven?
- Is UsTaxes broad enough for a Week 2 hands-on test, or will state/schedule gaps make HabuTax/OpenTaxSolver better tax-form comparators?
- Should PolicyEngine US / Tax-Calculator stay in the shortlist conversation as model comparators despite not being consumer filing tools?

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
- [REPO-ustaxes-001] UsTaxes repository, https://github.com/ustaxes/ustaxes, accessed 2026-07-05.
  - Used for: project identity, AGPL-3.0 license, Federal 1040 scope, supported tax years/forms, client-side data posture, and local run instructions.
- [DOC-ustaxes-001] UsTaxes website, https://ustaxes.org/, accessed 2026-07-05.
  - Used for: project website and user-facing identity.
- [REPO-habutax-001] HabuTax repository, https://github.com/habutax/habutax, accessed 2026-07-05.
  - Used for: CLI/Python surface, implemented forms, plain-text input/output model, PDF filling path, and GPL-2.0 license.
- [REPO-filed-opentax-001] Filed Open Tax Engine repository, https://github.com/filedcom/opentax, accessed 2026-07-05.
  - Used for: source location, CLI/JSON examples, release/license metadata, coverage claims, and agent-oriented project posture.
- [DOC-filed-opentax-001] Filed Open Tax Engine website, https://opentax.filed.com/, accessed 2026-07-05.
  - Used for: public positioning, installation examples, and AI-agent-oriented interface claims.
- [REPO-tax-calculator-001] PSL Tax-Calculator repository, https://github.com/PSLmodels/Tax-Calculator, accessed 2026-07-05.
  - Used for: source location, model identity, latest visible GitHub release, and license badge.
- [DOC-tax-calculator-001] PSL Tax-Calculator documentation, https://taxcalc.pslmodels.org/, accessed 2026-07-05.
  - Used for: Python API, CLI, package installation, custom filing-unit data support, and docs-release metadata.
- [REPO-policyengine-us-001] PolicyEngine US repository, https://github.com/PolicyEngine/policyengine-us, accessed 2026-07-05.
  - Used for: source location, package identity, AGPL-3.0 license, install notes, and household-level tax-benefit rules scope.
- [DOC-openfisca-001] OpenFisca website, https://openfisca.org/en/, accessed 2026-07-05.
  - Used for: JSON web API and vectorial Python API rules-as-code comparison pattern.
- [REPO-irs-twe-001] IRS Tax Withholding Estimator repository, https://github.com/IRS-Public/tax-withholding-estimator, accessed 2026-07-05.
  - Used for: official public codebase, TWE 2.0 status, CC0/public-domain dedication, W-4/W-4P scope, and non-filing disclaimer.
- [REPO-tenforty-001] tenforty repository, https://github.com/mmacpherson/tenforty, accessed 2026-07-05.
  - Used for: Python library surface, OpenTaxSolver wrapper relationship, supported years/states, structured output fields, and MIT license.
- [REPO-actual-001] Actual Budget repository, https://github.com/actualbudget/actual, accessed 2026-07-05.
  - Used for: source location, local-first identity, license, setup modes, and latest visible GitHub release.
- [DOC-actual-api-001] Actual Budget API docs, https://actualbudget.org/docs/api/, accessed 2026-07-05.
  - Used for: official Node API package and programmatic-access model.
- [DOC-actual-cli-001] Actual Budget CLI docs, https://actualbudget.org/docs/api/cli/, accessed 2026-07-05.
  - Used for: official CLI package, configuration, and JSON/table/CSV output options.
- [REL-actual-001] Actual Budget release notes, https://actualbudget.org/docs/releases/, accessed 2026-07-05.
  - Observed: 26.7.0 release date and stable CLI note.
- [DOC-actual-community-001] Actual Budget community projects, https://actualbudget.org/docs/community-repos/, accessed 2026-07-05.
  - Used for: third-party importers, local REST bridge, Python API, and helper projects around Actual.
- [REPO-kmymoney-001] KMyMoney repository, https://github.com/KDE/kmymoney, accessed 2026-07-05.
  - Used for: project identity, supported platforms, source location, and license-file posture.
- [DOC-kmymoney-import-001] KMyMoney import/export documentation, https://docs.kde.org/trunk_kf6/en/kmymoney/kmymoney/details.impexp.html, accessed 2026-07-05.
  - Used for: GnuCash, QIF, OFX, CSV, and Woob import/export surfaces.
- [REL-kmymoney-001] KMyMoney 5.2.0 release notes, https://kmymoney.org/2025/06/21/kmymoney-5-2-0-released.html, accessed 2026-07-05.
  - Observed: 5.2.0 release date and import-related bugfix context.
- [DOC-homebank-001] HomeBank website, https://www.gethomebank.org/, accessed 2026-07-05.
  - Used for: personal-accounting scope, GNU GPL statement, import/export features, assignment rules, and duplicate detection.
- [PROJ-homebank-001] HomeBank SourceForge project, https://sourceforge.net/projects/homebank/, accessed 2026-07-05.
  - Used for: source/download location and format-support signal.
- [REPO-mmex-001] Money Manager Ex repository, https://github.com/moneymanagerex/moneymanagerex, accessed 2026-07-05.
  - Used for: source location, GPL-2.0 license, SQLite storage, CSV/QIF import, and desktop/mobile scope.
- [DOC-mmex-import-001] Money Manager Ex import/export docs, https://moneymanagerex.org/docs/features/importexport/, accessed 2026-07-05.
  - Used for: QIF, CSV, HTML, XML, and flexible CSV importer details.
- [REPO-fava-001] Fava repository, https://github.com/beancount/fava, accessed 2026-07-05.
  - Used for: source location, Beancount web-interface identity, license, install/run command, and ecosystem status.
- [DOC-fava-001] Fava documentation, https://beancount.github.io/fava/, accessed 2026-07-05.
  - Used for: documentation home and API/extension docs presence.
- [REPO-paisa-001] Paisa repository, https://github.com/ananthakumaran/paisa, accessed 2026-07-05.
  - Used for: source location, license, release metadata, Ledger dependency, and personal-finance web UI scope.
- [DOC-paisa-hledger-001] hledger note on Paisa, https://hledger.org/paisa.html, accessed 2026-07-05.
  - Used for: Ledger/hledger/Beancount file support, SQLite workflow, and hledger support caveats.
- [REPO-ofxstatement-001] ofxstatement repository, https://github.com/kedder/ofxstatement, accessed 2026-07-05.
  - Used for: CLI/plugin conversion model, license, latest visible release, and import-layer workflow.
