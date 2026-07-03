# Research Log

This is the rolling daily research log. Add one entry at the end of each work session before moving to the next phase.

Use direct links to tool records, evidence files, source URLs, and commands whenever a note supports a later report claim.

## Entry Template

```md
## YYYY-MM-DD - Phase N: Title

### Goal

What today was supposed to accomplish.

### What I Did

- Concrete research, setup, or implementation steps completed.

### Evidence Captured

- Source links, command outputs, screenshots, metadata snapshots, or local files created.

### Decisions Made

- Choices that affect the shortlist, evaluation method, prototype direction, or report framing.

### Problems / Open Questions

- Gaps, confusing findings, tool failures, mentor questions, or follow-up searches.

### Tomorrow's Starting Point

- The first concrete action for the next phase.
```

## 2026-07-02 - Phase 2: Workspace and Evidence System

### Goal

Create the research workspace so future findings, command output, source links, and tool evaluations have consistent homes.

### What I Did

- Created the main workspace folders and trackable README files.
- Added evidence subfolders for commands, repository metadata, documentation notes, screenshots, and synthetic fixtures.
- Created `tool_records/template.md`.
- Created `notes/source_citation_conventions.md`.
- Wrote the Day 2 exit note at `notes/day_02_workspace_and_evidence.md`.

### Evidence Captured

- `tool_records/template.md`
- `notes/source_citation_conventions.md`
- `notes/day_02_workspace_and_evidence.md`
- `evidence/README.md`

### Decisions Made

- Use a dedicated citation convention with compact source IDs.
- Store local command and metadata evidence in purpose-specific evidence folders.
- Keep future tool evaluations in one template-driven file per tool.

### Problems / Open Questions

- None for this phase.

### Tomorrow's Starting Point

Create `research/longlist.md` for the starter candidate tools.

## 2026-07-03 - Maintenance: Changelog and Brief Alignment

### Goal

Create a persistent changelog and compare the repository plan against the attached internship brief.

### What I Did

- Extracted text from `C:\Users\nagar\Downloads\intern_project_description.pdf` with `pypdf`.
- Searched the execution plan, day-by-day plan, README, day notes, research log, and tool template for brief-specific requirements.
- Created `CHANGELOG.md` and backfilled Day 1 and Day 2 entries.
- Created `notes/internship_brief_alignment.md`.
- Updated the execution plan, day-by-day plan, README, and tool-record template with missing or implicit brief details.

### Evidence Captured

- `CHANGELOG.md`
- `notes/internship_brief_alignment.md`
- `codex_execution_plan_ai_tax_tooling.md`
- `day_by_day_ai_tax_tooling_phases.md`
- `tool_records/template.md`

### Decisions Made

- Keep the attached PDF out of the repository by default.
- Track third-party wrappers, exact tax-form coverage prompts, stated non-goals, annual tax-year support, and mentorship/logistics terms explicitly.
- Update `CHANGELOG.md` after every meaningful work session going forward.

### Problems / Open Questions

- `pdfinfo` was not installed, so PDF inspection used Python and `pypdf`.

### Tomorrow's Starting Point

Execute Phase 3 by creating `research/longlist.md` for the starter candidate tools.
