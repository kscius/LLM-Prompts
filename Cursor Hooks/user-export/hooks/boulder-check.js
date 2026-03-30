#!/usr/bin/env node
/**
 * On stop: scan .cursor/plans/*.md for unchecked `- [ ]` in acceptance/checklist sections (body only, not YAML frontmatter).
 */
const fs = require("fs");
const path = require("path");

const UNCHECKED = /^-\s*\[ \]\s+/gm;

function normalizeRoot(root) {
  if (!root) return "";
  let r = String(root).replace(/\\/g, "/");
  if (/^\/[a-zA-Z]:\//.test(r)) r = r.slice(1);
  return r;
}

function stripFrontmatter(text) {
  if (!text.startsWith("---\n")) return text;
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) return text;
  return text.slice(end + 5);
}

function acceptanceUncheckedCount(body) {
  const sections = body.split(/(?=^#{2,4}\s+)/m);
  let count = 0;
  for (const sec of sections) {
    const h = sec.match(/^#{2,4}\s+(.+)/m);
    const title = (h && h[1]) || "";
    if (!/acceptance|checklist|done when|verification|criteria/i.test(title))
      continue;
    const m = sec.match(UNCHECKED);
    if (m) count += m.length;
  }
  if (count > 0) return count;
  /** Fallback: any unchecked box in body if no titled section matched */
  const fallback = body.match(UNCHECKED);
  return fallback ? fallback.length : 0;
}

function scanPlans(dir) {
  const plansDir = path.join(dir, ".cursor", "plans");
  if (!fs.existsSync(plansDir)) return [];
  const issues = [];
  for (const name of fs.readdirSync(plansDir)) {
    if (!name.endsWith(".md")) continue;
    const full = path.join(plansDir, name);
    let text;
    try {
      text = fs.readFileSync(full, "utf8");
    } catch {
      continue;
    }
    const body = stripFrontmatter(text);
    const n = acceptanceUncheckedCount(body);
    if (n > 0) issues.push({ file: full, unchecked: n });
  }
  return issues;
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

  if (process.env.CURSOR_DISABLE_BOULDER_CHECK === "1") {
    process.stdout.write("{}\n");
    return;
  }

  const roots = (payload.workspace_roots || []).map(normalizeRoot);
  const all = [];
  for (const r of roots) {
    const projectDir = r.replace(/\//g, path.sep);
    if (projectDir && fs.existsSync(projectDir)) {
      all.push(...scanPlans(projectDir));
    }
  }

  if (all.length === 0) {
    process.stdout.write("{}\n");
    return;
  }

  const lines = [
    "[Boulder-check] `.cursor/plans/*.md` still has unchecked `- [ ]` items (acceptance/checklist sections or body):",
    ...all.map((i) => `- ${i.file}: ${i.unchecked} open checkbox(es)`),
    "",
    "Check them off or finish the work before closing the session.",
  ];

  process.stdout.write(
    JSON.stringify({ followup_message: lines.join("\n") }) + "\n"
  );
}

main().catch(() => process.stdout.write("{}\n"));
