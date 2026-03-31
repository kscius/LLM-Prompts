#!/usr/bin/env node
/**
 * stop hook: drives retry strategy from loop_count (Cursor-injected, 0-indexed).
 * loop_count=0 means the agent stopped normally; 1+ means a prior followup fired.
 * Strategy escalates per tier and stops when loop_limit (set in hooks.json) is reached.
 * Also logs session outcomes to session-metrics.json for observability.
 */
const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(
  process.env.USERPROFILE || process.env.HOME || ".",
  ".cursor",
  "hooks",
  "logs"
);
const METRICS_FILE = path.join(LOG_DIR, "session-metrics.json");

/** loop_count is 0-indexed: 0 = first stop, 1 = first retry, 2 = second retry … */
const STRATEGIES = [
  /* loop_count 0 — first stop, completed or error */
  null,
  /* loop_count 1 — first retry: gentle nudge */
  "Re-analyze the root cause from scratch. The previous approach may be fundamentally wrong. Check if the test, not the code, is the problem.",
  /* loop_count 2 — second retry: change path */
  "Try an alternative implementation path. If the same approach failed twice, the architecture may need rethinking. Use Sequential Thinking to reason about this.",
  /* loop_count 3 — third retry: escalate */
  "Hard stop recommended. Document everything tried, classify the blocker (architectural / environmental / scope / dependency), and propose alternative approaches to the user.",
];

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

  const conversationId = payload.conversation_id || "unknown";
  const status = payload.status || "unknown";
  const loopCount = typeof payload.loop_count === "number" ? payload.loop_count : 0;

  fs.mkdirSync(LOG_DIR, { recursive: true });

  /* Persist session outcome for observability (separate from retry logic) */
  let metrics = {};
  try {
    metrics = JSON.parse(fs.readFileSync(METRICS_FILE, "utf8"));
  } catch {}

  const entry = metrics[conversationId] || {
    errorCount: 0,
    completedCount: 0,
    firstSeen: new Date().toISOString(),
  };
  entry.lastStatus = status;
  entry.lastUpdated = new Date().toISOString();
  entry.lastLoopCount = loopCount;
  if (status === "error" || status === "stuck") {
    entry.errorCount = (entry.errorCount || 0) + 1;
  } else if (status === "completed") {
    entry.completedCount = (entry.completedCount || 0) + 1;
  }
  metrics[conversationId] = entry;

  const keys = Object.keys(metrics);
  if (keys.length > 100) {
    const sorted = keys.sort(
      (a, b) => new Date(metrics[a].lastUpdated) - new Date(metrics[b].lastUpdated)
    );
    for (const old of sorted.slice(0, keys.length - 100)) delete metrics[old];
  }
  fs.writeFileSync(METRICS_FILE, JSON.stringify(metrics, null, 2));

  /* Drive retry strategy from loop_count (the canonical Cursor counter) */
  const output = {};
  if (loopCount > 0 && loopCount < STRATEGIES.length) {
    const msg = STRATEGIES[loopCount];
    if (msg) output.followup_message = `[Auto-retry ${loopCount}/${STRATEGIES.length - 1}] ${msg}`;
  }

  process.stdout.write(JSON.stringify(output) + "\n");
}

main().catch(() => {
  process.stdout.write("{}\n");
});
