# Department stats: observability from local hook logs and plans

Produce an **aggregate activity and quality report** for the autonomous software department using only **local** data under the user Cursor home. No GitHub repo or external project is required.

Optional filters from the user (via `{{args}}`):
- `last N days` or `since YYYY-MM-DD` — restrict log lines and plans by timestamp/filename date when possible.
- Default: **all available data** in the log files (or last 30 days if files are huge—state the window used).

---

## STEP 1 — Locate inputs (mandatory)

Resolve paths (Windows: `C:\Users\<user>\.cursor\`):

| Source | Path |
|--------|------|
| Hook audit stream | `{USERPROFILE}/.cursor/hooks/logs/agent-audit.jsonl` |
| Quality flags | `{USERPROFILE}/.cursor/hooks/logs/response-quality.jsonl` |
| Rotated backups | `*.old` next to the above, if present—include in totals if you read them |
| Plan artifacts | `{USERPROFILE}/.cursor/plans/*.plan.md` and `{USERPROFILE}/.cursor/.cursor/plans/*.plan.md` if that folder exists |

If a file is missing, report **0 lines** and note **file not found**—do not fail the command.

---

## STEP 2 — Parse JSONL (mandatory)

For each line of `agent-audit.jsonl` (and `.old` if included):

- Parse JSON; skip malformed lines with a count of **parse errors**.
- Aggregate **`event`** (from `entry.event` or `entry.data.hook_event_name`) — frequency table.
- Optionally note **`conversation_id`** cardinality (distinct IDs) if cheap to compute.
- Extract **day** from `timestamp` (ISO prefix `YYYY-MM-DD`) for a simple **events per day** histogram (last 14 days or full range, whichever is smaller for display).

For each line of `response-quality.jsonl` (and `.old`):

- Parse JSON; skip malformed lines.
- Aggregate **`flags`** array: count each flag type across all entries (e.g. `strong_claim_without_obvious_command_output`, `placeholder_or_todo_language`, `possible_secret_in_assistant_text`).
- Count **total quality entries** (lines with at least one flag).

**Implementation note:** For files larger than ~500KB or >5k lines, use terminal streaming (e.g. `node -e` script, or `rg`/`findstr` only if appropriate) to avoid loading everything into context; otherwise read in chunks and aggregate.

---

## STEP 3 — Plan artifacts (mandatory)

- Count **total** `.plan.md` files under `.cursor/plans/` (both flat `.cursor/plans` and nested `.cursor/.cursor/plans` if present).
- If filenames contain dates (`YYYY-MM-DD`), count plans **per month** (or per week) for a short trend line.
- Do **not** claim “commands used” from plans unless you grep for `/orquestador`, `/scout`, etc.—if you grep, report **match counts** with the pattern list used.

---

## STEP 4 — Orphan skills heuristic (optional but recommended)

1. List skill directories under `{USERPROFILE}/.cursor/skills/` (directory name = slug).
2. Search **recent** plan files and **last 500 lines** of `agent-audit.jsonl` (if readable) for each slug string (case-insensitive) or the skill `name` from frontmatter.
3. Report skills with **zero mentions** as **possibly orphaned** (heuristic—not proof they were never used in chat).

---

## STEP 5 — Output (mandatory)

Emit a single markdown report in chat with:

### Department stats — \<date generated\>

- **Data window**: files used + date filter if any
- **agent-audit.jsonl**: total lines, parse errors, top events table, optional events/day sparkline
- **response-quality.jsonl**: total flagged responses, table of flag counts
- **Plans**: total count, optional time bucketing
- **Optional**: slash-command mention counts from plans (if grep run)
- **Optional**: orphan-skills heuristic list
- **Interpretation** (1 short paragraph): e.g. whether quality flags are trending, hook volume normal

Do **not** paste raw secrets or full assistant text previews from logs.

---

## Quality bar

- Numbers must come from **actual** file reads or scripted aggregation—do not invent counts.
- If aggregation is partial (file too large), state **sample size** or **method** used.
