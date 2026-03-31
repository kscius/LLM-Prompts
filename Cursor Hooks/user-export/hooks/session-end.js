#!/usr/bin/env node
/**
 * sessionEnd hook: records session closure telemetry.
 * Payload includes: reason, duration_ms, final_status, error_message (per Cursor docs).
 * Appends to session-summary.jsonl for post-session analytics.
 */
const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(
  process.env.USERPROFILE || process.env.HOME || ".",
  ".cursor",
  "hooks",
  "logs"
);
const LOG_FILE = path.join(LOG_DIR, "session-summary.jsonl");
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

  fs.mkdirSync(LOG_DIR, { recursive: true });
  rotateIfNeeded();

  const entry = {
    timestamp: new Date().toISOString(),
    conversation_id: payload.conversation_id || null,
    generation_id: payload.generation_id || null,
    cursor_version: payload.cursor_version || null,
    user_email: payload.user_email || null,
    reason: payload.reason || null,
    duration_ms: payload.duration_ms || null,
    final_status: payload.final_status || null,
    error_message: payload.error_message || null,
    composer_mode: payload.composer_mode || null,
  };

  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n");

  process.stdout.write("{}\n");
}

main().catch(() => process.stdout.write("{}\n"));
