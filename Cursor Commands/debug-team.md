# Multi-agent debugging — root cause analysis and verified fix

Coordinate a focused debug session across analysis, investigation, and fix verification.

TASK:
{{args}}

MISSION
Run a systematic root-cause investigation using specialized agents, then deliver a verified fix.

TEAM COMPOSITION

| Phase | Role | Subagent | Focus |
|-------|------|----------|-------|
| 1 – Triage | Error detective | `error-detective` | Classify symptom, scope, reproduction path |
| 2 – Investigate | Debugger | `debugger` | Root cause, evidence chain, hypothesis elimination |
| 3 – Fix | Developer | `fullstack-developer` or `backend-developer` | Minimal targeted fix |
| 4 – Verify | QA | `qa-expert` | Regression test, confirm fix, no new failures |

OPERATING RULES
1. Phase 1 must classify: symptom type, affected surface, reproduction conditions, blast radius.
2. Phase 2 must produce a root cause supported by evidence (logs, stack traces, code paths). Do not guess.
3. Phase 3 applies the minimal fix — no scope creep, no opportunistic refactors.
4. Phase 4 must verify: original symptom is gone AND no regressions are introduced.
5. If Phase 2 finds multiple contributing causes, fix the root cause only — document others as follow-up.
6. If reproduction cannot be established in Phase 1, halt and report what is known.

PREFERRED SKILLS
- `error-handling-patterns` if the bug reveals a missing error boundary
- `security-review` if the bug is security-related
- `self-validate` before declaring the fix complete

ESCALATION TRIGGERS
Stop and surface to user if:
- Root cause cannot be determined within 3 investigation iterations
- Fix requires architectural change outside the bug scope
- Reproduction is flaky or environment-dependent
- Phase 4 reveals a new regression caused by the fix

OUTPUT FORMAT (per phase)
Phase 1 — Triage:
- Symptom, classification, affected surface, reproduction steps, blast radius

Phase 2 — Root cause:
- Hypothesis, evidence chain, eliminated alternatives, confirmed root cause

Phase 3 — Fix:
- Files changed, approach, why this is minimal and correct

Phase 4 — Verification:
- Regression tests run, original symptom confirmed fixed, new failures: none / [list]

Final status: [RESOLVED / BLOCKED — reason]
Follow-up items: [other issues discovered but out of scope]
