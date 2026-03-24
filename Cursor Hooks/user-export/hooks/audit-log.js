#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(
  process.env.USERPROFILE || process.env.HOME || ".",
  ".cursor",
  "hooks",
  "logs"
);
const LOG_FILE = path.join(LOG_DIR, "agent-audit.jsonl");
const MAX_LOG_SIZE = 10 * 1024 * 1024; // 10MB

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

async function main() {
  let input = "";
  for await (const chunk of process.stdin) input += chunk;

  let payload;
  try {
    payload = JSON.parse(input);
  } catch {
    payload = { raw: input };
  }

  const entry = {
    timestamp: new Date().toISOString(),
    event: payload.hook_event_name || "unknown",
    conversation_id: payload.conversation_id || null,
    model: payload.model || null,
    data: payload,
  };

  fs.mkdirSync(LOG_DIR, { recursive: true });
  rotateIfNeeded();
  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n");

  process.stdout.write("{}\n");
}

main().catch(() => {
  process.stdout.write("{}\n");
});
