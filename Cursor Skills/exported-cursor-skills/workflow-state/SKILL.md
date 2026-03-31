---
name: workflow-state
description: >
  Create and update .cursor/plans/workflow_state.md at each orquestador phase
  boundary. Provides a durable phase-tracking file that survives context
  compaction, long autonomous runs, and session interruptions. Use alongside
  /orquestador for STANDARD and COMPLEX tasks.
---

# workflow-state

## Purpose

Maintain a single `.cursor/plans/workflow_state.md` file that tracks the
current orquestador run state — phase, status, plan steps, and log entries.
This file survives context compaction and long autonomous runs, letting the
agent resume from a known checkpoint even after context loss.

Complements (does not replace) the existing `.cursor/plans/` SDLC artifacts
(intake-brief-*.md, scout-*.md, execution-pack-*.md, etc.).

---

## When to activate

- At the start of every STANDARD or COMPLEX orquestador run
- At each phase boundary to update status and log
- When the agent detects context was compacted (`precompact-preserve.js` fired)
- When the user asks "where did we leave off?" or "what phase are we in?"
- When resuming a run after interruption

---

## File location and format

Always write to: `.cursor/plans/workflow_state.md` in the **active project workspace** (not in `~/.cursor`).

If no project workspace is active (dotfiles workspace), write to `~/.cursor/plans/workflow_state.md`.

### Template

```markdown
# Workflow State

> **Task:** [one-line task summary]  
> **Run started:** YYYY-MM-DD HH:MM  
> **Last updated:** YYYY-MM-DD HH:MM  
> **Run ID:** [short slug or conversation ID prefix]

---

## Phase
[INTAKE | SCOUT | PLAN | CRITIC | BUILD | VERIFY | DOCUMENT | CLOSE | FIX_LOOP | BLOCKED]

## Status
[IN_PROGRESS | WAITING | COMPLETED | BLOCKED]

## Classification
[SIMPLE | STANDARD | COMPLEX]

## Workflow type
[feature | bugfix | refactor | security | migration | docs | performance | infrastructure | research]

## Plan
1. [Step 1]
2. [Step 2]
3. [Step 3 — mark complete with ✓ when done]

## Checkpoints

| Phase | Status | Timestamp | Notes |
|-------|--------|-----------|-------|
| INTAKE | ✓ | YYYY-MM-DD HH:MM | [brief] |
| SCOUT | ✓ | YYYY-MM-DD HH:MM | [brief] |
| PLAN | — | — | — |
| BUILD | — | — | — |
| VERIFY | — | — | — |

## Log
- [YYYY-MM-DD HH:MM] INTAKE completed — [1-line summary]
- [YYYY-MM-DD HH:MM] SCOUT completed — classification: STANDARD, confidence: HIGH
- [YYYY-MM-DD HH:MM] PLAN approved — [approach summary]
- [YYYY-MM-DD HH:MM] BUILD step 1 complete — [what changed]

## Current focus
[What the agent is doing right now — update before any large edit block]

## Blockers
[NONE | description of blocker and why escalation is needed]

## Artifact paths
- intake-brief: `.cursor/plans/intake-brief-YYYY-MM-DD-<slug>.md`
- scout: `.cursor/plans/scout-YYYY-MM-DD-<slug>.md`
- execution-pack: `.cursor/plans/execution-pack-YYYY-MM-DD-<slug>.md`

## Devcontext conversation ID
[ID from initialize_conversation_context, or "not initialized"]
```

---

## Update instructions per phase

Call this skill (read and apply it) to update `workflow_state.md` at each
orquestador phase boundary. The update must be atomic — write the whole file,
not a partial append.

### At INTAKE end
- Set Phase → `SCOUT`
- Status → `IN_PROGRESS`
- Fill: task summary, run ID, devcontext conversation ID
- Log: `INTAKE completed — [requirements/brainstorm summary in 1 line]`

### At SCOUT end
- Set Phase → `PLAN` (or `BUILD` if SIMPLE)
- Fill: classification, workflow type, artifact paths
- Log: `SCOUT completed — classification: X, confidence: Y, workflow_type: Z`

### At PLAN end
- Set Phase → `CRITIC` (or `BUILD` if no critic)
- Fill: Plan steps from EXECUTION PACK
- Log: `PLAN approved — [approach in 1 line]`

### At BUILD start
- Set Phase → `BUILD`
- Status → `IN_PROGRESS`
- Set "Current focus" → first task in EXECUTION PACK

### After each BUILD checkpoint
- Check off completed steps in Plan section (add ✓)
- Append log entry
- Update "Current focus"

### At VERIFY end
- Set Phase → `CLOSE` (or `FIX_LOOP` if RED)
- Log: `VERIFY [GREEN/YELLOW/RED] — [what was checked]`

### On BLOCKED
- Set Status → `BLOCKED`
- Set "Blockers" → reason + what user needs to provide
- Log: `BLOCKED — [trigger reason]`

### On CLOSE
- Set Phase → `CLOSE`
- Status → `COMPLETED`
- Log: final outcome

---

## Resume protocol

When the agent detects possible context loss or the user asks to resume:

1. Read `.cursor/plans/workflow_state.md`
2. Read the referenced artifact files (scout, execution-pack, etc.)
3. Announce: "Resuming from [Phase] — [Status]. Last log entry: [entry]."
4. Continue from current Phase without re-doing completed phases
5. Update the state file immediately on resuming

---

## Integration notes

- Do NOT replace existing SDLC artifacts (`intake-brief-*.md`, `scout-*.md`, etc.) — workflow_state.md is a lightweight companion
- Do NOT store large content in workflow_state.md — keep each field to 1-3 lines; link to artifact files for details
- Always update "Last updated" timestamp on every write
- The file is expected to be overwritten (not appended) on each update
