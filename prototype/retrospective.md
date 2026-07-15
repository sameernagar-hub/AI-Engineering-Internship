# Prototype Retrospective

Day 21 planned date: 07-21-2026. Executed early on 07-14-2026 at user request.

## Freeze Decision

The hledger adapter prototype is frozen for report writing. The frozen feature set is the synthetic-only Python adapter, the Day 20 demo wrapper, the safety failure matrix, and the execution lab UI. Optional Markdown output is deferred because the JSON contract, failure behavior, and reviewer-facing execution lab are the stronger evidence for the final report.

## Review Run

- `python -m compileall hledger_adapter tests run_day20_demo.py` passed.
- `python tests/run_failure_matrix.py` passes 15/15 expected cases and keeps scratch state unchanged.
- `python run_day20_demo.py --json` runs the packaged commands. On the current machine it correctly stops the live adapter demo at `HLEDGER_NOT_FOUND` because hledger is not configured, while the failure matrix passes.
- `npm run build` from `prototype/execution_lab/` passes and regenerates repo-relative manifests.

The missing local hledger executable is not a prototype blocker because the setup boundary is documented, the project does not bundle or install hledger, and the execution lab includes verified replay for review environments without hledger.

## What Worked

- hledger was a strong prototype target because its CSV, CLI, and JSON surfaces made the transaction-to-summary workflow inspectable.
- Strict wrapper validation closed gaps observed in raw tool evaluation, especially unknown categories, unknown accounts, duplicate IDs, tax-hint mismatches, sign errors, and missing synthetic acknowledgement.
- Scratch-copy execution kept the adapter read-only against source fixtures and made cleanup testable.
- Exact string money values avoided floating-point drift in summary output.
- The failure matrix turned safety claims into repeatable evidence instead of prose-only assurances.
- The execution lab makes the integration visible: synthetic input rows, command state, phase-by-phase lifecycle, output tables, evidence, artifact history, changelog, and contribution workflow are inspectable in one place.

## What Failed Or Stayed Limited

- hledger is still an external local prerequisite. The prototype can discover and report that boundary, but it intentionally does not download, install, embed, or redistribute hledger.
- The adapter proves bookkeeping-to-summary infrastructure, not tax preparation. It does not calculate deductible treatment, generate forms, estimate refunds, validate a return, or file anything.
- Real taxpayer data remains prohibited. The synthetic acknowledgement is a policy guardrail, not a reliable PII detector.
- The prototype supports one canonical 2025 USD freelancer fixture and controlled categories. Generalized import, custom category mapping, and multi-year support are out of scope for the freeze.
- Markdown rendering would be useful for report polish, but it would not add core integration evidence and is deferred.

## What The Integration Proves

The project proves that an AI-facing wrapper can safely drive an open-source bookkeeping CLI through constrained synthetic inputs, run read-only report commands, normalize the outputs, reconcile counts and balances, return tax-adjacent summaries, and expose clear failure states. It also proves that a reviewer-facing app can show both a true local run and a verified replay without weakening the hledger licensing and setup boundary.

## Frozen Out Of Scope

- Real taxpayer or financial data.
- Tax advice or tax treatment decisions.
- Form 1040, schedules, MeF XML, PDFs, e-file, or refund estimates.
- hledger bundling, auto-install, or redistribution.
- Network services, credentials, secrets, or mutation of user ledgers.
- Optional Markdown output and generalized custom-data mode.
