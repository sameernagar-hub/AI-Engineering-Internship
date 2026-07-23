# Open-Source Tax Tooling Research Lab

Research, evidence, and a working synthetic prototype for studying whether open-source bookkeeping and tax-adjacent tools can become reliable programmatic building blocks.

- **Author:** Sameer Nagar
- **Project window:** July 2026 AI Engineering Internship
- **Finalized:** 2026-07-22, ahead of the planned 2026-07-31 delivery date
- **License:** MIT for this repository; see [LICENSE](LICENSE)

Production execution lab: https://executionlab.vercel.app

## The Big Idea

Consumer tax software is not just a form-filling problem. Before a return can be prepared, software has to transform messy financial activity into trusted facts: income, expenses, balances, payments, supporting context, provenance, and clear limits on what is known.

This project asks:

> What does the current open-source ecosystem for consumer tax bookkeeping and US tax-return preparation look like, and how feasible is it to connect representative tools to other software through APIs, CLIs, file formats, libraries, schemas, or comparable programmatic surfaces?

The answer is useful but cautionary. The ecosystem has strong pieces, but no evaluated project delivers a complete open-source consumer filing stack. The strongest near-term architecture is a validated bookkeeping fact layer that downstream tax calculation or form tools can consume later.

That is what this repository proves.

## Core Finding

Open-source bookkeeping and personal-finance tools can structure transactions and expose data. Tax libraries can calculate liability from summarized facts. Form engines can model return lines or filing-adjacent artifacts. The missing production-ready layer is the guarded bridge between them.

The recommendation is therefore deliberately conservative:

**Build validated bookkeeping facts first. Do not claim tax advice, live taxpayer automation, refund estimation, validation-clean MeF export, e-file support, or production filing.**

## What This Project Proves

The research claim is tested through a working hledger-backed prototype and an application-style execution lab.

| Claim | How the project tests it | Where to inspect |
|---|---|---|
| Open-source tools expose useful integration surfaces. | Five representative tools were evaluated for CLI, API, file, library, schema, and JSON surfaces. | [tool_records/](tool_records/), [research/programmatic_surface_survey.md](research/programmatic_surface_survey.md) |
| A complete consumer filing stack was not found. | The comparison matrix separates bookkeeping, tax calculation, form modeling, validation, and filing capability. | [research/comparison_matrix.md](research/comparison_matrix.md), [report/final_report.md](report/final_report.md) |
| A safer first product layer is bookkeeping-to-facts, not filing automation. | hledger was selected as the prototype target because it is transparent, scriptable, and honest about its limits. | [research/prototype_target_decision.md](research/prototype_target_decision.md) |
| A thin adapter can make an open-source CLI safer and more application-ready. | The Python wrapper validates inputs, runs read-only hledger reports, reconciles JSON, and emits normalized facts. | [prototype/](prototype/), [prototype/design.md](prototype/design.md) |
| The workflow can be reviewed as an application, not just as notes. | The Next.js execution lab exposes the lifecycle, evidence, commands, artifacts, and verified replay. | [prototype/execution_lab/](prototype/execution_lab/), https://executionlab.vercel.app |

## Architecture

The project is organized as a research-to-application pipeline:

```text
research question
  -> landscape scan and public metadata review
  -> shortlist of representative tools
  -> synthetic freelancer scenario
  -> hands-on evaluation and failure testing
  -> cross-tool comparison
  -> prototype target decision
  -> hledger adapter
  -> execution lab
  -> final report and deck
```

The prototype architecture is intentionally narrow:

```text
synthetic CSV + synthetic context + strict category map
  -> wrapper preflight
  -> isolated scratch copies
  -> read-only hledger reports
  -> JSON reconciliation
  -> normalized bookkeeping and tax-adjacent facts
  -> execution lab live run or verified replay
```

The wrapper owns the safety policy. hledger is treated as a powerful accounting engine, not as a tax product. The adapter closes gaps observed during evaluation, including duplicate transaction IDs and unknown categories that hledger itself did not reject under tested defaults.

## Application Layer

The visible application is the execution lab under [prototype/execution_lab/](prototype/execution_lab/). It is not a marketing page. It is a reviewer-facing lab for exploring the research system as a working application:

- Run the pinned synthetic demo locally when hledger is available.
- Replay the verified command payload in hosted environments.
- Inspect the prototype lifecycle from validation through cleanup.
- View synthetic inputs, normalized outputs, evidence links, artifacts, and command phases.
- Connect the UI experience back to the research argument and repository structure.

Local execution lab:

```powershell
cd prototype/execution_lab
npm install
npm run dev
```

Production build:

```powershell
cd prototype/execution_lab
npm run build
```

Hosted review: https://executionlab.vercel.app

## Prototype

The prototype is a synthetic-only Python adapter around hledger. It validates a controlled 2025 freelancer CSV fixture, runs read-only hledger reports against scratch copies, reconciles the JSON output, and emits normalized facts.

Root reviewer command:

```powershell
python run_day20_demo.py --json
```

The run includes:

- `python -m hledger_adapter demo`
- `python tests/run_failure_matrix.py`

Latest verified local result:

| Measure | Result |
|---|---:|
| hledger version | `1.52.1` |
| Transactions | `19` |
| Postings | `38` |
| Accounts | `14` |
| Checking balance | `8964.77` |
| Reconciliation | `passed` |
| Failure matrix | `15/15` passed |

The prototype emits:

- Normalized transactions and account balances.
- Controlled Schedule C-style bookkeeping summaries.
- Interest, charity, estimated-payment tracking, and preserved mileage facts.
- Warnings, unsupported capabilities, and provenance.
- Exact decimal money strings rather than binary floating-point values.

It does not calculate tax liability, decide deductibility, generate forms, estimate refunds, validate a return, create reliable MeF filing artifacts, or file electronically.

## Evaluated Tools

| Tool | Role in the study | Final posture |
|---|---|---|
| hledger | Plain-text accounting, CSV rules, CLI reports, JSON output | Primary prototype-backed bookkeeping fact layer |
| Actual Budget | Local-first finance app with official Node API and stable CLI | Best local app/API alternative |
| Firefly III | Self-hosted personal-finance app with REST API | Strongest REST comparator |
| tenforty | Python tax-liability calculation library | Best downstream tax-liability experiment |
| Filed Open Tax Engine | Federal 1040-oriented CLI/form engine | Highest-upside but cautionary form-level candidate |

The project treats these as complementary layers, not interchangeable products.

## Repository Map

| Path | What lives there | Why it matters |
|---|---|---|
| [README.md](README.md) | Project front door | Research thesis, architecture, reproduction path, and artifact index |
| [report/final_report.md](report/final_report.md) | Final written report | Complete research narrative, method, findings, recommendation, limits |
| [deck/open_source_tax_tooling_final_deck.pptx](deck/open_source_tax_tooling_final_deck.pptx) | Final editable deck | Presentation artifact for mentor/reviewer delivery |
| [prototype/](prototype/) | Python hledger adapter and execution-lab source | Working proof that the recommended fact-layer architecture is feasible |
| [prototype/hledger_adapter/](prototype/hledger_adapter/) | Adapter package | Validation, hledger execution, normalization, reconciliation, CLI |
| [prototype/config/](prototype/config/) | Category map and static hledger CSV rules | Controlled mapping layer between synthetic CSV and accounting engine |
| [prototype/tests/](prototype/tests/) | Failure matrix runner | Safety and error-boundary verification |
| [prototype/execution_lab/](prototype/execution_lab/) | Next.js review application | Application-based view of the research workflow and evidence |
| [research/](research/) | Longlist, shortlist, comparison, decision records | Research spine behind the recommendation |
| [tool_records/](tool_records/) | Hands-on tool evaluations | Per-tool setup, workflow, failure behavior, and integration notes |
| [evidence/](evidence/) | Synthetic fixtures, command transcripts, generated outputs | Reproducibility base for claims made in the report |
| [notes/](notes/) | Daily notes, mentor summary, QA, metadata refresh | Timeline, decisions, delivery context, and source conventions |
| [CHANGELOG.md](CHANGELOG.md) | Chronological artifact history | Day-by-day project evolution |
| [LICENSE](LICENSE) | MIT license text | Legal terms for this repository |

## Important Files By Question

| If you want to know... | Start here |
|---|---|
| What was the research question? | [report/final_report.md](report/final_report.md) |
| What is the short recommendation? | [notes/mentor_summary.md](notes/mentor_summary.md) |
| Why hledger was chosen | [research/prototype_target_decision.md](research/prototype_target_decision.md) |
| How the prototype is designed | [prototype/design.md](prototype/design.md) |
| How to run the demo | [prototype/README.md](prototype/README.md) |
| What data is used | [evidence/synthetic_dataset.md](evidence/synthetic_dataset.md) |
| What commands were captured | [evidence/commands/](evidence/commands/) |
| What each evaluated tool did well or poorly | [tool_records/](tool_records/) |
| What changed during the internship | [CHANGELOG.md](CHANGELOG.md) |
| What shipped at final delivery | [notes/day_31_final_delivery.md](notes/day_31_final_delivery.md) |

## Research Method

The project used an evidence-first funnel:

1. Build a longlist of open-source bookkeeping, personal finance, tax calculation, form-level, import/export, and reference projects.
2. Record health, licensing, activity, documentation, and integration signals.
3. Compare programmatic surfaces: APIs, CLIs, file formats, schemas, libraries, exports, and databases.
4. Select a balanced hands-on shortlist.
5. Evaluate each shortlisted tool against the same synthetic freelancer workflow.
6. Capture success paths and failure behavior.
7. Choose a prototype target based on feasibility, safety, transparency, and honest scope.
8. Build a small adapter that proves the recommended architecture without overclaiming tax functionality.

## Synthetic Dataset

The shared dataset models a fictional 2025 freelancer. It includes checking transactions, freelance income, business expenses, interest income, charitable contributions, estimated federal payments, and business mileage. It contains no real taxpayer data, no real financial account data, no PII, no secrets, and no live filing credentials.

Canonical fixture:

- [evidence/fixtures/synthetic_freelancer_transactions.csv](evidence/fixtures/synthetic_freelancer_transactions.csv)
- [evidence/fixtures/synthetic_freelancer_tax_profile.json](evidence/fixtures/synthetic_freelancer_tax_profile.json)

Expected baseline checking balance: `8964.77`

## Verification

Final verification commands:

```powershell
python run_day20_demo.py --json
python -m compileall prototype/hledger_adapter prototype/tests run_day20_demo.py prototype/run_day20_demo.py
cd prototype/execution_lab
npm run build
```

Day 30 and Day 31 checks also covered the failure matrix, execution-lab production build, deck rendering/overflow review, credential-like string scans, host-path checks, Vercel deployment, and committed manifest behavior.

## Timeline

| Phase | Dates / artifacts | Outcome |
|---|---|---|
| Research framing | Day 1 onward | Workspace, source conventions, research question, and evidence discipline established |
| Landscape and shortlist | Days 4-8 | Longlist, exclusions, health snapshot, programmatic-surface survey, shortlist, synthetic dataset |
| Hands-on evaluation | Days 9-13 | hledger, Actual Budget, Firefly III, tenforty, and Filed Open Tax Engine evaluated |
| Prototype design and build | Days 14-21 | hledger selected, adapter built, failure matrix added, execution lab created, prototype frozen |
| Report and recommendation | Days 22-27 | Report drafts consolidated into the final argument |
| Deck and final QA | Days 28-31 | Final deck, mentor summary, public metadata refresh, README, deployment, verification |

Final delivery was completed on 2026-07-22.

## Safety Boundary

This repository is educational research and prototype documentation. It is not tax advice, tax preparation software, filing software, return validation software, refund estimation software, or a recommendation to use any evaluated tool with real taxpayer data.

No real taxpayer data, real bank data, personally identifiable information, secrets, live filing credentials, production submissions, or real financial connections belong in this project.

The adapter is intentionally limited:

- Synthetic-only input policy.
- Static category map.
- Required acknowledgement for custom synthetic runs.
- Read-only hledger reports.
- Scratch-copy execution.
- `shell=False` subprocess calls.
- Host-path redaction.
- Explicit unsupported-capability warnings.

## Public Metadata Refresh

Point-in-time public release and project-status claims for the five hands-on tools were refreshed from primary project sources on 2026-07-22 and recorded in [notes/public_metadata_refresh_2026-07-22.md](notes/public_metadata_refresh_2026-07-22.md). The refresh did not change the final recommendation.

## Future Work

The strongest next step is a second-stage experiment that feeds the hledger normalized summary into tenforty, with wrapper-side sanity checks and the same synthetic-only boundary.

Other useful extensions:

- Broaden the synthetic dataset to cover capital gains, credits, state taxes, rental income, depreciation, and multi-year workflows.
- Revisit Filed Open Tax Engine after validation/export behavior, supported-year scope, and licensing implications are clearer.
- Evaluate hledger-web or Actual Budget API paths for a service-style architecture.
- Perform deeper GPL/AGPL license review before any redistributed or hosted integration model.
- Export a PDF copy of the final deck for non-editable sharing.

## License

This repository is licensed under the MIT License. See [LICENSE](LICENSE).

hledger is a separate GPL-3.0-or-later executable and is not bundled. Firefly III and Filed Open Tax Engine include AGPL/commercial licensing considerations. License notes in this repository are directional research observations, not legal advice.
