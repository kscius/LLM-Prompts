#!/usr/bin/env node
/**
 * Before context compaction: append structured snapshot to disk for human/agent resume.
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

  const block = `
---

## Pre-compact snapshot — ${new Date().toISOString()}

- **Conversation:** ${cid}
- **Workspace roots:** ${roots || "(none)"}
- **Transcript:** ${transcript || "(none)"}

### Resume template (fill from current thread if known)

- **Phase:** (e.g. INTAKE / SCOUT / PLAN / BUILD / VERIFY)
- **Classification:** (SIMPLE / STANDARD / COMPLEX)
- **Key decisions:** 
- **Files touched:** 
- **Outstanding validations:** 

### Raw hook payload (truncated)

\`\`\`json
${JSON.stringify(payload, null, 2).slice(0, 12000)}
\`\`\`

`;

  fs.appendFileSync(OUT, block, "utf8");

  const additional = [
    "[preCompact] A structured snapshot was appended to:",
    OUT,
    "Use it after compaction to recall phase, decisions, files, and pending validations.",
  ].join("\n");

  process.stdout.write(
    JSON.stringify({ additional_context: additional }) + "\n"
  );
}

main().catch(() => process.stdout.write("{}\n"));
