# hledger Adapter Prototype Design

Day 15 artifact for Phase 15: Prototype Design.

Planned phase date: 07-15-2026. Executed early on 07-11-2026 PDT at user request.

## Decision Summary

The Week 3 prototype will be a small, local Python CLI that wraps hledger's existing CSV, command-line, and JSON surfaces. It will validate synthetic transaction fixtures before hledger sees them, execute read-only reports in an isolated scratch directory, reconcile hledger's output with the validated input, and emit one normalized JSON summary suitable for another application or AI agent.

| Decision | Phase 15 choice |
|---|---|
| Integration shape | Local CLI wrapper over the hledger executable. |
| Runtime | Python 3.11+ using only the standard library. |
| Engine access | Subprocess argument arrays with `shell=False`; no REST server and no hledger-web. |
| Rules strategy | One adapter-owned, committed, static hledger CSV rules file. |
| Classification strategy | One versioned JSON category map; tax hints are exact-validated labels, not classification logic. |
| Canonical output | Versioned JSON with exact decimal strings; optional Markdown derived only from that JSON. |
| State model | Stateless and read-only against inputs; temporary generated files only. |
| Data boundary | Synthetic fixtures only. No real financial or taxpayer data. |
| Tested engine baseline | hledger 1.52.1 from the Day 9 evaluation. |

This decision closes the Day 14 question about generated versus static rules: version 1 will use a static rules file. It will not generate rules or accept an arbitrary user-supplied rules file.

## Goal and Proof

The prototype should prove one narrow claim:

> A thin adapter can turn a controlled synthetic freelancer CSV into reconciled, machine-readable bookkeeping and tax-adjacent facts by driving a real open-source accounting engine.

A successful demo will:

1. Validate one or more synthetic CSV files and an exact category/tax-hint map.
2. Reject unsafe or ambiguous input before hledger is invoked.
3. Run hledger `print`, `balance`, and `incomestatement` reports without mutating a ledger.
4. Reconcile every validated source transaction with hledger JSON.
5. Return normalized transactions, account balances, controlled Schedule C-style totals, other tax-adjacent facts, limitations, warnings, and provenance.

The prototype is bookkeeping-to-summary infrastructure. It is not tax preparation, tax advice, a tax calculator, return validation, form generation, refund calculation, or filing software.

## Scope

### In scope

- Python CLI commands for validation, summarization, and a fixed synthetic demo.
- The canonical 2025 synthetic freelancer transaction fixture.
- An optional second CSV such as the existing `TADD` fixture, merged without changing either source file.
- A committed category map for one USD checking account and the known synthetic categories.
- An optional synthetic context JSON used only for non-transaction facts such as business mileage.
- Exact wrapper checks for columns, dates, amounts, signs, IDs, accounts, categories, tax-hint pairs, context identity, and paths.
- hledger executable discovery, version capture, timeouts, JSON parsing, and output reconciliation.
- Normalized JSON and an optional Markdown view generated from the normalized JSON.
- Tests for the shared Day 8 failures and adapter-specific failures.

### Out of scope

- Real taxpayer, bank, or personally identifiable data.
- Multiple currencies, multiple source accounts, accrual accounting, splits, transfers, or multi-year runs.
- Mutating hledger commands such as `add`, `import`, or `rewrite`.
- User ledgers, arbitrary journal files, arbitrary hledger rules, or hledger configuration files.
- hledger-web, an HTTP service, hosted deployment, authentication, or network calls.
- Automatic hledger download, installation, update, or binary redistribution.
- Mileage-rate selection or mileage-deduction calculation.
- Deductibility decisions, depreciation, capitalization, Schedule C line assignment, tax liability, credits, forms, refunds, or e-file.
- Direct tenforty, Filed Open Tax Engine, or Actual Budget integration in version 1.

## Architecture

```text
synthetic CSV(s) ----+
                     |
category map --------+--> wrapper preflight --> canonical scratch CSV(s)
                     |                              |
optional context ----+                              v
                                           static hledger rules
                                                   |
                                                   v
                                      read-only hledger subprocesses
                                      print / balance / incomestatement
                                                   |
                                                   v
                                         JSON shape checks and
                                      transaction/account reconciliation
                                                   |
                                                   v
                                      normalized JSON --> optional Markdown
```

The wrapper, not hledger, owns the strict input policy. Day 9 showed that hledger rejects bad dates, bad amounts, and missing files, but accepts unknown category accounts and duplicate transaction IDs. Those permissive behaviors are closed in preflight.

### Sources of truth

- The validated CSV is the source of user-facing text fields and source-side metadata.
- The category map is the sole authority for selecting summary buckets and expected amount direction.
- hledger `print -O json` is the authority that the CSV became the expected balanced postings.
- hledger `balance ... -O json` independently confirms the checking balance.
- hledger `incomestatement ... -O json` is a bookkeeping cross-check only.
- The optional context supplies mileage quantity only. Its precomputed money totals never feed the summary.
- Free-text `tax_hint` values are preserved and exact-validated, but never select a bucket or establish tax treatment.

The hledger income-statement net must not be labeled as Schedule C-style net. In the Day 9 baseline it is `8814.77` because it combines interest and charity with business activity. The controlled Schedule C-style result is freelance receipts minus mapped business expenses, or `9107.02`.

## Runtime and Planned Layout

Python 3.11+ is selected because its standard library provides the required CSV, decimal, JSON, subprocess, temporary-directory, hashing, path, and CLI support. The prototype does not need a server framework or third-party runtime dependency. A `pyproject.toml` may provide project metadata, but the module remains runnable from `prototype/` without installation or a packaging backend.

Day 16 and later phases will build toward this layout:

```text
prototype/
  README.md
  design.md
  pyproject.toml
  config/
    category_map.json
    hledger.csv.rules
  hledger_adapter/
    __init__.py
    __main__.py
    cli.py
    errors.py
    hledger.py
    models.py
    summary.py
    validation.py
  tests/
```

The canonical transaction and context fixtures remain under `evidence/fixtures/` so there is only one source copy. The prototype will have its own runtime rules file; it will not depend at runtime on the Day 9 evidence rules file.

## CLI Contract

The planned module interface is:

```text
python -m hledger_adapter validate
  --transactions PATH [--transactions PATH ...]
  [--context PATH]
  --confirm-synthetic

python -m hledger_adapter summarize
  --transactions PATH [--transactions PATH ...]
  [--context PATH]
  [--hledger-bin PATH]
  [--output PATH]
  [--markdown PATH]
  [--dry-run]
  [--keep-scratch]
  --confirm-synthetic

python -m hledger_adapter demo
  [--hledger-bin PATH]
  [--output PATH]
  [--markdown PATH]
  [--keep-scratch]
```

- `--transactions` is repeatable. Files are processed in CLI order and IDs must be unique across the complete run.
- The adapter always loads the committed `prototype/config/category_map.json`; version 1 exposes no mapping override.
- `--context` is optional. The demo supplies the existing synthetic profile so mileage is preserved.
- `--confirm-synthetic` is a required policy acknowledgement for custom validation and summary runs. It is not PII detection, and the adapter cannot reliably detect a real dataset supplied in violation of this policy.
- `demo` uses only the repository's documented synthetic fixtures and therefore does not require the acknowledgement flag.
- `--output` and `--markdown` must name files that do not already exist. Version 1 will not overwrite a file.
- Standard output contains the canonical JSON result. Diagnostics and structured errors go to standard error.

### Validation and dry-run semantics

`validate` performs wrapper-only validation. It does not discover or invoke hledger, create a scratch directory, or write output.

`summarize --dry-run` performs the same preflight, resolves whether a binary candidate is available, and emits a structured execution plan. It does not invoke any process, create scratch files, run reports, or fabricate financial totals.

`summarize --dry-run` rejects `--output`, `--markdown`, and `--keep-scratch` as incompatible usage with exit 2. A missing executable candidate fails with `HLEDGER_NOT_FOUND` and exit 3; callers that only need input validation should use `validate`. Because no process runs, the dry-run engine version is `null` and the version probe appears only in the planned operations.

Normal `summarize` execution is also non-mutating with respect to inputs. Its only writes are temporary copies and explicitly requested new output files.

## Input Contracts

### Transaction CSV version 1

The file must be UTF-8 CSV with this exact header and order:

```text
transaction_id,date,payee,description,account,category,tax_hint,amount_usd,cleared,memo
```

| Field | Version 1 rule |
|---|---|
| `transaction_id` | Required ASCII identifier matching `[A-Z][A-Z0-9._-]{0,63}`; unique across all input files. |
| `date` | Required real calendar date in exact `MM-DD-YYYY` form; year must equal the configured tax year. |
| `payee` | Required non-empty, single-line UTF-8 text, at most 200 characters. |
| `description` | Required non-empty, single-line UTF-8 text, at most 500 characters. |
| `account` | Must exactly equal the configured source account; version 1 permits only `Assets:Checking`. |
| `category` | Must be an exact category-map key. |
| `tax_hint` | Must exactly equal the label allowed for the chosen category. It remains non-authoritative. |
| `amount_usd` | Required signed base-10 value matching `-?(0|[1-9][0-9]*)\.[0-9]{2}`; nonzero with absolute value no greater than `999999999.99`. |
| `cleared` | Version 1 requires lowercase `true`. The static rules do not map clearing status into hledger. |
| `memo` | Optional single-line UTF-8 text, at most 500 characters. |

Additional rules:

- The header may not contain missing, extra, reordered, or duplicate columns.
- Leading or trailing whitespace in identifiers, dates, accounts, categories, hints, booleans, or amounts is rejected rather than silently trimmed.
- NUL, carriage return, and line feed characters are rejected inside values.
- A file is limited to 1 MiB and a complete run to 5,000 transaction rows.
- CSV quoting is handled with Python's standard `csv` module; hand-written comma splitting is prohibited.
- Money is parsed with `Decimal`, never binary floating point.
- Opening balance and income mappings require a positive source amount.
- Business expense, charity, and estimated-payment mappings require a negative source amount.
- The source-side amount is from the checking-account perspective: inflows are positive and outflows are negative.

### Category-map version 1

The adapter-owned committed JSON map has this shape:

```json
{
  "schema_version": "1.0.0",
  "dataset": {
    "id": "synthetic-freelancer-2025-v1",
    "tax_year": 2025,
    "currency": "USD",
    "synthetic_only": true
  },
  "primary_account": "Assets:Checking",
  "engine": {
    "tested_version": "1.52.1"
  },
  "limits": {
    "max_input_rows": 5000,
    "max_input_bytes": 1048576,
    "max_abs_amount_usd": "999999999.99",
    "subprocess_timeout_seconds": 30,
    "max_subprocess_output_bytes": 10485760
  },
  "categories": {
    "Income:Freelance:Design": {
      "summary_bucket": "schedule_c_style.gross_receipts",
      "summary_key": "design",
      "expected_source_sign": "positive",
      "allowed_tax_hints": ["Schedule C gross receipts"]
    }
  }
}
```

Unknown configuration keys and unsupported schema versions are rejected. Version 1 also rejects missing or extra category keys, unknown bucket/key enums, an unsupported primary account, or any semantic difference from the immutable table below. The CLI does not accept a replacement map. The full committed map will contain exactly these category decisions:

| Category | Summary bucket | Key | Source sign | Allowed tax hint |
|---|---|---|---|---|
| `Equity:Opening Balances` | `ledger.opening_balance` | `opening_balance` | positive | `None` |
| `Income:Freelance:Design` | `schedule_c_style.gross_receipts` | `design` | positive | `Schedule C gross receipts` |
| `Income:Freelance:Consulting` | `schedule_c_style.gross_receipts` | `consulting` | positive | `Schedule C gross receipts` |
| `Income:Interest` | `tax_adjacent.interest_income` | `interest` | positive | `Schedule B interest` |
| `Expenses:Business:Software` | `schedule_c_style.cash_expenses` | `software` | negative | `Schedule C software` |
| `Expenses:Business:Office Equipment` | `schedule_c_style.cash_expenses` | `office_equipment` | negative | `Schedule C office equipment` |
| `Expenses:Business:Office Supplies` | `schedule_c_style.cash_expenses` | `office_supplies` | negative | `Schedule C office supplies` |
| `Expenses:Business:Travel` | `schedule_c_style.cash_expenses` | `local_travel` | negative | `Schedule C local travel` |
| `Expenses:Business:Bank Fees` | `schedule_c_style.cash_expenses` | `bank_fees` | negative | `Schedule C bank fees` |
| `Expenses:Business:Professional Education` | `schedule_c_style.cash_expenses` | `professional_education_placeholder` | negative | `Schedule C education placeholder` |
| `Expenses:Business:Coworking` | `schedule_c_style.cash_expenses` | `coworking` | negative | `Schedule C workspace` |
| `Expenses:Charity` | `tax_adjacent.cash_charitable_contributions` | `cash_charity` | negative | `Schedule A cash charity` |
| `Liabilities:Federal Tax:Estimated Payments` | `tax_adjacent.federal_estimated_payments` | `federal_estimated_payments` | negative | `Form 1040 estimated payments` |

These are prototype bookkeeping classifications, not official IRS conclusions. In particular, office equipment and professional education may require facts and treatment that this adapter does not have.

### Optional context JSON

The existing `synthetic_freelancer_tax_profile.json` may be supplied as context. Version 1 reads and validates only:

- `dataset_id`, which must match the map.
- `tax_year`, which must match the map.
- `privacy`, which must equal `synthetic-no-pii-no-real-account-data`.
- `currency`, which must be `USD`.
- `schedule_c_expenses.business_miles`.
- `schedule_c_expenses.mileage_rate_usd`.
- `schedule_c_expenses.mileage_deduction_usd`.

Business miles must be a finite, nonnegative base-10 JSON number. JSON constants such as `NaN` and `Infinity` are rejected, and fractional values are parsed directly as `Decimal`. Both mileage-rate and mileage-deduction fields must be `null` in version 1. The profile's income, expense, payment, and expected-ledger totals are ignored during summary generation. They may be used only as demo test oracles. A supplied mileage quantity is preserved with status `preserved_not_calculated`. The adapter never accepts or selects a rate and never computes a deduction. Without context, mileage is emitted as `not_provided` rather than zero.

### Static hledger rules

Day 16 will commit `prototype/config/hledger.csv.rules` based on the Day 9 tested rules. It fixes:

- The exact ten-column CSV schema.
- `MM-DD-YYYY` dates.
- Transaction code from `transaction_id`.
- The source and category accounts from their validated columns.
- USD as the only commodity.
- Tax hint and memo preservation as comments/tags.

The rules file is copied into scratch for every executed run and its SHA-256 is recorded. The CLI will not expose a `--rules` option.

## hledger Boundary

### Binary discovery

The executable is resolved in this order:

1. `--hledger-bin PATH`.
2. `HLEDGER_BIN`.
3. `hledger` or `hledger.exe` on `PATH`.
4. On Windows, Winget's user-scoped `simonmichael.hledger` package directory.

The candidate must resolve to an executable regular file. Executed runs call `--version` with the same configuration, color, and pager isolation flags used for reports, then capture the complete version string. Version 1.52.1 is the only tested baseline. A different version may continue only if every expected JSON shape and reconciliation invariant passes; the result then includes an `UNTESTED_HLEDGER_VERSION` warning.

The adapter never hardcodes the temporary Day 9 path and never downloads, installs, updates, or bundles hledger.

### Process execution

After preflight, the wrapper creates a fresh temporary directory, copies each validated CSV to a canonical scratch filename, copies the static rules file, removes `LEDGER_FILE` from the child environment, and invokes:

```text
<hledger> --no-conf --color=no --pager=no --rules <scratch-rules> -f <scratch-input-1> [...] print -O json
<hledger> --no-conf --color=no --pager=no --rules <scratch-rules> -f <scratch-input-1> [...] balance --flat -O json
<hledger> --no-conf --color=no --pager=no --rules <scratch-rules> -f <scratch-input-1> [...] incomestatement --depth 3 -O json
```

Requirements:

- Use an argument array and `shell=False`.
- Use the scratch directory as the child working directory.
- Use `--no-conf` and remove `LEDGER_FILE` so host configuration cannot change the selected inputs; disable color and paging.
- Capture standard output and standard error separately as UTF-8.
- Enforce a 30-second timeout per process and a 10 MiB captured-output limit.
- Treat a timeout, nonzero exit, invalid UTF-8, invalid JSON, or unexpected JSON shape as a structured failure.
- Bound backend error excerpts and never echo a full transaction row.
- Never invoke a mutating command.

### Reconciliation

The wrapper must prove:

- Every validated transaction ID appears exactly once in hledger `print` JSON.
- No unexpected hledger transaction appears.
- Each transaction has the expected date and exactly two regular USD postings.
- Each posting and account-balance row contains exactly one USD amount object.
- One posting uses the configured source account and equals the source amount.
- One posting uses the mapped category and is equal and opposite.
- Both postings have no cost conversion and sum exactly to zero.
- hledger's checking balance equals the exact sum of source-account postings.
- For each mapped category present in the current inputs, its ledger balance equals the negative sum of source amounts assigned to that category; semantic summary totals expose nonnegative magnitudes.
- Controlled bucket totals derived from reconciled postings equal the same totals derived from category balances.
- All accounts implied by the current input rows, and no unknown accounts, appear. Unused map entries are not required to appear.
- For the baseline fixture, the bookkeeping income-statement cross-check is revenue `10327.75`, expenses `1512.98`, and net `8814.77`.

hledger amount objects are decoded from `decimalMantissa` and `decimalPlaces`. The adapter must not consume the convenience `floatingPoint` field. Absolute `sourceName` paths, internal indexes, raw source positions, and machine-specific paths are removed from normalized output.

## Output Contract

### Conventions

- `schema_version` begins at `1.0.0`.
- `dataset.currency` is the string `USD`.
- Every money value is a signed or nonnegative fixed two-decimal JSON string.
- Checking and account balances preserve ledger sign.
- Source transaction amounts preserve checking-account sign.
- Gross receipts, expense summaries, charity, interest, and payment-tracking totals are nonnegative magnitudes.
- Mileage is a decimal string with unit `mile`.
- No host-absolute path is emitted.
- No timestamp is required for the canonical financial result, keeping it deterministic.

### Representative executed result

```json
{
  "schema_version": "1.0.0",
  "status": "ok",
  "mode": "executed",
  "adapter": {
    "name": "hledger_adapter",
    "version": "0.1.0"
  },
  "dataset": {
    "id": "synthetic-freelancer-2025-v1",
    "tax_year": 2025,
    "currency": "USD",
    "synthetic_data_acknowledged": true
  },
  "engine": {
    "name": "hledger",
    "version": "hledger 1.52.1-g3834a163b-20260428, windows-x86_64"
  },
  "counts": {
    "input_files": 1,
    "transactions": 19,
    "accounts": 14
  },
  "transactions": [
    {
      "id": "T001",
      "date": "2025-01-15",
      "payee": "Acme Design Co",
      "description": "Freelance design project payment",
      "source_account": "Assets:Checking",
      "category": "Income:Freelance:Design",
      "source_amount": "2500.00",
      "tax_hint": "Schedule C gross receipts",
      "source_cleared": true,
      "memo": "Synthetic client income"
    }
  ],
  "accounts": [
    {
      "name": "Assets:Checking",
      "ledger_balance": "8964.77"
    }
  ],
  "summary": {
    "opening_balance": "1200.00",
    "checking_balance": "8964.77",
    "bookkeeping_income_statement": {
      "revenue": "10327.75",
      "expenses": "1512.98",
      "net": "8814.77",
      "equivalent_to_schedule_c_style": false
    },
    "schedule_c_style": {
      "tax_treatment_authoritative": false,
      "gross_receipts": "10250.00",
      "cash_expenses_by_category": {
        "bank_fees": "12.00",
        "coworking": "210.00",
        "local_travel": "38.75",
        "office_equipment": "320.00",
        "office_supplies": "74.23",
        "professional_education_placeholder": "249.00",
        "software": "239.00"
      },
      "cash_expenses_before_mileage": "1142.98",
      "net_before_mileage": "9107.02"
    },
    "tax_adjacent": {
      "interest_income": "77.75",
      "cash_charitable_contributions": "370.00",
      "federal_estimated_tax_payments_tracked": "1050.00"
    }
  },
  "unmapped_tax_facts": [
    {
      "code": "BUSINESS_MILEAGE",
      "value": "78.2",
      "unit": "mile",
      "status": "preserved_not_calculated",
      "deduction_usd": null
    },
    {
      "code": "CHARITY_TREATMENT",
      "amount": "370.00",
      "status": "summarized_no_deductibility_decision"
    },
    {
      "code": "ESTIMATED_PAYMENT_TREATMENT",
      "amount": "1050.00",
      "status": "summarized_no_tax_liability_or_refund"
    }
  ],
  "unsupported_capabilities": [
    "tax_liability_calculation",
    "deductibility_determination",
    "form_1040_generation",
    "schedule_generation",
    "refund_calculation",
    "return_validation",
    "efile_submission"
  ],
  "warnings": [
    {
      "code": "NOT_TAX_CALCULATION",
      "message": "Results are bookkeeping summaries and non-authoritative tax-adjacent labels."
    },
    {
      "code": "TAX_HINTS_NON_AUTHORITATIVE",
      "message": "Tax hints are controlled synthetic labels, not tax treatment."
    }
  ],
  "provenance": {
    "inputs": [
      {
        "name": "synthetic_freelancer_transactions.csv",
        "sha256": "<sha256>"
      }
    ],
    "context": {
      "name": "synthetic_freelancer_tax_profile.json",
      "sha256": "<sha256>"
    },
    "mapping_sha256": "<sha256>",
    "rules_sha256": "<sha256>",
    "engine_operations": [
      "print_json",
      "account_balances_json",
      "income_statement_json"
    ]
  }
}
```

The complete output contains all transactions and all account balances; the example is abbreviated. The hledger bookkeeping income statement is a separate cross-check, and its net is never substituted for `schedule_c_style.net_before_mileage`.

### Dry-run result

A successful dry run emits `status: ok` and `mode: dry_run` with validated file counts, hashes, an available binary candidate, `engine.version: null`, and planned symbolic operations including the version probe. It omits `transactions`, `accounts`, and `summary` because no engine result exists. Missing binary discovery is a structured exit-3 failure rather than a successful plan.

### Structured errors and exit codes

Failures are emitted as bounded JSON on standard error:

```json
{
  "schema_version": "1.0.0",
  "status": "error",
  "error": {
    "code": "INPUT_ID_DUPLICATE",
    "message": "Transaction ID must be unique across all input files.",
    "file": "hledger_duplicate_t001.csv",
    "row": 2,
    "field": "transaction_id"
  }
}
```

| Exit code | Meaning |
|---:|---|
| 0 | Validation, dry run, or summary succeeded. |
| 1 | Unexpected internal failure. |
| 2 | CLI, configuration, input, mapping, context, or policy validation failure. |
| 3 | hledger missing, unusable, or version probe failed. |
| 4 | hledger timeout/failure, invalid engine JSON, or reconciliation/invariant failure. |
| 5 | Requested output could not be written atomically. |

Stable error codes will include `INPUT_NOT_FOUND`, `INPUT_SCHEMA_INVALID`, `INPUT_DATE_INVALID`, `INPUT_AMOUNT_INVALID`, `INPUT_ID_DUPLICATE`, `INPUT_ACCOUNT_UNKNOWN`, `INPUT_CATEGORY_UNKNOWN`, `INPUT_TAX_HINT_MISMATCH`, `INPUT_SIGN_INVALID`, `CONTEXT_INVALID`, `SYNTHETIC_CONFIRMATION_REQUIRED`, `HLEDGER_NOT_FOUND`, `HLEDGER_UNUSABLE`, `HLEDGER_TIMEOUT`, `HLEDGER_EXECUTION_FAILED`, `HLEDGER_JSON_INVALID`, `ENGINE_OUTPUT_SCHEMA_MISMATCH`, `ACCOUNTING_INVARIANT_FAILED`, `OUTPUT_EXISTS`, and `OUTPUT_WRITE_FAILED`.

### Optional Markdown

JSON is canonical. The optional Markdown report is rendered only from an already validated normalized JSON object and performs no independent calculations. It contains:

1. A prominent bookkeeping-only and synthetic-data warning.
2. Dataset, adapter, and hledger versions.
3. Checking balance and controlled summary tables.
4. Unmapped facts and unsupported capabilities.
5. Input, mapping, and rules hashes.

Markdown rendering is deferred after the Day 21 freeze. It can be added during report polish if it helps presentation, but JSON remains the canonical integration contract.

## Day 20 Project Execution Lab UI

Day 20 adds a Vercel-ready web application, but the target is not a conventional dashboard. It should behave like a responsive project execution lab for the internship work.

Core requirements:

- Show the synthetic prototype workflow as the first screen: validation, hledger discovery, version probe, scratch setup, report execution, reconciliation, summary aggregation, failure matrix, cleanup, and output excerpts.
- Include an `about` and `why` layer that explains the research question, hledger target choice, synthetic-data boundary, adapter architecture, safety matrix, and the role of each major artifact.
- Generate or load a read-only project manifest that groups changelog, notes, evidence, prototype files/output, research, tool records, report/deck state, and README files without host-absolute paths.
- Support local live mode, where a developer can run the pinned synthetic demo and failure matrix from the UI.
- Support Vercel replay mode, where committed command evidence is animated as a verified run when hledger cannot execute in the deployed environment.
- Show Git contribution flow as part of the app: branch, run checks, commit, push, and review.
- Use project-specific engineering copy and real artifact names. Avoid generic filler, prompt-related wording, and unrelated marketing content.

The detailed UI brief is `prototype/day20_project_lab_ui_brief.md`.

Day 20 implementation lives under `prototype/execution_lab/`. It generates `data/project-manifest.json` and `public/project-manifest.json` from repository files, serves a local Node API route for `prototype/run_day20_demo.py`, and falls back to verified replay from committed command evidence when deployed where hledger cannot execute. The Day 21 freeze pass keeps the homepage focused on live prototype testing, moves project details into tabs, and keeps the manifest limited to repo-relative paths, hashes, synthetic input previews, and changelog summaries.

## Safety Defaults

- Custom commands require an explicit synthetic-data acknowledgement; the demo is pinned to documented synthetic fixtures.
- Real data is unsupported and prohibited by project policy. The adapter does not claim it can detect PII, prove that arbitrary content is synthetic, or prevent a user from violating that policy.
- All hledger data operations are read-only reports.
- The adapter never accepts or modifies a user journal.
- Input files are opened read-only, hashed before execution, and checked again after execution.
- hledger receives canonical scratch copies, not the original input paths.
- Every execution uses a fresh temporary directory.
- Scratch is deleted on success and failure by default.
- `--keep-scratch` is explicit and stores only under `prototype/.scratch/<run-id>/`, which Day 16 will git-ignore.
- Raw hledger output remains in scratch and is not copied into normalized JSON.
- Output defaults to standard output.
- A requested output file is written atomically and only when the destination does not exist.
- No shell interpolation, network access, auto-install, secret, credential, or external service is used.
- Host paths and hledger source positions are redacted from normalized results and bounded errors.

## Failure-Test Plan

The first five rows mirror the shared Day 8 checklist.

| Case | Expected adapter result | hledger data command allowed? |
|---|---|---:|
| Malformed date `13-40-2025` | `INPUT_DATE_INVALID`, exit 2, field and row identified. | no |
| Invalid amount `not-a-number` | `INPUT_AMOUNT_INVALID`, exit 2. | no |
| Unknown category | `INPUT_CATEGORY_UNKNOWN`, exit 2. | no |
| Missing input file | `INPUT_NOT_FOUND`, exit 2. | no |
| Duplicate `T001` | `INPUT_ID_DUPLICATE`, exit 2. | no |
| Tax hint/category mismatch | `INPUT_TAX_HINT_MISMATCH`, exit 2. | no |
| Wrong amount sign | `INPUT_SIGN_INVALID`, exit 2. | no |
| Context identity mismatch, invalid/non-finite/negative mileage, or non-null mileage rate/deduction | `CONTEXT_INVALID`, exit 2. | no |
| Missing synthetic acknowledgement | `SYNTHETIC_CONFIRMATION_REQUIRED`, exit 2. | no |
| Missing or unusable hledger | `HLEDGER_NOT_FOUND` or `HLEDGER_UNUSABLE`, exit 3. | no |
| hledger timeout or nonzero exit | Bounded engine error, exit 4. | attempted |
| Malformed or changed hledger JSON | JSON/schema error, exit 4. | attempted |
| Missing, duplicate, extra, unbalanced, or non-USD engine posting | Reconciliation error, exit 4. | attempted |
| Existing output path | `OUTPUT_EXISTS`, exit 5; existing file unchanged. | no |
| Dry run | Valid plan, no subprocess, scratch, or output file. | no |
| Dry run plus output/Markdown/kept-scratch option | CLI usage error, exit 2. | no |
| Shell-shaped text in payee/memo | Remains data in a CSV file; never becomes a command argument or shell expression. | yes after validation |

Tests should inject a fake process runner for timeouts, nonzero exits, malformed JSON, and unexpected schemas rather than depending on a broken real binary.

## Acceptance Criteria

### Baseline demo

- 19 unique transactions reconcile to 38 balanced USD postings.
- 14 accounts are present.
- Opening checking balance: `1200.00`.
- Ending checking balance: `8964.77`.
- Bookkeeping income-statement revenue, expenses, and net: `10327.75`, `1512.98`, and `8814.77`.
- Schedule C-style gross receipts: `10250.00`.
- Schedule C-style cash expenses before mileage: `1142.98`.
- Schedule C-style net before mileage: `9107.02`.
- Interest income: `77.75`.
- Cash charitable contributions: `370.00`.
- Federal estimated payments tracked: `1050.00`.
- Business miles: `78.2` preserved from context, with no deduction calculated.

### Baseline plus `TADD`

- 20 unique transactions reconcile.
- Ending checking balance: `8939.78`.
- Software cash expenses: `263.99`.
- Schedule C-style cash expenses before mileage: `1167.97`.
- Schedule C-style net before mileage: `9082.03`.

### Safety and repeatability

- Input and rules hashes are unchanged after execution.
- Default runs leave no scratch directory or other persistent state.
- No raw absolute path appears in canonical JSON.
- Repeated runs produce identical normalized financial content.
- Every shared bad fixture fails before a hledger report call.
- A missing context yields mileage status `not_provided`, never a fabricated zero or deduction.

## Licensing and Distribution Boundary

The repository's prototype source is covered by the repository's MIT license. hledger is a separate GPL-3.0-or-later program and is not included in this repository. Users must provide their own hledger executable.

This prototype invokes an unmodified executable as a separate process. That fact does not by itself establish a complete legal conclusion about every packaging or distribution model. Bundling the hledger binary, embedding hledger code, distributing a combined package, or offering a service around it requires a specific GPL compliance review. The prototype will document the boundary and avoid binary redistribution; it will not offer legal advice.

## Phase Boundaries and Fallback

| Phase | Planned slice |
|---|---|
| Day 15 | Freeze this architecture, schema, safety, error, test, and README contract. |
| Day 16 | Scaffold the Python package, commit config/rules, load configuration, discover/version hledger, expose CLI help, and complete a real smoke call. |
| Day 17 | Implement strict CSV validation, multi-file loading, transaction normalization, account listing, and reconciliation. |
| Day 18 | Implement controlled bucket aggregation and the canonical JSON summary. |
| Day 19 | Implement stable failures and the shared plus adapter-specific test matrix. |
| Day 20 | Finish one-command demo, setup instructions, sample output, and a Vercel-ready project execution lab UI with live local execution, verified replay, generated artifact/why manifests, and Git contribution guidance. |
| Day 21 | Freeze the prototype, fix blocker-level execution-lab layout issues, record the retrospective, and update implementation lessons. |

Actual Budget remains a contingency, not a second implementation. Switch only if the real hledger version/smoke call remains blocked after Day 16's safe setup attempts. If a switch is required, preserve this normalized output contract and document the reason before writing backup code.
