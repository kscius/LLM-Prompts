# Subagent definitions (`agents/`)

This directory holds **portable subagent prompts**: one Markdown file per Task-tool `subagent_type` that this repository ships. Use them as the detailed instruction layer; the short role summaries live in the inventory docs (see below).

## File naming

- **Pattern:** `<subagent_type>.md` — the basename (without `.md`) must match the **`subagent_type`** value passed to the Task tool (or equivalent delegation).
- **Shape:** YAML frontmatter at the top, then the long-form agent body.
  - Typical frontmatter keys: `name`, `description` (often with embedded examples), optional `tools`, `model`.
  - The `description` field is optimized for routing: when to invoke this agent.

## Coverage in this repo

- **Shipped here:** 87 definitions (every `.md` in this folder except this `README.md`).
- **Task enum entries without a matching file here:** `generalPurpose`, `explore`, `shell`, `best-of-n-runner`, and `nodejs-developer` — these are still valid `subagent_type` values where Cursor exposes them; they are not duplicated as standalone prompts in this folder.

## How to use

1. **Reference in rules or commands:** Link to a specific file (for example `code-reviewer.md`) when you want humans or the model to read the full prompt.
2. **Copy into a project:** Place files under a path your team uses for agent definitions (for example `.cursor/` or a shared prompts repo) and keep names aligned with `subagent_type`.
3. **Stay in sync:** When Cursor adds or renames types, update [task-subagent-types.md](../task-subagent-types.md) and the categorized lists in [ai-tools.md](../../Cursor%20Rules/ai-tools.md) / [tools-inventory-es.md](../../Cursor%20Rules/tools-inventory-es.md); add or rename files here when you adopt new definitions.

## Related documentation

- [Cursor Subagents README](../README.md) — delegation patterns, handoffs, links to Cursor Rules.
- [ai-tools.md](../../Cursor%20Rules/ai-tools.md) — Subagents section (English, by category).
- [tools-inventory-es.md](../../Cursor%20Rules/tools-inventory-es.md) — same inventory in Spanish.
- [task-subagent-types.md](../task-subagent-types.md) — flat enum-style list of `subagent_type` values.

---

**Last updated:** March 2026
