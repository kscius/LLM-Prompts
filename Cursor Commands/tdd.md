# /tdd — Test-Driven Development agent loop

Enforce strict TDD (Red → Green → Refactor) for a given feature or behavior.

This command follows Cursor's officially recommended agentic TDD pattern:
write failing tests first → confirm they fail → commit tests → implement until green →
commit implementation. Do NOT invert this order.

TASK:
{{args}}

## MISSION

Implement the requested behavior using strict TDD. The implementation must never be written
before the tests exist and fail. The tests must never be modified after they are committed
unless a design error is discovered (and must be surfaced to the user if so).

## NON-NEGOTIABLE RULES

1. NO implementation code before the tests are written and verified to fail.
2. If any test passes before implementation exists, that test is wrong — stop and fix it.
3. Do NOT modify tests after they are committed unless a design error is found and surfaced.
4. Use the repo's existing test framework (detect from package.json, pyproject.toml, Gemfile,
   go.mod, etc.). Do NOT introduce a new test runner.
5. Remove only the minimum implementation needed to make tests fail (i.e., delete or stub
   the function under test, do not break unrelated things).
6. Commit tests and implementation in separate commits with standard prefixes.

## STEP 1 — UNDERSTAND THE BEHAVIOR

Before writing anything, clarify the exact input/output contract:

Collect or confirm from the task:
- What function, method, endpoint, or component is being built?
- What are the key input→output pairs? (happy path, edge cases, error paths, boundary values)
- Are there integration concerns (database, external API, filesystem) or is this pure logic?
- What is the performance or security contract, if any?

If the task is underspecified, ask before proceeding.

## STEP 2 — WRITE FAILING TESTS

Write tests covering:
- **Happy path** — the standard success case
- **Edge cases** — boundary values, empty inputs, max values, unusual but valid inputs
- **Error paths** — invalid input, missing required fields, permission denied, network failure
- **Regression cases** — if fixing a bug, include a test that would have caught the original bug

Rules:
- Tests must be in the repo's established test location and format.
- Tests must call the actual function/endpoint/component (not mock everything).
- Tests must be self-contained and not depend on other tests' execution order.
- If the function does not exist yet, import/require it anyway — the test will fail at import.

After writing: explain which hypothesis or behavior each test validates.

## STEP 3 — CONFIRM TESTS FAIL

Run the test suite for the new tests:

```bash
# Detect from repo and run only the new tests. Example:
npm test -- --testPathPattern=<new-test-file>
# or
pytest <new-test-file>
# or
go test ./... -run TestMyFeature
```

**Gate:** Every new test MUST fail at this point.
- If all fail → proceed to Step 4.
- If any pass unexpectedly → STOP. The test is not testing what you think. Fix the test and
  re-confirm failure before moving on.

Emit the test output (or a summary) showing the failure mode.

## STEP 4 — COMMIT THE TESTS

Stage only the test files. Do not stage any implementation.

```bash
git add <test files only>
git commit -m "test: add failing tests for <feature>"
```

This commit is the contract. What the tests assert is what the implementation must satisfy.

## STEP 5 — IMPLEMENT

Write the minimum implementation that makes all tests pass. Rules:
- Do NOT over-engineer. Write only what the tests require.
- Do NOT modify the tests. If a test seems wrong, surface it to the user.
- Iterate: run tests after each meaningful implementation change.
- If an implementation decision has multiple valid options, prefer the one consistent with
  existing repo patterns.

After each iteration, show test output to confirm progress.

## STEP 6 — CONFIRM ALL TESTS PASS

Run the full relevant test suite (not just the new tests) to confirm no regressions:

```bash
# Full suite or affected scope:
npm test
# or
pytest
# or
go test ./...
```

**Gate:** ALL tests (new + existing) must be green before proceeding.
- If existing tests broke → fix the regression before proceeding.
- If the new tests pass but the suite has unrelated failures → document them; do not fix
  unrelated failures in this commit.

## STEP 7 — LINT AND TYPECHECK

Run available static checks:

```bash
# Detect from repo. Examples:
npm run lint && npm run typecheck
# or
ruff check . && mypy .
```

Fix any issues introduced by the implementation. Do not fix pre-existing issues unrelated to
the current change.

## STEP 8 — COMMIT IMPLEMENTATION

Stage implementation files (not the test files again — they are already committed).

```bash
git add <implementation files>
git commit -m "feat: implement <feature> (TDD)"
```

## STEP 9 — OPTIONAL REFACTOR

If the implementation has obvious duplication, poor naming, or complexity that the tests allow
you to simplify safely:
- Refactor.
- Re-run tests after every refactor step.
- Commit with: `refactor: clean up <feature> implementation`

Do not refactor just for style. Only refactor when there is a clear maintainability gain.

## OUTPUT FORMAT

After each step, emit a brief status block:

```
STEP [N] COMPLETE: [one-line summary]
Tests: [N failing / N passing / N total]
Next action: [description]
```

Final summary:
- Tests written: [count] ([list of cases covered])
- Tests committed: [commit hash or "pending"]
- Implementation committed: [commit hash or "pending"]
- Lint/typecheck: green / blocked (reason)
- Regressions introduced: none / [description]
- What was NOT built: [list any scope excluded for clarity]
