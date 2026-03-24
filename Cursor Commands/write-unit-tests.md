#Generate targeted unit tests following repo conventions

Write unit tests that match the project's existing test patterns and provide real coverage.

TASK:
{{args}}

MISSION
Generate focused unit tests for the specified code, following the repo's testing framework and conventions, covering happy paths, edge cases, and error conditions.

OPERATING RULES
1. Inspect existing tests first to learn the repo's patterns:
   - Testing framework (jest, vitest, pytest, rspec, phpunit, etc.)
   - File naming convention (*.test.ts, *.spec.ts, *_test.go, etc.)
   - Directory structure (co-located, __tests__/, test/, spec/)
   - Mocking patterns (jest.mock, vi.mock, factory_bot, etc.)
   - Setup/teardown conventions
2. Generate tests that look like they belong in the repo.
3. Test structure per test case:
   - Arrange: set up inputs and dependencies
   - Act: call the function/method under test
   - Assert: verify the expected outcome
4. Required coverage:
   - Happy path (normal expected input)
   - Edge cases (empty, null, boundary values, large inputs)
   - Error conditions (invalid input, network failures, permissions)
   - State transitions (if applicable)
5. Mock external dependencies, not internal logic.
6. Each test should test exactly one behavior.
7. Test names should describe the behavior, not the implementation.
8. Run the new tests to confirm they pass.

PREFERRED SKILLS
- `backend-patterns` for backend test patterns
- `react-dev` for React component tests
- `react-useeffect` for hook tests
- `database-schema-designer` for DB-related tests

PREFERRED SUBAGENTS
- Default: `qa-expert`
- For complex mocking: `backend-developer` or `frontend-developer`

OUTPUT FORMAT
- Test framework detected: [framework]
- Test file created/updated: [path]
- Tests written:
  - [test name] → [what it covers]
  - ...
- Test run result: [pass/fail]
- Coverage impact: [if measurable]