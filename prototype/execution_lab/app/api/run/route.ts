import { spawn } from "node:child_process";
import path from "node:path";
import { NextResponse } from "next/server";
import verifiedDemoRun from "../../../data/verified-demo-run.json";
import type { DemoRunResult } from "../../types";

export const runtime = "nodejs";

const MAX_OUTPUT_BYTES = 2_000_000;
const TIMEOUT_MS = 90_000;
const MAX_HLEDGER_BIN_LENGTH = 512;

type RequestBody = {
  mode?: "live" | "replay";
  hledgerBin?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as RequestBody;
  if (body.mode === "replay" || process.env.VERCEL === "1") {
    return jsonNoStore(verifiedReplayResult());
  }

  const appRoot = process.cwd();
  const prototypeRoot = path.resolve(appRoot, "..");
  const runner = path.join(prototypeRoot, "run_day20_demo.py");
  const python = process.env.PYTHON || "python";
  const args = [runner, "--json"];
  const hledgerBin = validateHledgerBin(body.hledgerBin);
  if (hledgerBin instanceof NextResponse) {
    return hledgerBin;
  }
  if (hledgerBin) {
    args.push("--hledger-bin", hledgerBin);
  }

  const result = await runLocalCommand(python, args, prototypeRoot);
  return jsonNoStore(result);
}

function verifiedReplayResult(): DemoRunResult {
  const result = JSON.parse(JSON.stringify(verifiedDemoRun)) as DemoRunResult;
  return {
    ...result,
    mode: "verified_replay",
    execution_steps: result.execution_steps.map((step) => ({
      ...step,
      source: "verified-demo-run",
    })),
  };
}

function validateHledgerBin(value: unknown) {
  if (value === undefined || value === null) {
    return "";
  }
  if (typeof value !== "string") {
    return jsonNoStore(
      {
        error: {
          code: "INVALID_HLEDGER_BIN",
          message: "hledgerBin must be a string when provided.",
        },
      },
      400,
    );
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  if (trimmed.length > MAX_HLEDGER_BIN_LENGTH || /[\0\r\n]/.test(trimmed)) {
    return jsonNoStore(
      {
        error: {
          code: "INVALID_HLEDGER_BIN",
          message: "hledger binary path is too long or contains invalid control characters.",
        },
      },
      400,
    );
  }
  return trimmed;
}

function jsonNoStore(payload: unknown, status = 200) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function runLocalCommand(command: string, args: string[], cwd: string) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd,
      shell: false,
      env: { ...process.env, LEDGER_FILE: "" },
      windowsHide: true,
    });

    let stdout = "";
    let stderr = "";
    let finished = false;
    const started = Date.now();
    const timer = setTimeout(() => {
      if (!finished) {
        child.kill();
      }
    }, TIMEOUT_MS);

    child.stdout.on("data", (chunk: Buffer) => {
      stdout = appendLimited(stdout, chunk.toString("utf8"));
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr = appendLimited(stderr, chunk.toString("utf8"));
    });
    child.on("error", (error) => {
      finished = true;
      clearTimeout(timer);
      resolve({
        status: "failed",
        mode: "local_live",
        error: {
          code: "DAY20_RUNNER_START_FAILED",
          message: error.message,
        },
        duration_ms: Date.now() - started,
      });
    });
    child.on("close", (exitCode) => {
      finished = true;
      clearTimeout(timer);
      const parsed = parseJson(stdout);
      if (parsed) {
        resolve(parsed);
        return;
      }
      resolve({
        status: exitCode === 0 ? "passed" : "failed",
        mode: "local_live",
        error: {
          code: "DAY20_RUNNER_OUTPUT_INVALID",
          message: "The local runner did not return JSON.",
        },
        exit_code: exitCode,
        duration_ms: Date.now() - started,
        stdout_excerpt: stdout.slice(0, 4000),
        stderr_excerpt: stderr.slice(0, 4000),
      });
    });
  });
}

function appendLimited(current: string, next: string) {
  const combined = current + next;
  return combined.length > MAX_OUTPUT_BYTES ? combined.slice(0, MAX_OUTPUT_BYTES) : combined;
}

function parseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
