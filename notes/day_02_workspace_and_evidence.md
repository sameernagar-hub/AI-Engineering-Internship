# 2026-07-02 - Phase 2: Workspace and Evidence System

## Goal

Create the research workspace so future findings, command output, source links, and tool evaluations have consistent homes.

## What I Did

- Created the main workspace folders: `research/`, `tool_records/`, `prototype/`, `report/`, `deck/`, `notes/`, and `evidence/`.
- Added lightweight README files so the scaffold is visible in git and each folder has a defined purpose.
- Created evidence subfolders for command output, repository metadata, documentation notes, screenshots, and synthetic fixtures.
- Created a rolling research log template.
- Created a structured tool-record template based on the evaluation rubric.
- Created source-citation conventions for links, docs, command output, and repo metadata.

## Evidence Captured

- Workspace scaffold: `research/`, `tool_records/`, `prototype/`, `report/`, `deck/`, `notes/`, `evidence/`.
- Tool-record template: `tool_records/template.md`.
- Research log template: `notes/research_log.md`.
- Citation convention: `notes/source_citation_conventions.md`.
- Evidence organization: `evidence/README.md` and subfolder README files.

## Decisions Made

- Keep source-citation guidance in its own note so it can be referenced from every future tool record.
- Use compact citation IDs such as `[DOC-tool-slug-001]`, `[REPO-tool-slug-001]`, `[REL-tool-slug-001]`, `[CMD-tool-slug-001]`, and `[META-tool-slug-001]`.
- Save command output and repo metadata as local evidence files when they support setup, version, project-health, or behavior claims.
- Track empty workspace folders with README files instead of relying on untracked directories.

## Problems / Open Questions

- None for this phase.

## Tomorrow's Starting Point

Begin Phase 3 by creating `research/longlist.md` entries for GnuCash, Beancount, Ledger CLI, HLedger, Firefly III, OpenTaxSolver, IRS Direct File posture, OFX/QIF tooling, and CSV-to-ledger tooling.
