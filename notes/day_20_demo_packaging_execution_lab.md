# Day 20 - Demo Packaging and Project Execution Lab UI

## Goal

Make the prototype easy to run and explain by adding a one-command demo package and a Vercel-ready project execution lab that shows the synthetic hledger workflow, evidence trail, artifact manifest, and Git contribution path.

## What I Did

- Added `prototype/run_day20_demo.py`, a standard-library wrapper that runs the canonical adapter demo and the Day 19 failure matrix, emits JSON, redacts local paths, and reports step statuses for the UI.
- Added a Next.js execution lab under `prototype/execution_lab/`.
- Added `scripts/generate-manifest.mjs`, which generates repo-relative `data/project-manifest.json` and `public/project-manifest.json` with project rationale, workflow steps, artifact groups, fixture hashes, prototype totals, evidence links, and contribution guidance.
- Added `/api/run`, a local live-run endpoint that calls the Python Day 20 wrapper during development and returns replay metadata in Vercel-style environments.
- Built the UI around the actual prototype control room: run/replay actions, execution rail, result panels, safety matrix, evidence drawer, artifact manifest, unsupported-capability labels, and Git contribution panel.
- Updated the root README, prototype README, design note, changelog, and research log for Phase 20 completion.

## Evidence Captured

- `prototype/run_day20_demo.py`
- `prototype/execution_lab/`
- `prototype/execution_lab/data/project-manifest.json`
- `prototype/execution_lab/public/project-manifest.json`
- `prototype/day20_project_lab_ui_brief.md`
- `evidence/commands/07-13-2026_hledger-adapter_day18_summary.txt`
- `evidence/commands/07-13-2026_hledger-adapter_day19_failures.txt`

## Verification

- `python -m compileall hledger_adapter tests run_day20_demo.py`
- `python tests/run_failure_matrix.py`
- `python run_day20_demo.py --json`
- `npm run build` from `prototype/execution_lab/`
- Local dev server page check: `http://localhost:3000` returned HTTP 200.
- Public manifest check: `http://localhost:3000/project-manifest.json` returned HTTP 200.
- Local API check: `POST http://localhost:3000/api/run` returned HTTP 200 with `HLEDGER_NOT_FOUND` for the adapter demo and `passed` for the failure matrix.

The local environment still lacks hledger on `PATH`, so the live demo correctly reports the hledger setup boundary unless a reviewer supplies `--hledger-bin` or `HLEDGER_BIN`. Verified replay remains available without hledger.

## Decisions Made

- Use Next.js for the Vercel-ready lab because it supports a static first screen plus a small local API endpoint.
- Keep the app under `prototype/execution_lab/` so the Python adapter remains separate from the review UI.
- Generate the manifest from repo files instead of hand-maintaining an artifact list.
- Treat replay as first-class, not a fallback error state, because hledger is intentionally not bundled.
- Pin TypeScript to `5.9.3`; `typescript@latest` resolved to `7.0.2` in this environment and broke the Next type/build pass.

## Problems / Open Questions

- hledger is still not configured on this machine, so live hledger execution was validated only up to the expected discovery failure plus the passing failure matrix.
- npm reports two moderate dependency advisories in the installed Next dependency tree. I did not run `npm audit fix --force` because it can introduce breaking dependency changes.
- Day 21 should decide whether optional Markdown output is worth adding before the prototype freeze.

## Tomorrow's Starting Point

Execute Day 21 by reviewing the packaged prototype from a clean state, fixing only blockers, and writing the prototype retrospective.
