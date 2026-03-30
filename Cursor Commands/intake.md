#Dedicated intake: context recovery, intent clarification, requirements brief

Run **before** `/scout` or `/orquestador` when you want a structured handoff without repo reconnaissance yet—or when the ask is vague and needs alignment first.

TASK:
{{args}}

MISSION
Recover prior session and project memory, clarify ambiguous or creative intent, extract structured requirements, and emit a single **Intake brief** the next command can execute against.

OPERATING RULES
1. **Read-only.** Do not edit project files unless the user explicitly asked for edits in TASK.
2. Run steps **in order** below; skip only where the rule says **Skip**.
3. Use the **minimum** MCP and skill set that materially improves the brief.
4. Do not invent repo facts—state unknowns in the brief.
5. Preserve `conversationId` from devcontext for any follow-up that uses `update_conversation_context` or `finalize_conversation_context`.

---

## STEP 1 — Context recovery (mandatory)

### 1.1 DevContext

Call **devcontext** `initialize_conversation_context`:

- `initialQuery`: the TASK text (and arg summary).
- `focusHint` (optional): if the user named a file, module, or path, set `{ "type": "file" | "module" | "path", "identifier": "<that path or name>" }`.
- `contextDepth`: `"standard"` by default; `"comprehensive"` for large or cross-cutting asks; `"minimal"` for trivial, single-file clarifications.

Record **conversationId** from the response for the brief.

### 1.2 Cursor10x memory

Call **user-cursor10x-mcp** `getComprehensiveContext` with a query derived from TASK (and repo path/theme if obvious from workspace).

Optionally pull `getRecentEpisodes` / `getRecentMessages` if the comprehensive result is thin.

Merge highlights into **Memory findings** in the output.

---

## STEP 2 — Brainstorming gate (conditional)

**Invoke the brainstorming skill** (read and follow `~/.cursor/skills/brainstorming/SKILL.md`) when **any** of these hold:

- Vague goals: “improve”, “make better”, “clean up”, “modernize”, without concrete acceptance criteria.
- Greenfield or product-shaped: “add X”, “build Y”, “new feature”, “implement Z” without a spec.
- Open design space: multiple plausible UX/API/architecture choices and no chosen direction.
- User explicitly asks for options, ideation, or “what should we do”.
- Product strategy / “what to build” / 10x framing: consider **`game-changing-features`** skill instead of or in addition to brainstorming when the ask is roadmap or opportunity-focused.

**Skip** when **all** of these hold:

- Narrow scope: exact files, symbols, error messages, or one obvious change.
- Pure factual question: “where is X”, “how does Y work”.
- TASK already reads like a mini-spec (clear done-when and boundaries).

If brainstorming (or game-changing-features) ran, capture **Design brief**: goals, constraints, options chosen or still open.

---

## STEP 3 — SequentialThinking (conditional)

Call **user-Sequentialthinking** when **any** of these hold:

- TASK bundles multiple sub-goals and decomposition is not obvious.
- Conflicting goals or tradeoffs (e.g. speed vs full refactor) need ordering.
- After STEP 2, several valid directions remain and you must pick a default for the brief.
- Confidence in how to scope the work is **MEDIUM** or **LOW** without a short reasoning pass.

**Skip** when the TASK is a single atomic ask with one clear interpretation.

Summarize **Decomposition / decisions** in the output (assumptions, chosen path, what still needs SCOUT to confirm).

---

## STEP 4 — Requirements gathering (conditional)

**Invoke the requirements-gathering skill** (read and follow `~/.cursor/skills/requirements-gathering/SKILL.md`) when **any** of these hold:

- Brainstorming or SequentialThinking ran.
- Success criteria, scope, or constraints are still implicit or fuzzy.
- You are about to recommend `/scout` or `/orquestador` and need testable boundaries.

**Skip** when TASK is already specific (clear inputs, outputs, done-when) and STEP 2 was skipped.

Produce the skill’s **Requirements Brief** sections (Objective, Problem/Context, Stakeholders, In/Out of Scope, Acceptance criteria, Constraints, Open questions, etc.) **inside** the Intake brief below.

---

## STEP 5 — Routing hint

Recommend the **next command** and a **single-line task** to paste:

- Default: **`/scout`** — when technical discovery is the main unknown.
- **`/orquestador`** — when the user asked for full end-to-end execution from this intake and the brief is complete enough to start (still runs SCOUT inside orchestrator).

If **blocking open questions** remain that only the user can answer, list them under **Blockers** and still output the best partial brief.

---

## OUTPUT — Intake brief (use these headings)

### Meta

- **conversationId** (devcontext): …
- **Suggested next**: `/scout` or `/orquestador`
- **Suggested TASK line** (copy-paste): one line combining objective + key constraints for the next command

### Memory findings

Bullets: prior episodes, decisions, or context from cursor10x / devcontext that matter for this TASK.

### Design brief (if STEP 2 ran)

Goals, constraints, options open or chosen.

### Decomposition / reasoning (if STEP 3 ran)

Assumptions, tradeoffs, recommended sequencing for later SCOUT/plan.

### Requirements brief (if STEP 4 ran)

Use the **exact headings** from the requirements-gathering skill template (Objective, Problem / Context, Stakeholders & Users, In Scope, Out of Scope, Acceptance criteria, Constraints, Open questions, etc.).

### Risks and unknowns

What SCOUT or repo inspection must still verify.

### Blockers (optional)

User input or access needed before safe execution.

---

## PREFERRED TOOLS

**Skills:** `brainstorming`, `requirements-gathering`, `game-changing-features` (strategy asks)

**MCPs:** `user-devcontext`, `user-cursor10x-mcp`, `user-Sequentialthinking`

**Subagents:** None required for intake; delegate reconnaissance to `/scout` after this command.
