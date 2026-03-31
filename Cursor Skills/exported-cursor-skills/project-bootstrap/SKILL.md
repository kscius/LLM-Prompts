---
name: project-bootstrap
description: >
  Bootstrap a new project with Cursor-ready configuration: AGENTS.md, per-project
  .cursor/rules/project-conventions.mdc, and optional memory_bank/ scaffold.
  Use at project initialization, when starting a new repo, or when the user says
  "set up Cursor for this project" / "bootstrap this project" / "init project config".
---

# project-bootstrap

## Purpose

Generate the minimal Cursor configuration for a new or unconfigured project so
that every agent and rule in `~/.cursor` works correctly from the first prompt.
Output is always tailored to the actual repo — never generic boilerplate.

---

## When to activate

- `/project-init` command is run
- User says: "bootstrap this project", "set up Cursor for this repo", "init project config"
- SCOUT discovers no `.cursor/rules/`, no `AGENTS.md`, and no `CLAUDE.md` in the project
- Starting a new project from scratch

---

## Step 1 — Detect project facts

Before writing anything, collect:

```
stack:          [e.g. Next.js 15 / TypeScript / Prisma / pnpm]
package_manager:[npm | pnpm | yarn | bun]
test_cmd:       [from package.json scripts or Makefile]
lint_cmd:       [from package.json scripts or eslint.config.*]
build_cmd:      [from package.json scripts]
framework:      [Next.js | React | Vue | Express | NestJS | Rails | Django | ...]
db:             [PostgreSQL | MySQL | MongoDB | SQLite | none]
git_branch:     [main | master | other]
existing_rules: [.cursor/rules/ present? yes/no]
existing_agents:[AGENTS.md or CLAUDE.md present? yes/no]
```

Use `git`, `package.json`, `Makefile`, `Cargo.toml`, `go.mod`, `pyproject.toml`,
`Gemfile`, etc. to fill these. Do not guess — leave unknown if unconfirmed.

---

## Step 2 — Generate AGENTS.md (at project root)

Create or update `AGENTS.md` with imperative learnings for this project.
Max 30 items, one line each. Keep it dense and actionable.

Template:
```markdown
# Agent instructions — [Project Name]

> Supplement to `~/.cursor/AGENTS.md`. Project-specific overrides and learnings.

## Commands (verified from package.json / Makefile)
- Install: `[pm] install`
- Dev: `[pm] [script]`
- Test: `[pm] [script]` (or: `[command]`)
- Lint: `[pm] [script]`
- Build: `[pm] [script]`
- Type check: `[pm] tsc --noEmit` (or: N/A)

## Stack
- [Framework + version]
- [Database + ORM]
- [Package manager]

## Non-obvious facts
- [Gotcha 1 — e.g. "migrations must be run before tests: npx prisma migrate dev"]
- [Gotcha 2 — e.g. "env vars must be in .env.local not .env"]
- [Gotcha 3 — add as discovered]

## File locations
- API routes: [path]
- DB schema: [path]
- Tests: [path]
- Docs: [path]

## Conventions this project uses
- [e.g. "All API responses use { data, error } shape"]
- [e.g. "Feature flags live in lib/flags.ts"]
- [e.g. "Never use default exports for components"]

## Do not touch
- [File or directory that must not be modified]
```

---

## Step 3 — Generate .cursor/rules/project-conventions.mdc

Create `.cursor/rules/project-conventions.mdc` scoped to this project.

Template:
```markdown
---
description: "[Project name] — stack, patterns, and constraints"
globs:
  - "**/*.{[primary extensions]}"
alwaysApply: false
---

# [Project name] conventions

## Stack (verified)
- [Framework + version]
- [DB + ORM]
- [Testing: Jest/Vitest/RSpec/...]

## Module boundaries
- [Which directories own which concerns]
- [What must not cross module lines]

## Patterns in use
- [e.g. "API handlers in /app/api/**/route.ts"]
- [e.g. "Server Components by default; client: only when needed"]
- [e.g. "Zod for all request validation"]

## Anti-patterns (do not introduce)
- [e.g. "No useEffect for data fetching — use server components or React Query"]
- [e.g. "No raw SQL — use Prisma"]

## Validation commands
- lint: `[exact command]`
- typecheck: `[exact command]`
- test: `[exact command]`
- build: `[exact command]`
```

---

## Step 4 — Optionally scaffold memory_bank/

If the user asked to "set up memory" or if this is a significant project
(evidence: existing docs/, multiple contributors, >10 source files), invoke
the `memory-bank` skill to scaffold `memory_bank/` in the project root.

---

## Step 5 — Create .cursor/plans/ directory

Ensure `.cursor/plans/` exists so SDLC artifacts can be written immediately.

```bash
mkdir -p .cursor/plans
```

---

## Output summary

After completing, report:
```
Created:
  - AGENTS.md (project root)
  - .cursor/rules/project-conventions.mdc
  - .cursor/plans/ (directory)
  - memory_bank/ (if activated)

Detected facts:
  stack: [...]
  commands: install=[...] test=[...] lint=[...] build=[...]

Next: Run /orquestador for your first task — it will read these files automatically.
```

---

## Maintenance guidance

- Keep `AGENTS.md` imperative and dense; prune stale learnings regularly
- Update `project-conventions.mdc` when architecture decisions change
- Run `/retro-to-rule` to convert retrospective findings into new convention entries
- Use `/knowledge-consolidate` to promote cursor10x memory into these files
