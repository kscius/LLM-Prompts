#!/usr/bin/env node
/**
 * afterAgentResponse: lightweight post-response checks (heuristics only).
 * Logs to response-quality.jsonl; emits followup_message when flags fire so the
 * conversation can self-correct (Cursor may surface followup_message to the user).
 *
 * Threshold review (2026-03-29, ASD gap report): Broadening CLAIM_RE / EVIDENCE_RE
 * (e.g. flagging every "verified" without output) was **not** applied — high false-positive
 * risk when assistants cite repo inspection. Absent `response-quality.jsonl` means no
 * flags fired, not a broken hook. Revisit only with sampled false-negative evidence.
 */
const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(
  process.env.USERPROFILE || process.env.HOME || ".",
  ".cursor",
  "hooks",
  "logs"
);
const QUALITY_LOG = path.join(LOG_DIR, "response-quality.jsonl");
const MAX_LOG_BYTES = 5 * 1024 * 1024;

function rotateIfNeeded() {
  try {
    const stat = fs.statSync(QUALITY_LOG);
    if (stat.size > MAX_LOG_BYTES) {
      const backup = QUALITY_LOG + ".old";
      if (fs.existsSync(backup)) fs.unlinkSync(backup);
      fs.renameSync(QUALITY_LOG, backup);
    }
  } catch {}
}

/** Phrases that often mean "we validated" without evidence in the same message. */
const CLAIM_RE = /\b(?:all\s+)?tests?\s+(?:pass(?:ed)?|are\s+green)|lint\s+(?:pass(?:ed)?|is\s+clean)|typecheck\s+pass(?:es|ed)?|CI\s+is\s+green|build\s+succeed(?:s|ed)|verified\s+(?:locally|by\s+running)\b/i;

/** Rough signals that some command output was included (avoid matching plain English "pass"). */
const EVIDENCE_RE =
  /\d+\s+(?:passing|passed|failed|tests?)|Tests?:\s*\d+|exit\s+code\s*[:=]?\s*0|npm\s+(?:run\s+)?test\b|pnpm\s+test\b|yarn\s+test\b|\bvitest\b|\bjest\b|\bpytest\b|\brubocop\b|\beslint\b|\btsc\b|##\[error\]|##\[warning\]|^[\s>]*[✓✔]\s+\d/mi;

const PLACEHOLDER_RE = /\b(?:lorem\s+ipsum|todo:\s*fixme|fixme:|xxx\b)\b/i;

const SECRET_IN_TEXT_RE = /['"]sk-[a-zA-Z0-9]{20,}['"]|ghp_[a-zA-Z0-9]{36,}/;

function analyze(text) {
  const flags = [];
  if (!text || typeof text !== "string") {
    return flags;
  }

  if (SECRET_IN_TEXT_RE.test(text)) {
    flags.push("possible_secret_in_assistant_text");
  }

  if (PLACEHOLDER_RE.test(text)) {
    flags.push("placeholder_or_todo_language");
  }

  if (CLAIM_RE.test(text) && !EVIDENCE_RE.test(text)) {
    flags.push("strong_claim_without_obvious_command_output");
  }

  return flags;
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
  const flags = analyze(text);

  if (flags.length > 0) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
    rotateIfNeeded();
    const entry = {
      timestamp: new Date().toISOString(),
      hook_event_name: payload.hook_event_name || "afterAgentResponse",
      conversation_id: payload.conversation_id || null,
      flags,
      text_preview: text.slice(0, 400),
    };
    fs.appendFileSync(QUALITY_LOG, JSON.stringify(entry) + "\n");
  }

  const followup = buildFollowupMessage(flags);
  if (followup) {
    process.stdout.write(
      JSON.stringify({ followup_message: followup }) + "\n"
    );
  } else {
    process.stdout.write("{}\n");
  }
}

/** @param {string[]} flags */
function buildFollowupMessage(flags) {
  if (!flags.length) return "";
  const parts = [];
  if (flags.includes("strong_claim_without_obvious_command_output")) {
    parts.push(
      "Quality check: response claims tests/lint/typecheck/build success without obvious command output in the same message. Re-run validations and paste actual output, or soften the claim."
    );
  }
  if (flags.includes("placeholder_or_todo_language")) {
    parts.push(
      "Quality check: placeholder or TODO-style wording detected—replace with real content or mark explicitly as temporary."
    );
  }
  if (flags.includes("possible_secret_in_assistant_text")) {
    parts.push(
      "Security check: assistant text may resemble a token or secret—verify nothing sensitive was echoed; rotate credentials if exposed."
    );
  }
  return parts.join(" ");
}

main().catch(() => {
  process.stdout.write("{}\n");
});
