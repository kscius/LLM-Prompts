#!/usr/bin/env node
/**
 * Cross-platform runner for Cursor CLI `agent -p`.
 * Usage: node agent-dispatch.js --prompt "..." [--files glob] [--model M] [--mode ask|plan]
 *   [--force] [--trust] [--stream] [--resume <chatId>] [--continue]
 *   [--sandbox enabled|disabled] [--approve-mcps] [--cloud] [--workspace <dir>]
 *   [--max-retries N] [--config tasks.json] [--cwd <dir>]
 * Env: CURSOR_AGENT_DISPATCH_TIMEOUT_MS (default 300000), SKIP_AGENT=1 exits 0 without running (for hooks).
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const LOG_DIR = path.join(__dirname, "logs", "agent-runs");

function sleepSync(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    /* spin */
  }
}

function parseArgs(argv) {
  const out = {
    prompt: "",
    files: [],
    model: "",
    mode: "",
    maxRetries: 2,
    force: false,
    trust: false,
    stream: false,
    resume: "",
    continue: false,
    config: "",
    cwd: process.cwd(),
    workspace: "",
    sandbox: "",
    approveMcps: false,
    cloud: false,
    help: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") {
      out.help = true;
      continue;
    }
    if (a === "--prompt" && argv[i + 1]) {
      out.prompt = argv[++i];
      continue;
    }
    if (a === "--files" && argv[i + 1]) {
      out.files.push(argv[++i]);
      continue;
    }
    if (a === "--model" && argv[i + 1]) {
      out.model = argv[++i];
      continue;
    }
    if (a === "--mode" && argv[i + 1]) {
      out.mode = argv[++i];
      continue;
    }
    if (a === "--max-retries" && argv[i + 1]) {
      out.maxRetries = Math.max(0, parseInt(argv[++i], 10) || 0);
      continue;
    }
    if (a === "--cwd" && argv[i + 1]) {
      out.cwd = path.resolve(argv[++i]);
      continue;
    }
    if (a === "--config" && argv[i + 1]) {
      out.config = argv[++i];
      continue;
    }
    if (a === "--force") {
      out.force = true;
      continue;
    }
    if (a === "--trust") {
      out.trust = true;
      continue;
    }
    if (a === "--stream") {
      out.stream = true;
      continue;
    }
    if (a === "--resume" && argv[i + 1]) {
      out.resume = argv[++i];
      continue;
    }
    if (a === "--continue") {
      out.continue = true;
      continue;
    }
    if ((a === "--workspace" || a === "-w") && argv[i + 1]) {
      out.workspace = path.resolve(argv[++i]);
      continue;
    }
    if (a === "--sandbox" && argv[i + 1]) {
      out.sandbox = argv[++i]; // "enabled" | "disabled"
      continue;
    }
    if (a === "--approve-mcps") {
      out.approveMcps = true;
      continue;
    }
    if (a === "--cloud" || a === "-c") {
      out.cloud = true;
      continue;
    }
  }
  return out;
}

function printHelp() {
  console.log(`Usage: node agent-dispatch.js [options]

Options:
  --prompt <text|@file>   Prompt text, or @path to read prompt from file
  --files <glob>          Glob pattern (repeatable); merged into prompt list
  --model <id>            Model to use (omit for agent default)
  --mode <ask|plan>       Optional; omit for full agent mode
  --force                 Pass --force to agent (auto-approve all)
  --trust                 Pass --trust to agent (skip workspace trust prompt)
  --stream                Stream JSON output (--output-format stream-json)
  --resume <chatId>       Resume a specific chat session (stateful multi-step)
  --continue              Continue the most recent session (alias: --resume=-1)
  --max-retries <n>       Retries after non-zero exit (default 2)
  --cwd <dir>             Working directory for glob + agent (default cwd)
  --workspace <dir>       Workspace directory passed to agent (--workspace flag)
  --sandbox <enabled|disabled>  Sandbox mode; "enabled" cuts interruptions ~40%
  --approve-mcps          Auto-approve all MCP servers (--approve-mcps)
  --cloud                 Start in cloud handoff mode (-c / --cloud)
  --config <json>         Run each task from JSON array (batch)
  --help                  This message

Env:
  CURSOR_AGENT_DISPATCH_TIMEOUT_MS  Timeout per attempt (default 300000)
  SKIP_AGENT=1                      Exit 0 immediately without running agent
`);
}

function resolvePrompt(raw, cwd) {
  if (!raw || typeof raw !== "string") return "";
  const t = raw.trim();
  if (t.startsWith("@")) {
    const p = path.resolve(cwd, t.slice(1));
    if (!fs.existsSync(p)) {
      throw new Error(`Prompt file not found: ${p}`);
    }
    return fs.readFileSync(p, "utf8");
  }
  return raw;
}

/* Try Node fs.globSync (Node 22+), else minimal glob walk fallback */
function expandGlobs(patterns, cwd) {
  const root = path.resolve(cwd);
  const seen = new Set();
  const add = (p) => {
    const n = path.normalize(p);
    if (!seen.has(n)) seen.add(n);
  };

  let globSyncFn;
  try {
    const nfs = require("node:fs");
    if (typeof nfs.globSync === "function") globSyncFn = nfs.globSync;
  } catch (_) {}

  for (const pattern of patterns) {
    if (!pattern || !String(pattern).trim()) continue;
    const pat = String(pattern).trim();
    if (globSyncFn) {
      try {
        const hits = globSyncFn(pat, { cwd: root, withFileTypes: false });
        for (const h of hits) add(path.resolve(root, h));
        continue;
      } catch (_) {
        /* fall through */
      }
    }
    expandGlobFallback(pat, root, add);
  }
  return [...seen].sort();
}

function expandGlobFallback(pattern, root, add) {
  if (!pattern.includes("*") && !pattern.includes("?")) {
    const abs = path.resolve(root, pattern);
    if (fs.existsSync(abs)) add(abs);
    return;
  }
  const absPat = path.resolve(root, pattern);
  const parts = absPat.split(path.sep);
  let starIdx = -1;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].includes("*") || parts[i].includes("?")) {
      starIdx = i;
      break;
    }
  }
  if (starIdx <= 0) {
    walkFiles(root, (f) => {
      if (minimatchSimple(f, absPat)) add(f);
    });
    return;
  }
  const base = path.join(...parts.slice(0, starIdx));
  const suffix = parts.slice(starIdx).join(path.sep);
  if (!fs.existsSync(base)) return;
  walkFiles(base, (f) => {
    const rel = path.relative(root, f);
    if (!rel.startsWith("..") && minimatchSimple(f, absPat)) add(f);
  });
}

function walkFiles(dir, onFile) {
  let stat;
  try {
    stat = fs.statSync(dir);
  } catch {
    return;
  }
  if (stat.isFile()) {
    onFile(dir);
    return;
  }
  if (!stat.isDirectory()) return;
  let names;
  try {
    names = fs.readdirSync(dir);
  } catch {
    return;
  }
  for (const n of names) {
    if (n === ".git" || n === "node_modules") continue;
    walkFiles(path.join(dir, n), onFile);
  }
}

function minimatchSimple(filePath, patternPath) {
  const normF = filePath.replace(/\\/g, "/");
  const normP = patternPath.replace(/\\/g, "/");
  const esc = (s) => s.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  let re = "^";
  for (let i = 0; i < normP.length; i++) {
    const c = normP[i];
    if (c === "*") {
      if (normP[i + 1] === "*") {
        re += ".*";
        i++;
        if (normP[i + 1] === "/") i++;
      } else {
        re += "[^/]*";
      }
    } else if (c === "?") {
      re += "[^/]";
    } else {
      re += esc(c);
    }
  }
  re += "$";
  try {
    return new RegExp(re, "i").test(normF);
  } catch {
    return normF === normP;
  }
}

function findAgentBinary() {
  try {
    const isWin = process.platform === "win32";
    const r = spawnSync(isWin ? "cmd.exe" : "sh", isWin ? ["/c", "where", "agent"] : ["-c", "command -v agent"], {
      encoding: "utf8",
      windowsHide: true,
    });
    if (r.status === 0 && r.stdout) {
      const line = r.stdout.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)[0];
      if (line) return line;
    }
  } catch (_) {}
  return "agent";
}

function runOnce(agentBin, promptText, opts) {
  const timeout = Number(process.env.CURSOR_AGENT_DISPATCH_TIMEOUT_MS) || 300000;
  const args = ["-p"];
  if (opts.stream) {
    args.push("--output-format", "stream-json", "--stream-partial-output");
  } else {
    args.push("--output-format", "text");
  }
  if (opts.force) args.push("--force");
  if (opts.trust) args.push("--trust");
  if (opts.model) args.push("--model", opts.model);
  if (opts.mode) args.push("--mode", opts.mode);
  if (opts.workspace) args.push("--workspace", opts.workspace);
  if (opts.sandbox) args.push("--sandbox", opts.sandbox);
  if (opts.approveMcps) args.push("--approve-mcps");
  if (opts.cloud) args.push("--cloud");
  if (opts.continue) args.push("--continue");
  else if (opts.resume) args.push("--resume", opts.resume);
  args.push(promptText);

  const started = Date.now();
  const r = spawnSync(agentBin, args, {
    cwd: opts.cwd,
    encoding: "utf8",
    maxBuffer: 50 * 1024 * 1024,
    env: { ...process.env },
    timeout,
    windowsHide: true,
  });
  const durationMs = Date.now() - started;
  const status = r.status === null ? 124 : r.status;
  return {
    status,
    stdout: r.stdout || "",
    stderr: r.stderr || "",
    durationMs,
    error: r.error,
  };
}

function writeRunLog(meta) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const jsonPath = path.join(LOG_DIR, `${ts}.json`);
  const txtPath = path.join(LOG_DIR, `${ts}.txt`);
  fs.writeFileSync(jsonPath, JSON.stringify(meta, null, 2), "utf8");
  const blob = [meta.stdout || "", meta.stderr || ""].filter(Boolean).join("\n--- stderr ---\n");
  fs.writeFileSync(txtPath, blob, "utf8");
  return { jsonPath, txtPath };
}

function buildPrompt(basePrompt, filePaths, cwd) {
  let p = basePrompt;
  if (filePaths.length > 0) {
    const rel = filePaths.map((f) => path.relative(cwd, f)).join("\n");
    p += `\n\nFiles (only these unless task says otherwise):\n${rel}\n`;
  }
  return p;
}

function runDispatch(opts) {
  if (process.env.SKIP_AGENT === "1") {
    console.log("[agent-dispatch] SKIP_AGENT=1, skipping.");
    return 0;
  }

  const agentBin = findAgentBinary();
  const cwd = path.resolve(opts.cwd);

  let promptText;
  try {
    promptText = resolvePrompt(opts.prompt, cwd);
  } catch (e) {
    console.error(String(e.message || e));
    return 2;
  }
  const globs = opts.files || [];
  const filePaths = expandGlobs(globs, cwd);
  promptText = buildPrompt(promptText, filePaths, cwd);

  if (!promptText.trim()) {
    console.error("[agent-dispatch] Empty prompt after resolution.");
    return 2;
  }

  let last = null;
  let attempt = 0;
  const maxAttempts = 1 + (opts.maxRetries || 0);

  while (attempt < maxAttempts) {
    last = runOnce(agentBin, promptText, {
      force: opts.force,
      trust: opts.trust,
      model: opts.model,
      mode: opts.mode,
      stream: opts.stream,
      resume: opts.resume,
      continue: opts.continue,
      workspace: opts.workspace,
      sandbox: opts.sandbox,
      approveMcps: opts.approveMcps,
      cloud: opts.cloud,
      cwd,
    });
    if (last.stdout) process.stdout.write(last.stdout);
    if (last.stderr) process.stderr.write(last.stderr);
    if (last.status === 0) break;
    attempt++;
    if (attempt < maxAttempts) {
      const backoff = 1000 * Math.pow(2, attempt - 1);
      console.error(`[agent-dispatch] exit ${last.status}, retry in ${backoff}ms (${attempt}/${maxAttempts - 1})`);
      sleepSync(backoff);
    }
  }

  const meta = {
    timestamp: new Date().toISOString(),
    model: opts.model || null,
    mode: opts.mode || null,
    force: opts.force,
    trust: opts.trust,
    stream: opts.stream,
    resume: opts.resume || null,
    continue: opts.continue,
    workspace: opts.workspace || null,
    sandbox: opts.sandbox || null,
    approveMcps: opts.approveMcps,
    cloud: opts.cloud,
    exitCode: last.status,
    durationMs: last.durationMs,
    prompt: promptText.slice(0, 8000),
    files: filePaths,
    agentBin,
    cwd,
    attempts: attempt + 1,
    error: last.error ? String(last.error) : null,
  };
  const { jsonPath, txtPath } = writeRunLog(meta);
  console.error(`[agent-dispatch] Log: ${jsonPath}, ${txtPath}`);

  return last.status === null ? 124 : last.status;
}

function loadConfigTasks(configPath) {
  const abs = path.resolve(configPath);
  if (!fs.existsSync(abs)) throw new Error(`Config not found: ${abs}`);
  const data = JSON.parse(fs.readFileSync(abs, "utf8"));
  if (!Array.isArray(data)) throw new Error("Config must be a JSON array of tasks");
  return data;
}

function main() {
  const opts = parseArgs(process.argv);
  if (opts.help) {
    printHelp();
    return 0;
  }

  if (process.env.SKIP_AGENT === "1") {
    console.log("[agent-dispatch] SKIP_AGENT=1, skipping.");
    return 0;
  }

  if (opts.config) {
    let tasks;
    try {
      tasks = loadConfigTasks(opts.config);
    } catch (e) {
      console.error(String(e.message || e));
      return 2;
    }
    let code = 0;
    for (let i = 0; i < tasks.length; i++) {
      const t = tasks[i] || {};
      const one = {
        prompt: t.prompt || "",
        files: Array.isArray(t.files) ? t.files : t.files ? [t.files] : [],
        model: t.model != null ? t.model : opts.model,
        mode: t.mode != null ? String(t.mode) : opts.mode,
        maxRetries: t.maxRetries != null ? t.maxRetries : opts.maxRetries,
        force: Boolean(t.force) || opts.force,
        trust: Boolean(t.trust) || opts.trust,
        stream: Boolean(t.stream) || opts.stream,
        resume: t.resume || opts.resume || "",
        continue: Boolean(t.continue) || opts.continue,
        cwd: t.cwd || opts.cwd,
        workspace: t.workspace || opts.workspace || "",
        sandbox: t.sandbox != null ? String(t.sandbox) : opts.sandbox,
        approveMcps: Boolean(t.approveMcps) || opts.approveMcps,
        cloud: Boolean(t.cloud) || opts.cloud,
        config: "",
        help: false,
      };
      if (!one.prompt.trim()) {
        console.error(`[agent-dispatch] Task ${i}: missing prompt`);
        code = 2;
        continue;
      }
      const c = runDispatch(one);
      if (c !== 0) code = c;
    }
    return code;
  }

  if (!opts.prompt.trim()) {
    console.error("[agent-dispatch] --prompt is required (unless --config).");
    printHelp();
    return 2;
  }

  try {
    return runDispatch(opts);
  } catch (e) {
    console.error(String(e.message || e));
    return 2;
  }
}

process.exitCode = main();
