#Iterate on failures until the repo is stable again

Enter focused repair mode.

TASK:
{{args}}

MISSION
Diagnose the real failure surface, apply the smallest high-confidence fix, rerun the right validations immediately, and continue until the repo is stable again or a concrete blocker is proven.

POLICY
1. Identify the smallest failing surface first.
2. Reproduce the issue directly.
3. Determine likely root cause before editing.
4. Use `debug-issue` by default when logs, stack traces, flaky behavior, validation drift, or failure correlation matter.
5. Use only the MCPs that materially improve diagnosis or repair.
6. Apply the smallest high-confidence fix first.
7. Rerun the relevant failing checks immediately.
8. Expand verification only after the direct issue is resolved.
9. If the failure is mainly lint/static-analysis related, use `lint-suite`.
10. If the failure is mainly test-suite related or there are multiple broken tests, use `run-all-tests-and-fix`.
11. If the fix changes behavior or reveals missing coverage, use `write-unit-tests`.
12. If the failure comes from user-facing wording, docs tone, confusing copy, or poor error messaging, use `humanizer`.
13. If the safest repair is to simplify code, remove duplication, or reduce complexity while preserving behavior, use `reducing-entropy`.
14. If the fix touches sensitive code, finish with:
   - `code-reviewer`
   - `security-review` and/or `review-and-secure` when auth, permissions, validation, secrets, sessions, uploads, or sensitive data are involved
15. If the fix touches schema, migrations, constraints, indexes, or data transforms, run `database-schema-designer`.
16. Do not patch blindly.
17. Do not stop while the direct failing surface is still reproducible unless there is a real demonstrated blocker.

PREFERRED REPAIR SKILLS
- `security-review`, `review-and-secure`, `backend-patterns`, `nodejs-backend-patterns`, `react-dev`
- `react-useeffect` for effect/state synchronization issues
- `database-schema-designer` for schema, migration, or constraint failures
- `webapp-testing` for reproducible browser/UI failures
- `vercel-react-best-practices` for React/Next rendering or performance regressions
- `receiving-code-review` when applying concrete review feedback during repair
- `create-rule` or `update-cursor-settings` only when the failure originates there
- `humanizer` for human-facing copy, docs tone, UX text, or error message quality issues
- `reducing-entropy` for simplification, deduplication, or safe complexity reduction during repair

PREFERRED SUBAGENTS
- Default: `debugger`
- Error analysis: `error-detective`, `error-coordinator`
- Final review: `code-reviewer`
- Conditional implementers: `frontend-developer`, `backend-developer`, `fullstack-developer`, `nextjs-developer`
- Conditional specialists: `database-administrator`, `database-optimizer`, `build-engineer`, `performance-engineer`, `refactoring-specialist`, `qa-expert`, `security-engineer`, `security-auditor`, `dependency-manager`, `sre-engineer`

PREFERRED MCPS
- Base: `user-cursor10x-mcp`, `user-devcontext`, `user-Sequentialthinking`, `user-context7`, `user-github`
- Conditional: `cursor-ide-browser`, `user-semgrep`, `user-eamodio.gitlens-extension-GitKraken`, `user-duckduckgo`, `user-time`, `user-memory`

Keep repair mode narrow: prioritize diagnosis, smallest safe fix, and immediate revalidation.

ESCALATION RULE
If after 2 repair iterations the issue appears architectural, contractual, flaky-by-design, or out of scope:
- explain the concrete root cause first
- then adjust the repair approach
- only stop if the blocker is proven and cannot be resolved safely from the repo/tooling available

OUTPUT FORMAT
- Failure surface
- Root cause
- Skills/subagents/commands used
- Fix applied
- Checks rerun
- Final status
- Remaining blocker if any

ITERATION TRACKING
Track each repair attempt explicitly:

ATTEMPT [N]:
- Hypothesis: [what I think is wrong]
- Evidence: [why I think this]
- Fix applied: [what I changed]
- Validation result: [pass/fail]
- Duration: [estimated]

This creates an audit trail for complex fix loops.

CIRCUIT BREAKER (enhanced)

Tier 1 (after 2 iterations):
- Re-analyze from scratch
- Consider alternative approach
- Check if the issue is in the test, not the code

Tier 2 (after 3 iterations):
- Stop implementation
- Full failure report with all attempts
- Classify: architectural / environmental / scope / dependency
- Propose alternative approach

Tier 3 (after 5 iterations):
- Hard stop
- Document everything tried
- Require explicit user direction

Between tiers:
- Use `user-Sequentialthinking` to reason about the root cause
- Check `user-cursor10x-mcp` for similar past failures

ERROR PATTERN MATCHING
Before starting a fix attempt, categorize the error:

- TYPE_ERROR: Type mismatch, missing property, incorrect type
  → Usually a contract/interface issue. Check types first.
- RUNTIME_ERROR: Null reference, undefined, out of bounds
  → Usually a missing guard or incorrect assumption. Trace data flow.
- TEST_FAILURE: Assertion failed, expected vs actual mismatch
  → Could be code bug OR stale test. Check both.
- BUILD_ERROR: Compilation failed, missing module, syntax error
  → Usually a dependency or import issue. Check imports/configs.
- LINT_ERROR: Style/convention violation
  → Apply autofix first, then manual fixes.
- TIMEOUT/FLAKY: Intermittent failure
  → Check for async issues, race conditions, external dependencies.

Route repair strategy based on error category.