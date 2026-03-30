#!/usr/bin/env node
/**
 * Records file paths touched per conversation for verifier.js on stop.
 */
const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "logs");
const STORE = path.join(LOG_DIR, "session-touched.json");

const CODE_EXT = /\.(ts|tsx|js|jsx|mjs|cjs|py|go|rs|php|rb|java|kt|swift|cs|vue|svelte)$/i;
const SKIP_EXT = /\.(md|mdx|txt|json|yaml|yml|svg|png|jpg|jpeg|gif|webp|lock|sum)$/i;

function load() {
  try {
    return JSON.parse(fs.readFileSync(STORE, "utf8"));
  } catch {
    return {};
  }
}

function save(data) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const keys = Object.keys(data);
  if (keys.length > 200) {
    const sorted = keys.sort(
      (a, b) =>
        new Date(data[b].updated || 0) - new Date(data[a].updated || 0)
    );
    for (const k of sorted.slice(200)) delete data[k];
  }
  fs.writeFileSync(STORE, JSON.stringify(data, null, 2));
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

  const cid =
    payload.conversation_id ||
    payload.conversationId ||
    payload.generation_id ||
    "";
  const filePath = payload.file_path || payload.filePath || "";
  if (!cid || !filePath) {
    process.stdout.write("{}\n");
    return;
  }

  const base = filePath.replace(/\\/g, "/").split("/").pop() || "";
  if (SKIP_EXT.test(base) && !CODE_EXT.test(base)) {
    process.stdout.write("{}\n");
    return;
  }
  if (!CODE_EXT.test(base)) {
    process.stdout.write("{}\n");
    return;
  }

  const roots = payload.workspace_roots || payload.workspaceRoots || [];
  const data = load();
  const entry = data[cid] || {
    files: [],
    workspace_roots: roots,
    updated: new Date().toISOString(),
  };
  if (roots.length) entry.workspace_roots = roots;
  if (!entry.files.includes(filePath)) entry.files.push(filePath);
  entry.updated = new Date().toISOString();
  data[cid] = entry;
  save(data);

  process.stdout.write("{}\n");
}

main().catch(() => process.stdout.write("{}\n"));
