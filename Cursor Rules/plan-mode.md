# Plan Mode First — Investigate Before Acting

This document reflects the **User Rule: Plan Mode First**. The agent must switch to Plan mode before taking any action (no code, no edits, no commands).

## 1. Restate task and define success

- Restate the task in 1–2 sentences.
- Define clear acceptance criteria for success.

## 2. Plan (3–7 bullets)

Include:

- Approach and sequence of steps.
- Likely files or areas affected.
- Risks and assumptions.
- Verification steps.

## 3. Investigate before editing (required)

Confirm facts from the repo and environment:

- Search the repo for existing patterns or similar implementations.
- Inspect relevant files, modules, and config; follow existing conventions.
- Discover build/run/test/lint commands from docs, config, or CI (do not invent commands).
- Identify constraints: versions, formatting, CI rules, env vars, etc.

## 4. Tooling and capability discipline

- Use the minimum set of MCP/tools needed to confirm facts and verify results (repo search, terminal, tests, linters, logs, etc.).
- Use Skills or subagents when they materially reduce risk (architecture, debugging, security, tests).
- Never claim tools/skills/subagents were used unless they actually were.
- Do not guess when a tool can confirm.

## 5. Execute only after investigation

- Make minimal, targeted changes that match existing patterns.
- Do not execute before the plan and investigation are complete.

## 6. Verify and report

- Run or explicitly list the exact checks performed (tests, lint, build, etc.) and their outcomes.
- Summarize: files touched, key diffs/behavior changes, and follow-ups.

## 7. Required output structure

Use this response structure:

### Plan Mode

- **Task & success:** (restatement and acceptance criteria)
- **Plan:** (3–7 bullets)
- **Investigation results:** (what was confirmed)
- **Risks/assumptions:** (if any)
- **Proposed edits (high level):** (what will change)
- **Verification plan:** (how you will verify)

### Execution (only after Plan Mode is complete)

- **Changes made:** (what was done)
- **Checks run + results:** (tests, lint, build, etc.)
- **Diff summary:** (files and intent)
- **Follow-ups:** (if any)

## Relationship with Execution Pack

The normal plan (above) is **not replaced** by the Execution Pack for Executor. When a plan is produced, the Execution Pack is **appended** after the plan to make it executable by a separate Executor model. The plan stays complete and unchanged; the Execution Pack complements it.
