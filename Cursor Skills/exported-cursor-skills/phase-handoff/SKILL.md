---
name: phase-handoff
description: >-
  Normalized artifacts and checklists between SDLC phases (intake → scout →
  plan → critic → build → verify → close). Use at phase boundaries for
  /orquestador, Plan Mode execution packs, or resume after interruption.
---

# Phase handoff

## Purpose

Ensure each phase leaves a **structured, consumable** artifact so the next phase (or a new conversation) does not depend on chat compaction alone. Aligns with `operating-model.mdc`.

## When to use

- End of INTAKE, SCOUT, PLAN, CRITIC, BUILD, VERIFY before advancing.
- User asks to "hand off", "resume", or "what’s missing for the next step".
- After compact or new window: rebuild context from `.cursor/plans/*.md`.

## Artifact templates (minimal fields)

### Intake brief (`intake-brief-YYYY-MM-DD-<slug>.md`)

```markdown
---
date: YYYY-MM-DD
task_slug: <slug>
conversation_id: <optional>
---
# Intake brief
## Requirements / objective
## Acceptance criteria
## Scope excluded
## Open questions
## Blockers (if any)
```

### Scout artifact — see `/scout` command; must include front-matter:

`date`, `task`, `classification`, `confidence`, `workflow_type`, `next_command`

### Execution pack (body + optional file)

- Objective, files/layers, order, validations (repo-verified commands), risks, what NOT to touch, done criteria.

### Critic verdict

- Single line: **APPROVED** | **CAUTION** | **REWORK**
- Findings list; required fixes if REWORK.

### Validation report

- **Status:** GREEN | YELLOW | RED
- Commands run + outcome evidence (not claims without output).

## Gate checklist (before advancing)

1. Required **prior** artifact exists (file or equivalent in-thread with explicit path note).
2. **Classification** and **confidence** stated for scout onward.
3. **workflow_type** and **operating mode** (investigation / delivery / incident / platform) consistent.
4. No **REWORK** verdict bypassed.
5. Secrets not copied into artifacts.

## Resume protocol

1. List `.cursor/plans/` for newest matching `scout-*`, `intake-brief-*`, `execution-pack-*`, `critic-verdict-*`, `validation-report-*`.
2. Read latest relevant files; continue from **first missing or invalid** pipeline step.
3. If scout file missing and task changed, re-run SCOUT.
