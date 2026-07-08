import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');
const fixturesDir = path.join(repoRoot, 'evidence', 'fixtures');
const csvPath = path.join(fixturesDir, 'synthetic_freelancer_transactions.csv');
const profilePath = path.join(fixturesDir, 'synthetic_freelancer_tax_profile.json');
const summaryPath = path.join(fixturesDir, 'firefly_day11_summary.json');
const transactionsPath = path.join(fixturesDir, 'firefly_day11_transactions_after_add.json');
const failurePath = path.join(fixturesDir, 'firefly_day11_failure_results.json');

const baseUrl = (process.env.FIREFLY_BASE_URL || 'http://127.0.0.1:18080/api/v1').replace(/\/$/, '');
const token = process.env.FIREFLY_TOKEN;

if (!token) {
  throw new Error('FIREFLY_TOKEN is required and is intentionally not stored in this repository.');
}

class ApiError extends Error {
  constructor(method, endpoint, status, body) {
    super(`${method} ${endpoint} returned HTTP ${status}`);
    this.method = method;
    this.endpoint = endpoint;
    this.status = status;
    this.body = body;
  }
}

async function api(method, endpoint, body = undefined, query = undefined) {
  const url = new URL(`${baseUrl}${endpoint}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (Array.isArray(value)) {
        for (const item of value) url.searchParams.append(key, item);
      } else if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    }
  }

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.api+json, application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let parsed = null;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }

  if (!response.ok) {
    throw new ApiError(method, endpoint, response.status, parsed);
  }

  return parsed;
}

function parseCsvLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current);
  return fields;
}

async function readCsv(filePath) {
  const text = await fs.readFile(filePath, 'utf8');
  const [headerLine, ...lines] = text.trim().split(/\r?\n/);
  const headers = parseCsvLine(headerLine);
  return lines.filter(Boolean).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

function toCents(value) {
  const text = String(value).trim();
  const sign = text.startsWith('-') ? -1 : 1;
  const normalized = text.replace(/^[+-]/, '');
  const [wholeRaw, decimalRaw = ''] = normalized.split('.');
  const whole = Number.parseInt(wholeRaw || '0', 10);
  const decimal = Number.parseInt(decimalRaw.padEnd(2, '0').slice(0, 2), 10);
  if (Number.isNaN(whole) || Number.isNaN(decimal)) {
    throw new Error(`Invalid amount: ${value}`);
  }
  return sign * (whole * 100 + decimal);
}

function centsToAmount(cents) {
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  return `${sign}${Math.floor(abs / 100)}.${String(abs % 100).padStart(2, '0')}`;
}

function dateToIso(date) {
  const [mm, dd, yyyy] = date.split('-');
  return `${yyyy}-${mm}-${dd}T00:00:00+00:00`;
}

function dateToYmd(date) {
  const [mm, dd, yyyy] = date.split('-');
  return `${yyyy}-${mm}-${dd}`;
}

function rowFromAddTest(addTest) {
  return {
    transaction_id: addTest.transaction_id,
    date: addTest.date,
    payee: addTest.payee,
    description: addTest.description,
    account: addTest.account,
    category: addTest.category,
    tax_hint: addTest.tax_hint,
    amount_usd: String(addTest.amount_usd),
    cleared: 'true',
    memo: 'Standard Day 11 add-transaction test',
  };
}

function transactionPayload(row, checkingAccountId, overrides = {}) {
  const cents = toCents(overrides.amount_usd ?? row.amount_usd);
  const absAmount = centsToAmount(Math.abs(cents));
  const isDeposit = cents > 0;
  const transactionId = overrides.transaction_id ?? row.transaction_id;
  const category = overrides.category ?? row.category;
  const taxHint = overrides.tax_hint ?? row.tax_hint;
  const date = overrides.date ?? row.date;
  const description = overrides.description ?? row.description;
  const payee = overrides.payee ?? row.payee;

  const split = {
    type: isDeposit ? 'deposit' : 'withdrawal',
    date: date.includes('T') ? date : dateToIso(date),
    amount: absAmount,
    description: `${payee} - ${description}`,
    currency_code: 'USD',
    category_name: category,
    notes: `${transactionId} | ${taxHint} | ${row.memo || ''}`.trim(),
    tags: [`tax:${taxHint}`, `synthetic-id:${transactionId}`],
    external_id: `synthetic-freelancer-2025-v1:${transactionId}`,
    reconciled: String(row.cleared).toLowerCase() === 'true',
  };

  if (isDeposit) {
    split.source_name = `Revenue: ${category}`;
    split.destination_id = String(checkingAccountId);
  } else {
    split.source_id = String(checkingAccountId);
    split.destination_name = payee;
  }

  return {
    error_if_duplicate_hash: true,
    apply_rules: false,
    fire_webhooks: false,
    transactions: [split],
  };
}

function accountBalance(accountResponse) {
  const attrs = accountResponse?.data?.attributes ?? {};
  return attrs.current_balance ?? attrs.current_balance_amount ?? attrs.balance ?? null;
}

function externalTransactionId(split) {
  if (split.external_id?.includes(':')) return split.external_id.split(':').pop();
  const noteMatch = String(split.notes ?? '').match(/\b(T[A-Z0-9]+)\b/);
  return noteMatch?.[1] ?? null;
}

function flattenTransactions(transactionResponse) {
  const groups = Array.isArray(transactionResponse?.data) ? transactionResponse.data : [];
  return groups.flatMap((group) => {
    const splits = group.attributes?.transactions ?? [];
    return splits.map((split) => ({
      group_id: group.id,
      transaction_journal_id: split.transaction_journal_id ?? null,
      transaction_id: externalTransactionId(split),
      type: split.type,
      date: split.date,
      amount: split.amount,
      description: split.description,
      source_name: split.source_name,
      destination_name: split.destination_name,
      category_name: split.category_name ?? null,
      tags: split.tags ?? [],
      notes: split.notes ?? null,
      external_id: split.external_id ?? null,
    }));
  });
}

async function listAllTransactions() {
  const all = [];
  for (let page = 1; page < 10; page += 1) {
    const response = await api('GET', '/transactions', undefined, {
      start: '2025-01-01',
      end: '2025-12-31',
      limit: '100',
      page: String(page),
    });
    all.push(...flattenTransactions(response));
    if (!response?.links?.next) break;
  }
  return all;
}

function comparableTotals(rows, checkingBalance) {
  const syntheticRows = rows.filter((row) => row.transaction_id);
  const scheduleCIncome = syntheticRows
    .filter((row) => row.type === 'deposit' && row.category_name?.startsWith('Income:Freelance:'))
    .reduce((sum, row) => sum + toCents(row.amount), 0);
  const interestIncome = syntheticRows
    .filter((row) => row.type === 'deposit' && row.category_name === 'Income:Interest')
    .reduce((sum, row) => sum + toCents(row.amount), 0);
  const scheduleCExpenses = syntheticRows
    .filter((row) => row.type === 'withdrawal' && row.category_name?.startsWith('Expenses:Business:'))
    .reduce((sum, row) => sum + toCents(row.amount), 0);
  const charity = syntheticRows
    .filter((row) => row.category_name === 'Expenses:Charity')
    .reduce((sum, row) => sum + toCents(row.amount), 0);
  const estimatedTax = syntheticRows
    .filter((row) => row.category_name === 'Liabilities:Federal Tax:Estimated Payments')
    .reduce((sum, row) => sum + toCents(row.amount), 0);

  return {
    transaction_count_with_synthetic_ids: syntheticRows.length,
    checking_balance: checkingBalance,
    freelance_gross_receipts: centsToAmount(scheduleCIncome),
    interest_income: centsToAmount(interestIncome),
    schedule_c_cash_expenses_before_mileage: centsToAmount(scheduleCExpenses),
    schedule_c_net_before_mileage: centsToAmount(scheduleCIncome - scheduleCExpenses),
    cash_charitable_contributions: centsToAmount(charity),
    federal_estimated_tax_payments: centsToAmount(estimatedTax),
  };
}

async function createCategory(name) {
  return api('POST', '/categories', {
    name,
    notes: 'Synthetic Day 11 Firefly III evaluation category.',
  });
}

async function runWorkflow() {
  console.log('Firefly III Day 11 workflow start');
  const transactions = await readCsv(csvPath);
  const profile = JSON.parse(await fs.readFile(profilePath, 'utf8'));
  const addRow = rowFromAddTest(profile.standard_add_transaction_test);
  const opening = transactions.find((row) => row.transaction_id === 'T000');
  const baselineRows = transactions.filter((row) => row.transaction_id !== 'T000');

  const about = await api('GET', '/about');
  console.log(`about: version=${about.data.version}, api=${about.data.api_version}, driver=${about.data.driver}`);

  const checking = await api('POST', '/accounts', {
    name: 'Synthetic Checking (Day 11 Firefly III)',
    type: 'asset',
    account_role: 'defaultAsset',
    currency_code: 'USD',
    opening_balance: centsToAmount(toCents(opening.amount_usd)),
    opening_balance_date: dateToIso(opening.date),
    include_net_worth: true,
    notes: 'Synthetic-no-PII Day 11 Firefly III evaluation account.',
  });
  const checkingAccountId = checking.data.id;
  console.log(`created checking account id=${checkingAccountId}`);

  const categoryNames = [...new Set([...baselineRows, addRow].map((row) => row.category))];
  const categoryResults = [];
  for (const categoryName of categoryNames) {
    categoryResults.push(await createCategory(categoryName));
  }
  console.log(`created categories=${categoryResults.length}`);

  const baselineCreateResults = [];
  for (const row of baselineRows) {
    baselineCreateResults.push(await api('POST', '/transactions', transactionPayload(row, checkingAccountId)));
  }
  console.log(`posted baseline API transactions=${baselineCreateResults.length}`);

  const baselineAccount = await api('GET', `/accounts/${checkingAccountId}`);
  const baselineTransactions = await listAllTransactions();
  const baselineTotals = comparableTotals(baselineTransactions, accountBalance(baselineAccount));
  console.log(`baseline balance=${baselineTotals.checking_balance}`);

  const expenseInsightBaseline = await api('GET', '/insight/expense/category', undefined, {
    start: '2025-01-01',
    end: '2025-12-31',
    'accounts[]': [String(checkingAccountId)],
  });
  const incomeInsightBaseline = await api('GET', '/insight/income/category', undefined, {
    start: '2025-01-01',
    end: '2025-12-31',
    'accounts[]': [String(checkingAccountId)],
  });

  const addResult = await api('POST', '/transactions', transactionPayload(addRow, checkingAccountId));
  console.log(`posted add transaction=${addRow.transaction_id}, group=${addResult.data.id}`);

  const afterAddAccount = await api('GET', `/accounts/${checkingAccountId}`);
  const afterAddTransactions = await listAllTransactions();
  const afterAddTotals = comparableTotals(afterAddTransactions, accountBalance(afterAddAccount));
  console.log(`after-add balance=${afterAddTotals.checking_balance}`);

  const expenseInsightAfterAdd = await api('GET', '/insight/expense/category', undefined, {
    start: '2025-01-01',
    end: '2025-12-31',
    'accounts[]': [String(checkingAccountId)],
  });
  const incomeInsightAfterAdd = await api('GET', '/insight/income/category', undefined, {
    start: '2025-01-01',
    end: '2025-12-31',
    'accounts[]': [String(checkingAccountId)],
  });

  await fs.writeFile(transactionsPath, `${JSON.stringify(afterAddTransactions, null, 2)}\n`);

  const summary = {
    evaluated_at: new Date().toISOString(),
    tool: 'Firefly III',
    base_url: baseUrl,
    about: about.data,
    dataset_id: profile.dataset_id,
    mapping_notes: [
      'The asset account was created with Firefly account opening_balance for T000.',
      'Each non-opening CSV row was posted to /api/v1/transactions as one deposit or withdrawal split.',
      'Original CSV categories were stored as Firefly category_name values; tax hints were stored in notes and tags.',
      'Firefly creates revenue/expense counterpart accounts from source_name or destination_name during transaction posting.',
    ],
    created: {
      checking_account_id: checkingAccountId,
      category_count: categoryResults.length,
      baseline_transaction_posts: baselineCreateResults.length,
      add_transaction_group_id: addResult.data.id,
    },
    expected: {
      baseline_ending_checking_balance: centsToAmount(toCents(profile.expected_ledger_totals.ending_checking_balance)),
      after_add_ending_checking_balance: centsToAmount(toCents(profile.standard_add_transaction_test.expected_ending_checking_balance_after_add)),
      baseline_schedule_c_cash_expenses_before_mileage: centsToAmount(toCents(profile.schedule_c_expenses.total_cash_expenses_before_mileage)),
      after_add_schedule_c_cash_expenses_before_mileage: centsToAmount(toCents(profile.standard_add_transaction_test.expected_schedule_c_cash_expenses_after_add)),
      baseline_schedule_c_net_before_mileage: centsToAmount(toCents(profile.expected_ledger_totals.schedule_c_net_before_mileage)),
      after_add_schedule_c_net_before_mileage: centsToAmount(toCents(profile.standard_add_transaction_test.expected_schedule_c_net_before_mileage_after_add)),
    },
    baseline: {
      firefly_transaction_rows_exported: baselineTransactions.length,
      totals: baselineTotals,
      insights: {
        expense_by_category: expenseInsightBaseline,
        income_by_category: incomeInsightBaseline,
      },
    },
    after_add: {
      firefly_transaction_rows_exported: afterAddTransactions.length,
      totals: afterAddTotals,
      insights: {
        expense_by_category: expenseInsightAfterAdd,
        income_by_category: incomeInsightAfterAdd,
      },
    },
    output_files: {
      normalized_transactions_after_add: path.relative(repoRoot, transactionsPath).replaceAll(path.sep, '/'),
      summary: path.relative(repoRoot, summaryPath).replaceAll(path.sep, '/'),
    },
  };

  await fs.writeFile(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);
  console.log(`wrote ${path.relative(repoRoot, summaryPath)}`);
  console.log(`wrote ${path.relative(repoRoot, transactionsPath)}`);
}

function errorSummary(error) {
  if (error instanceof ApiError) {
    return {
      accepted: false,
      http_status: error.status,
      message: error.body?.message ?? error.message,
      errors: error.body?.errors ?? null,
      body_type: typeof error.body,
    };
  }
  return {
    accepted: false,
    message: error.message,
    code: error.code ?? null,
  };
}

async function attempt(name, fn) {
  try {
    const result = await fn();
    return {
      name,
      accepted: true,
      http_status: 200,
      response_id: result?.data?.id ?? null,
      response_type: result?.data?.type ?? null,
    };
  } catch (error) {
    return { name, ...errorSummary(error) };
  }
}

async function runFailureTests() {
  console.log('Firefly III Day 11 failure tests start');
  const transactions = await readCsv(csvPath);
  const profile = JSON.parse(await fs.readFile(profilePath, 'utf8'));
  const summary = JSON.parse(await fs.readFile(summaryPath, 'utf8'));
  const checkingAccountId = summary.created.checking_account_id;
  const t001 = transactions.find((row) => row.transaction_id === 'T001');
  const addRow = rowFromAddTest(profile.standard_add_transaction_test);

  const tests = [];
  tests.push(await attempt('malformed_date', () => api(
    'POST',
    '/transactions',
    transactionPayload(addRow, checkingAccountId, {
      transaction_id: 'FAIL-BAD-DATE',
      date: profile.failure_test_inputs.malformed_date,
      description: 'Malformed date failure test',
    }),
  )));
  tests.push(await attempt('invalid_amount', () => {
    const payload = transactionPayload(addRow, checkingAccountId, {
      transaction_id: 'FAIL-BAD-AMOUNT',
      description: 'Invalid amount failure test',
    });
    payload.transactions[0].amount = profile.failure_test_inputs.invalid_amount;
    return api('POST', '/transactions', payload);
  }));
  tests.push(await attempt('unknown_category', () => api(
    'POST',
    '/transactions',
    transactionPayload(addRow, checkingAccountId, {
      transaction_id: 'FAIL-UNKNOWN-CAT',
      category: profile.failure_test_inputs.unknown_account_or_category,
      amount_usd: '-10.00',
      description: 'Unknown category behavior test',
    }),
  )));
  tests.push(await attempt('duplicate_transaction_id', () => api(
    'POST',
    '/transactions',
    transactionPayload(t001, checkingAccountId),
  )));
  tests.push(await attempt('missing_input_file', async () => {
    await fs.readFile(path.join(repoRoot, profile.failure_test_inputs.missing_input_file), 'utf8');
    return { data: { id: 'unexpected' } };
  }));

  const categoriesAfter = await api('GET', '/categories', undefined, { limit: '100' });
  const result = {
    evaluated_at: new Date().toISOString(),
    tool: 'Firefly III',
    tests,
    categories_after_failure_tests: (categoriesAfter.data ?? []).map((entry) => ({
      id: entry.id,
      name: entry.attributes?.name,
    })),
    notes: [
      'The unknown-category test is intentionally allowed to mutate the scratch instance if Firefly auto-creates the category.',
      'The main workflow summary and transaction export were written before failure tests were run.',
    ],
  };

  await fs.writeFile(failurePath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(`wrote ${path.relative(repoRoot, failurePath)}`);
  for (const test of tests) {
    console.log(`${test.name}: accepted=${test.accepted}; status=${test.http_status ?? test.code ?? 'n/a'}; message=${test.message ?? test.response_id ?? ''}`);
  }
}

const mode = process.argv[2] ?? 'workflow';
if (mode === 'workflow') {
  await runWorkflow();
} else if (mode === 'failure-tests') {
  await runFailureTests();
} else {
  throw new Error(`Unknown mode: ${mode}`);
}
