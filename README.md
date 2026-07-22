# AI Engineering Internship: Open-Source Tax Tooling Research

This repository is the completed July 2026 AI engineering internship project on open-source consumer tax tooling, bookkeeping systems, and programmatic integration surfaces.

## Final Status

Day 31 final delivery is complete. The project now includes the final research report, final editable deck, synthetic-only hledger prototype, deployed execution lab, mentor summary, evidence base, and day-by-day research trail.

Production deployment: https://executionlab.vercel.app

## Research Question

What does the current open-source ecosystem for consumer tax bookkeeping and US tax-return preparation/submission look like, and how feasible is it to connect representative tools to other software through APIs, CLIs, file formats, libraries, schemas, or comparable programmatic surfaces?

## Main Finding

The ecosystem has useful pieces, but not a complete open-source consumer filing stack. Plain-text accounting and personal-finance tools can model transactions and produce summaries. Tax calculation libraries can compute liability from summarized facts. Form-level engines can model federal return lines and export filing-adjacent artifacts. No evaluated project combined low-friction bookkeeping, complete US tax-return preparation, validation-clean filing artifacts, and production-ready third-party integration.

The project recommendation is therefore conservative: build a validated bookkeeping fact layer first. Do not claim production filing, tax advice, live taxpayer automation, refund estimation, validation-clean MeF export, or e-file support.

## Final Deliverables

- Final report: [`report/final_report.md`](report/final_report.md)
- Final editable deck: [`deck/open_source_tax_tooling_final_deck.pptx`](deck/open_source_tax_tooling_final_deck.pptx)
- Mentor summary: [`notes/mentor_summary.md`](notes/mentor_summary.md)
- Prototype package: [`prototype/`](prototype/)
- Execution lab: [`prototype/execution_lab/`](prototype/execution_lab/)
- Day 31 delivery note: [`notes/day_31_final_delivery.md`](notes/day_31_final_delivery.md)
- Public metadata refresh: [`notes/public_metadata_refresh_2026-07-22.md`](notes/public_metadata_refresh_2026-07-22.md)

## Scope And Safety Boundary

The project centers on consumer and freelancer-oriented tax/bookkeeping workflows, especially US workflows where practical. Non-US tools were included only when they clarified API, schema, or automation patterns.

The repository uses only generated synthetic data. No real taxpayer data, real financial account data, personally identifiable information, secrets, live filing credentials, production tax submissions, or real bank connections belong here.

This project is educational research and prototype documentation. It is not tax advice, tax preparation software, filing software, return validation software, or a recommendation to use any evaluated tool with real taxpayer data.

## Tools Evaluated

| Tool | Role in study | Final posture |
|---|---|---|
| hledger | Plain-text accounting, CLI, CSV rules, JSON reports | Primary prototype-backed bookkeeping fact layer |
| Actual Budget | Local-first finance app with official Node API and CLI | Best local app/API backup |
| Firefly III | Self-hosted personal-finance app with REST API | Strongest REST comparator |
| tenforty | Python tax-liability calculation library | Best downstream tax-liability experiment |
| Filed Open Tax Engine | Federal 1040-oriented CLI/form engine | Highest-upside but cautionary form-level candidate |

## Prototype

The prototype is a synthetic-only Python adapter around hledger. It validates a controlled 2025 freelancer CSV fixture, runs read-only hledger reports against scratch copies, reconciles JSON output, and emits normalized bookkeeping and tax-adjacent facts.

The implemented flow is:

```text
synthetic CSV + strict category map + optional mileage context
  -> wrapper preflight
  -> isolated read-only hledger reports
  -> JSON reconciliation
  -> normalized JSON
  -> execution lab live run or verified replay
```

The root reviewer command is:

```powershell
python run_day20_demo.py --json
```

The latest local verification used hledger `1.52.1` and passed with 19 transactions, 38 postings, 14 accounts, checking balance `8964.77`, reconciliation `passed`, and 15/15 failure-matrix cases passing.

## Execution Lab

The Next.js execution lab under [`prototype/execution_lab/`](prototype/execution_lab/) gives reviewers a visual way to inspect the prototype workflow, command lifecycle, synthetic inputs, normalized outputs, evidence, artifacts, changelog, and contribution path.

Production review URL: https://executionlab.vercel.app

Local development:

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

The app has two run modes:

- Local live run: calls `/api/run`, which runs the fixed synthetic Python demo when hledger is available.
- Verified replay: animates committed command evidence for Vercel/static review without requiring a local hledger binary.

## Repository Map

| Path | Purpose |
|---|---|
| [`README.md`](README.md) | Final project overview and reviewer handoff |
| [`CHANGELOG.md`](CHANGELOG.md) | Chronological decision and artifact history |
| [`day_by_day_ai_tax_tooling_phases.md`](day_by_day_ai_tax_tooling_phases.md) | Original 31-day execution roadmap |
| [`research/`](research/) | Longlist, shortlist, health snapshot, programmatic-surface survey, comparison matrix, prototype target decision |
| [`tool_records/`](tool_records/) | Per-tool hands-on evaluation records |
| [`evidence/`](evidence/) | Synthetic fixtures, command transcripts, generated evidence, and evidence README files |
| [`prototype/`](prototype/) | hledger adapter, tests, configuration, design docs, execution lab |
| [`report/`](report/) | Final report and preserved report drafts |
| [`deck/`](deck/) | Final deck, draft deck, and slide outline |
| [`notes/`](notes/) | Daily notes, mentor summary, QA notes, metadata refresh, source conventions |

## Verification

Final Day 31 checks:

```powershell
python run_day20_demo.py --json
python -m compileall prototype/hledger_adapter prototype/tests run_day20_demo.py prototype/run_day20_demo.py
cd prototype/execution_lab
npm run build
```

Day 30 also verified the failure matrix directly, rebuilt the execution lab from the lockfile, rendered the PowerPoint deck, ran deck overflow checks, and scanned for host-specific paths or credential-like values.

Day 31 deployed the execution lab to Vercel and verified that the Vercel build uses committed manifests rather than crawling local parent directories.

## Public Metadata Refresh

The final report keeps current/project-health language only where it is grounded in the Day 31 refresh. The refresh checked primary project sources for the five hands-on evaluated tools on 07-22-2026:

- hledger install/release page
- Actual Budget release notes
- Firefly III GitHub releases
- tenforty PyPI and GitHub pages
- Filed Open Tax Engine GitHub project and release pages

The refresh did not change the final recommendation.

## License

This repository is licensed under the MIT License. See [`LICENSE`](LICENSE).

hledger is a separate GPL-3.0-or-later executable and is not bundled. Firefly III and Filed Open Tax Engine include AGPL/commercial licensing considerations. License notes in this project are directional research observations, not legal advice.
