#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(
  process.env.USERPROFILE || process.env.HOME || ".",
  ".cursor",
  "hooks",
  "logs"
);
const LOG_FILE = path.join(LOG_DIR, "subagent-audit.jsonl");

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

  const entry = {
    timestamp: new Date().toISOString(),
    event: "subagentStop",
    subagent_type: payload.subagent_type || "unknown",
    status: payload.status || "unknown",
    task: (payload.task || "").substring(0, 200),
    description: (payload.description || "").substring(0, 200),
    summary: (payload.summary || "").substring(0, 500),
    duration_ms: payload.duration_ms || 0,
    message_count: payload.message_count || 0,
    tool_call_count: payload.tool_call_count || 0,
    loop_count: payload.loop_count || 0,
    modified_files: payload.modified_files || [],
    agent_transcript_path: payload.agent_transcript_path || null,
    cursor_version: payload.cursor_version || null,
  };

  fs.mkdirSync(LOG_DIR, { recursive: true });
  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n");

  const out = {};
  const st = String(entry.status || "").toLowerCase();
  if (st === "error" || st === "failed" || st === "failure") {
    out.followup_message = `[subagentStop] Subagent "${entry.subagent_type}" ended with status "${entry.status}". Review output, fix root cause or narrow scope, and retry if needed.`;
  }

  process.stdout.write(JSON.stringify(out) + "\n");
}

main().catch(() => {
  process.stdout.write("{}\n");
});
