#!/usr/bin/env node
/**
 * postToolUseFailure: log tool failures and inject recovery context.
 * Outputs additional_context on permission_denied or timeout to guide the agent.
 */
const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(
  process.env.USERPROFILE || process.env.HOME || ".",
  ".cursor",
  "hooks",
  "logs"
);
const LOG_FILE = path.join(LOG_DIR, "tool-failures.jsonl");
const MAX_LOG_SIZE = 5 * 1024 * 1024;

function rotateIfNeeded() {
  try {
    const stat = fs.statSync(LOG_FILE);
    if (stat.size > MAX_LOG_SIZE) {
      const backup = LOG_FILE + ".old";
      if (fs.existsSync(backup)) fs.unlinkSync(backup);
      fs.renameSync(LOG_FILE, backup);
    }
  } catch {}
}

const RECOVERY_HINTS = {
  permission_denied:
    "A tool action was blocked by a hook policy. Review the denied action, use a safer alternative, or request explicit user approval before retrying.",
  timeout:
    "A tool timed out. If it was a long-running command, consider breaking it into smaller steps or increasing the timeout. Do not retry blindly.",
  error:
    "A tool encountered an error. Read the error message carefully before retrying—avoid speculative fixes.",
};

async function main() {
  let input = "";
  for await (const chunk of process.stdin) input += chunk;

  let payload;
  try {
    payload = JSON.parse(input);
  } catch {
    process.stdout.write("{}\n");
    return;
  }

  const toolName = payload.tool_name || "unknown";
  const failureType = payload.failure_type || "error";
  const errorMessage = payload.error_message || "";
  const isInterrupt = payload.is_interrupt || false;

  if (isInterrupt) {
    process.stdout.write("{}\n");
    return;
  }

  fs.mkdirSync(LOG_DIR, { recursive: true });
  rotateIfNeeded();

  const entry = {
    timestamp: new Date().toISOString(),
    conversation_id: payload.conversation_id || null,
    tool_name: toolName,
    failure_type: failureType,
    error_message: errorMessage.slice(0, 500),
    duration_ms: payload.duration || 0,
  };
  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n");

  const hint = RECOVERY_HINTS[failureType] || RECOVERY_HINTS.error;
  const context = [
    `[tool-failure] ${toolName} failed (${failureType}).`,
    hint,
  ].join(" ");

  process.stdout.write(JSON.stringify({ additional_context: context }) + "\n");
}

main().catch(() => process.stdout.write("{}\n"));
