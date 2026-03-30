# Retro-to-rule: turn retrospective learnings into rules or skills

Run **after** `/retrospective` (or with a retrospective file path) to propose **durable** guidance: new `.mdc` rules, edits to existing rules, or new **skills**.

TASK (optional: path to retrospective markdown, theme, or “last session”):
{{args}}

MISSION
1. **Load learnings**
   - If TASK includes a file path, read it.
   - Else read the latest `docs/retrospectives/session-retrospective-*.md` or `.cursor/retrospectives/session-retrospective-*.md` under workspace root (newest by date in filename).
   - Optionally call **cursor10x-mcp** `getRecentEpisodes` / `getComprehensiveContext` with query `[retro]` or session theme.
2. **Extract patterns** (3–10 bullets): mistakes repeated, missing validations, orchestration gaps, stack-specific conventions worth enforcing.
3. **Propose artifacts** (for each pattern):
   - **New rule**: path under `{workspaceRoot}/.cursor/rules/` or `~/.cursor/rules/`, suggested `description`, `globs`, `alwaysApply`, and **short** rule body (follow **`create-rule`** skill).
   - **Rule change**: which existing `.mdc` file and what to add/remove.
   - **New skill**: path under `~/.cursor/skills/<name>/SKILL.md` with trigger lines.
4. **Prioritize**: P0 = safety/correctness; P1 = recurring waste; P2 = style.
5. **Output in chat**: numbered list of proposals; for each, say **implement now** vs **user must paste** (if workspace is read-only or global config).

OPERATING RULES
- Do not invent repo facts; tie proposals to retrospective evidence.
- Keep rules **scoped** (`alwaysApply: false` + globs) unless truly universal.
- Reference **`docs/user-rules-migration.md`** if the user should **remove duplicate User Rules** after adding `.mdc` files.

## Quality bar

- Fewer, stronger rules; no essay-length policies.
