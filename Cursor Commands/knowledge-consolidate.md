# Knowledge consolidate: distill cursor10x memory into `.cursor/docs/`

Periodic **aggregation** of episodes, milestones, and decisions from **cursor10x-mcp** into readable markdown under the **department** folder (`~/.cursor/docs/`). Does not require a GitHub repo for the department.

Optional scope from `{{args}}`:
- Theme or query string (e.g. “Chatwoot”, “auth”, “MCP hooks”).
- `last N days` — prefer recent episodes when calling MCP tools.
- Default: **broad** consolidation for the last **30 days** (state if MCP returns less).

---

## STEP 1 — Pull memory (mandatory)

Call **user-cursor10x-mcp** (use available tools; skip gracefully on failure):

1. **`getComprehensiveContext`** with `query` derived from `{{args}}` or `"recent decisions milestones episodes"`.
2. **`getRecentEpisodes`** with `limit` **25–40** (and `context` filter if the tool supports it and TASK names a project).
3. **`getRecentMessages`** with `limit` **15–25** if episodes are thin.
4. **`getMemoryStats`** if available — include counts in the doc meta section.

If all calls fail: write a short **stub** markdown file explaining MCP unavailable and **do not** invent episodes.

---

## STEP 2 — Cluster and dedupe (mandatory)

In reasoning only (then output):

- Group items by **theme**: repo name, feature area, or repeated keywords in titles/content.
- Merge **near-duplicate** decisions (same intent stated twice)—keep one bullet with “(reaffirmed)” if needed.
- Drop empty noise; keep **actionable** or **strategic** items.

---

## STEP 3 — Write consolidated doc (mandatory)

**Directory:** `{USERPROFILE}/.cursor/docs/` (create if missing).

**Filename:** `knowledge-consolidate-YYYY-MM-DD.md`  
If one already exists for today, append `-2`, `-3`, …

**Sections:**

```markdown
# Knowledge consolidation — YYYY-MM-DD

## Meta
- Source: cursor10x-mcp
- Query / window: …
- Episodes sampled: n
- Tool errors (if any): …

## Themes
### Theme A
- Bullet decisions / learnings

### Theme B
…

## Open loops / conflicts
- Items that contradict each other or need human verification

## Suggested next actions
- 3–7 bullets for `/orquestador` or project work
```

Do **not** paste API keys, tokens, or PII from episode text—summarize or redact.

---

## STEP 4 — Optional persistence (recommended)

If consolidation produced a **new durable decision**, call **`storeDecision`** once per decision (title, content, reasoning) so the graph stays navigable—or **`storeMilestone`** for “Knowledge consolidation run — date”.

---

## OUTPUT (chat)

- Path to the written file
- 5-line **executive summary**
- Note if MCP was skipped

---

## Quality bar

- Every bullet should trace to a **real** MCP return—no fictional sessions.
- Prefer **shorter** consolidated doc over dumping raw JSON.
