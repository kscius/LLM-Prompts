#Fast repo reconnaissance with routing recommendation

Perform repo reconnaissance before planning or implementation.

TASK:
{{args}}

MISSION
Discover the real implementation surface quickly and accurately so later phases can route correctly.
Do not edit files. Do not redesign the solution. Do not over-speculate.

**Autonomous execution:** You **run** the reconnaissance stack yourself—**MCP tools** (devcontext init, cursor10x context, etc.) must be **invoked**, not described as homework for the user. When depth warrants, use the **Task** tool with `explore` or another listed subagent instead of only narrating what a subagent would do. If your conclusion is **`recommended_cli: yes`** (see GOALS / SCOUT REPORT FORMAT), **run Shell** with `node …/hooks/agent-dispatch.js` in this same response flow (typically `--mode ask` and `--cwd` = workspace root), then fold the output into the scout report—do not only tell the user to run the CLI later. Exception: repo/workspace not writable or **USER ESCALATION**-class blockers.

---

## PHASE 0 — PRE-SCOUT (run before repo inspection)

### 0.1 DevContext initialization (mandatory)

At the **start** of this command, call **devcontext** `initialize_conversation_context`:

- `initialQuery`: use the TASK text (and arg summary) as the query string.
- `focusHint` (optional): if the user named a file, module, or package, set `{ "type": "file" | "module" | "path", "identifier": "<that path or name>" }`.
- Prefer `contextDepth`: `"standard"`; use `"comprehensive"` only for COMPLEX-looking tasks.
- Use defaults for `includeArchitecture`, `includeRecentConversations`, and `tokenBudget` unless the task is trivial (then `contextDepth: "minimal"` is acceptable).

Incorporate any returned context (recent code, architecture snippets, conversation hints) into later reasoning and the final output under **Memory findings**.

### 0.2 Brainstorming gate (conditional)

**Before** deep repo inspection, decide if the task is ambiguous, creative, or feature-shaped.

**Invoke the brainstorming skill** (read and follow `~/.cursor/skills/brainstorming/SKILL.md`) when **any** of these hold:

- Vague goals: “improve”, “make better”, “clean up”, “modernize”, without concrete acceptance criteria.
- Greenfield or product-shaped: “add X”, “build Y”, “new feature”, “implement Z” without a spec.
- Open design space: multiple plausible UX/API/architecture choices and no chosen direction.
- User explicitly asks for options, ideation, or “what should we do”.

**Skip** the brainstorming gate when **all** of these hold:

- Narrow scope: exact files, symbols, or error messages given.
- Pure reconnaissance: “where is X implemented”, “how does Y work”.
- Single obvious change: typo, one-line fix, config key rename with clear target.

If brainstorming ran, summarize **Design brief** (goals, constraints, options chosen or still open) in the scout output so `/orquestador` or Plan mode can consume it.

### 0.3 Memory lookup (cursor10x)

After devcontext init (and after brainstorming if it ran):

- Query `user-cursor10x-mcp` for previous findings about this repo (`getComprehensiveContext` with a query derived from TASK).
- Merge with devcontext results under **Memory findings**.

---

## PHASE 1 — RECONNAISSANCE

At the start of Phase 1, read and apply the **`repo-discovery`** skill (`~/.cursor/skills/repo-discovery/SKILL.md`) so discovery steps stay consistent with `/orquestador` and standalone recon use.

OPERATING RULES
1. Inspect the repo before making any recommendation.
2. Use the minimum effective set of Rules, Skills, Subagents, and MCPs.
3. Use only the MCPs that materially improve reconnaissance.
4. Verify commands from package files, scripts, config, docs, CI, and repo conventions when possible.
5. Reuse repo evidence, not assumptions.
6. Keep the result concise, operational, and evidence-based.
7. Do not edit files unless explicitly asked.
8. Prefer routing based on the affected change surface, not only the detected stack.

PREFERRED SKILLS FOR RECONNAISSANCE
- `backend-patterns`, `nodejs-backend-patterns`, `react-dev`, `react-full-build`
- `database-schema-designer` when schema or migrations are involved
- `security-review` only to flag sensitive surfaces
- `vercel-react-best-practices` for Next.js repos
- `create-rule` when `.cursor/rules` materially affect routing
- `humanizer` only if the requested task is mainly about user-visible copy, docs tone, or UX wording
- `reducing-entropy` only if the task is explicitly about simplification, deduplication, or reducing implementation surface

PREFERRED SUBAGENTS
- Default: `explore`
- Secondary: `generalPurpose`
- Conditional: `nextjs-developer`, `api-designer`, `architect-reviewer`, `database-administrator`, `database-optimizer`, `security-auditor`, `documentation-engineer`

PREFERRED MCPS
- Base: `user-cursor10x-mcp`, `user-devcontext`, `user-Sequentialthinking`, `user-context7`, `user-github`
- Conditional: `user-semgrep`, `user-duckduckgo`, `user-memory`

GOALS
1. Detect stack, package manager, framework, app boundaries, and entry points.
2. Detect likely commands for:
   - install/bootstrap
   - lint
   - typecheck
   - test
   - build
   - dev/run
3. Find files and folders most relevant to the current task.
4. Check:
   - .cursor/rules
   - docs/
   - PLANNING.md
   - DB schema / migrations
   - env/config files
   - existing tests
5. Recommend:
   - best skill to activate
   - best subagent to delegate to
   - likely validation path
   - main risks
6. Detect whether later phases should require:
   - `security-review`
   - `database-schema-designer`
   - `write-unit-tests`
   - `humanizer`
   - `reducing-entropy`
7. **Cursor CLI routing:** If the TASK or file set matches **mechanical batch**, **explicit headless / `agent -p`**, or **very large same-pattern scope** with low contract risk, note that **post-scout** the executor may run **`/agent-dispatch`** or `node <user-profile>/.cursor/hooks/agent-dispatch.js` with **`--cwd`** = workspace root, suggested **`--model`**, and **`--mode ask`** or **`plan`** (unless the user explicitly asked for mutating batch / `--force`). If it does **not** apply, state why. Criteria and guardrails: **`commands/orquestador.md`** → section **Cursor CLI (condicional)**; invocation details: **`commands/agent-dispatch.md`**.

CLASSIFICATION SUPPORT
Based on repo evidence, provide a routing recommendation:
- SIMPLE
- STANDARD
- COMPLEX

Use this logic:
- SIMPLE:
  isolated change, low blast radius, strong existing pattern, little or no contract impact
- STANDARD:
  multiple files or layers, moderate contract/validation impact, but established patterns exist
- COMPLEX:
  ambiguous scope, architectural impact, cross-cutting contracts, risky refactor, or unclear ownership

WHAT TO LOOK FOR
- Monorepo vs single app structure
- UI/backend/shared package boundaries
- Existing patterns similar to the requested task
- Validation boundaries: form/schema/API/database/domain
- Test strategy: unit/integration/e2e
- Build and CI expectations
- Security-sensitive surfaces
- Migration-sensitive surfaces
- Duplication, over-complexity, or opportunities to reduce entropy safely
- User-visible text surfaces where tone/clarity matters

WORKFLOW TYPE DETECTION
In addition to classification, detect the workflow type:

Based on task language and repo evidence:
- "add", "create", "implement", "new" → feature
- "fix", "bug", "broken", "error" → bugfix
- "refactor", "clean", "simplify" → refactor
- "security", "vulnerability", "audit" → security
- "migrate", "migration", "schema" → migration
- "docs", "documentation", "readme" → docs
- "slow", "performance", "optimize" → performance

Include workflow type in the output.

DEPENDENCY MAPPING
For each file identified as relevant, also identify:
- What imports it (who depends on this file)
- What it imports (what this file depends on)
- Shared types/interfaces used across boundaries

This helps BUILD phase understand blast radius accurately.

---

## MANDATORY SCOUT ARTIFACT (disk)

After Phase 1 reconnaissance is complete (and after Phase 0.1–0.3 and brainstorming if they ran), you **must** persist a canonical scout artifact for handoff and resume—**in addition to** the chat report.

**Path:** `<workspace-root>/.cursor/plans/scout-YYYY-MM-DD-<slug>.md`

- Use **today’s date** (UTC or local, be consistent) in `YYYY-MM-DD`.
- **Slug:** kebab-case from the TASK (short, ≤~48 chars), no path characters.
- Create `.cursor/plans/` if it does not exist (when the workspace is a writable project repo).

**YAML front-matter (required at top of file):**

```yaml
---
date: YYYY-MM-DD
task: <same slug as filename without date prefix>
classification: SIMPLE|STANDARD|COMPLEX
confidence: HIGH|MEDIUM|LOW
workflow_type: feature|bugfix|refactor|security|migration|docs|performance|infrastructure|research|custom
next_command: /orquestador|/plan|/intake|/build-full
---
```

**Body:** Use the same sections as **SCOUT REPORT FORMAT** below (stack, workflow type, files, validation commands, memory findings, routing, classification, confidence, SequentialThinking, flags, risks, parallelization, **Cursor CLI routing**). Include a short block: **`recommended_cli: yes | no`** plus **one line of justification**; if `yes`, you **ran** Shell with that shape (`--cwd`, `--mode`, optional `--files`) and summarize stdout/log outcome here. Optionally include the structured plan sections if `--plan` / plan mode was requested (see OUTPUT MODE).

**Exceptions (no file write):**

- Workspace is **not** a project repo (e.g. only user dotfiles) **or** plans directory is not writable: state in chat **“Scout artifact: not written — reason: …”** and paste the full front-matter + body in chat so `/orquestador` can still proceed from context.

**Integration:** `/orquestador` and **phase-handoff** skill expect this file for gate **SCOUT → PLAN**. Keep `next_command` aligned with classification (e.g. SIMPLE → `/orquestador` or `/build-full`; COMPLEX → `/orquestador`).

---

## PHASE 2 — SequentialThinking protocol (mandatory when triggered)

Use the **Sequential Thinking** MCP (`sequentialthinking`) when **any** trigger applies:

1. **Classification ambiguity**: you hesitate between two adjacent tiers (SIMPLE vs STANDARD, or STANDARD vs COMPLEX).
2. **Multiple valid approaches**: two or more credible implementation paths after inspection (e.g. service vs hook, new module vs extend existing).
3. **Confidence MEDIUM or LOW** on classification or workflow type.
4. **Conflicting signals**: docs vs code, or multiple stacks claim ownership of the same concern.
5. **Post-brainstorming**: design brief still leaves open architectural forks worth reasoning step-by-step.

**How to use it**: run enough thoughts to reach a clear recommendation; state the chosen classification, primary approach, and what evidence ruled out alternatives. Summarize **SequentialThinking conclusion** briefly in the scout output (do not dump full chain unless asked).

If **no** trigger applies, state **SequentialThinking: skipped** with one line explaining why.

---

## OUTPUT MODE — default vs Cursor Plan

**Default**: emit the **Scout report** using the format below in chat **and** the **MANDATORY SCOUT ARTIFACT** file (unless an exception applies).

**Cursor Plan output mode** — use when the user asks for a plan, e.g. task or args include any of: `plan`, `--plan`, `as plan`, `cursor plan`, `plan output`, `export plan`.

When Plan mode is requested:

1. Still complete Phases 0–2 and the same reconnaissance.
2. **Still write** `scout-YYYY-MM-DD-<slug>.md` with front-matter; embed or append the structured plan sections in that file (and in chat).
3. Produce a **structured plan document** (Markdown) with at minimum:
   - **Title** — short, action-oriented
   - **Objective** — what success looks like
   - **Context** — stack, workflow type, classification, confidence
   - **Design brief** — only if brainstorming ran; else “N/A”
   - **SequentialThinking** — conclusion or skip reason
   - **Relevant files** — with dependency notes
   - **Proposed approach** — phases or ordered steps
   - **Validation plan** — commands verified from repo
   - **Risks and constraints**
   - **Handoff** — recommended next command (`/orquestador`, Plan Mode in editor, or BUILD) and skill/subagent routing

4. **Deliver the plan** by:
   - Pasting the full Markdown in the chat **and**
   - The mandatory `scout-YYYY-MM-DD-<slug>.md` already satisfies persistence; optionally **also** write `<workspace>/.cursor/plans/scout-<short-slug>.plan.md` if the user explicitly asked for a separate `.plan.md` file.

5. If the product UI supports opening **Plan mode** with this content, you may tell the user to paste the plan there or continue in Plan mode for refinement.

---

## SCOUT REPORT FORMAT (default output)

- Stack summary
- Workflow type detected: [feature/bugfix/refactor/security/migration/docs/performance]
- Relevant files (with dependency direction: imports/imported-by)
- Validation commands (verified from repo)
- Memory findings: devcontext + cursor10x (+ brainstorming summary if any)
- Recommended skill/subagent routing
- Recommended classification: SIMPLE / STANDARD / COMPLEX
- Confidence: HIGH / MEDIUM / LOW
- SequentialThinking: conclusion summary, or skipped + reason
- Conditional review flags:
  - security-review → yes/no + why
  - database-schema-designer → yes/no + why
  - write-unit-tests → yes/no + why
  - humanizer → yes/no + why
  - reducing-entropy → yes/no + why
- Risks/constraints
- Suggested parallelization: [what can run in parallel]
- **Cursor CLI routing:** `recommended_cli: yes | no` — one-line justification; if **yes**, **run** `node …/hooks/agent-dispatch.js` via **Shell** in this flow (same as **Autonomous execution** above), then document invocation + outcome in the report; `--cwd` = repo root, `--mode ask` or `plan` by default (`--force` only if user requested mutating batch); optional `--files` glob; see `commands/orquestador.md` (Cursor CLI condicional) and `commands/agent-dispatch.md`
