# Tooling-First Planning & Subagents Policy

This document reflects the **User Rules: Tooling-First Planning (MCP + Skills + Subagents)** and **SUBAGENTS POLICY**. Use the minimum set of available MCP tools, Skills, and Subagents to reduce uncertainty and regression risk. Never guess when a tool can confirm. Never claim tool usage unless it was actually used.

## 0) Availability check (mandatory, first)

List what is available in the current workspace:

- **MCP servers/tools:** &lt;name&gt; — &lt;capability&gt;
- **Skills:** &lt;name&gt; — &lt;capability&gt;
- **Subagents:** &lt;name&gt; — &lt;capability&gt;

For anything relevant that is missing, write **NOT AVAILABLE**, then choose the next best alternative (manual steps or commands the user can run). If tools cannot be executed in the current mode, state that explicitly and provide exact commands for the user or CI.

## 1) Risk & domain triage (mandatory)

Classify the task:

**Risk**

- **Low:** Docs/text-only, tiny local change, no behavior change.
- **Medium:** Single-module behavior change, small refactor, small feature.
- **High:** Multi-file refactor; auth/security/payments/data-loss risk; migrations; CI/build/deploy; performance; concurrency; production bug.

**Domain**

frontend / backend / DB / DevOps / security / product / research / other: &lt;domain&gt;

## 2) Tooling rules (when applicable)

### 2.1 Planning

If a dedicated planning tool exists (e.g. Sequential Thinking), use it. Otherwise produce a clear numbered plan.

### 2.2 Cheapest verification first (anti-thrash)

Default ceiling: **≤2 tools + ≤1 subagent** unless High risk or unclear signals.

**Verification ladder:**

1. Search/grep/static inspection  
2. Lint/typecheck/unit tests  
3. Integration/e2e  
4. UI snapshots/profiling  
5. Security scanning/static analysis  

### 2.3 Conditional tool selection

Use a tool only if it:

- Confirms an unknown fact,
- Validates behavior,
- Reduces regression risk,
- Or retrieves authoritative docs or examples.

If skipping a seemingly relevant tool, state why: **not applicable / already verified / not available / too costly for current risk**.

## 3) Skills routing (mandatory when applicable)

If a relevant Skill exists, invoke it **early in planning** (before implementation). If unavailable, say **NOT AVAILABLE** and proceed with best-practice alternatives.

## 4) Subagent routing — SUBAGENTS POLICY (mandatory for high risk or triggers)

- Before each task, check the list of available subagents (e.g. in the environment or agent list).
- Delegate to **1–2 subagents first** only if any trigger applies:
  - Multi-file refactor or cross-cutting change
  - Production incident / unclear repro / flaky tests / race conditions / memory leaks
  - Auth/security/payments/data-loss risk
  - Migrations/schema changes
  - CI/build/deploy/tooling issues
  - Performance work (bundle size, CPU/memory profiling)
- If **not** delegating despite triggers, justify clearly.
- If **not** delegating and no trigger applies, state in one line: “no subagent: low/medium risk + clear path”.
- Prioritize delegating: complex debugging, large refactors, code review, test generation, documentation, DevOps.

## 5) Verification plan (always required)

Every plan must include:

- Exact commands/tools to run (or steps if tools unavailable).
- Expected success signals.
- Fallback steps if checks fail.
- Stop condition (when to re-plan or prevent scope creep).

## 6) Integrity rules (always)

- **Never claim** MCP/Skill/Subagent use unless actually performed.
- If proposing tool use but unable to run it in the current context, say so and provide exact commands for the user or CI.

## Reference

For the full list of MCPs, Skills, and Subagent types, see **ai-tools.md** and **DATOS/Tools.md**.
