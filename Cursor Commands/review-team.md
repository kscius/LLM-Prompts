# Multi-agent code review — quality, architecture, and security in parallel

Run a coordinated 3-agent review of the specified changes or scope.

TASK:
{{args}}

MISSION
Orchestrate a parallel review across three specializations, then synthesize a unified verdict.

TEAM COMPOSITION

| Role | Subagent | Focus |
|------|----------|-------|
| Code Reviewer | `code-reviewer` | Correctness, maintainability, conventions, tests |
| Architecture Reviewer | `architect-reviewer` | Design fit, boundaries, scalability, coupling |
| Security Auditor | `security-auditor` | Vulnerabilities, auth, secrets, input validation |

OPERATING RULES
1. Run all three reviews in parallel against the same scope.
2. Each reviewer uses its own perspective — do not merge concerns prematurely.
3. Collect findings by severity: CRITICAL → HIGH → MEDIUM → LOW.
4. Conflicts between reviewers must be flagged explicitly.
5. Architecture and security concerns take priority over style feedback.
6. Synthesize into a single verdict and action list.

PREFERRED SKILLS
- `tech-lead-review` for synthesis gate
- `security-review` when auth/payments/migrations are in scope
- `self-validate` before declaring the review complete

VERDICT (synthesized from all three reviewers)
Return exactly one:
- APPROVED
- APPROVED WITH NOTES
- CHANGES REQUESTED
- NEEDS DISCUSSION

OUTPUT FORMAT
- Scope reviewed: [files, modules, or description]
- Team findings:
  | Reviewer | Severity | Finding | File:Line | Recommendation |
  |----------|----------|---------|-----------|----------------|
  | Code | ... | ... | ... | ... |
  | Arch | ... | ... | ... | ... |
  | Security | ... | ... | ... | ... |
- Conflicts: [any disagreements between reviewers, if any]
- Verdict: [single synthesized verdict]
- Priority actions: [ordered list of changes required before ship]
- Praise: [what was done well]
