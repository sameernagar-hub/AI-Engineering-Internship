export type StepStatus = "waiting" | "running" | "passed" | "failed" | "blocked";

export type ManifestStep = {
  id: string;
  label: string;
  command: string;
  phase_commands: PhaseCommand[];
  expected_status: string;
  key_outputs: string[];
  evidence: string[];
};

export type PhaseCommand = {
  label: string;
  command: string;
  output_excerpt: string;
  source: string;
};

export type ArtifactFile = {
  path: string;
  bytes: number;
  sha256: string;
  title: string | null;
};

export type ArtifactGroup = {
  id: string;
  label: string;
  purpose: string;
  files: ArtifactFile[];
};

export type WhyEntry = {
  id: string;
  title: string;
  summary: string;
  evidence: string[];
};

export type ProjectManifest = {
  schema_version: string;
  generated_at: string;
  project: {
    name: string;
    research_question: string;
    scope: string;
    synthetic_boundary: string;
    current_phase: string;
    next_phase: string;
    prototype_target: string;
  };
  architecture: {
    summary: string;
    flow: string[];
    layers: { label: string; detail: string; artifacts: string[] }[];
    boundaries: string[];
  };
  why: WhyEntry[];
  execution: {
    local_live_command: string;
    verified_replay_source: string;
    steps: ManifestStep[];
  };
  artifacts: ArtifactGroup[];
  prototype: {
    commands: string[];
    fixtures: string[];
    known_hledger_boundary: string;
    summary_totals: Record<string, string | number>;
    failure_matrix: {
      status: string;
      case_count: number;
      passed_count: number;
      failed_count: number;
      scratch_unchanged: boolean;
    };
    unsupported_capabilities: string[];
    input_preview: {
      source_path: string;
      total_rows: number;
      columns: string[];
      rows: Record<string, string>[];
    };
  };
  changelog: {
    source_path: string;
    entries: { title: string; bullets: string[] }[];
  };
  evidence: {
    command_transcripts: { path: string; summary: string }[];
    fixture_hashes: { path: string; sha256: string }[];
    day_notes: string[];
  };
  contribution: {
    branch_policy: string;
    checks: string[];
    commit_message_style: string;
    push_target: string;
    review_notes: string[];
  };
};

export type DemoCommandResult = {
  id: string;
  label: string;
  command: string;
  status: "passed" | "failed";
  exit_code: number | null;
  duration_ms: number;
  payload: unknown;
  stdout_excerpt: string;
  stderr_excerpt: string;
};

export type DemoRunResult = {
  schema_version: string;
  status: "passed" | "failed";
  mode: "local_live" | "verified_replay";
  synthetic_only: boolean;
  commands: DemoCommandResult[];
  execution_steps: { id: string; status: StepStatus; source: string }[];
  summary: Record<string, string | number | null>;
  failure_matrix: {
    status?: string;
    case_count?: number;
    passed_count?: number;
    failed_count?: number;
    scratch_unchanged?: boolean;
    cases?: { name: string; status: string; expected_code: string | null; observed_code: string | null }[];
  };
  warnings: { code?: string; message?: string }[];
  limitations: string[];
};
