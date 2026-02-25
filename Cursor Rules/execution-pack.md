# Execution Pack for Executor

This document reflects the **User Rules: Execution Pack for Executor** and **Execution Pack + Model Assignment**. When a plan is produced, append this structure so a separate Executor model can implement it with minimal ambiguity and scope drift. The normal plan is **not** replaced, shortened, or rewritten.

## 0) Context Packet (required, compact)

Include only verifiable facts:

- **Repo/toolchain:** Languages, frameworks, package manager(s), build system(s).
- **Verified commands:** test/lint/typecheck/build/dev scripts only if confirmed (README, package.json, Makefile, CI).
- **Constraints:** Backwards compatibility, performance budgets, envs, deadlines, release rules.
- **Conventions:** Style, naming, architecture patterns, folder boundaries.
- **Tooling directive:** Executor must use the minimum set of relevant MCP/tools needed to confirm facts and verify results.

**Hard rules:**

- Never invent commands, files, scripts, APIs, or configs.
- If validation commands are unknown, discover them from README, CONTRIBUTING, package.json, Makefile, CI, or tool configs before running checks.
- If acceptance criteria or requirements are missing or unclear, STOP and escalate with a State Summary before making speculative changes.

## 0.1) Tooling & Delegation Policy (required)

- Use only tools that can change a decision or verify outcomes (avoid tool spam).
- Use all relevant MCP tools when they are applicable to the task.
- **Subagents (risk-based):** Delegate first (1–2 subagents max) only if a trigger applies: unclear repro, flaky tests, race conditions, memory leaks; large/multi-file refactor; auth/security/payments/data-loss risk; migrations/schema changes; CI/build/deploy/tooling issues; performance work. Otherwise proceed without delegation and state why.

**Default verification order (cheap → expensive):**

1. Repo search / ripgrep / code inspection  
2. Unit tests / lint / typecheck  
3. Integration tests  
4. E2e + UI validation (if UI behavior impacted)  
5. Security checks (e.g. Semgrep) when touching auth, input handling, file access, secrets, permissions

## 1) Task Normalization

- Split until each task has one clear outcome and typically touches ≤ 3 modules/areas.
- Merge tasks that share touchpoints and cannot be safely parallelized.
- Number tasks T1, T2, … Tn (no gaps).

## 2) Task Contracts (for every task)

For each Ti:

- **Goal:** One sentence.
- **Inputs:** Required context/artifacts (including outputs from prior tasks).
- **Touchpoints:** Explicit file paths or modules likely to change (or “discover”).
- **Steps:** 3–7 imperative actions.
- **Definition of Done:** Measurable truths.
- **Validation:** Exact verified commands; otherwise “discover and run project checks”.
- **Guardrails:** What NOT to change (no unrelated refactors, no formatting sweeps).
- **Diff discipline:** Smallest viable diff; separate refactor vs behavior changes.
- **Evidence (required):** Diff summary (files changed + intent), commands actually run + key output (or “not runnable” + why), confirmation that DoD is met.

## 3) Agent Routing (touchpoint-first)

- Create 2–5 Tracks grouped by shared touchpoints and hard dependency chains.
- Label each Track: **SAME AGENT** (default when shared files) or **INDEPENDENT AGENT**.
- **Routing rule:** If two tasks touch the same file/module/feature boundary, default SAME AGENT unless explicitly justified.
- Provide a complete mapping of all task numbers to Tracks.

## 4) Dependency & Parallelism Matrix

- **Hard dependencies:** List Ti → Tj edges (must be sequential).
- **Parallel-safe:** List Tracks or task ranges safe to run concurrently.
- **High-merge-conflict zones:** Shared files/modules; use SAME AGENT there.

## 5) Execution Order & Checkpoints (with rollback)

- Give recommended order of Tracks/tasks.
- **Checkpoints:** After major milestones: “after T# run &lt;verified check&gt;, expect &lt;result&gt;”.
- For risky tasks: rollback condition + what to revert or snapshot.

## 6) Escalation Triggers (Executor → Planner)

Executor must STOP and escalate when:

- No meaningful progress after 3 iterations on the same blocker.
- An architectural decision is required.
- Intermittent/flaky perf/build/CI/environment issues appear.
- Scope changes would violate Guardrails or Task Contracts.

**State Summary format (required):**

- Goal + task ID(s).
- Attempts (commands run, edits made).
- Key logs/errors (short snippets) + current hypothesis.
- Constraints/guardrails blocking progress.
- Proposed next step(s) needing a decision.

---

## Model Assignment (optional extension)

When assigning a specific model per task:

For each Ti add:

- **Recommended model:** &lt;exact model name&gt;.
- **Why this model:** 1–2 bullets.
- **Risk level:** Low / Medium / High.
- **Required tools/skills/subagents:** List.

**Selection rules:**

- Architecture / ambiguous requirements / big decisions → strongest reasoning model.
- Large implementation / refactor → best coding model (fast + accurate).
- Debugging / flaky tests / perf → best reasoning + debugging model.
- Security-sensitive → strongest reasoning model + Semgrep + security subagent.
- Docs / small glue → lightweight fast model.

Do not say “best model” or “strong model”; name a specific model for every task.
