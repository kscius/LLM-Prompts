#!/usr/bin/env node
/**
 * afterAgentThought: lightweight observability hook.
 * Logs thinking block summaries (first 300 chars) and duration.
 * Fire-and-forget — no output fields supported for this hook.
 */
const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(
  process.env.USERPROFILE || process.env.HOME || ".",
  ".cursor",
  "hooks",
  "logs"
);
const LOG_FILE = path.join(LOG_DIR, "thought-log.jsonl");
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

  const text = payload.text || "";
  if (!text) {
    process.stdout.write("{}\n");
    return;
  }

  fs.mkdirSync(LOG_DIR, { recursive: true });
  rotateIfNeeded();

  const entry = {
    timestamp: new Date().toISOString(),
    conversation_id: payload.conversation_id || null,
    duration_ms: payload.duration_ms || 0,
    preview: text.slice(0, 300),
    length: text.length,
  };
  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n");

  process.stdout.write("{}\n");
}

main().catch(() => process.stdout.write("{}\n"));
