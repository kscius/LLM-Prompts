# Retrospective: post-session analysis, memory persistence, summary artifact

Run **after** a work block, feature, or orchestration cycle—or when the user wants to close the loop on “what we did and what to remember.”

TASK (optional focus, outcome, or notes):
{{args}}

MISSION
Synthesize what was completed, which patterns or decisions matter for next time, and persist durable memory via **cursor10x-mcp** and **devcontext**. Emit a **Session retrospective** in chat and write a **dated markdown summary** to disk when a workspace root is available.

OPERATING RULES
1. **Minimal project edits.** Only create the retrospective markdown file (and `docs/retrospectives/` or `.cursor/retrospectives/` directories if missing). Do not change application code unless TASK explicitly asks.
2. Run steps **in order**; **Skip** only where marked.
3. Use MCPs **when configured**; if a call fails, note it in the output and continue with chat-only synthesis.
4. Do not invent git history, test results, or file changes—derive from conversation, visible workspace, or tools you actually ran.
5. **conversationId**: If the user or prior context provides a devcontext `conversationId`, use it for devcontext calls. If unknown, state that devcontext finalize/record were skipped or ask the user once for the ID.

---

## STEP 1 — Gather evidence (mandatory)

1. **From the thread**: TASK (`{{args}}`), user goals, files touched, commands run, verdicts (e.g. APPROVED / CAUTION), open follow-ups.
2. **Workspace (optional)**: If useful, skim recent edits or `git status` / diff only when the user asked for a technical retrospective and the repo is a git project—do not assume commands exist; follow repo evidence.
3. **Cursor10x (optional but recommended)**: Call **user-cursor10x-mcp**:
   - `getRecentEpisodes` (limit 15–20) and/or `getRecentMessages` (limit 15–20).
   - If the session theme is broad, `getComprehensiveContext` with a short `query` from TASK or topic.

Summarize raw findings internally before STEP 2.

---

## STEP 2 — Synthesize retrospective (mandatory)

Produce structured answers (even if “none / not applicable”):

| Lens | Content |
|------|--------|
| **Completed** | Shipped fixes, features, docs, config; explicit done-when met |
| **Partially done / deferred** | What remains and why |
| **Decisions** | Architecture, library, API, or process choices worth remembering |
| **Patterns** | What worked or failed (debugging, review, test, orchestration) |
| **Risks / debt** | Regressions, missing tests, security or ops follow-ups |
| **Next session** | 3–7 concrete starters (commands, files, or questions) |

---

## STEP 3 — Persist memory (mandatory when MCPs available)

### 3.1 DevContext

If **conversationId** is known:

- Call **devcontext** `record_milestone_context` with:
  - `name`: short title (e.g. “Session retrospective — \<date\>”).
  - `description`: 1–3 sentences on outcome.
  - `milestoneCategory`: pick the best fit (`feature_completion`, `bug_fix`, `refactoring`, `documentation`, `test`, `configuration`, `uncategorized`).
- When the user signals **session end** or **pause** (or TASK says “finalize”): call `finalize_conversation_context` with:
  - `outcome`: `completed` | `paused` | `abandoned` | `reference_only` per user intent (default `completed` if they are wrapping up normally).
  - Leave defaults for `extractLearnings`, `promotePatterns`, `synthesizeRelatedTopics`, `generateNextSteps` as **true** unless the user asked for a lightweight close.

If **conversationId** is unknown: document **Skipped: devcontext (no conversationId)** in the output.

### 3.2 Cursor10x

Call **user-cursor10x-mcp** as appropriate (idempotent-friendly: prefer distinct titles):

- **`storeMilestone`**: session or epic closure (title + description + importance).
- **`storeDecision`**: each durable decision (title, content, reasoning, importance). Prefix **`[retro]`** in the **title** or first line of **content** when the decision comes from this retrospective so `getComprehensiveContext` / search can find it later.
- **`recordEpisode`**: actor `assistant` or `user`, action e.g. `session_retrospective`, content = one-paragraph summary, `context` = repo or theme.
- Optionally **`endConversation`** when this retrospective **is** the explicit end of a tracked conversation: pass `content` (final summary for humans), `milestone_title`, `milestone_description`, `importance`—**only** if it matches how you use `initConversation` / `endConversation` elsewhere; otherwise prefer `storeMilestone` + `recordEpisode` to avoid double-counting.

---

## STEP 4 — Write session summary file (mandatory when workspace is writable)

1. **Filename**: `session-retrospective-YYYY-MM-DD.md` (use authoritative calendar date; if multiple retrospectives the same day, append `-2`, `-3`, …).
2. **Directory** (first match wins):
   - `{workspaceRoot}/docs/retrospectives/` if `docs/` exists or can be created sensibly in the active project.
   - Else `{workspaceRoot}/.cursor/retrospectives/`.
3. **If** the workspace is user config only (e.g. `.cursor` home) or writing is inappropriate: **skip file creation**, state **Skipped: file (no suitable project root)**, and paste the full markdown in chat.

**File front matter (markdown, not YAML required):** title, date, optional conversationId line.

---

## OUTPUT — Session retrospective (chat; mirror into the file)

Use these headings:

### Meta

- **Date**
- **conversationId** (or “unknown”)
- **Summary file path** (or “not written”)
- **MCP persistence**: short note (what was stored / skipped / errors)

### What we completed

### What we deferred or blocked

### Decisions to remember

### Patterns and lessons

### Risks and follow-ups

### Recommended next steps

---

## See also

- **`/department-report`** — roll up many sessions/plans over a date range (department activity, not a single session).
- **`/stats`** — aggregate hook logs and plan counts for operational metrics.

## Quality bar

- Prefer **specific** references (paths, PRs, ticket IDs) over vague “we improved things.”
- Keep the written file **durable**: a future you (or another agent) should be able to resume without re-reading the whole thread.
- If nothing was accomplished, say so and capture **why** (blocked, scope change, environment)—that is still valuable memory.
