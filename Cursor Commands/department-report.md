# Department report: activity summary over a date range

Summarize **what the department did** (plans, retrospectives, optional logs) for a **time window**—this is **not** a product changelog for a customer-facing repo. It answers: “What did we run through the agentic department lately?”

Date range and focus from `{{args}}` (parse if present):
- Examples: `last 7 days`, `last 30 days`, `2026-03-01 to 2026-03-29`, `March 2026`.
- Default: **last 14 calendar days** ending today (authoritative calendar date in user timezone if known, else UTC).

---

## STEP 1 — Collect artifacts (mandatory)

Scan these locations under `{USERPROFILE}/.cursor/`:

| Kind | Paths |
|------|--------|
| Plans | `plans/**/*.plan.md`, `.cursor/plans/**/*.plan.md` (nested) |
| Retrospectives | If they exist: `docs/retrospectives/**/*.md`, `.cursor/retrospectives/**/*.md` under any workspace—but for **department-only** machine, also check `~/.cursor/docs/knowledge-consolidate-*.md` as supplementary |
| Knowledge runs | `docs/knowledge-consolidate-*.md` |

Include a file if:
- **Filename** contains `YYYY-MM-DD` within range, OR
- **File mtime** falls in range (if you can stat files), OR
- **Frontmatter `date`** or title date in range

If no files match: still produce a report stating **zero artifacts** and suggest running `/scout`, `/orquestador`, or `/retrospective`.

---

## STEP 2 — Extract signals (mandatory)

From each matching plan / retrospective:

- **Title / name** (from H1 or YAML `name`)
- **One-line outcome** (from `overview`, first paragraph, or “What we completed”)
- **Tags**: infer themes (e.g. hooks, MCP, commands, security, feature X)

**Optional:** Grep matching files for slash commands (`/orquestador`, `/scout`, `/build-full`, `/fix-loop`, etc.) and tally **mentions**—label as **heuristic** (mentions in docs ≠ exact usage counts).

---

## STEP 3 — Optional hook log summary (recommended)

If the window is short (e.g. 7 days), sample `{USERPROFILE}/.cursor/hooks/logs/agent-audit.jsonl` for lines whose `timestamp` falls in range: count events by `event` type. If too heavy, **skip** and note “skipped audit aggregation.”

---

## STEP 4 — Report (mandatory)

Emit markdown in chat (and optionally write **`{USERPROFILE}/.cursor/docs/department-report-YYYY-MM-DD.md`** with the same content if the user asked to “save” or if TASK implies persistence—default: **chat only** unless `{{args}}` contains `save`).

### Department activity report — \<range\>

- **Window**: explicit dates
- **Artifact counts**: plans N, retrospectives M, knowledge files K
- **Highlights**: bullet list of major outcomes (max 10)
- **Themes**: grouped bullets
- **Heuristic command mentions** (if grep done)
- **Gaps**: what’s missing from artifacts (e.g. no retrospectives—suggest `/retrospective`)
- **Suggested next week**: 3–5 actions

---

## Quality bar

- Do not fabricate work items not present in files.
- Redact secrets if any artifact text included them.

---

## Relation to `/retrospective`

- **`/retrospective`**: closes **one** session and persists to MCP + optional project file.
- **`/department-report`**: rolls up **many** sessions/artifacts across time—complementary, not a replacement.
