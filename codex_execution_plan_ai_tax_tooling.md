# Execution Plan: Open-Source Tax Tooling and API Connectivity

## Calendar Assumption

The internship runs July 1-31, 2026. I am treating July 1 as kickoff and source review, and the actionable plan as July 2-31. The target commitment is about 20 hours per week, or about 80 hours total.

## Project Aim

Answer one practical research question:

> What does the current open-source ecosystem for consumer tax bookkeeping and US tax-return submission look like, and how feasible is it to connect representative tools to other software through APIs, CLIs, file formats, libraries, or comparable programmatic surfaces?

The final work should be portfolio-ready, reproducible, synthetic-data-only, and publishable under an OSI-approved license.

## Final Deliverables

1. Written research report
   - Landscape overview.
   - Per-tool findings.
   - Cross-tool comparison.
   - Recommendation for which tools are most promising for API-style integration.

2. Prototype integration
   - Public GitHub repository.
   - Synthetic data only.
   - Thin integration around one selected tool.
   - Runnable demo showing an end-to-end workflow.

3. Presentation deck
   - 20-30 minute walkthrough.
   - Research question, method, findings, prototype demo, recommendation, and next steps.

## Operating Principles

- Evidence before opinions: every claim in the report should trace back to a repo, docs page, command output, source file, or prototype result.
- Reproducibility over polish early: log commands, failures, install notes, and version numbers as they happen.
- Synthetic data only: no real taxpayer data, no real financial account data, no PII.
- Small prototype, deep explanation: the code should prove feasibility, while the report explains limits and tradeoffs.
- Do not overfit to US filing only: US consumer tax workflow is the center, but non-US tooling can be used as comparison when it reveals stronger API patterns.

## Core Evaluation Rubric

Each evaluated tool gets a structured record with these dimensions:

- Identity: name, category, repository, license, latest release, activity level.
- Programmatic surface: CLI, library import, REST API, plugin system, plain-text file format, schema, or database.
- First useful call: time and steps from fresh install to first meaningful operation.
- Code drivability: structured input/output, typed interfaces, JSON/XML modes, error clarity, documentation quality.
- Workflow coverage: bookkeeping, reporting, tax-line mapping, form generation, tax-year support, submission pathway.
- Safety: dry-run or validation mode, scratch data support, irreversible operations, failure modes on bad input.
- Project health: maintainers, recent commits/releases, issue activity, data format durability, license constraints.
- Integration fit: how good a candidate it is for a thin API wrapper or automation layer.

## Proposed Tool Set

Start with a broad survey, then narrow to 3-5 for deep evaluation.

Starter candidates:

- GnuCash
- Beancount
- Ledger CLI
- HLedger
- Firefly III
- OpenTaxSolver
- IRS Direct File posture for third parties
- OFX/QIF parsers and CSV-to-ledger tooling
- One or two non-US comparators if they expose clearer tax API patterns, such as HMRC or ELSTER-adjacent wrappers

The deep-evaluation shortlist should include at least:

- One GUI or full personal-finance system.
- One plain-text accounting tool.
- One tax-calculation or tax-form-oriented tool.
- One API-native or web-backed tool if available.

## Week 1: Scoping and Landscape Survey

Dates: July 2-7

Primary goal: produce a defensible shortlist.

Tasks:

- Create the project repository structure: `research/`, `tool_records/`, `prototype/`, `report/`, `deck/`, and `notes/`.
- Add a license, README, research log, and structured tool-record template.
- Survey the starter candidates and add any credible tools discovered along the way.
- Record repository metadata, licenses, release cadence, documentation links, and apparent integration surfaces.
- Identify which tools are worth installing and exercising in Week 2.
- Hold or prepare for the first mentor check-in with the shortlist and selection rationale.

Exit criteria:

- Longlist of candidate tools.
- Shortlist of 3-5 tools.
- One structured preliminary record per shortlisted tool.
- One-paragraph rationale for each shortlisted tool.
- Known exclusions documented with reasons.

## Week 2: Hands-On Evaluation

Dates: July 8-14

Primary goal: replace documentation impressions with direct evidence.

Tasks:

- Install or run each shortlisted tool in a clean, repeatable way.
- Capture version numbers, setup commands, dependency issues, and setup time.
- Exercise a common synthetic workflow where applicable:
  - create or load accounts
  - add transactions
  - list accounts
  - compute balances
  - run a report
  - export or inspect tax-relevant output
- Test failure behavior with malformed dates, unknown accounts, invalid amounts, and missing files.
- Identify safe sandboxing patterns such as temporary files, dry-run flags, test databases, or isolated config directories.
- Fill out the rubric for each tool.
- Score each candidate for prototype suitability.

Exit criteria:

- Complete evaluation record for each shortlisted tool.
- Comparison matrix across the rubric.
- Clear prototype target selected by July 14.
- Backup prototype target selected in case the first choice breaks down.

## Week 3: Prototype Integration

Dates: July 15-21

Primary goal: build one small, convincing integration.

Prototype shape:

- A thin adapter over the chosen tool's real programmatic surface.
- A simple external interface, likely REST API or CLI wrapper.
- A synthetic-data demo.
- Tests or scripted checks that prove the main flow works.

Suggested demo workflow:

- Load a synthetic taxpayer or freelancer dataset.
- Add income and expense transactions.
- Query accounts and balances.
- Generate a report or tax-relevant summary.
- Return structured output suitable for another application or AI agent to consume.

Implementation rules:

- Keep the adapter thin.
- Avoid building a fake tax product.
- Make unsafe operations explicit and disabled by default.
- Prefer structured outputs such as JSON.
- Include a `demo` command that a reviewer can run in one step after setup.

Exit criteria:

- Prototype runs end to end on synthetic data.
- Repository has README, license, setup instructions, demo instructions, and limitations.
- Code is small enough to understand in a walkthrough.
- Known gaps are documented honestly.

## Week 4: Report, Deck, and Publication

Dates: July 22-31

Primary goal: package the work into a portfolio-ready research project.

Tasks:

- Write the final report from the structured records, not from memory.
- Build a comparison table that uses the same rubric across tools.
- Explain why the prototype target was selected.
- Document what the prototype proves and what it does not prove.
- Create a presentation deck aligned with the report.
- Rehearse a 20-30 minute walkthrough.
- Finalize repository cleanup and publish artifacts.

Exit criteria:

- Public report in Markdown or PDF.
- Public prototype repo under an OSI-approved license.
- Presentation deck ready for mentor review or recording.
- Final mentor check-in completed or prepared.

## Time Budget

Approximate allocation:

- Landscape research: 15 hours.
- Tool installation and evaluation: 24 hours.
- Prototype implementation: 22 hours.
- Report writing: 10 hours.
- Deck and presentation prep: 6 hours.
- Mentor check-ins, cleanup, buffer: 3 hours.

## Decision Gates

Gate 1: July 7

- Is the shortlist balanced across bookkeeping, tax, and integration surfaces?
- Are there at least three tools with enough public information to evaluate deeply?

Gate 2: July 14

- Which tool has the best combination of usefulness, drivability, safety, and demo value?
- Is the prototype target technically feasible in one week?

Gate 3: July 21

- Does the prototype demonstrate real integration rather than a mock?
- Can someone else run it from the README?

Gate 4: July 28

- Do the report, code, and deck tell the same story?
- Are all claims supported by evidence?

## Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Tool installation takes too long | Cap setup attempts, record the failure, move to backup candidate |
| Candidate has no stable API | Treat CLI/file format as the integration surface, or downgrade its prototype score |
| Tax submission is not realistically accessible | Focus on bookkeeping-to-tax preparation and document the submission gap |
| Tool has poor error behavior | Build wrapper guardrails and highlight safety risk in findings |
| Scope expands beyond 80 hours | Preserve the prototype as a small adapter and put extra ideas in future work |
| Real financial data temptation | Use only generated synthetic fixtures and state that clearly in docs |

## Expected Recommendation Shape

The final recommendation should not simply pick "the best tax tool." It should separate use cases:

- Best for API-style integration.
- Best for transparent bookkeeping data.
- Best for tax-form experimentation.
- Best avoided for integration despite being useful manually.
- Most promising future direction for open-source tax tooling.

## Final Success Criteria

The project is successful if, by July 31, a reviewer can:

- Read the report and understand the open-source tax-tooling landscape.
- See exactly how each shortlisted tool was evaluated.
- Run the prototype on synthetic data.
- Understand the practical limits of connecting these tools to other software.
- Use the work as a credible portfolio artifact in AI engineering, fintech, or open-source infrastructure.
