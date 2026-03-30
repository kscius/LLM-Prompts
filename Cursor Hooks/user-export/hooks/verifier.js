#!/usr/bin/env node
/**
 * On stop: if this session touched code files, run repo test/build command; followup_message on failure.
 * Opt out: CURSOR_DISABLE_VERIFIER=1
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { detectVerifyCommand } = require("./lib/detect-verify-command.js");

const LOG_DIR = path.join(__dirname, "logs");
const TOUCHED = path.join(LOG_DIR, "session-touched.json");

function normalizeRoot(root) {
  if (!root) return "";
  let r = String(root).replace(/\\/g, "/");
  if (/^\/[a-zA-Z]:\//.test(r)) r = r.slice(1);
  return r;
}

function loadTouched(conversationId) {
  try {
    const data = JSON.parse(fs.readFileSync(TOUCHED, "utf8"));
    return data[conversationId] || null;
  } catch {
    return null;
  }
}

function clearTouched(conversationId) {
  try {
    const data = JSON.parse(fs.readFileSync(TOUCHED, "utf8"));
    delete data[conversationId];
    fs.writeFileSync(TOUCHED, JSON.stringify(data, null, 2));
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

  const out = {};
  if (process.env.CURSOR_DISABLE_VERIFIER === "1") {
    process.stdout.write(JSON.stringify(out) + "\n");
    return;
  }

  const status = payload.status || "";
  if (status !== "completed") {
    process.stdout.write(JSON.stringify(out) + "\n");
    return;
  }

  const cid = payload.conversation_id || "";
  const touched = cid ? loadTouched(cid) : null;
  if (!touched || !touched.files || touched.files.length === 0) {
    process.stdout.write(JSON.stringify(out) + "\n");
    return;
  }

  const roots = (payload.workspace_roots || touched.workspace_roots || []).map(
    normalizeRoot
  );
  const projectDir = roots[0] ? roots[0].replace(/\//g, path.sep) : "";
  if (!projectDir || !fs.existsSync(projectDir)) {
    process.stdout.write(JSON.stringify(out) + "\n");
    return;
  }

  const cmd = detectVerifyCommand(projectDir);
  if (!cmd) {
    process.stdout.write(JSON.stringify(out) + "\n");
    return;
  }

  let stderr = "";
  try {
    execSync(cmd.shell, {
      cwd: cmd.cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: Number(process.env.CURSOR_VERIFIER_TIMEOUT_MS) || 300000,
      env: { ...process.env, CI: process.env.CI || "true" },
    });
    clearTouched(cid);
    process.stdout.write("{}\n");
  } catch (e) {
    stderr = (e.stderr || e.message || String(e)).slice(0, 4000);
    out.followup_message = [
      "[Verifier hook] Test/build command failed before completing the session.",
      `Command: ${cmd.shell} (cwd: ${cmd.cwd})`,
      "Fix the failure or run verification manually, then dismiss.",
      "---",
      stderr,
    ].join("\n");
    process.stdout.write(JSON.stringify(out) + "\n");
  }
}

main().catch(() => process.stdout.write("{}\n"));
