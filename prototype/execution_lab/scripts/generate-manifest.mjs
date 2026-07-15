import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, "..");
const prototypeRoot = path.resolve(appRoot, "..");
const repoRoot = path.resolve(prototypeRoot, "..");

const POSIX = path.posix;
const IGNORE_PARTS = new Set([
  ".git",
  ".next",
  ".scratch",
  "__pycache__",
  "node_modules",
  "out",
]);

const GROUPS = [
  {
    id: "changelog",
    label: "Changelog",
    purpose: "Project-level history of decisions, evidence, and next steps.",
    roots: ["CHANGELOG.md"],
  },
  {
    id: "notes",
    label: "Daily Notes",
    purpose: "Exit notes and running research observations by phase.",
    roots: ["notes"],
  },
  {
    id: "evidence",
    label: "Evidence",
    purpose: "Command transcripts, fixtures, screenshots, and source notes that support claims.",
    roots: ["evidence"],
  },
  {
    id: "prototype",
    label: "Prototype",
    purpose: "Synthetic-only hledger adapter, safety checks, design docs, and the execution lab.",
    roots: ["prototype"],
  },
  {
    id: "research",
    label: "Research",
    purpose: "Tool landscape, comparison matrix, shortlist, and prototype target rationale.",
    roots: ["research"],
  },
  {
    id: "tool_records",
    label: "Tool Records",
    purpose: "Per-tool evaluation records for hledger, Actual Budget, Firefly III, tenforty, and Filed Open Tax Engine.",
    roots: ["tool_records"],
  },
  {
    id: "report",
    label: "Report",
    purpose: "Written report workspace and placeholder state for final delivery.",
    roots: ["report"],
  },
  {
    id: "deck",
    label: "Deck",
    purpose: "Presentation deck workspace and placeholder state for final delivery.",
    roots: ["deck"],
  },
  {
    id: "readmes",
    label: "README Files",
    purpose: "Folder-level orientation and reviewer entry points.",
    roots: ["README.md", "research/README.md", "tool_records/README.md", "prototype/README.md", "report/README.md", "deck/README.md", "evidence/README.md"],
  },
];

const EXECUTION_STEPS = [
  {
    id: "input_validation",
    label: "Input validation",
    command: "python -m hledger_adapter demo",
    expected_status: "passed",
    key_outputs: ["19 committed synthetic rows", "fixed category map", "synthetic acknowledgement inherited from canonical demo"],
    evidence: ["prototype/README.md", "evidence/fixtures/synthetic_freelancer_transactions.csv"],
  },
  {
    id: "hledger_discovery",
    label: "hledger discovery",
    command: "resolve --hledger-bin, HLEDGER_BIN, PATH, then Winget package",
    expected_status: "passed locally when hledger is configured",
    key_outputs: ["source: argument, environment, path, or winget", "candidate executable name only"],
    evidence: ["prototype/hledger_adapter/hledger.py", "tool_records/tool_1.md"],
  },
  {
    id: "version_probe",
    label: "Version probe",
    command: "hledger --version",
    expected_status: "passed",
    key_outputs: ["tested baseline 1.52.1", "untested-version warning when different"],
    evidence: ["evidence/commands/07-13-2026_hledger-adapter_day18_summary.txt"],
  },
  {
    id: "scratch_setup",
    label: "Scratch-copy setup",
    command: "copy validated CSV and static rules to a temporary directory",
    expected_status: "passed",
    key_outputs: ["input hash before/after", "rules sha256", "scratch path redacted or omitted"],
    evidence: ["prototype/hledger_adapter/hledger.py"],
  },
  {
    id: "print_report",
    label: "Transaction report",
    command: "hledger print -O json",
    expected_status: "passed",
    key_outputs: ["19 transactions", "38 postings"],
    evidence: ["evidence/commands/07-13-2026_hledger-adapter_day18_summary.txt"],
  },
  {
    id: "balance_report",
    label: "Balance report",
    command: "hledger balance --flat -O json",
    expected_status: "passed",
    key_outputs: ["14 accounts", "checking balance 8964.77"],
    evidence: ["evidence/commands/07-13-2026_hledger-adapter_day18_summary.txt"],
  },
  {
    id: "income_statement",
    label: "Income statement",
    command: "hledger incomestatement --depth 3 -O json",
    expected_status: "passed",
    key_outputs: ["revenue 10327.75", "expenses 1512.98", "net 8814.77"],
    evidence: ["evidence/commands/07-13-2026_hledger-adapter_day18_summary.txt"],
  },
  {
    id: "reconciliation",
    label: "Reconciliation",
    command: "normalize and reconcile hledger JSON",
    expected_status: "passed",
    key_outputs: ["posting count matches", "account balances match"],
    evidence: ["prototype/hledger_adapter/normalize.py", "notes/day_17_transaction_account_reconciliation.md"],
  },
  {
    id: "summary_aggregation",
    label: "Summary aggregation",
    command: "build controlled bookkeeping and tax-adjacent summary",
    expected_status: "passed",
    key_outputs: ["Schedule C-style net before mileage 9107.02", "interest 77.75", "mileage preserved 78.2"],
    evidence: ["prototype/hledger_adapter/summary.py", "notes/day_18_balance_report_summary.md"],
  },
  {
    id: "failure_matrix",
    label: "Failure matrix",
    command: "python tests/run_failure_matrix.py",
    expected_status: "passed",
    key_outputs: ["15/15 expected failures pass", "scratch unchanged true"],
    evidence: ["prototype/tests/run_failure_matrix.py", "evidence/commands/07-13-2026_hledger-adapter_day19_failures.txt"],
  },
  {
    id: "cleanup",
    label: "Cleanup",
    command: "delete temporary scratch unless --keep-scratch is explicit",
    expected_status: "passed",
    key_outputs: ["scratch kept false", "no host-absolute path exposed"],
    evidence: ["prototype/hledger_adapter/hledger.py", "evidence/commands/07-13-2026_hledger-adapter_day18_summary.txt"],
  },
];

const PHASE_OUTPUTS = {
  input_validation:
    "status: ok\nrows_accepted: 19\nsynthetic_boundary: confirmed\ncategory_map: loaded",
  hledger_discovery:
    "candidate_order: --hledger-bin, HLEDGER_BIN, PATH, Winget package\nlocal_status_after_setup: source=winget\nboundary: hledger is supplied by the reviewer, not bundled",
  version_probe:
    "tested_baseline: hledger 1.52.1\nwarning_policy: different versions continue only after shape and reconciliation checks pass",
  scratch_setup:
    "scratch_mode: temporary copy\nsource_inputs: read-only\nrules_sha256: recorded\nhost_paths: redacted",
  print_report:
    "hledger print -O json\ntransactions: 19\npostings: 38\nunexpected_transactions: 0",
  balance_report:
    "hledger balance --flat -O json\naccounts: 14\nAssets:Checking: 8964.77",
  income_statement:
    "hledger incomestatement --depth 3 -O json\nrevenue: 10327.75\nexpenses: 1512.98\nbookkeeping_net: 8814.77",
  reconciliation:
    "reconciliation_status: passed\nposting_count_match: true\naccount_balance_match: true\nunknown_accounts: 0",
  summary_aggregation:
    "schedule_c_style.gross_receipts: 10250.00\nschedule_c_style.cash_expenses_before_mileage: 1142.98\nschedule_c_style.net_before_mileage: 9107.02\nbusiness_miles: preserved_not_calculated",
  failure_matrix:
    "python tests/run_failure_matrix.py\ncase_count: 15\npassed_count: 15\nscratch_unchanged: true",
  cleanup:
    "scratch_kept: false\nsource_hashes_unchanged: true\nhost_absolute_paths_exposed: false",
};

const ARCHITECTURE = {
  summary:
    "A local, synthetic-only adapter drives hledger through read-only CLI reports, normalizes the JSON, and exposes the result through a reviewer-facing Next.js execution lab.",
  flow: [
    "Synthetic CSV and context fixtures",
    "Python wrapper preflight",
    "Scratch copies and static hledger rules",
    "Read-only hledger reports",
    "JSON reconciliation and summary aggregation",
    "Execution lab live run or verified replay",
  ],
  layers: [
    {
      label: "Repository evidence",
      detail: "Tool records, command transcripts, fixtures, and daily notes provide the source facts for the report.",
      artifacts: ["tool_records/", "evidence/commands/", "evidence/fixtures/", "notes/"],
    },
    {
      label: "Adapter",
      detail:
        "The Python CLI validates synthetic inputs, rejects unsafe categories or duplicates, runs only read-only hledger reports, and emits normalized JSON.",
      artifacts: ["prototype/hledger_adapter/", "prototype/config/", "prototype/run_day20_demo.py"],
    },
    {
      label: "Execution lab",
      detail:
        "The Next.js app shows the prototype workflow, phase commands, command output, evidence, artifacts, and report-ready architecture.",
      artifacts: ["prototype/execution_lab/app/", "prototype/execution_lab/scripts/generate-manifest.mjs"],
    },
    {
      label: "Report package",
      detail:
        "The final report and deck are drafted from structured records, comparison matrices, prototype evidence, and the frozen retrospective.",
      artifacts: ["report/", "deck/", "research/comparison_matrix.md", "prototype/retrospective.md"],
    },
  ],
  boundaries: [
    "No real taxpayer, bank, account, or personally identifiable data.",
    "No tax advice, tax return preparation, refund estimate, e-file, or Form 1040 generation in the prototype.",
    "No bundled hledger binary; reviewers provide hledger locally or use verified replay.",
    "No host-absolute paths, secrets, scratch directories, or hledger binaries in generated manifests.",
  ],
};

async function main() {
  const [artifacts, fixtureHashes, inputPreview, changelog] = await Promise.all([
    artifactGroups(),
    selectedFixtureHashes(),
    syntheticInputPreview(),
    changelogEntries(),
  ]);
  const manifest = {
    schema_version: "1.0.0",
    generated_at: new Date().toISOString(),
    project: {
      name: "AI Engineering Internship Tax Tooling Prototype",
      research_question:
        "What does the current open-source ecosystem for consumer tax bookkeeping and US tax-return preparation/submission look like, and how feasible is it to connect representative tools to other software?",
      scope:
        "Consumer and freelancer-oriented bookkeeping and US tax-adjacent workflows, evaluated through public tools and synthetic data.",
      synthetic_boundary:
        "Only committed synthetic fixtures are supported. The prototype does not accept real taxpayer data or provide tax advice.",
      current_phase: "Phase 22 - report structure complete",
      next_phase: "Draft report introduction, method, and landscape",
      prototype_target: "Synthetic hledger CLI and JSON adapter",
    },
    architecture: ARCHITECTURE,
    why: [
      {
        id: "hledger_target",
        title: "Why hledger",
        summary:
          "hledger offered the clearest one-week prototype path: local files, documented CLI operations, JSON output, low setup friction, and visible safety boundaries.",
        evidence: ["research/prototype_target_decision.md", "research/comparison_matrix.md", "tool_records/tool_1.md"],
      },
      {
        id: "synthetic_data",
        title: "Why synthetic fixtures",
        summary:
          "The internship needs repeatable bookkeeping facts without handling taxpayer data, secrets, real account records, or filing credentials.",
        evidence: ["evidence/synthetic_dataset.md", "evidence/fixtures/synthetic_freelancer_transactions.csv"],
      },
      {
        id: "adapter_shape",
        title: "Why an adapter",
        summary:
          "The Python wrapper closes permissive hledger input behavior, runs only read-only reports, normalizes JSON, and returns AI-agent-consumable summaries.",
        evidence: ["prototype/design.md", "prototype/hledger_adapter/cli.py"],
      },
      {
        id: "safety_matrix",
        title: "Why the failure matrix",
        summary:
          "The matrix proves expected bad inputs stop before report execution and hledger discovery failures return clear structured errors.",
        evidence: ["prototype/tests/run_failure_matrix.py", "evidence/commands/07-13-2026_hledger-adapter_day19_failures.txt"],
      },
      {
        id: "execution_lab",
        title: "Why this UI",
        summary:
          "The lab lets reviewers see the workflow, evidence, artifacts, and contribution path in one runnable surface instead of reading disconnected files.",
        evidence: ["prototype/day20_project_lab_ui_brief.md", "CHANGELOG.md"],
      },
    ],
    execution: {
      local_live_command: "python run_day20_demo.py --json",
      verified_replay_source: "Committed Day 18 and Day 19 command transcripts",
      steps: EXECUTION_STEPS.map(withPhaseCommands),
    },
    artifacts,
    prototype: {
      commands: [
        "python run_day20_demo.py --json",
        "python -m hledger_adapter demo",
        "python tests/run_failure_matrix.py",
        "cd execution_lab && npm run dev",
      ],
      fixtures: [
        "evidence/fixtures/synthetic_freelancer_transactions.csv",
        "evidence/fixtures/synthetic_freelancer_tax_profile.json",
        "prototype/config/category_map.json",
        "prototype/config/hledger.csv.rules",
      ],
      known_hledger_boundary:
        "hledger is a separate local prerequisite. It is not bundled and can be supplied by flag, HLEDGER_BIN, PATH, or the local Winget package install.",
      summary_totals: {
        transactions: 19,
        postings: 38,
        accounts: 14,
        opening_checking_balance: "1200.00",
        checking_balance: "8964.77",
        bookkeeping_revenue: "10327.75",
        bookkeeping_expenses: "1512.98",
        bookkeeping_net: "8814.77",
        schedule_c_gross_receipts: "10250.00",
        schedule_c_cash_expenses_before_mileage: "1142.98",
        schedule_c_net_before_mileage: "9107.02",
        interest_income: "77.75",
        cash_charitable_contributions: "370.00",
        federal_estimated_payments: "1050.00",
        business_miles: "78.2",
      },
      failure_matrix: {
        status: "passed",
        case_count: 15,
        passed_count: 15,
        failed_count: 0,
        scratch_unchanged: true,
      },
      unsupported_capabilities: [
        "No real taxpayer data",
        "No tax return preparation",
        "No tax treatment decisions",
        "No Form 1040, MeF XML, e-file, or refund estimate",
        "No hledger bundling",
      ],
      input_preview: inputPreview,
    },
    changelog,
    evidence: {
      command_transcripts: [
        {
          path: "evidence/commands/07-13-2026_hledger-adapter_day18_summary.txt",
          summary: "Verified adapter demo, summary totals, dry-run, smoke, and scratch cleanup.",
        },
        {
          path: "evidence/commands/07-13-2026_hledger-adapter_day19_failures.txt",
          summary: "Verified 15-case failure matrix and scratch unchanged behavior.",
        },
      ],
      fixture_hashes: fixtureHashes,
      day_notes: [
        "notes/day_17_transaction_account_reconciliation.md",
        "notes/day_18_balance_report_summary.md",
        "notes/day_19_safety_failure_handling.md",
      ],
    },
    contribution: {
      branch_policy: "Create a focused branch from the current working tree before prototype changes.",
      checks: [
        "python -m compileall hledger_adapter tests run_day20_demo.py",
        "python tests/run_failure_matrix.py",
        "python run_day20_demo.py --json --hledger-bin <configured hledger>",
        "cd execution_lab && npm run build",
      ],
      commit_message_style: "Use a phase-scoped message such as: phase20: add execution lab demo package",
      push_target: "Push the feature branch and open review with changed files, evidence, and known local hledger boundary.",
      review_notes: [
        "Confirm generated manifests contain only repo-relative paths.",
        "Do not commit hledger binaries, scratch data, .env files, or real financial data.",
        "Use verified replay for deployed review when hledger is unavailable.",
      ],
    },
  };

  const dataPath = path.join(appRoot, "data", "project-manifest.json");
  const publicPath = path.join(appRoot, "public", "project-manifest.json");
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.mkdir(path.dirname(publicPath), { recursive: true });
  const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
  await Promise.all([fs.writeFile(dataPath, serialized), fs.writeFile(publicPath, serialized)]);
  console.log(`Generated ${relative(dataPath)} and ${relative(publicPath)}`);
}

function withPhaseCommands(step) {
  return {
    ...step,
    phase_commands: [
      {
        label: "Phase command",
        command: step.command,
        output_excerpt: PHASE_OUTPUTS[step.id] ?? step.key_outputs.join("\n"),
        source: step.evidence[0] ?? "prototype/execution_lab/data/project-manifest.json",
      },
    ],
  };
}

async function syntheticInputPreview() {
  const sourcePath = "evidence/fixtures/synthetic_freelancer_transactions.csv";
  const absolute = path.join(repoRoot, sourcePath);
  const content = await fs.readFile(absolute, "utf8");
  const rows = parseCsv(content);
  const columns = ["transaction_id", "date", "payee", "category", "tax_hint", "amount_usd"];
  return {
    source_path: sourcePath,
    total_rows: rows.length,
    columns,
    rows: rows.slice(0, 8).map((row) =>
      Object.fromEntries(columns.map((column) => [column, row[column] ?? ""])),
    ),
  };
}

async function changelogEntries() {
  const sourcePath = "CHANGELOG.md";
  const absolute = path.join(repoRoot, sourcePath);
  const content = await fs.readFile(absolute, "utf8");
  const sections = content.split(/^##\s+/m).slice(1);
  return {
    source_path: sourcePath,
    entries: sections.slice(0, 6).map((section) => {
      const [titleLine = "", ...bodyLines] = section.split(/\r?\n/);
      const bullets = bodyLines
        .filter((line) => line.trim().startsWith("- "))
        .slice(0, 5)
        .map((line) => line.trim().replace(/^- /, ""));
      return {
        title: titleLine.trim(),
        bullets,
      };
    }),
  };
}

async function artifactGroups() {
  return Promise.all(
    GROUPS.map(async (group) => ({
      id: group.id,
      label: group.label,
      purpose: group.purpose,
      files: await collectGroupFiles(group.roots),
    })),
  );
}

async function collectGroupFiles(roots) {
  const seen = new Set();
  const files = [];
  for (const root of roots) {
    const absolute = path.join(repoRoot, root);
    if (!(await exists(absolute))) {
      continue;
    }
    const stat = await fs.stat(absolute);
    if (stat.isDirectory()) {
      for (const file of await walk(absolute)) {
        if (!seen.has(file)) {
          seen.add(file);
          files.push(await fileEntry(file));
        }
      }
    } else if (!seen.has(absolute)) {
      seen.add(absolute);
      files.push(await fileEntry(absolute));
    }
  }
  return files.sort((a, b) => a.path.localeCompare(b.path));
}

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (IGNORE_PARTS.has(entry.name)) {
      continue;
    }
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(absolute)));
    } else if (entry.isFile()) {
      files.push(absolute);
    }
  }
  return files;
}

async function fileEntry(absolute) {
  const [stat, buffer] = await Promise.all([fs.stat(absolute), fs.readFile(absolute)]);
  return {
    path: relative(absolute),
    bytes: stat.size,
    sha256: createHash("sha256").update(buffer).digest("hex"),
    title: titleFrom(buffer.toString("utf8")),
  };
}

async function selectedFixtureHashes() {
  const fixturePaths = [
    "evidence/fixtures/synthetic_freelancer_transactions.csv",
    "evidence/fixtures/synthetic_freelancer_tax_profile.json",
    "prototype/config/category_map.json",
    "prototype/config/hledger.csv.rules",
  ];
  return Promise.all(
    fixturePaths.map(async (fixturePath) => {
      const absolute = path.join(repoRoot, fixturePath);
      const buffer = await fs.readFile(absolute);
      return {
        path: fixturePath,
        sha256: createHash("sha256").update(buffer).digest("hex"),
      };
    }),
  );
}

function titleFrom(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function parseCsv(content) {
  const lines = content.trim().split(/\r?\n/);
  const [headerLine, ...dataLines] = lines;
  const headers = parseCsvLine(headerLine);
  return dataLines.map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

async function exists(absolute) {
  try {
    await fs.access(absolute);
    return true;
  } catch {
    return false;
  }
}

function relative(absolute) {
  return path.relative(repoRoot, absolute).split(path.sep).join(POSIX.sep);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
