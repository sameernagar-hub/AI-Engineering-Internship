# Internship Brief Alignment

Date reviewed: 2026-07-03

Source reviewed: `C:\Users\nagar\Downloads\intern_project_description.pdf`

Extraction method: local PDF text extraction with `pypdf`.

## Search Scope

The brief was compared against:

- `README.md`
- `codex_execution_plan_ai_tax_tooling.md`
- `day_by_day_ai_tax_tooling_phases.md`
- `notes/day_01_kickoff.md`
- `notes/day_02_workspace_and_evidence.md`
- `notes/research_log.md`
- `tool_records/template.md`

Search terms included: `Form 1040`, `Schedule`, `credits`, `third-party`, `wrapper`, `prior art`, `non-goals`, `tax-year`, `annual`, `mentor`, `check-in`, `code review`, `OSI`, `PII`, `synthetic`, `presentation`, `Direct File`, `ELSTER`, `HMRC`, `OFX`, and `QIF`.

## Already Covered

- Internship dates: July 1 through July 31, 2026.
- Time commitment: about 20 hours per week and about 80 hours total.
- Core research question about open-source consumer tax bookkeeping, US tax-return tooling, and available programmatic surfaces.
- Starter tool families: GnuCash, Beancount, Ledger CLI, HLedger, Firefly III, OpenTaxSolver, IRS Direct File posture, OFX/QIF tooling, CSV-to-ledger pipelines, and selected non-US comparators.
- Main deliverables: written report, prototype code, and 20-30 minute presentation deck.
- Synthetic data and no real PII.
- OSI-approved open-source licensing target.
- Weekly mentor check-in expectation.
- Evidence-first evaluation method.

## Gaps Found and Now Tracked

- The brief asks whether third-party wrappers or integrations exist as prior art. This is now explicit in the execution plan, day plan, and tool-record template.
- The brief names Form 1040, Schedules A/B/C/D/E, and common credits as prompts for tax-workflow fit. These are now explicit in the execution plan and tool-record template.
- The brief asks what each project says it is not for. The tool-record template now includes stated non-goals and known exclusions.
- The brief asks how annual tax-year support tends to ship. The project-health rubric now tracks annual tax-year support separately.
- The brief includes educational objectives: evaluating an open-source landscape, reading unfamiliar codebases, designing a small integration, and presenting technical findings. These are now summarized in the execution plan.
- The brief includes logistics and terms: unpaid, educational, no promise of employment, student-owned work, no IP assignment, no NDA, no production work, remote/asynchronous, mentor code review on request, and possible introductions. These are now summarized as project constraints in the execution plan.
- The user requested ongoing backtracking. `CHANGELOG.md` now exists and the daily rhythm now says to update it after meaningful changes.

## Current Risk Notes

- The public IRS Direct File posture may not be a normal third-party API surface. Treat it as a policy/posture research item unless primary sources show otherwise.
- MeF, Direct File, and tax-form schemas may have access or redistribution limits. Capture terms and license constraints before using them in any prototype.
- Avoid overstating tax coverage. If a tool only supports paper forms, reports, TXF codes, or bookkeeping categories, say that directly.
- Do not commit the attached PDF unless the user explicitly requests it. The repository should cite and summarize the brief without bundling personal internship paperwork by default.

## Next Action

Proceed to Day 3: create `research/longlist.md` with starter candidate entries and first-pass metadata.
