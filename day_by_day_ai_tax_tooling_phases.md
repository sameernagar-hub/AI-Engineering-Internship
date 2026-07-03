# Day-by-Day Research Phases: Open-Source Tax Tooling and API Connectivity

## How To Use This File

This is the working roadmap for the July 1-31, 2026 internship. Each day is treated as its own phase with a specific research objective, concrete tasks, and an exit artifact. The point is to move one day at a time while still steering toward the end goal: a publishable report, a working prototype integration, and a presentation deck.

Daily rhythm:

- Start by reading the previous day's exit artifact.
- Do the day's research or build work.
- Save notes, commands, links, and evidence.
- Update `CHANGELOG.md` when a work session changes project direction, artifacts, prototype code, report/deck content, or repository structure.
- End by writing the day's artifact before moving on.

## End Goal

By July 31, deliver:

- A written research report on open-source consumer tax bookkeeping and tax-return tooling.
- A working prototype integration using synthetic data only.
- A 20-30 minute presentation deck.

## Week 1: Landscape, Scope, and Research Infrastructure

### Day 1 - July 1, 2026 - Phase 1: Kickoff and Source Understanding

Objective: understand the internship brief and define the research target.

Tasks:

- Read the project description and prior execution plan.
- Restate the research question in our own words.
- Identify the three final deliverables.
- Create initial planning files.

Exit artifact:

- `codex_execution_plan_ai_tax_tooling.md`
- This day-by-day phase plan.

Done when:

- The end goal, deliverables, and July timeline are clear.

### Day 2 - July 2, 2026 - Phase 2: Workspace and Evidence System

Objective: create the research workspace so every future finding has a home.

Tasks:

- Create folders for `research/`, `tool_records/`, `prototype/`, `report/`, `deck/`, `notes/`, and `evidence/`.
- Create a research log template.
- Create a tool-record template based on the evaluation rubric.
- Create a source-citation convention for links, docs, command output, and repo metadata.

Exit artifact:

- Workspace scaffold.
- `tool_records/template.md`
- `notes/research_log.md`

Done when:

- We can add a new tool and know exactly where its notes, evidence, and evaluation record belong.

### Day 3 - July 3, 2026 - Phase 3: Starter Tool Inventory

Objective: turn the starter list into a structured longlist.

Tasks:

- Create longlist entries for GnuCash, Beancount, Ledger CLI, HLedger, Firefly III, OpenTaxSolver, IRS Direct File posture, OFX/QIF tooling, and CSV-to-ledger tooling.
- For each entry, capture repo or project URL, docs URL, license, latest visible release, and apparent integration surface.
- Note obvious third-party wrappers or integrations if they are immediately visible.
- Add quick notes on whether the tool is bookkeeping, tax calculation, tax submission, or adjacent infrastructure.

Exit artifact:

- `research/longlist.md`

Done when:

- Every starter candidate has a basic entry and a first-pass category.

### Day 4 - July 4, 2026 - Phase 4: Discovery Search

Objective: find credible tools not listed in the original brief.

Tasks:

- Search for open-source tax calculators, tax form generators, ledger import/export tools, OFX/QIF parsers, and tax-line mapping tools.
- Search for third-party wrappers, integrations, plugins, package bindings, and prior-art automation examples.
- Look for non-US comparators only when they reveal useful API or schema patterns.
- Add discovered tools to the longlist if they are relevant and publicly inspectable.
- Record exclusions when a tool is closed-source, abandoned, irrelevant, or not consumer-oriented.

Exit artifact:

- Expanded `research/longlist.md`
- `research/exclusions.md`

Done when:

- The longlist reflects both the mentor's starter list and our own discovery.

### Day 5 - July 5, 2026 - Phase 5: Metadata and Health Snapshot

Objective: gather comparable project-health evidence before choosing the shortlist.

Tasks:

- Record repo activity, recent commits, release cadence, license, contributor signals, and documentation quality for each plausible candidate.
- Record visible annual tax-year support patterns for tax-oriented projects.
- Note whether the data format is plain text, database-backed, XML, binary, or external-service-backed.
- Capture evidence links for each claim.

Exit artifact:

- `research/project_health_snapshot.md`

Done when:

- Each plausible tool has enough health data to support a shortlist decision.

### Day 6 - July 6, 2026 - Phase 6: Programmatic Surface Survey

Objective: compare how each candidate can be driven from code.

Tasks:

- Identify whether each tool offers a CLI, library import, REST API, plugin system, file format, or schema.
- Mark surfaces as documented, stable, experimental, inferred, or unclear.
- Note structured output support such as JSON, XML, CSV, OpenAPI, typed APIs, or machine-readable schemas.
- Note whether input shapes are machine-readable or must be reconstructed from prose documentation.

Exit artifact:

- `research/programmatic_surfaces.md`

Done when:

- We can see which tools are realistic integration candidates before installing anything.

### Day 7 - July 7, 2026 - Phase 7: Shortlist Decision

Objective: choose 3-5 tools for deep evaluation.

Tasks:

- Score each plausible tool for relevance, integration surface, project health, tax workflow fit, and demo potential.
- Pick a balanced shortlist with at least one plain-text accounting tool, one full personal-finance system or API-backed app, and one tax-oriented tool if feasible.
- Write one paragraph explaining why each shortlisted tool made the cut.
- Write one paragraph explaining major exclusions.

Exit artifact:

- `research/shortlist.md`

Done when:

- Week 2 has a clear evaluation target list and a defensible selection rationale.

## Week 2: Hands-On Tool Evaluation

### Day 8 - July 8, 2026 - Phase 8: Evaluation Harness and Synthetic Data

Objective: prepare shared synthetic fixtures and repeatable evaluation scripts.

Tasks:

- Create synthetic transactions for a simple consumer or freelancer scenario.
- Include income, software expense, office expense, mileage or travel placeholder, interest income, and charitable or deductible-style examples where appropriate.
- Define the common operations we will attempt across tools: load data, add transaction, list accounts, compute balance, run report, export result.
- Create an evaluation checklist.

Exit artifact:

- `evidence/synthetic_dataset.md`
- `research/evaluation_checklist.md`

Done when:

- Every tool can be tested against the same basic scenario.

### Day 9 - July 9, 2026 - Phase 9: Evaluate Tool 1

Objective: perform the first deep evaluation and refine the method.

Tasks:

- Install or run the first shortlisted tool.
- Record setup commands, version numbers, friction, and time to first useful call.
- Exercise the common synthetic workflow where possible.
- Test bad input behavior.
- Fill out the tool record.

Exit artifact:

- `tool_records/tool_1.md`
- Evidence files for command output or screenshots if useful.

Done when:

- The first tool has a complete draft evaluation and the evaluation method has been tested.

### Day 10 - July 10, 2026 - Phase 10: Evaluate Tool 2

Objective: evaluate the second shortlisted tool using the same rubric.

Tasks:

- Install or run the second shortlisted tool.
- Record setup and first useful call.
- Exercise the synthetic workflow.
- Test failure handling and safety boundaries.
- Fill out the tool record.

Exit artifact:

- `tool_records/tool_2.md`

Done when:

- The second tool can be compared directly against the first.

### Day 11 - July 11, 2026 - Phase 11: Evaluate Tool 3

Objective: evaluate the third shortlisted tool with special attention to tax-workflow fit.

Tasks:

- Install or inspect the third shortlisted tool.
- Exercise available programmatic surfaces.
- Look for Form 1040, Schedules A/B/C/D/E, common credits, tax-line mapping, export formats, tax-year support, and explicit non-goals.
- Test failure behavior where the tool is runnable.
- Fill out the tool record.

Exit artifact:

- `tool_records/tool_3.md`

Done when:

- We have at least three complete evaluations across different tool categories.

### Day 12 - July 12, 2026 - Phase 12: Evaluate Tool 4 or Backup Candidate

Objective: add breadth or replace a weak candidate.

Tasks:

- Evaluate a fourth shortlisted tool if the shortlist is healthy.
- If one earlier candidate failed hard, evaluate a backup instead.
- Focus on what this tool adds to the comparison: API-native behavior, stronger tax coverage, better file format, or better automation surface.

Exit artifact:

- `tool_records/tool_4.md`

Done when:

- The comparison has enough variety to support a meaningful recommendation.

### Day 13 - July 13, 2026 - Phase 13: Complete Any Remaining Evaluation

Objective: finish the fifth tool or close gaps in existing records.

Tasks:

- Evaluate a fifth tool only if it improves the study.
- Otherwise revisit incomplete records and fill missing fields.
- Verify all evidence links and command notes.
- Normalize terminology across tool records.

Exit artifact:

- `tool_records/tool_5.md` if needed.
- Updated records for earlier tools.

Done when:

- All chosen tools have enough evidence for a fair comparison.

### Day 14 - July 14, 2026 - Phase 14: Prototype Target Selection

Objective: pick the tool we will integrate in Week 3.

Tasks:

- Build a comparison matrix from the tool records.
- Score candidates for prototype value, feasibility, safety, and demo clarity.
- Pick a primary prototype target and backup target.
- Write the prototype thesis: what the integration will prove.

Exit artifact:

- `research/comparison_matrix.md`
- `research/prototype_target_decision.md`

Done when:

- We know exactly what we are building in Week 3 and why.

## Week 3: Prototype Integration

### Day 15 - July 15, 2026 - Phase 15: Prototype Design

Objective: design the smallest useful integration.

Tasks:

- Choose the integration shape: REST wrapper, CLI wrapper, library adapter, or file-format adapter.
- Define input and output schemas.
- Define safe defaults such as dry-run mode, scratch files, and synthetic-only fixtures.
- Create the prototype README outline.

Exit artifact:

- `prototype/design.md`
- Prototype README draft.

Done when:

- The prototype has a narrow, buildable scope.

### Day 16 - July 16, 2026 - Phase 16: Adapter Skeleton

Objective: create the first working adapter layer.

Tasks:

- Scaffold the prototype project.
- Implement configuration and synthetic fixture loading.
- Implement the adapter interface for the chosen tool.
- Add a smoke test or demo command that proves the project runs.

Exit artifact:

- Initial code in `prototype/`

Done when:

- The adapter can start and call or simulate the chosen backend in a controlled way.

### Day 17 - July 17, 2026 - Phase 17: Core Operation 1 and 2

Objective: implement the first half of the demo workflow.

Tasks:

- Implement account listing or account loading.
- Implement transaction creation or transaction import.
- Validate inputs before they reach the underlying tool.
- Return structured output.

Exit artifact:

- Working operations for accounts and transactions.

Done when:

- Synthetic data can enter the integration and produce a clear result.

### Day 18 - July 18, 2026 - Phase 18: Core Operation 3 and 4

Objective: implement the second half of the demo workflow.

Tasks:

- Implement balance calculation or equivalent query.
- Implement report generation or tax-relevant summary.
- Normalize outputs into JSON, CSV, Markdown, or another structured format.
- Add notes about any output that had to be parsed from human-formatted text.

Exit artifact:

- Working operations for balances and reporting.

Done when:

- The prototype can run an end-to-end workflow on synthetic data.

### Day 19 - July 19, 2026 - Phase 19: Safety and Failure Handling

Objective: make the prototype honest and safe.

Tasks:

- Add bad-input tests for malformed dates, invalid amounts, unknown accounts, and missing files.
- Ensure the wrapper reports failures clearly.
- Keep destructive or external operations disabled by default.
- Document irreversible operations and guardrails.

Exit artifact:

- Failure-handling tests or scripted checks.
- Safety section in the README.

Done when:

- The prototype shows both happy-path behavior and safe failure behavior.

### Day 20 - July 20, 2026 - Phase 20: Demo Packaging

Objective: make the prototype easy to run and explain.

Tasks:

- Create a one-command demo.
- Add setup instructions.
- Add expected output.
- Clean up fixture names and comments.
- Confirm no real data or secrets are present.

Exit artifact:

- Runnable demo command.
- Updated README.

Done when:

- A reviewer can run the prototype without needing private context.

### Day 21 - July 21, 2026 - Phase 21: Prototype Review and Freeze

Objective: freeze the prototype feature set and capture lessons.

Tasks:

- Run the demo from a clean state.
- Fix only blocking issues.
- Write a short prototype retrospective: what worked, what failed, what the integration proves, and what remains out of scope.
- Update the comparison matrix with lessons learned from implementation.

Exit artifact:

- `prototype/retrospective.md`
- Frozen prototype for report writing.

Done when:

- The code deliverable is ready to be referenced in the final report.

## Week 4: Report, Deck, and Final Delivery

### Day 22 - July 22, 2026 - Phase 22: Report Structure

Objective: outline the final written report.

Tasks:

- Create report sections: introduction, method, landscape, tool evaluations, comparison, prototype, recommendation, limitations, future work.
- Pull structured facts from tool records into the outline.
- Identify missing evidence before drafting prose.

Exit artifact:

- `report/outline.md`

Done when:

- The report has a complete skeleton and no mystery sections.

### Day 23 - July 23, 2026 - Phase 23: Landscape and Method Draft

Objective: write the opening half of the report.

Tasks:

- Draft the research question and motivation.
- Explain the evaluation rubric.
- Summarize the open-source landscape.
- Explain why the shortlist was chosen.

Exit artifact:

- Draft report sections for introduction, method, and landscape.

Done when:

- A reader understands what was studied and how.

### Day 24 - July 24, 2026 - Phase 24: Tool Evaluation Draft

Objective: write the per-tool findings.

Tasks:

- Draft one section per evaluated tool.
- Include programmatic surfaces, code drivability, workflow coverage, safety, health, and integration fit.
- Keep claims tied to evidence from the records.

Exit artifact:

- Draft report sections for each tool.

Done when:

- Every shortlisted tool has a fair, evidence-backed writeup.

### Day 25 - July 25, 2026 - Phase 25: Comparison and Recommendation Draft

Objective: turn evaluations into a clear recommendation.

Tasks:

- Build the final comparison table.
- Separate recommendations by use case: API integration, transparent bookkeeping, tax-form experimentation, and tools to avoid for automation.
- Explain why the prototype target was chosen.

Exit artifact:

- Draft comparison and recommendation sections.

Done when:

- The report has an actual argument, not just notes.

### Day 26 - July 26, 2026 - Phase 26: Prototype Writeup

Objective: explain the code artifact clearly.

Tasks:

- Write the prototype section of the report.
- Include architecture, demo workflow, setup summary, sample output, safety choices, and limitations.
- Make sure the report and README describe the same behavior.

Exit artifact:

- Draft prototype section.
- Updated prototype README if needed.

Done when:

- A reader can understand what the prototype proves without reading every line of code.

### Day 27 - July 27, 2026 - Phase 27: Report Revision

Objective: make the report publishable.

Tasks:

- Tighten prose.
- Check citations and evidence links.
- Remove unsupported claims.
- Add limitations and future-work sections.
- Standardize tool names, dates, and terminology.
- Confirm the report still reflects the internship brief and the changelog's project history.

Exit artifact:

- Full report draft.

Done when:

- The report is ready for mentor feedback or final proofing.

### Day 28 - July 28, 2026 - Phase 28: Deck Outline

Objective: translate the report into a 20-30 minute talk.

Tasks:

- Create a slide-by-slide outline.
- Keep the deck aligned to the report's main argument.
- Decide where the prototype demo appears.
- Choose the few comparison visuals that matter most.

Exit artifact:

- `deck/outline.md`

Done when:

- The presentation has a coherent story from question to recommendation.

### Day 29 - July 29, 2026 - Phase 29: Deck Build

Objective: create the actual presentation deck.

Tasks:

- Build slides for research question, landscape, rubric, comparison, prototype demo, findings, recommendation, and next steps.
- Add screenshots or terminal output from the prototype if useful.
- Keep slides readable and demo-focused.

Exit artifact:

- Draft deck.

Done when:

- The deck can support a live or recorded walkthrough.

### Day 30 - July 30, 2026 - Phase 30: Final QA and Rehearsal

Objective: verify that all deliverables are consistent and runnable.

Tasks:

- Re-run the prototype demo from clean instructions.
- Read the report once as a skeptical reviewer.
- Walk through the deck out loud and time it.
- Fix mismatches between report, README, and deck.
- Confirm no real data, secrets, or private files are included.

Exit artifact:

- Final QA checklist.

Done when:

- The report, prototype, and deck all tell the same story and the demo still works.

### Day 31 - July 31, 2026 - Phase 31: Final Delivery

Objective: publish or package the final internship deliverables.

Tasks:

- Finalize report.
- Finalize prototype repository.
- Finalize deck.
- Write a short final summary for the mentor.
- Note what to continue after the internship if desired.

Exit artifact:

- Final report.
- Final code repository.
- Final presentation deck.
- Mentor summary.

Done when:

- The project is complete, publishable, and ready to show as a portfolio artifact.

## Daily Research Log Template

Use this at the end of every day:

```md
## YYYY-MM-DD - Phase N: Title

### Goal

### What I Did

### Evidence Captured

### Decisions Made

### Problems / Open Questions

### Tomorrow's Starting Point
```

## Weekly Mentor Check-In Prompts

Week 1:

- Does the shortlist look balanced and worth the remaining time?
- Are any important tools missing?

Week 2:

- Which tool looks best for a prototype, and is that choice defensible?
- Are the evaluation dimensions answering the original research question?

Week 3:

- Does the prototype prove a real integration point?
- Is the demo small enough to finish and explain well?

Week 4:

- Does the report make a clear recommendation?
- Are the deliverables strong enough to publish and use in a portfolio?
