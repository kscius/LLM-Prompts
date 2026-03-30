# Multi-agent feature build — design, implement, and validate end-to-end

Orchestrate a coordinated team to plan, build, and validate a new feature.

TASK:
{{args}}

MISSION
Run a phased feature build using specialized agents. Proceed phase by phase; each phase must reach its acceptance gate before the next begins.

TEAM COMPOSITION

| Phase | Role | Subagent | Output |
|-------|------|----------|--------|
| 1 – Design | Product + Architecture | `architect-reviewer` | Spec, API contracts, data model |
| 2 – Build | Full-stack implementation | `fullstack-developer` | Working implementation across all layers |
| 3 – Test | Quality validation | `qa-expert` | Test coverage, edge cases, regression check |
| 4 – Review | Pre-ship gate | `code-reviewer` + `security-auditor` | Verdict and required fixes |

OPERATING RULES
1. Phase 1 must produce a written spec with: objective, acceptance criteria, scope in/out, API contracts, data model changes.
2. Phase 2 builds against the Phase 1 spec. Any deviation requires explicit justification.
3. Phase 3 validates all acceptance criteria from the spec — not just happy path.
4. Phase 4 runs a focused review on the Phase 2 diff. Use `review-team` if the change is large.
5. Do not proceed to the next phase if the current phase is blocked.
6. Track artifacts: spec doc, changed files, test results, review verdict.

PREFERRED SKILLS
- `brainstorming` before Phase 1 if requirements are fuzzy
- `requirements-gathering` to firm up acceptance criteria
- `ship-feature` for the Phase 2 build workflow
- `testing-strategy` for Phase 3 test design
- `self-validate` before declaring the feature complete

ESCALATION TRIGGERS
Stop and surface to user if:
- Phase 1 spec reveals scope larger than expected
- Phase 2 hits a dependency or integration blocker
- Phase 3 uncovers a requirement gap not in the spec
- Phase 4 verdict is CHANGES REQUESTED with CRITICAL findings

OUTPUT FORMAT (per phase)
Phase 1 — Spec:
- Objective, acceptance criteria (testable), scope in/out, contracts, risks

Phase 2 — Build summary:
- Files created/modified, implementation decisions, deviations from spec

Phase 3 — Test results:
- Coverage, scenarios tested, gaps, edge cases verified

Phase 4 — Review verdict:
- Verdict, findings table, priority actions, praise

Final status: [SHIPPED / BLOCKED — reason]
