"use client";

import {
  AlertTriangle,
  Boxes,
  CheckCircle2,
  ChevronRight,
  FileJson,
  History,
  Network,
  Play,
  RotateCcw,
  ShieldCheck,
  TerminalSquare,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { DemoCommandResult, DemoRunResult, ManifestStep, ProjectManifest, StepStatus } from "./types";

type DetailTab = "overview" | "architecture" | "evidence" | "artifacts" | "changelog";
type Mode = "replay" | "live";

const statusLabel: Record<StepStatus, string> = {
  waiting: "Waiting",
  running: "Running",
  passed: "Passed",
  failed: "Failed",
  blocked: "Blocked",
};

const statusIcon: Record<StepStatus, React.ReactNode> = {
  waiting: <ChevronRight aria-hidden="true" />,
  running: <RotateCcw aria-hidden="true" />,
  passed: <CheckCircle2 aria-hidden="true" />,
  failed: <XCircle aria-hidden="true" />,
  blocked: <AlertTriangle aria-hidden="true" />,
};

const detailTabs: { id: DetailTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "evidence", label: "Evidence" },
  { id: "artifacts", label: "Artifacts" },
  { id: "changelog", label: "Changelog" },
];

const moneyLabels: { key: string; label: string }[] = [
  { key: "checking_balance", label: "Ending checking" },
  { key: "schedule_c_gross_receipts", label: "Schedule C-style gross" },
  { key: "schedule_c_cash_expenses_before_mileage", label: "Cash expenses" },
  { key: "schedule_c_net_before_mileage", label: "Net before mileage" },
  { key: "bookkeeping_revenue", label: "Bookkeeping revenue" },
  { key: "bookkeeping_expenses", label: "Bookkeeping expenses" },
  { key: "bookkeeping_net", label: "Bookkeeping net" },
  { key: "interest_income", label: "Interest income" },
  { key: "cash_charitable_contributions", label: "Cash charity" },
  { key: "federal_estimated_payments", label: "Estimated payments" },
];

const countLabels: { key: string; label: string }[] = [
  { key: "transactions", label: "Transactions" },
  { key: "postings", label: "Postings" },
  { key: "accounts", label: "Accounts" },
  { key: "business_miles", label: "Business miles" },
];

export function LabClient({ manifest }: { manifest: ProjectManifest }) {
  const [mode, setMode] = useState<Mode>("replay");
  const [detailTab, setDetailTab] = useState<DetailTab>("overview");
  const [activeStepId, setActiveStepId] = useState(manifest.execution.steps[0]?.id ?? "");
  const [openStepId, setOpenStepId] = useState<string | null>(null);
  const [hledgerBin, setHledgerBin] = useState("");
  const [running, setRunning] = useState(false);
  const [runResult, setRunResult] = useState<DemoRunResult | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const runToken = useRef(0);
  const progressTimer = useRef<number | null>(null);
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>(() =>
    Object.fromEntries(manifest.execution.steps.map((step) => [step.id, "waiting" as StepStatus])),
  );

  const activeStep = manifest.execution.steps.find((step) => step.id === activeStepId) ?? manifest.execution.steps[0];
  const openStep = openStepId
    ? manifest.execution.steps.find((step) => step.id === openStepId) ?? null
    : null;
  const summary =
    runResult?.summary && Object.keys(runResult.summary).length > 0
      ? runResult.summary
      : manifest.prototype.summary_totals;
  const failureMatrix = runResult?.failure_matrix?.case_count
    ? runResult.failure_matrix
    : manifest.prototype.failure_matrix;
  const artifactCount = manifest.artifacts.reduce((total, group) => total + group.files.length, 0);
  const runCommands = runResult?.commands ?? [];
  const resultStatus = running ? "running" : runResult?.status ?? "waiting";

  useEffect(() => {
    return () => clearProgressTimer();
  }, []);

  useEffect(() => {
    if (!openStepId) {
      return;
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenStepId(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [openStepId]);

  useEffect(() => {
    const firstActive =
      manifest.execution.steps.find((step) => stepStatuses[step.id] === "running") ??
      manifest.execution.steps.find((step) => stepStatuses[step.id] === "failed") ??
      manifest.execution.steps.find((step) => stepStatuses[step.id] === "blocked");
    if (firstActive) {
      setActiveStepId(firstActive.id);
    }
  }, [manifest.execution.steps, stepStatuses]);

  const selectedWhy = useMemo(() => {
    const evidence = activeStep?.evidence ?? [];
    return manifest.why.filter((entry) => entry.evidence.some((item) => evidence.includes(item)));
  }, [activeStep, manifest.why]);

  async function replayVerifiedRun() {
    const token = runToken.current + 1;
    runToken.current = token;
    clearProgressTimer();
    setMode("replay");
    setRunError(null);
    setRunResult(null);
    setRunning(true);
    resetStatuses("waiting");

    for (const step of manifest.execution.steps) {
      if (runToken.current !== token) {
        return;
      }
      setActiveStepId(step.id);
      setStepStatuses((current) => ({ ...current, [step.id]: "running" }));
      await wait(320);
      setStepStatuses((current) => ({ ...current, [step.id]: "passed" }));
    }

    setRunResult({
      schema_version: "1.0.0",
      status: "passed",
      mode: "verified_replay",
      synthetic_only: true,
      commands: [],
      execution_steps: manifest.execution.steps.map((step) => ({
        id: step.id,
        status: "passed",
        source: "verified-replay",
      })),
      summary: manifest.prototype.summary_totals,
      failure_matrix: manifest.prototype.failure_matrix,
      warnings: [
        {
          code: "VERIFIED_REPLAY",
          message: "Replay uses committed command evidence and does not execute a local hledger binary.",
        },
      ],
      limitations: manifest.prototype.unsupported_capabilities,
    });
    setRunning(false);
  }

  async function runSyntheticDemo() {
    const token = runToken.current + 1;
    runToken.current = token;
    clearProgressTimer();
    setMode("live");
    setRunError(null);
    setRunResult(null);
    setRunning(true);
    resetStatuses("waiting");
    optimisticProgress(token);

    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "live", hledgerBin }),
      });
      const payload = (await response.json()) as DemoRunResult | { error?: { message?: string } };
      if ("execution_steps" in payload) {
        if (runToken.current !== token) {
          return;
        }
        clearProgressTimer();
        setRunResult(payload);
        const statuses = Object.fromEntries(
          manifest.execution.steps.map((step) => [
            step.id,
            payload.execution_steps.find((item) => item.id === step.id)?.status ?? "blocked",
          ]),
        ) as Record<string, StepStatus>;
        setStepStatuses(statuses);
      } else {
        if (runToken.current !== token) {
          return;
        }
        clearProgressTimer();
        setRunError(payload.error?.message ?? "The local runner did not return execution status.");
        resetStatuses("blocked");
      }
    } catch (error) {
      if (runToken.current !== token) {
        return;
      }
      clearProgressTimer();
      setRunError(error instanceof Error ? error.message : "Local run failed.");
      resetStatuses("blocked");
    } finally {
      if (runToken.current === token) {
        setRunning(false);
      }
    }
  }

  function resetStatuses(status: StepStatus) {
    setStepStatuses(Object.fromEntries(manifest.execution.steps.map((step) => [step.id, status])));
  }

  function optimisticProgress(token: number) {
    let index = 0;
    progressTimer.current = window.setInterval(() => {
      if (index >= manifest.execution.steps.length || runToken.current !== token) {
        clearProgressTimer();
        return;
      }
      const step = manifest.execution.steps[index];
      setActiveStepId(step.id);
      setStepStatuses((current) => {
        const next = { ...current };
        for (let i = 0; i < index; i += 1) {
          if (next[manifest.execution.steps[i].id] === "running") {
            next[manifest.execution.steps[i].id] = "passed";
          }
        }
        next[step.id] = "running";
        return next;
      });
      index += 1;
    }, 460);
  }

  function clearProgressTimer() {
    if (progressTimer.current !== null) {
      window.clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
  }

  function openPhase(stepId: string) {
    setActiveStepId(stepId);
    setOpenStepId(stepId);
  }

  return (
    <main className="lab-shell">
      <section className="control-room" aria-label="Prototype control room">
        <div className="project-strip">
          <div>
            <p className="phase-label">{manifest.project.current_phase}</p>
            <h1>{manifest.project.name}</h1>
            <p className="project-question">{manifest.project.research_question}</p>
          </div>
          <div className="boundary-badge">
            <ShieldCheck aria-hidden="true" />
            <span>Synthetic only - not tax preparation</span>
          </div>
        </div>

        <div className="prototype-stage">
          <div className="run-card">
            <PanelHeader icon={<TerminalSquare aria-hidden="true" />} title="Prototype Runner" detail="Pinned synthetic fixtures only" />
            <div className="mode-card">
              <TerminalSquare aria-hidden="true" />
              <div>
                <strong>Local command</strong>
                <span>{manifest.execution.local_live_command}</span>
              </div>
            </div>
            <label className="bin-field">
              <span>hledger binary</span>
              <input
                value={hledgerBin}
                onChange={(event) => setHledgerBin(event.target.value)}
                placeholder="blank uses HLEDGER_BIN, PATH, or Winget"
                spellCheck={false}
                disabled={running}
                autoComplete="off"
              />
            </label>
            <div className="action-row" aria-label="Run controls">
              <button className="primary-action" type="button" onClick={runSyntheticDemo} disabled={running}>
                <Play aria-hidden="true" />
                <span>Run Synthetic Demo</span>
              </button>
              <button className="secondary-action" type="button" onClick={replayVerifiedRun} disabled={running}>
                <History aria-hidden="true" />
                <span>Replay Verified Run</span>
              </button>
            </div>
            <div className="run-state" data-mode={mode} data-status={resultStatus}>
              <div>
                <span className="eyebrow">{mode === "live" ? "local live" : "verified replay"}</span>
                <strong>{running ? "Execution in progress" : runResult ? `Last run ${runResult.status}` : "Ready"}</strong>
              </div>
              <div className="state-metrics">
                <span>{manifest.prototype.input_preview.total_rows} input rows</span>
                <span>{artifactCount} artifacts</span>
                <span>{manifest.prototype.failure_matrix.case_count} safety cases</span>
              </div>
            </div>
          </div>

          <ExecutionLifecycle
            steps={manifest.execution.steps}
            statuses={stepStatuses}
            activeStepId={activeStepId}
            resultStatus={resultStatus}
            onSelect={openPhase}
          />
        </div>
      </section>

      <section className="io-grid" aria-label="Live prototype inputs and outputs">
        <InputDataPanel manifest={manifest} />
        <CommandConsole commands={runCommands} manifest={manifest} mode={mode} error={runError} running={running} />
        <ResultPanel summary={summary} failureMatrix={failureMatrix} limitations={manifest.prototype.unsupported_capabilities} error={runError} />
      </section>

      <section className="details-zone" aria-label="Project details">
        <div className="detail-tabs" role="tablist" aria-label="Project detail tabs">
          {detailTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={detailTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              className={detailTab === tab.id ? "active" : ""}
              onClick={() => setDetailTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="detail-panel" id={`panel-${detailTab}`} role="tabpanel" aria-labelledby={`tab-${detailTab}`}>
          {detailTab === "overview" ? <ProjectDetails manifest={manifest} /> : null}
          {detailTab === "architecture" ? <ArchitectureDetails manifest={manifest} /> : null}
          {detailTab === "evidence" ? (
            <EvidenceDetails step={activeStep} why={selectedWhy} transcripts={manifest.evidence.command_transcripts} />
          ) : null}
          {detailTab === "artifacts" ? <ArtifactDetails manifest={manifest} artifactCount={artifactCount} /> : null}
          {detailTab === "changelog" ? <ChangelogDetails manifest={manifest} /> : null}
        </div>
      </section>

      {openStep ? (
        <PhaseDialog
          step={openStep}
          status={stepStatuses[openStep.id] ?? "waiting"}
          commands={runCommands}
          mode={mode}
          error={runError}
          running={running}
          onClose={() => setOpenStepId(null)}
        />
      ) : null}
    </main>
  );
}

function ExecutionLifecycle({
  steps,
  statuses,
  activeStepId,
  resultStatus,
  onSelect,
}: {
  steps: ManifestStep[];
  statuses: Record<string, StepStatus>;
  activeStepId: string;
  resultStatus: "waiting" | "running" | "passed" | "failed";
  onSelect: (id: string) => void;
}) {
  return (
    <section className="execution-lifecycle" aria-label="Execution lifecycle">
      <div className="lifecycle-header">
        <PanelHeader
          icon={<RotateCcw aria-hidden="true" />}
          title="Execution Lifecycle"
          detail="Select a phase to inspect its command and output"
        />
        <div className="result-chip" data-status={resultStatus}>
          {resultStatus === "waiting" ? "No result yet" : `Result ${resultStatus}`}
        </div>
      </div>
      <ol className="phase-grid">
        {steps.map((step, index) => {
          const status = statuses[step.id] ?? "waiting";
          return (
            <li key={step.id}>
              <button
                type="button"
                className={activeStepId === step.id ? "active" : ""}
                data-status={status}
                onClick={() => onSelect(step.id)}
                aria-label={`Open ${step.label} phase details`}
              >
                <span className="phase-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="phase-icon">{statusIcon[status]}</span>
                <span className="phase-copy">
                  <strong>{step.label}</strong>
                  <small>{statusLabel[status]}</small>
                </span>
              </button>
            </li>
          );
        })}
        <li className="result-node">
          <div data-status={resultStatus}>
            <span className="phase-index">R</span>
            <span className="phase-icon">
              {resultStatus === "passed" ? <CheckCircle2 aria-hidden="true" /> : null}
              {resultStatus === "failed" ? <XCircle aria-hidden="true" /> : null}
              {resultStatus === "running" ? <RotateCcw aria-hidden="true" /> : null}
              {resultStatus === "waiting" ? <ChevronRight aria-hidden="true" /> : null}
            </span>
            <span className="phase-copy">
              <strong>Result package</strong>
              <small>{resultStatus === "waiting" ? "Ready" : statusLabel[resultStatus]}</small>
            </span>
          </div>
        </li>
      </ol>
    </section>
  );
}

function PhaseDialog({
  step,
  status,
  commands,
  mode,
  error,
  running,
  onClose,
}: {
  step: ManifestStep;
  status: StepStatus;
  commands: DemoCommandResult[];
  mode: Mode;
  error: string | null;
  running: boolean;
  onClose: () => void;
}) {
  const rows = phaseCommandRows(step, commands, mode, error, running);

  return (
    <div className="phase-dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="phase-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`phase-dialog-${step.id}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dialog-header">
          <div>
            <span className="eyebrow">Lifecycle phase</span>
            <h2 id={`phase-dialog-${step.id}`}>{step.label}</h2>
          </div>
          <button type="button" className="icon-action" onClick={onClose} aria-label="Close phase details">
            <X aria-hidden="true" />
          </button>
        </div>

        <div className="dialog-status" data-status={status}>
          <span className="phase-icon">{statusIcon[status]}</span>
          <div>
            <strong>{statusLabel[status]}</strong>
            <span>{step.expected_status}</span>
          </div>
        </div>

        <div className="dialog-section">
          <strong>Commands Executed</strong>
          <div className="dialog-command-list">
            {rows.map((row) => (
              <article key={`${row.label}-${row.command}`} className="dialog-command-card">
                <div>
                  <span>{row.label}</span>
                  <code>{row.command}</code>
                </div>
                <small>{row.source}</small>
              </article>
            ))}
          </div>
        </div>

        <div className="dialog-section">
          <strong>Command Output</strong>
          {rows.map((row) => (
            <pre key={`${row.label}-output`} className="command-output-box">
              {row.output}
            </pre>
          ))}
        </div>

        <div className="dialog-grid">
          <div className="dialog-section">
            <strong>Key Outputs</strong>
            <ul>
              {step.key_outputs.map((output) => (
                <li key={output}>{output}</li>
              ))}
            </ul>
          </div>
          <div className="dialog-section">
            <strong>Evidence</strong>
            <ul>
              {step.evidence.map((item) => (
                <li key={item}>
                  <code>{item}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function InputDataPanel({ manifest }: { manifest: ProjectManifest }) {
  return (
    <section className="panel live-panel">
      <PanelHeader
        icon={<FileJson aria-hidden="true" />}
        title="Data In"
        detail={`${manifest.prototype.input_preview.total_rows} synthetic CSV rows`}
      />
      <div className="fixture-list">
        {manifest.prototype.fixtures.map((fixture) => (
          <code key={fixture}>{fixture}</code>
        ))}
      </div>
      <div className="table-scroll">
        <table>
          <caption>{manifest.prototype.input_preview.source_path}</caption>
          <thead>
            <tr>
              {manifest.prototype.input_preview.columns.map((column) => (
                <th key={column}>{column.replaceAll("_", " ")}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {manifest.prototype.input_preview.rows.map((row) => (
              <tr key={row.transaction_id}>
                {manifest.prototype.input_preview.columns.map((column) => (
                  <td key={column} data-column={column}>
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CommandConsole({
  commands,
  manifest,
  mode,
  error,
  running,
}: {
  commands: DemoCommandResult[];
  manifest: ProjectManifest;
  mode: Mode;
  error: string | null;
  running: boolean;
}) {
  const plannedCommands = commands.length
    ? commands
    : manifest.prototype.commands.map((command, index) => ({
        id: `planned-${index}`,
        label: index === 0 ? "Primary demo command" : "Supporting command",
        command,
        status: "passed" as const,
        exit_code: null,
        duration_ms: 0,
        payload: null,
        stdout_excerpt: "",
        stderr_excerpt: "",
      }));
  const terminalText = terminalOutput(commands, mode, error, running);

  return (
    <section className="panel live-panel">
      <PanelHeader icon={<TerminalSquare aria-hidden="true" />} title="Command Interface" detail="Local output is redacted before display" />
      <div className="command-table">
        {plannedCommands.map((command) => (
          <div key={command.id} className="command-row" data-status={command.status}>
            <span>{command.label}</span>
            <code>{command.command}</code>
            <strong>{commands.length ? `${command.status} / exit ${String(command.exit_code)}` : "ready"}</strong>
          </div>
        ))}
      </div>
      <pre className="terminal-output">{terminalText}</pre>
    </section>
  );
}

function ResultPanel({
  summary,
  failureMatrix,
  limitations,
  error,
}: {
  summary: Record<string, string | number | null | undefined>;
  failureMatrix: DemoRunResult["failure_matrix"];
  limitations: string[];
  error: string | null;
}) {
  return (
    <section className="panel live-panel">
      <PanelHeader icon={<CheckCircle2 aria-hidden="true" />} title="Live Output" detail="Summary and safety result" />
      {error ? <div className="error-banner">{error}</div> : null}
      <div className="metric-grid">
        {countLabels.map((item) => (
          <Metric key={item.key} label={item.label} value={summary[item.key]} />
        ))}
      </div>
      <div className="table-scroll compact-table">
        <table>
          <caption>Generated summary values</caption>
          <thead>
            <tr>
              <th>Output field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {moneyLabels.map((item) => (
              <tr key={item.key}>
                <td>{item.label}</td>
                <td>{formatValue(summary[item.key], true)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="safety-result">
        <div>
          <strong>Failure matrix</strong>
          <span>
            {failureMatrix.passed_count}/{failureMatrix.case_count} cases passed - scratch unchanged{" "}
            {String(failureMatrix.scratch_unchanged)}
          </span>
        </div>
        <div className="status-pill" data-status={failureMatrix.status === "passed" ? "passed" : "failed"}>
          {failureMatrix.status ?? "unknown"}
        </div>
      </div>
      {"cases" in failureMatrix && failureMatrix.cases?.length ? (
        <div className="table-scroll compact-table">
          <table>
            <caption>Failure matrix cases</caption>
            <thead>
              <tr>
                <th>Case</th>
                <th>Status</th>
                <th>Observed code</th>
              </tr>
            </thead>
            <tbody>
              {failureMatrix.cases.slice(0, 8).map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td>{item.observed_code ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <div className="unsupported">
        {limitations.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function ProjectDetails({ manifest }: { manifest: ProjectManifest }) {
  return (
    <div className="detail-grid">
      <div>
        <PanelHeader icon={<ShieldCheck aria-hidden="true" />} title="Internship Scope" detail={manifest.project.next_phase} />
        <p>{manifest.project.scope}</p>
        <p>{manifest.project.synthetic_boundary}</p>
        <p>
          <strong>Prototype target:</strong> {manifest.project.prototype_target}
        </p>
      </div>
      <div>
        <PanelHeader icon={<FileJson aria-hidden="true" />} title="Repo Rationale" detail="Generated from the manifest" />
        <div className="why-list">
          {manifest.why.map((entry) => (
            <article key={entry.id}>
              <strong>{entry.title}</strong>
              <p>{entry.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArchitectureDetails({ manifest }: { manifest: ProjectManifest }) {
  return (
    <div className="architecture-stack">
      <PanelHeader icon={<Network aria-hidden="true" />} title="Prototype Architecture" detail={manifest.project.prototype_target} />
      <p>{manifest.architecture.summary}</p>
      <div className="architecture-flow" aria-label="Prototype data flow">
        {manifest.architecture.flow.map((item, index) => (
          <div key={item} className="flow-node">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
          </div>
        ))}
      </div>
      <div className="architecture-layers">
        {manifest.architecture.layers.map((layer) => (
          <article key={layer.label}>
            <strong>{layer.label}</strong>
            <p>{layer.detail}</p>
            <div>
              {layer.artifacts.map((artifact) => (
                <code key={artifact}>{artifact}</code>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="architecture-boundaries">
        {manifest.architecture.boundaries.map((boundary) => (
          <span key={boundary}>{boundary}</span>
        ))}
      </div>
    </div>
  );
}

function EvidenceDetails({
  step,
  why,
  transcripts,
}: {
  step?: ManifestStep;
  why: { id: string; title: string; summary: string; evidence: string[] }[];
  transcripts: { path: string; summary: string }[];
}) {
  if (!step) {
    return null;
  }

  return (
    <div className="detail-grid">
      <div>
        <PanelHeader icon={<ShieldCheck aria-hidden="true" />} title="Selected Phase Evidence" detail={step.label} />
        <StepEvidence step={step} why={why} transcripts={transcripts} />
      </div>
      <div>
        <PanelHeader icon={<TerminalSquare aria-hidden="true" />} title="Verified Transcripts" detail="Committed evidence" />
        <div className="transcript-list">
          {transcripts.map((item) => (
            <article key={item.path}>
              <code>{item.path}</code>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArtifactDetails({ manifest, artifactCount }: { manifest: ProjectManifest; artifactCount: number }) {
  return (
    <div>
      <PanelHeader icon={<Boxes aria-hidden="true" />} title="Artifact Manifest" detail={`${artifactCount} repo-relative files`} />
      <div className="artifact-list">
        {manifest.artifacts.map((group) => (
          <details key={group.id} open={["changelog", "prototype", "evidence"].includes(group.id)}>
            <summary>
              <span>{group.label}</span>
              <strong>{group.files.length}</strong>
            </summary>
            <p>{group.purpose}</p>
            <ul>
              {group.files.slice(0, 10).map((file) => (
                <li key={file.path}>
                  <code>{file.path}</code>
                  <span>{formatBytes(file.bytes)}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}

function ChangelogDetails({ manifest }: { manifest: ProjectManifest }) {
  return (
    <div>
      <PanelHeader icon={<History aria-hidden="true" />} title="Changelog" detail={manifest.changelog.source_path} />
      <div className="changelog-list">
        {manifest.changelog.entries.map((entry) => (
          <article key={entry.title}>
            <strong>{entry.title}</strong>
            <ul>
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function PanelHeader({ icon, title, detail }: { icon: React.ReactNode; title: string; detail?: string }) {
  return (
    <div className="panel-header">
      <span className="panel-icon">{icon}</span>
      <div>
        <h2>{title}</h2>
        {detail ? <span>{detail}</span> : null}
      </div>
    </div>
  );
}

function Metric({ label, value, money = false }: { label: string; value: unknown; money?: boolean }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{formatValue(value, money)}</strong>
    </div>
  );
}

function StepEvidence({
  step,
  why,
}: {
  step: ManifestStep;
  why: { id: string; title: string; summary: string; evidence: string[] }[];
  transcripts: { path: string; summary: string }[];
}) {
  return (
    <div className="evidence-stack">
      <div className="command-card">
        <span>Command</span>
        <code>{step.command}</code>
      </div>
      <div>
        <strong>Expected output</strong>
        <ul>
          {step.key_outputs.map((output) => (
            <li key={output}>{output}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Evidence links</strong>
        <ul>
          {step.evidence.map((item) => (
            <li key={item}>
              <code>{item}</code>
            </li>
          ))}
        </ul>
      </div>
      {why.length > 0 ? (
        <div>
          <strong>Why it matters</strong>
          {why.map((entry) => (
            <p key={entry.id}>{entry.summary}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function phaseCommandRows(
  step: ManifestStep,
  commands: DemoCommandResult[],
  mode: Mode,
  error: string | null,
  running: boolean,
) {
  const liveCommandId = step.id === "failure_matrix" ? "failure_matrix" : "adapter_demo";
  const liveRows = commands.filter((command) => command.id === liveCommandId);
  if (liveRows.length > 0) {
    return liveRows.map((command) => ({
      label: command.label,
      command: command.command,
      output: commandOutput(command),
      source: "local live run",
    }));
  }
  if (running) {
    return [
      {
        label: mode === "live" ? "Local command" : "Verified replay",
        command: step.command,
        output:
          mode === "live"
            ? "Waiting for the local command result..."
            : "Replaying committed command evidence for this phase...",
        source: "current session",
      },
    ];
  }
  if (error) {
    return [
      {
        label: "Local command",
        command: step.command,
        output: error,
        source: "local live run",
      },
    ];
  }
  return step.phase_commands.map((command) => ({
    label: command.label,
    command: command.command,
    output: command.output_excerpt,
    source: command.source,
  }));
}

function commandOutput(command: DemoCommandResult) {
  if (command.stderr_excerpt) {
    return command.stderr_excerpt;
  }
  if (command.stdout_excerpt) {
    return command.stdout_excerpt;
  }
  if (command.payload) {
    return JSON.stringify(command.payload, null, 2).slice(0, 2400);
  }
  return "No command output excerpt was captured.";
}

function terminalOutput(commands: DemoCommandResult[], mode: Mode, error: string | null, running: boolean) {
  if (running) {
    return mode === "live"
      ? "$ python run_day20_demo.py --json\nrunning synthetic adapter and safety matrix..."
      : "$ replay verified command evidence\nanimating committed execution phases...";
  }
  if (error) {
    return `$ run failed\n${error}`;
  }
  if (commands.length === 0) {
    return "$ ready\nUse Run Synthetic Demo for a local hledger-backed run, or Replay Verified Run for committed evidence.";
  }
  return commands
    .map((command) => {
      const output = command.stderr_excerpt || command.stdout_excerpt || "No output excerpt.";
      return `$ ${command.command}\n# ${command.status}, exit ${String(command.exit_code)}\n${output}`;
    })
    .join("\n\n");
}

function formatValue(value: unknown, money: boolean) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }
  if (!money) {
    return String(value);
  }
  return `$${String(value)}`;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
