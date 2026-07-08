import fs from 'node:fs';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';

import * as actual from '@actual-app/api';

// Run from the repository root, with this file copied into a directory where
// @actual-app/api is installed. The Day 10 command transcript shows that setup.
const require = createRequire(import.meta.url);
const repoRoot = process.cwd();
const csvPath = path.join(repoRoot, 'evidence', 'fixtures', 'synthetic_freelancer_transactions.csv');
const profilePath = path.join(repoRoot, 'evidence', 'fixtures', 'synthetic_freelancer_tax_profile.json');
const outDir = path.join(repoRoot, 'evidence', 'fixtures');
const dataDir = path.join(os.tmpdir(), 'actual-day10-data');
const budgetName = 'Synthetic Freelancer Day 10';

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines.shift().split(',');
  return lines.map(line => {
    const values = line.split(',');
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });
}

function toIsoDate(mmddyyyy) {
  const [month, day, year] = mmddyyyy.split('-');
  if (!month || !day || !year || month.length !== 2 || day.length !== 2 || year.length !== 4) {
    throw new Error(`Invalid fixture date: ${mmddyyyy}`);
  }
  return `${year}-${month}-${day}`;
}

function toCents(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid fixture amount: ${value}`);
  }
  return Math.round(parsed * 100);
}

function roundDollars(cents) {
  return Math.round(cents) / 100;
}

function categoryGroupName(categoryPath) {
  const parts = categoryPath.split(':');
  return parts[0] === 'Income' ? 'Income' : parts.slice(0, 2).join(':');
}

function categoryLeafName(categoryPath) {
  const parts = categoryPath.split(':');
  return parts[parts.length - 1];
}

function summarize(transactions, categoryNamesById) {
  const rows = transactions.filter(transaction => !transaction.is_parent && !transaction.is_child);
  const summary = {
    transactionCount: rows.length,
    checkingBalanceCents: rows.reduce((sum, row) => sum + row.amount, 0),
    checkingBalanceDollars: 0,
    freelanceGrossReceiptsCents: 0,
    interestIncomeCents: 0,
    scheduleCExpenseCents: 0,
    charityExpenseCents: 0,
    estimatedTaxPaymentsCents: 0,
    byCategory: {},
  };

  for (const row of rows) {
    const category = categoryNamesById.get(row.category) ?? '(uncategorized)';
    summary.byCategory[category] = (summary.byCategory[category] ?? 0) + row.amount;

    if (category.startsWith('Income:Freelance')) {
      summary.freelanceGrossReceiptsCents += row.amount;
    } else if (category === 'Income:Interest') {
      summary.interestIncomeCents += row.amount;
    } else if (category.startsWith('Expenses:Business')) {
      summary.scheduleCExpenseCents += Math.abs(row.amount);
    } else if (category === 'Expenses:Charity') {
      summary.charityExpenseCents += Math.abs(row.amount);
    } else if (category === 'Liabilities:Federal Tax:Estimated Payments') {
      summary.estimatedTaxPaymentsCents += Math.abs(row.amount);
    }
  }

  for (const [category, cents] of Object.entries(summary.byCategory)) {
    summary.byCategory[category] = roundDollars(cents);
  }

  summary.checkingBalanceDollars = roundDollars(summary.checkingBalanceCents);
  summary.freelanceGrossReceiptsDollars = roundDollars(summary.freelanceGrossReceiptsCents);
  summary.interestIncomeDollars = roundDollars(summary.interestIncomeCents);
  summary.scheduleCExpenseDollars = roundDollars(summary.scheduleCExpenseCents);
  summary.charityExpenseDollars = roundDollars(summary.charityExpenseCents);
  summary.estimatedTaxPaymentsDollars = roundDollars(summary.estimatedTaxPaymentsCents);
  summary.scheduleCNetBeforeMileageDollars = roundDollars(
    summary.freelanceGrossReceiptsCents - summary.scheduleCExpenseCents,
  );

  return summary;
}

async function runFailureTest(name, fn) {
  try {
    const result = await fn();
    return {
      name,
      accepted: true,
      result,
    };
  } catch (error) {
    return {
      name,
      accepted: false,
      errorName: error.name,
      message: error.message,
    };
  }
}

function compactImportResult(result) {
  return {
    errors: result.errors ?? [],
    addedCount: result.added?.length ?? 0,
    updatedCount: result.updated?.length ?? 0,
    updatedPreviewCount: result.updatedPreview?.length ?? 0,
    addedImportedIds: (result.added ?? []).map(transaction => transaction.imported_id ?? null),
  };
}

async function main() {
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });

  const rows = parseCsv(fs.readFileSync(csvPath, 'utf8'));
  const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
  const uniqueCategories = [...new Set(rows.map(row => row.category))];
  const apiMainPath = require.resolve('@actual-app/api');
  const sourcePackage = JSON.parse(
    fs.readFileSync(path.join(path.dirname(apiMainPath), '..', 'package.json'), 'utf8'),
  );

  const categoryIds = new Map();
  const categoryNamesById = new Map();
  let checkingAccountId;

  await actual.init({ dataDir });

  await actual.runImport(budgetName, async () => {
    checkingAccountId = await actual.createAccount({ name: 'Checking', offbudget: false });

    const groupIds = new Map();
    const existingGroups = await actual.getCategoryGroups();
    for (const group of existingGroups) {
      groupIds.set(group.name, group.id);
    }

    for (const groupName of [...new Set(uniqueCategories.map(categoryGroupName))]) {
      if (groupIds.has(groupName)) {
        continue;
      }
      const groupId = await actual.createCategoryGroup({
        name: groupName,
        is_income: groupName === 'Income',
        hidden: false,
      });
      groupIds.set(groupName, groupId);
    }

    const existingCategories = await actual.getCategories();
    for (const categoryPath of uniqueCategories) {
      const groupId = groupIds.get(categoryGroupName(categoryPath));
      const leafName = categoryLeafName(categoryPath);
      const existingCategory = existingCategories.find(
        item => item.group_id === groupId && item.name === leafName,
      );
      const categoryId =
        existingCategory?.id ??
        (await actual.createCategory({
          name: leafName,
          group_id: groupId,
          is_income: categoryPath.startsWith('Income:'),
          hidden: false,
        }));
      categoryIds.set(categoryPath, categoryId);
      categoryNamesById.set(categoryId, categoryPath);
    }

    await actual.addTransactions(
      checkingAccountId,
      rows.map(row => ({
        date: toIsoDate(row.date),
        amount: toCents(row.amount_usd),
        payee_name: row.payee,
        imported_payee: row.description,
        imported_id: row.transaction_id,
        category: categoryIds.get(row.category),
        cleared: row.cleared === 'true',
        notes: `${row.transaction_id} | ${row.tax_hint} | ${row.memo}`,
      })),
      { learnCategories: false, runTransfers: false },
    );
  });

  const budgets = await actual.getBudgets();
  const budget = budgets.find(item => item.name === budgetName) ?? budgets[0];
  await actual.loadBudget(budget.cloudFileId ?? budget.id);

  let categories = await actual.getCategories();
  for (const item of categories) {
    if (item.group_id) {
      const sourcePath = uniqueCategories.find(category => categoryLeafName(category) === item.name);
      categoryNamesById.set(item.id, sourcePath ?? item.name);
    }
  }

  const baselineTransactions = await actual.getTransactions(checkingAccountId, '2025-01-01', '2025-12-31');
  const baselineBalance = await actual.getAccountBalance(checkingAccountId, new Date('2025-12-31T23:59:59Z'));
  const baselineSummary = summarize(baselineTransactions, categoryNamesById);
  baselineSummary.apiBalanceCents = baselineBalance;
  baselineSummary.apiBalanceDollars = roundDollars(baselineBalance);

  const addTransaction = profile.standard_add_transaction_test;
  await actual.addTransactions(
    checkingAccountId,
    [
      {
        date: toIsoDate(addTransaction.date),
        amount: toCents(addTransaction.amount_usd),
        payee_name: addTransaction.payee,
        imported_payee: addTransaction.description,
        imported_id: addTransaction.transaction_id,
        category: categoryIds.get(addTransaction.category),
        cleared: true,
        notes: `${addTransaction.transaction_id} | ${addTransaction.tax_hint}`,
      },
    ],
    { learnCategories: false, runTransfers: false },
  );

  const afterAddTransactions = await actual.getTransactions(checkingAccountId, '2025-01-01', '2025-12-31');
  const afterAddBalance = await actual.getAccountBalance(checkingAccountId, new Date('2025-12-31T23:59:59Z'));
  const afterAddSummary = summarize(afterAddTransactions, categoryNamesById);
  afterAddSummary.apiBalanceCents = afterAddBalance;
  afterAddSummary.apiBalanceDollars = roundDollars(afterAddBalance);

  const failureTests = [];
  failureTests.push(
    await runFailureTest('malformed_date', () =>
      actual.addTransactions(checkingAccountId, [
        {
          date: '13-40-2025',
          amount: -100,
          payee_name: 'Bad Date Test',
          category: categoryIds.get('Expenses:Business:Software'),
          imported_id: 'BADDATE',
        },
      ]),
    ),
  );
  failureTests.push(
    await runFailureTest('invalid_amount', () =>
      actual.addTransactions(checkingAccountId, [
        {
          date: '2025-12-31',
          amount: Number.NaN,
          payee_name: 'Bad Amount Test',
          category: categoryIds.get('Expenses:Business:Software'),
          imported_id: 'BADAMOUNT',
        },
      ]),
    ),
  );
  failureTests.push(
    await runFailureTest('unknown_category', () =>
      actual.addTransactions(checkingAccountId, [
        {
          date: '2025-12-31',
          amount: -100,
          payee_name: 'Unknown Category Test',
          category: 'Expenses:Business:Imaginary Category',
          imported_id: 'UNKNOWNCAT',
        },
      ]),
    ),
  );
  failureTests.push(
    await runFailureTest('duplicate_imported_id_importTransactions_dry_run', async () =>
      compactImportResult(
        await actual.importTransactions(
          checkingAccountId,
          [
            {
              account: checkingAccountId,
              date: '2025-01-15',
              amount: 250000,
              payee_name: 'Acme Design Co',
              imported_payee: 'Duplicate T001 importTransactions dry-run test',
              imported_id: 'T001',
              category: categoryIds.get('Income:Freelance:Design'),
              cleared: true,
            },
          ],
          { defaultCleared: true, dryRun: true },
        ),
      ),
    ),
  );
  failureTests.push(
    await runFailureTest('duplicate_imported_id_addTransactions', () =>
      actual.addTransactions(checkingAccountId, [
        {
          date: '2025-01-15',
          amount: 250000,
          payee_name: 'Acme Design Co',
          imported_payee: 'Duplicate T001 addTransactions test',
          imported_id: 'T001',
          category: categoryIds.get('Income:Freelance:Design'),
          cleared: true,
          notes: 'Duplicate imported_id sent through addTransactions',
        },
      ]),
    ),
  );

  const finalTransactions = await actual.getTransactions(checkingAccountId, '2025-01-01', '2025-12-31');
  const finalBalance = await actual.getAccountBalance(checkingAccountId, new Date('2025-12-31T23:59:59Z'));
  const finalSummary = summarize(finalTransactions, categoryNamesById);
  finalSummary.apiBalanceCents = finalBalance;
  finalSummary.apiBalanceDollars = roundDollars(finalBalance);

  categories = await actual.getCategories();
  const accounts = await actual.getAccounts();

  const selectedTransactions = afterAddTransactions
    .filter(transaction => !transaction.is_parent && !transaction.is_child)
    .sort((a, b) => a.date.localeCompare(b.date) || a.amount - b.amount)
    .map(transaction => ({
      id: transaction.id,
      date: transaction.date,
      amountCents: transaction.amount,
      amountDollars: roundDollars(transaction.amount),
      category: categoryNamesById.get(transaction.category) ?? transaction.category ?? null,
      importedId: transaction.imported_id ?? null,
      notes: transaction.notes ?? null,
      cleared: transaction.cleared ?? null,
    }));

  failureTests.push(
    await runFailureTest('missing_budget_file', () => actual.loadBudget('does-not-exist')),
  );

  const summary = {
    evaluatedAt: new Date().toISOString(),
    package: {
      name: sourcePackage.name,
      version: sourcePackage.version,
      license: sourcePackage.license,
    },
    environment: {
      node: process.version,
      platform: process.platform,
      arch: process.arch,
      dataDir,
      localOnly: true,
    },
    budget: {
      name: budgetName,
      cloudFileId: budget.cloudFileId ?? null,
      id: budget.id ?? null,
    },
    baseline: baselineSummary,
    afterAdd: afterAddSummary,
    finalAfterFailureTests: finalSummary,
    accounts: accounts.map(account => ({
      id: account.id,
      name: account.name,
      offbudget: account.offbudget ?? false,
      closed: account.closed ?? false,
    })),
    categories: categories.map(item => ({
      id: item.id,
      name: item.name,
      groupId: item.group_id ?? null,
      isIncome: item.is_income ?? false,
      hidden: item.hidden ?? false,
    })),
    transactions: selectedTransactions,
    failureTests,
  };

  fs.writeFileSync(
    path.join(outDir, 'actual_day10_summary.json'),
    `${JSON.stringify(summary, null, 2)}\n`,
  );
  fs.writeFileSync(
    path.join(outDir, 'actual_day10_transactions_after_add.json'),
    `${JSON.stringify(selectedTransactions, null, 2)}\n`,
  );

  await actual.shutdown();
  console.log(JSON.stringify({
    budgetName,
    baselineCheckingBalance: baselineSummary.apiBalanceDollars,
    afterAddCheckingBalance: afterAddSummary.apiBalanceDollars,
    finalCheckingBalanceAfterFailureTests: finalSummary.apiBalanceDollars,
    baselineTransactionCount: baselineSummary.transactionCount,
    afterAddTransactionCount: afterAddSummary.transactionCount,
    finalTransactionCount: finalSummary.transactionCount,
    failureTests,
  }, null, 2));
}

main().catch(async error => {
  try {
    await actual.shutdown();
  } catch {
    // Ignore shutdown errors while reporting the original failure.
  }
  console.error(error);
  process.exitCode = 1;
});
