#!/usr/bin/env node
/**
 * preCompact hook: append a structured snapshot to disk before context compaction.
 * Returns user_message so the user sees when compaction fires and where the snapshot is.
 * Uses payload fields: context_usage_percent, is_first_compaction, trigger, message_count.
 */
const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "logs");
const OUT = path.join(LOG_DIR, "precompact-context-log.md");

function normalizeRoot(root) {
  if (!root) return "";
  let r = String(root).replace(/\\/g, "/");
  if (/^\/[a-zA-Z]:\//.test(r)) r = r.slice(1);
  return r;
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

  const roots = (payload.workspace_roots || []).map(normalizeRoot).join(", ");
  const cid = payload.conversation_id || payload.conversationId || "unknown";
  const transcript = payload.transcript_path || payload.transcriptPath || "";
  const usagePct = payload.context_usage_percent ?? null;
  const contextTokens = payload.context_tokens ?? null;
  const contextWindowSize = payload.context_window_size ?? null;
  const isFirst = payload.is_first_compaction ?? true;
  const trigger = payload.trigger || "auto";
  const msgCount = payload.message_count ?? null;
  const msgsToCompact = payload.messages_to_compact ?? null;
  const now = new Date().toISOString();

  const usageStr = usagePct !== null ? `${usagePct}%` : "unknown";
  const tokenStr =
    contextTokens !== null && contextWindowSize !== null
      ? ` (${contextTokens.toLocaleString()} / ${contextWindowSize.toLocaleString()} tokens)`
      : "";
  const msgStr = msgCount !== null ? ` across ${msgCount} messages` : "";

  /* On first compaction, include a full resume template; subsequent ones are brief. */
  const block = isFirst
    ? `
---

## Pre-compact snapshot — ${now}

- **Conversation:** ${cid}
- **Trigger:** ${trigger} (first compaction)
- **Context usage:** ${usageStr}${tokenStr}${msgStr}${msgsToCompact !== null ? ` (${msgsToCompact} to compact)` : ""}
- **Workspace roots:** ${roots || "(none)"}
- **Transcript:** ${transcript || "(none)"}

### Resume template

- **Phase:** (e.g. INTAKE / SCOUT / PLAN / BUILD / VERIFY)
- **Classification:** (SIMPLE / STANDARD / COMPLEX)
- **Key decisions:**
- **Files touched:**
- **Outstanding validations:**

### Raw hook payload (truncated)

\`\`\`json
${JSON.stringify(payload, null, 2).slice(0, 8000)}
\`\`\`

`
    : `
---

## Subsequent compact — ${now}

- **Conversation:** ${cid} | **Trigger:** ${trigger} | **Usage:** ${usageStr}${tokenStr}${msgStr}

`;

  fs.appendFileSync(OUT, block, "utf8");

  const triggerLabel = trigger === "manual" ? "Manual" : "Auto";
  const tokenDetail = contextTokens !== null ? ` (${contextTokens.toLocaleString()} tokens)` : "";
  const userMsg = `[Context compaction] ${triggerLabel} compaction at ${usageStr}${tokenDetail} context usage. Snapshot saved → ${OUT}`;

  process.stdout.write(JSON.stringify({ user_message: userMsg }) + "\n");
}

main().catch(() => process.stdout.write("{}\n"));
