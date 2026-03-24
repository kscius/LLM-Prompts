#Run test suite, categorize failures, and fix systematically

Stabilize the test suite by diagnosing and fixing real failures.

TASK:
{{args}}

MISSION
Run the full test suite, categorize every failure, fix each one starting with the most impactful, and rerun until green or a real blocker is proven.

OPERATING RULES
1. Detect the test command from package.json, Makefile, CI config, or docs. Do not invent test commands.
2. Run the full suite first to get a complete picture.
3. Categorize failures before fixing anything:
   - BROKEN: real logic error, needs code fix
   - STALE: test references outdated code/API, needs test update
   - FLAKY: passes intermittently, needs isolation or retry logic
   - ENVIRONMENT: depends on external service/config not available
4. Fix BROKEN first, then STALE, then FLAKY. Skip ENVIRONMENT with documentation.
5. After each fix, rerun only the affected test(s) for fast feedback.
6. After all individual fixes, rerun the full suite to catch regressions.
7. If a fix changes behavior, verify the behavior change is intentional.

PREFERRED SKILLS
- `backend-patterns`, `nodejs-backend-patterns` for backend test failures
- `react-dev` for component test failures
- `database-schema-designer` for DB-related test failures

PREFERRED SUBAGENTS
- Default: `qa-expert`
- For complex failures: `debugger`
- Final review: `code-reviewer`

PREFERRED MCPS
- Base: `user-cursor10x-mcp`, `user-devcontext`
- Conditional: `user-Sequentialthinking` for complex failure chains

OUTPUT FORMAT
- Test command used: [command]
- Total tests: [N]
- Passed: [N] | Failed: [N] | Skipped: [N]
- Failure categories:
  - BROKEN: [list with file:line]
  - STALE: [list with file:line]
  - FLAKY: [list with file:line]
  - ENVIRONMENT: [list with reason]
- Fixes applied: [per failure]
- Final suite run: [pass/fail with numbers]
- Remaining blockers: [if any]