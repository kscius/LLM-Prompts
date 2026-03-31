---
name: memory-bank
description: >
  Scaffold and maintain a /memory_bank/ directory in any project.
  Provides human-readable context that survives tool changes and supplements
  cursor10x-mcp + devcontext session memory. Use when starting a new project,
  resuming after a long gap, or when the user asks to "set up memory" or
  "create a memory bank" for a project.
---

# memory-bank

## Purpose

Create or update a `/memory_bank/` directory in the current project with
five structured markdown files. These files persist project knowledge across
tool changes, team members, and long pauses — complementing the session-based
memory of cursor10x-mcp and devcontext.

---

## When to activate

- User says: "set up memory bank", "init memory", "create project context files"
- Starting a new project with `/project-init` or `/orquestador` feature workflow
- Resuming work after > 1 week gap (prompt: "refresh memory from memory_bank/")
- `memory_bank/` exists but some files are stale or missing

---

## File structure to scaffold

Create these files under `<project_root>/memory_bank/` if they do not exist
(or update if explicitly requested):

```
memory_bank/
  projectbrief.md     ← high-level overview, goals, scope, constraints
  techContext.md      ← stack, versions, setup quirks, env var names
  systemPatterns.md   ← architecture patterns, coding standards, decisions
  activeContext.md    ← current work focus, recent changes (volatile — update often)
  progress.md         ← completed work, milestones, history
```

---

## Scaffolding instructions

### Step 1 — Detect project root
Use the workspace root or `git rev-parse --show-toplevel` output.

### Step 2 — Read existing files first
If `memory_bank/` already exists, read all present files before writing.
Do not overwrite content that is newer than what you know.

### Step 3 — Write each file using this template

#### `memory_bank/projectbrief.md`
```markdown
# Project Brief

> Last updated: YYYY-MM-DD

## Overview
[1-3 sentences: what the project is and what it does]

## Goals
- [Primary goal]
- [Secondary goal]

## Scope boundaries
**In scope:** [what is included]
**Out of scope:** [what is explicitly excluded]

## Key constraints
- [deadline, performance, compliance, team size, etc.]

## Success criteria
- [Observable, testable outcomes]
```

#### `memory_bank/techContext.md`
```markdown
# Technical Context

> Last updated: YYYY-MM-DD

## Stack
- Language: [e.g. TypeScript 5.x]
- Runtime: [e.g. Node 22 / Bun 1.x]
- Framework: [e.g. Next.js 15 App Router]
- Database: [e.g. PostgreSQL 16 via Prisma]
- Package manager: [npm / pnpm / yarn / bun]

## Key commands
```bash
# Install
[command]
# Dev server
[command]
# Tests
[command]
# Build
[command]
```

## Environment variables
- `ENV_VAR_NAME` — purpose (never log the value)
- ...

## Setup quirks / gotchas
- [Anything non-obvious about getting the project running]
```

#### `memory_bank/systemPatterns.md`
```markdown
# System Patterns

> Last updated: YYYY-MM-DD

## Architecture overview
[Brief description of layers, major modules, data flow]

## Key design decisions
| Decision | Why | Alternatives considered |
|----------|-----|------------------------|
| [e.g. app router] | [reason] | [pages router] |

## Coding conventions
- [Naming, folder structure, module patterns, etc.]
- [Test conventions]
- [Import order, linting rules]

## Non-obvious patterns to preserve
- [Anti-patterns that were deliberate tradeoffs]
- [Module boundaries that must not be crossed]
```

#### `memory_bank/activeContext.md`
```markdown
# Active Context

> Last updated: YYYY-MM-DD  
> **Volatile — update this file frequently**

## Current focus
[What is being worked on right now]

## Recent changes
- [YYYY-MM-DD] [Brief change summary]
- [YYYY-MM-DD] [Brief change summary]

## Open questions / blockers
- [ ] [Unresolved question or dependency]

## Next steps
- [ ] [Planned next action]
```

#### `memory_bank/progress.md`
```markdown
# Progress & History

> Last updated: YYYY-MM-DD

## Completed milestones
| Date | Milestone | Notes |
|------|-----------|-------|
| YYYY-MM-DD | [what] | [any caveats] |

## Decisions log
| Date | Decision | Reasoning |
|------|----------|-----------|
| YYYY-MM-DD | [decision] | [why] |

## Lessons learned
- [What would you do differently]
- [What worked well]
```

---

## Integration with devcontext + cursor10x

These files are **supplement**, not replacement:

- **devcontext**: continue using `initialize_conversation_context` at session start
- **cursor10x**: continue using `storeDecision`, `storeMilestone`, `recordEpisode`
- **memory_bank/**: read manually when context is cold or switching tools

Recommended session start (when memory_bank/ exists):
1. Read `activeContext.md` and `progress.md` first (most volatile)
2. Read `systemPatterns.md` for architecture orientation
3. Then call `cursor10x.getComprehensiveContext` for recent episodes

---

## Maintenance rules

- Update `activeContext.md` whenever the current focus changes
- Update `progress.md` when a milestone or decision is finalized
- Update `techContext.md` when dependencies, commands, or env vars change
- `projectbrief.md` and `systemPatterns.md` are stable — update only when scope or patterns genuinely change
- Keep each file under 300 lines; split or summarize when they grow
