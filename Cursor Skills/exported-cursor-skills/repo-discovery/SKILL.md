---
name: repo-discovery
description: >-
  Phase-1 repo reconnaissance as a standalone skill: stack detection, relevant
  files, validation commands from repo evidence, workflow hints, and risk
  flags. Use inside /scout, /orquestador pre-flight, or any read-only discovery
  before planning or implementation.
---

# Repo discovery

## Purpose

Execute **minimal effective reconnaissance** to map the real implementation surface: stack, boundaries, commands, tests, and risks—**without** editing files or designing the solution.

## When to use

- Start of `/scout` Phase 1 (read this skill and align output with scout report format).
- `/orquestador` when skipping a full `/scout` invocation but discovery is still required.
- `/build-full` pre-flight when the execution pack lacks verified commands or file paths.

## When to skip

- User gave exact file paths, symbols, and a single known fix with no ambiguity.
- Another agent just produced a fresh `scout-YYYY-MM-DD-*.md` for the same task.

## Procedure

1. **Scope:** Restate the task in one line; note workspace root vs dotfiles-only (no project repo).
2. **Stack:** From manifests (`package.json`, `pyproject.toml`, `Gemfile`, `go.mod`, etc.), lockfiles, CI, and directory layout—infer framework, package manager, monorepo layout.
3. **Entry points:** App entry, API routes, main packages, env/config patterns (names only—do not read secrets).
4. **Relevant files:** List files/modules likely touched; note **imports / imported-by** when cheap to determine.
5. **Commands (verified only):** Extract install, lint, typecheck, test, build, dev from manifests, Makefile, CI workflows—**never invent** script names.
6. **Constraints:** `.cursor/rules`, `/docs/`, migrations folder, security-sensitive areas (auth, payments, uploads).
7. **Tests:** Where tests live; unit vs e2e; gaps if obvious.
8. **Risks:** Contract changes, migrations, auth, performance, duplication.

## Output shape

Produce bullets or tables suitable for pasting into:

- The **Scout report** sections (stack, workflow type, files, validation commands, risks).
- YAML front-matter fields: `classification`, `confidence`, `workflow_type`, `next_command` (see **phase-handoff** / `/scout` artifact schema).

## Integration

- After discovery, `/scout` must still run **Phase 0** (devcontext, optional brainstorming) and **Phase 2** (SequentialThinking when triggered) unless this skill is invoked **only** as a sub-step inside scout.
- Prefer subagent `explore` for large unknown repos when parallel speed helps.
