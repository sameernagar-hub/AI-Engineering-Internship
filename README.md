# AI Engineering Internship: Open-Source Tax Tooling Research

This repository tracks a July 2026 AI engineering internship project on open-source consumer tax tooling, bookkeeping systems, and programmatic integration surfaces.

## Research Question

What does the current open-source ecosystem for consumer tax bookkeeping and US tax-return preparation/submission look like, and how feasible is it to connect representative tools to other software through APIs, CLIs, file formats, libraries, schemas, or comparable programmatic surfaces?

## Project Deliverables

- A written research report covering the open-source tax-tooling landscape, per-tool findings, cross-tool comparison, and integration recommendations.
- A small prototype integration using synthetic data only.
- A 20-30 minute presentation deck for mentor review or portfolio use.

## Scope

The project centers on consumer and freelancer-oriented tax/bookkeeping workflows, especially US workflows where practical. Non-US tools may be included as comparators when they show useful API, schema, or automation patterns.

The work will use only generated synthetic data. No real taxpayer data, real financial account data, personally identifiable information, secrets, or live filing credentials belong in this repository.

## Planned Evaluation Areas

Each tool will be evaluated for:

- Identity, license, repository, release activity, and project health.
- Programmatic surface: CLI, library, REST API, plugin system, file format, schema, or database.
- Time to first useful operation from a fresh setup.
- Structured input/output quality and code drivability.
- Bookkeeping, reporting, tax-line mapping, form generation, and filing/submission coverage.
- Safety features such as dry runs, validation, sandboxing, and clear failure behavior.
- Integration fit for a thin wrapper, automation layer, or AI-agent-consumable workflow.

## Current Planning Documents

- [`codex_execution_plan_ai_tax_tooling.md`](codex_execution_plan_ai_tax_tooling.md) defines the month-long execution plan, deliverables, evaluation rubric, risks, and decision gates.
- [`day_by_day_ai_tax_tooling_phases.md`](day_by_day_ai_tax_tooling_phases.md) breaks the internship into daily phases from July 1 through July 31, 2026.

## Initial Candidate Tools

Starter candidates include:

- GnuCash
- Beancount
- Ledger CLI
- HLedger
- Firefly III
- OpenTaxSolver
- IRS Direct File posture for third parties
- OFX/QIF parsers and CSV-to-ledger tooling
- Selected non-US comparators when useful for API or schema comparison

## Timeline

- Week 1: Landscape survey, workspace setup, longlist, metadata, programmatic-surface review, and shortlist.
- Week 2: Hands-on evaluation with synthetic data and repeatable evidence capture.
- Week 3: Prototype integration around one selected tool.
- Week 4: Final report, presentation deck, publication cleanup, and delivery.

## Repository Status

Phase 1 is focused on kickoff and source understanding: clarifying the research question, identifying the deliverables, and keeping the planning documents visible. The next phase creates the research workspace, templates, citation conventions, and evidence system.
