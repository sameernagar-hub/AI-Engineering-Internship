# Synthetic Freelancer hledger Adapter

## Status

Phase 21 prototype review and freeze are complete. The CLI can load committed configuration, validate the canonical synthetic fixtures, discover and version-probe hledger, run real read-only `print -O json`, `balance --flat -O json`, and `incomestatement --depth 3 -O json` reports through scratch copies, reconcile the results, emit normalized transactions/account balances/controlled Schedule C-style totals/tax-adjacent facts, and run a stable failure matrix for expected bad inputs and hledger discovery failures.

The frozen package includes a one-command demo wrapper at [`run_day20_demo.py`](run_day20_demo.py), a Vercel-ready Next.js execution lab at [`execution_lab/`](execution_lab/), and the Day 21 retrospective at [`retrospective.md`](retrospective.md). The execution lab now opens lifecycle phase popups with the command and command output for the selected phase, plus an architecture tab that summarizes the prototype flow. Optional Markdown output is deferred until report polish.

The implementation contract is in [`design.md`](design.md). The selected target and comparison rationale are in [`research/prototype_target_decision.md`](../research/prototype_target_decision.md).

## What This Prototype Will Prove

The prototype will drive a real hledger executable through its local CSV, CLI, and JSON surfaces. It will turn controlled synthetic freelancer transactions into reconciled, normalized bookkeeping and tax-adjacent facts that another program or AI agent can consume.

The planned flow is:

```text
synthetic CSV + strict category map + optional mileage context
  -> wrapper preflight
  -> isolated read-only hledger reports
  -> JSON reconciliation
  -> normalized JSON
  -> optional Markdown view
```

The adapter will:

- Validate dates, exact decimal amounts, amount direction, source IDs, accounts, categories, tax-hint pairs, and synthetic context before hledger runs.
- Reject duplicate IDs and unknown categories that hledger itself accepted during the Day 9 evaluation.
- Run only read-only hledger `print`, `balance`, and `incomestatement` reports.
- Return normalized transactions, accounts, checking balance, controlled Schedule C-style bookkeeping totals, interest, charity, estimated-payment tracking, mileage status, warnings, limitations, and provenance.
- Preserve mileage without choosing a rate or calculating a deduction.

It will not:

- Support real taxpayer or financial data. Real data is prohibited by project policy, although the adapter cannot reliably detect a user violating that policy.
- Prepare, calculate, validate, or file a tax return.
- Decide whether an expense or donation is deductible.
- Generate Form 1040, schedules, a refund estimate, PDF forms, MeF XML, or e-file output.
- Mutate a user ledger, start a server, use the network, or auto-install hledger.

## Runtime and Interface

The implementation uses Python 3.11+ with no third-party runtime dependencies. hledger remains a separate prerequisite; on Windows, a user-scoped Winget install can be discovered after the explicit and PATH-based options. The package lives directly under `prototype/hledger_adapter/`, so the examples run from `prototype/` without installation; this is why fixture paths begin with `../evidence/`.

Implemented CLI commands through Day 18:

```text
python -m hledger_adapter validate --transactions ../evidence/fixtures/synthetic_freelancer_transactions.csv --context ../evidence/fixtures/synthetic_freelancer_tax_profile.json --confirm-synthetic
python -m hledger_adapter summarize --transactions ../evidence/fixtures/synthetic_freelancer_transactions.csv --context ../evidence/fixtures/synthetic_freelancer_tax_profile.json --confirm-synthetic
python -m hledger_adapter summarize --transactions ../evidence/fixtures/synthetic_freelancer_transactions.csv --context ../evidence/fixtures/synthetic_freelancer_tax_profile.json --dry-run --confirm-synthetic
python -m hledger_adapter smoke
python -m hledger_adapter demo
```

The `demo` command selects the repository's canonical synthetic inputs automatically.

Implemented safety check through Day 19:

```text
python tests/run_failure_matrix.py
```

Day 20 demo package:

```text
python run_day20_demo.py --json
cd execution_lab
npm install
npm run dev
npm run build
```

The execution lab opens on the synthetic prototype workflow. `Run Synthetic Demo` calls a local API endpoint that runs `run_day20_demo.py` and never accepts alternate transaction files. `Replay Verified Run` animates the committed Day 18 and Day 19 evidence so a Vercel deployment can still show a functioning walkthrough without a local hledger executable.

### Commands

| Command | Purpose | Calls hledger? | Persists state by default? |
|---|---|---:|---:|
| `validate` | Validate input, map, and optional context. | no | no |
| `summarize --dry-run` | Validate, resolve hledger, and show the planned full-report execution. | no | no |
| `smoke` | Run read-only transaction/account reconciliation for supplied synthetic inputs. | yes | no |
| `demo` | Run the end-to-end summary against fixed canonical fixtures. | yes | no |
| `summarize` | Run the end-to-end summary for supplied synthetic inputs. | yes | no |

## Inputs

| Input | Role |
|---|---|
| [`synthetic_freelancer_transactions.csv`](../evidence/fixtures/synthetic_freelancer_transactions.csv) | Canonical 19-row synthetic transaction fixture. |
| [`synthetic_freelancer_tax_profile.json`](../evidence/fixtures/synthetic_freelancer_tax_profile.json) | Optional context. Version 1 reads identity/privacy fields and mileage quantity only, requires mileage rate/deduction to remain null, and never uses stored financial totals as calculation inputs. |
| [`config/category_map.json`](config/category_map.json) | Exact account, category, tax-hint, sign, and summary-bucket allowlist. |
| [`config/hledger.csv.rules`](config/hledger.csv.rules) | Static adapter-owned CSV conversion rules based on the tested Day 9 rules. |

The transaction header is fixed:

```text
transaction_id,date,payee,description,account,category,tax_hint,amount_usd,cleared,memo
```

Version 1 is intentionally limited to one 2025 USD dataset, `Assets:Checking` as the source account, exact known categories, and cleared synthetic transactions. A second valid CSV may be supplied for the non-mutating `TADD` scenario.

The category map is adapter-owned and immutable in version 1; the CLI does not accept a replacement mapping file. Dry-run mode rejects kept-scratch usage and fails clearly if no hledger executable candidate can be found. Output-file and Markdown-file options are still later-phase work.

## Output

Day 18 commands emit structured JSON for validation, dry-run plans, transaction/account reconciliation, and the executed summary. The verified baseline result reports hledger version `1.52.1`, 19 transactions, 38 postings, 14 accounts, checking balance `8964.77`, and passed reconciliation checks. The baseline plus `TADD` run reports 20 transactions, 40 postings, 14 accounts, checking balance `8939.78`, software cash expenses `263.99`, Schedule C-style cash expenses before mileage `1167.97`, and Schedule C-style net before mileage `9082.03`.

The canonical summary output is versioned JSON. Money is emitted as exact two-decimal strings, not binary floating-point numbers. Raw hledger paths, source positions, indexes, and machine-specific fields are removed.

The baseline demo must produce:

| Measure | Expected value |
|---|---:|
| Transactions | 19 |
| Accounts | 14 |
| Opening checking balance | `1200.00` |
| Ending checking balance | `8964.77` |
| Bookkeeping income-statement revenue | `10327.75` |
| Bookkeeping income-statement expenses | `1512.98` |
| Bookkeeping income-statement net | `8814.77` |
| Schedule C-style gross receipts | `10250.00` |
| Schedule C-style cash expenses before mileage | `1142.98` |
| Schedule C-style net before mileage | `9107.02` |
| Interest income | `77.75` |
| Cash charitable contributions | `370.00` |
| Federal estimated payments tracked | `1050.00` |
| Business miles preserved, not monetized | `78.2` |

hledger's overall income-statement net is not the Schedule C-style result because it also includes interest and charity. The adapter will aggregate only explicitly mapped postings for the Schedule C-style section.

An optional Markdown view may be added after the JSON contract is stable. It will render the normalized JSON and perform no separate calculations.

## Safety Defaults

- Synthetic data only. Custom runs require `--confirm-synthetic`; this is an acknowledgement, not a PII detector.
- Input files are read-only, hashed, validated, and copied into a fresh temporary directory.
- hledger receives only scratch copies and static adapter rules.
- Subprocesses use argument arrays with no shell interpolation.
- Only read-only report commands are permitted.
- Scratch is deleted on success and failure unless `--keep-scratch` is explicit.
- Kept scratch is confined to planned git-ignored storage under `prototype/.scratch/`.
- Output currently goes to standard output.
- Future output-file support must write only new files and never overwrite existing files.
- No user journal, network service, credential, or secret is involved.
- Host-absolute paths are redacted from results and errors.

## Failure Matrix

The Day 19 failure matrix is a standard-library script at [`tests/run_failure_matrix.py`](tests/run_failure_matrix.py). It generates temporary synthetic bad inputs and checks expected structured failures without requiring hledger for preflight cases.

Verified cases:

- Valid fixture validation succeeds.
- Missing synthetic acknowledgement returns `SYNTHETIC_CONFIRMATION_REQUIRED`.
- Malformed dates return `INPUT_DATE_INVALID`.
- Invalid amounts return `INPUT_AMOUNT_INVALID`.
- Unknown categories return `INPUT_CATEGORY_UNKNOWN`.
- Unknown source accounts return `INPUT_ACCOUNT_UNKNOWN`.
- Duplicate transaction IDs return `INPUT_ID_DUPLICATE`.
- Missing transaction files return `INPUT_NOT_FOUND`.
- Tax-hint mismatches return `INPUT_TAX_HINT_MISMATCH`.
- Wrong amount signs return `INPUT_SIGN_INVALID`.
- Context dataset and mileage failures return `CONTEXT_INVALID`.
- Dry-run plus kept scratch returns `DRY_RUN_OPTION_CONFLICT`.
- Missing hledger returns `HLEDGER_NOT_FOUND`.
- Unusable explicit hledger candidates return `HLEDGER_UNUSABLE`.
- The matrix confirms scratch state is unchanged.

## hledger Setup Boundary

The adapter will look for hledger in this order:

1. `--hledger-bin PATH`
2. `HLEDGER_BIN`
3. `hledger` or `hledger.exe` on `PATH`
4. Windows Winget's user-scoped `simonmichael.hledger` package directory

It will run `--version` before reports and record the detected version. The project tested hledger 1.52.1 during Day 9; other versions will be labeled untested and must still pass output-shape and reconciliation checks.

No executable is committed, auto-downloaded, or installed by this project. This workspace has hledger 1.52.1 installed locally with Winget so the plain Day 20 demo command can run live. See [`tool_records/tool_1.md`](../tool_records/tool_1.md) and the [Day 9 workflow evidence](../evidence/commands/07-08-2026_hledger_workflow.txt) for the evaluated setup and behavior.

## Limitations and Licensing

The labels `Schedule C-style`, `Schedule A`, and `Schedule B` describe controlled synthetic bookkeeping groupings. They are not authoritative tax treatment.

The repository's prototype code is covered by the repository's MIT license. hledger is a separate GPL-3.0-or-later program and is not bundled. Redistributing or embedding hledger, or packaging a combined work, requires a specific license-compliance review; this prototype does not make a legal conclusion.

## Prototype Freeze Handoff

Phase 21 completed the freeze review:

- Re-ran the packaged demo entrypoints and confirmed missing hledger still reaches the documented `HLEDGER_NOT_FOUND` boundary when local discovery is disabled.
- Rechecked the failure matrix, compile pass, and execution-lab build.
- Tightened the execution lab layout for desktop and mobile, with the prototype runner, enlarged lifecycle, input table, command interface, and output tables on the homepage.
- Captured the retrospective covering what worked, what failed, what the integration proves, and what remains out of scope.
- Deferred optional Markdown rendering until final report polish.

Next work should draft the report from [`../report/outline.md`](../report/outline.md), the frozen prototype, [`retrospective.md`](retrospective.md), and the detailed Day 20 UI brief at [`day20_project_lab_ui_brief.md`](day20_project_lab_ui_brief.md).
