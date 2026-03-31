#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function safe(fn) {
  try {
    return fn();
  } catch {
    return null;
  }
}

function git(cmd, cwd) {
  return safe(() =>
    execSync(cmd, {
      cwd,
      encoding: "utf8",
      timeout: 5000,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim()
  );
}

function detectStack(projectDir) {
  const markers = [];
  const has = (f) => fs.existsSync(path.join(projectDir, f));

  if (has("package.json")) {
    const pkg = safe(() =>
      JSON.parse(fs.readFileSync(path.join(projectDir, "package.json"), "utf8"))
    );
    if (pkg) {
      const allDeps = {
        ...(pkg.dependencies || {}),
        ...(pkg.devDependencies || {}),
      };
      if (allDeps.next) markers.push("Next.js");
      else if (allDeps.react) markers.push("React");
      if (allDeps.vue) markers.push("Vue");
      if (allDeps.svelte || allDeps["@sveltejs/kit"]) markers.push("Svelte");
      if (allDeps.express) markers.push("Express");
      if (allDeps.fastify) markers.push("Fastify");
      if (allDeps.prisma || allDeps["@prisma/client"]) markers.push("Prisma");
      if (allDeps.drizzle || allDeps["drizzle-orm"]) markers.push("Drizzle");
      if (allDeps.typescript) markers.push("TypeScript");
      if (allDeps.tailwindcss) markers.push("Tailwind CSS");
      if (allDeps.jest || allDeps.vitest) markers.push(allDeps.jest ? "Jest" : "Vitest");
      if (allDeps.playwright || allDeps["@playwright/test"]) markers.push("Playwright");

      const pm = has("pnpm-lock.yaml")
        ? "pnpm"
        : has("yarn.lock")
          ? "yarn"
          : has("bun.lockb")
            ? "bun"
            : "npm";
      markers.push(`pkg-manager: ${pm}`);
    }
  }

  if (has("Gemfile")) markers.push("Ruby/Rails");
  if (has("requirements.txt") || has("pyproject.toml")) markers.push("Python");
  if (has("go.mod")) markers.push("Go");
  if (has("Cargo.toml")) markers.push("Rust");
  if (has("composer.json")) markers.push("PHP");
  if (has("pubspec.yaml")) markers.push("Flutter/Dart");

  return markers;
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

  const projectDir =
    process.env.CURSOR_PROJECT_DIR ||
    (payload.workspace_roots && payload.workspace_roots[0]) ||
    ".";

  const ctx = [];

  const branch = git("git rev-parse --abbrev-ref HEAD", projectDir);
  if (branch) {
    ctx.push(`Branch: ${branch}`);

    const status = git("git status --porcelain", projectDir);
    if (status) {
      const lines = status.split("\n").length;
      ctx.push(`Uncommitted: ${lines} file(s)`);
    } else {
      ctx.push("Working tree: clean");
    }

    const recent = git(
      'git log --oneline -5 --format="%h %s"',
      projectDir
    );
    if (recent) {
      ctx.push(`Recent commits:\n${recent}`);
    }
  }

  const stack = detectStack(projectDir);
  if (stack.length > 0) {
    ctx.push(`Stack: ${stack.join(", ")}`);
  }

  const pkgPath = path.join(projectDir, "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = safe(() => JSON.parse(fs.readFileSync(pkgPath, "utf8")));
    if (pkg && pkg.scripts) {
      const scripts = Object.keys(pkg.scripts).join(", ");
      ctx.push(`Scripts: ${scripts}`);
    }
  }

  const envFiles = [".env", ".env.local", ".env.development"]
    .filter((f) => fs.existsSync(path.join(projectDir, f)));
  if (envFiles.length > 0) {
    ctx.push(`Env files present: ${envFiles.join(", ")}`);
  }

  const hasDocsDir = fs.existsSync(path.join(projectDir, "docs"));
  const hasReadme = fs.existsSync(path.join(projectDir, "README.md"));
  if (hasDocsDir) ctx.push("Has docs/ directory");
  if (hasReadme) ctx.push("Has README.md");

  const hasCursorRules = fs.existsSync(path.join(projectDir, ".cursor", "rules"));
  if (hasCursorRules) {
    const rules = safe(() =>
      fs.readdirSync(path.join(projectDir, ".cursor", "rules")).filter((f) => f.endsWith(".mdc"))
    );
    if (rules && rules.length > 0) {
      ctx.push(`Project rules: ${rules.length} (.mdc files)`);
    }
  }

  const sessionId = payload.session_id || payload.conversation_id || "";
  const composerMode = payload.composer_mode || "agent";
  const cursorVersion = payload.cursor_version || null;
  const isBackgroundAgent = payload.is_background_agent || false;

  const mcpRecovery = [
    "**Context recovery (run early if this is project work)**",
    "Hooks cannot call MCPs directly; you should pull memory yourself when relevant:",
    "- **cursor10x-mcp**: `getComprehensiveContext` (optional `query` from the user's topic). For a structured session kickoff with banner + context, `initConversation` when you have the user's first message.",
    "- **devcontext**: `initialize_conversation_context` with `initialQuery` set to the user's goal or task title; use `contextDepth` standard or comprehensive for multi-step work.",
    "Skip these if the user message is trivial (one-off question, no repo continuity) or MCPs are unavailable.",
  ].join("\n");

  const parts = [];
  if (ctx.length > 0) {
    parts.push("Session context:\n" + ctx.map((p) => `- ${p}`).join("\n"));
  }
  parts.push(mcpRecovery);
  if (sessionId) {
    parts.push(`Session id: ${sessionId} (composer_mode: ${composerMode})`);
  }

  const env = {};
  if (branch) env.GIT_BRANCH = branch;
  if (stack.length > 0) env.CURSOR_STACK = stack.join(",");
  env.CURSOR_SESSION_START = new Date().toISOString();
  if (cursorVersion) env.CURSOR_VERSION = cursorVersion;
  if (isBackgroundAgent) env.CURSOR_IS_BACKGROUND_AGENT = "1";

  const output = {
    additional_context: parts.join("\n\n"),
    env,
  };

  process.stdout.write(JSON.stringify(output) + "\n");
}

main().catch(() => {
  process.stdout.write("{}\n");
});
