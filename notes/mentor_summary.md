# Mentor Summary - Final Delivery

## Project In One Paragraph

This internship project evaluated open-source consumer tax-adjacent tooling through the lens of programmatic integration. The core finding is that the ecosystem has useful pieces, but not one complete open-source consumer filing stack. The safest practical integration is a guarded bookkeeping fact layer: validate controlled transaction inputs, run transparent accounting reports, emit structured summaries, and leave tax calculation or form filing as explicit downstream work.

## What Shipped

- Final report: `report/final_report.md`
- Final editable deck: `deck/open_source_tax_tooling_final_deck.pptx`
- Prototype adapter: `prototype/hledger_adapter/`
- One-command demo: `python run_day20_demo.py --json`
- Execution lab: `prototype/execution_lab/`
- Deployed execution lab: https://executionlab.vercel.app
- Evidence base: `tool_records/`, `research/`, `evidence/`, and `notes/`

## Recommendation

Use hledger as the prototype-backed pattern for an open-source bookkeeping fact layer. Treat Actual Budget as the best local app/API alternative, Firefly III as the strongest REST comparator, tenforty as the most promising downstream tax-liability component, and Filed Open Tax Engine as high-upside but higher-risk form-level experimentation. Do not frame any evaluated tool as production filing software or a complete consumer tax stack.

## Verification Snapshot

- Root demo: `python run_day20_demo.py --json`
- Python compile check: `python -m compileall prototype/hledger_adapter prototype/tests run_day20_demo.py prototype/run_day20_demo.py`
- Execution lab build: `npm run build`
- Latest local live run: hledger `1.52.1`, 19 transactions, 38 postings, 14 accounts, checking balance `8964.77`, reconciliation `passed`, and 15/15 safety cases passed.

## Continue After Internship

The next strongest extension would pair the hledger summary output with tenforty in a second-stage tax-liability experiment, with wrapper-side sanity checks and no real taxpayer data. A deeper legal/license review would also be needed before any redistributed or hosted GPL/AGPL-backed integration.
