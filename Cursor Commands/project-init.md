# Project init: bootstrap `.cursor/rules/` + intake template for the open workspace

Run when opening a **new or unfamiliar repo** so the department’s conventions apply **inside that project** (not in the global `~/.cursor` config). This command does **not** require the department itself to live in GitHub.

TASK (optional: stack hints, team standards, or “minimal” / “full”):
{{args}}

MISSION
1. Run **read-only** discovery on the **current workspace root** (the open project).
2. Create or update **project-local** `.cursor/rules/` with stack-appropriate overlays.
3. Write a **pre-filled intake template** the next `/intake` or `/orquestador` can use.

OPERATING RULES
1. **Scope:** Only create/edit files under `{workspaceRoot}/.cursor/` (rules + template). Do not change application/runtime code unless TASK explicitly demands it.
2. **Evidence:** Follow **repo-discovery** — never invent scripts, package managers, or test commands.
3. Read and follow **`repo-discovery`** skill (`~/.cursor/skills/repo-discovery/SKILL.md`) for discovery shape.
4. For rule authoring, follow **`create-rule`** skill (`~/.cursor/skills-cursor/create-rule/SKILL.md`) for `.mdc` frontmatter and globs.
5. If workspace is **dotfiles-only** (e.g. only `~/.cursor` with no app repo), **abort** with a short message: use this command from a real project folder.

---

## STEP 1 — Classify workspace (mandatory)

1. Confirm `workspaceRoot` is a **project repo** (manifest, `src/`, `app/`, etc.)—not only global Cursor config.
2. If ambiguous, ask one clarifying question OR proceed with **minimal** rules only.

---

## STEP 2 — Repo discovery (mandatory)

Execute the **repo-discovery** procedure and capture:

- Stack (language, framework, package manager)
- **Verified** commands: install, lint, typecheck, test, build, dev (from `package.json`, `Makefile`, CI, etc.)
- Entry points, test locations, risk flags (auth, DB, payments)
- Whether `docs/` exists (for future retrospectives)

---

## STEP 3 — Scaffold `.cursor/rules/` (mandatory)

Create `{workspaceRoot}/.cursor/rules/` if missing.

Add **1–3** focused `.mdc` files (not a dozen):

| File | Purpose | `alwaysApply` / `globs` |
|------|---------|-------------------------|
| `project-context.mdc` | Repo purpose, stack summary, where tests live, **verified** command table | `alwaysApply: true` |
| Stack overlay | e.g. `nextjs.mdc`, `rails.mdc`, `python.mdc` — only if evidence supports it | Appropriate `globs` |
| Optional `api-contracts.mdc` or `security-sensitive.mdc` | If repo has APIs or obvious sensitive surfaces | Scoped globs |

Each rule must cite **only verified** commands and paths. Use `description` in frontmatter for agent discovery.

**Do not** duplicate the entire global `~/.cursor/rules/` — only **project-specific** facts and stack overlays.

---

## STEP 4 — Intake template (mandatory)

Write:

`{workspaceRoot}/.cursor/intake-template.md`

Structure:

```markdown
# Intake template — \<project name or folder\>

## Detected stack
- …

## Verified commands (from repo evidence)
| Action | Command |
|--------|---------|
| install | … |
| test | … |
| lint | … |

## Constraints / sensitive areas
- …

## Task (fill before /intake or /orquestador)
\<user pastes goal here\>

## Done when
- …

## Open questions
- …
```

Pre-fill every section **except** “Task” and “Done when” (use placeholders or bullets from discovery).

---

## STEP 5 — Output summary (mandatory)

In chat, print:

- List of **files created/updated** with paths
- **Next steps**: e.g. “Fill `.cursor/intake-template.md` then run `/intake` or `/orquestador`”
- Any **unknowns** left for SCOUT

---

## Quality bar

- Smallest rule set that reflects **this** repo—avoid generic essays.
- If discovery finds **no** test script, say so explicitly in the template (do not invent `npm test`).
