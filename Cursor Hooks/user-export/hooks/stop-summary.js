#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(
  process.env.USERPROFILE || process.env.HOME || ".",
  ".cursor",
  "hooks",
  "logs"
);
const METRICS_FILE = path.join(LOG_DIR, "session-metrics.json");

const STRATEGIES = [
  "Re-analyze the root cause from scratch. The previous approach may be fundamentally wrong. Check if the test, not the code, is the problem.",
  "Try an alternative implementation path. If the same fix fails twice, the architecture may need a different approach. Use Sequential Thinking to reason about this.",
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
  const loopCount = payload.loop_count || 0;

  fs.mkdirSync(LOG_DIR, { recursive: true });

  let metrics = {};
  try {
    metrics = JSON.parse(fs.readFileSync(METRICS_FILE, "utf8"));
  } catch {}

  const entry = metrics[conversationId] || {
    errorCount: 0,
    completedCount: 0,
    consecutiveErrors: 0,
    firstSeen: new Date().toISOString(),
  };

  entry.lastStatus = status;
  entry.lastUpdated = new Date().toISOString();
  entry.loopCount = loopCount;

  if (status === "error" || status === "stuck") {
    entry.errorCount = (entry.errorCount || 0) + 1;
    entry.consecutiveErrors = (entry.consecutiveErrors || 0) + 1;
  } else if (status === "completed") {
    entry.completedCount = (entry.completedCount || 0) + 1;
    entry.consecutiveErrors = 0;
  }

  metrics[conversationId] = entry;

  const keys = Object.keys(metrics);
  if (keys.length > 100) {
    const sorted = keys.sort(
      (a, b) =>
        new Date(metrics[a].lastUpdated) - new Date(metrics[b].lastUpdated)
    );
    for (const old of sorted.slice(0, keys.length - 100)) {
      delete metrics[old];
    }
  }

  fs.writeFileSync(METRICS_FILE, JSON.stringify(metrics, null, 2));

  const output = {};
  const tier = entry.consecutiveErrors;

  if (tier >= 1 && tier <= 3 && loopCount < 10) {
    const strategyIdx = Math.min(tier - 1, STRATEGIES.length - 1);
    output.followup_message = `[Auto-retry tier ${tier}] ${STRATEGIES[strategyIdx]}`;
  }

  process.stdout.write(JSON.stringify(output) + "\n");
}

main().catch(() => {
  process.stdout.write("{}\n");
});
