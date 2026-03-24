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
    duration_ms: payload.duration_ms || 0,
    tool_call_count: payload.tool_call_count || 0,
    modified_files: payload.modified_files || [],
  };

  fs.mkdirSync(LOG_DIR, { recursive: true });
  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n");

  process.stdout.write("{}\n");
}

main().catch(() => {
  process.stdout.write("{}\n");
});
