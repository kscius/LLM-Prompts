---
name: test-driven-development
description: TDD workflow discipline — red→green→refactor cycle for any new feature, bugfix, or behavior change. Use when implementing any feature or fixing any bug before writing production code. Proactively apply when user says "add feature", "implement", "fix bug", or "build X".
---

# Test-Driven Development (TDD)

Write the test first. Watch it fail. Write minimal code to pass. Repeat.

**Core law:** No production code without a failing test first. No exceptions without explicit user permission.

## When to Use

- New features or endpoints
- Bug fixes (write a failing test reproducing the bug first)
- Refactoring behavior
- Any implementation the user asks for

**Exceptions (ask user first):** throwaway prototypes, generated/config files, pure UI styling.

## The Red-Green-Refactor Cycle

### 1. RED — Write one failing test

Test one behavior. Clear name. Real code (no mocks unless unavoidable).

```typescript
// Good: descriptive, one thing, tests real behavior
test('rejects empty email with validation error', async () => {
  const result = await submitForm({ email: '' });
  expect(result.error).toBe('Email required');
});
```

Requirements: one behavior, clear name, no implementation code exists yet.

### 2. Verify RED — Watch it fail

**Mandatory. Never skip.**

```bash
npm test path/to/test.test.ts
# OR: pytest tests/test_module.py::test_name
# OR: go test -run TestName ./...
```

Confirm: test fails (not errors), failure message makes sense, fails because feature is missing.

- **Test passes immediately?** You're testing existing behavior. Fix the test.
- **Test errors?** Fix the error, re-run until it fails correctly.

### 3. GREEN — Write minimal code to pass

Write the simplest code that makes the test pass. No YAGNI. No over-engineering.

```typescript
// Good: just enough
function submitForm(data: { email: string }) {
  if (!data.email?.trim()) return { error: 'Email required' };
  // ... rest
}
```

**Do not** add extra features, refactor unrelated code, or "improve" beyond what the test requires.

### 4. Verify GREEN — Watch it pass

```bash
npm test path/to/test.test.ts  # Must pass
npm test                        # All other tests must still pass
```

Fix production code if test fails — never fix the test to pass. Fix other tests if they broke.

### 5. REFACTOR — Clean up with tests green

Extract helpers, improve names, remove duplication. Run tests after every change. No new behavior.

### Repeat

Start next failing test for next behavior.

## Bug Fix Pattern

**Bug:** empty email is accepted

```typescript
// Step 1: write failing test reproducing the bug
test('rejects empty email', async () => {
  const result = await submitForm({ email: '' });
  expect(result.error).toBe('Email required');
});

// Step 2: verify it fails (proves the bug exists)
// Step 3: fix production code minimally
// Step 4: verify it passes + no regressions
```

Never fix a bug without a test that reproduced it first.

## Red Flags — Stop and Restart

- Wrote production code before any test
- Test passed immediately without implementation
- Cannot explain why the test should fail
- Added "just a little" implementation to see if the test makes sense
- "I'll add tests after to verify it works"

**All of these:** delete the production code, start over with the test.

## Completion Checklist

Before marking work done:

- [ ] Every new function/method has a test that failed first
- [ ] Watched each test fail with the expected failure reason
- [ ] Wrote minimal code to make each test pass
- [ ] All tests pass; output is clean (no errors, warnings)
- [ ] Edge cases and error paths have tests
- [ ] No mocks used where real code could be tested

## Common Rationalizations

| Excuse | Why it fails |
|--------|-------------|
| "Too simple to test" | Simple code breaks too. Test takes 30 seconds. |
| "I'll test after" | Tests written after pass immediately — proves nothing. |
| "Already manually tested" | Ad-hoc ≠ systematic. Can't re-run. Doesn't catch regressions. |
| "TDD slows me down" | Debugging production issues is slower. TDD prevents them. |
| "Existing code has no tests" | Add tests for what you touch. Improve incrementally. |

## Integration with this Setup

- Pairs with `testing-strategy` skill (test design patterns and what to test)
- Pairs with `debugging` skill (when a failing test reveals a non-obvious bug)
- Pairs with `self-validate` (final checklist before declaring done)
- Works with `ship-feature` as the implementation discipline within it

## References

Based on [obra/superpowers test-driven-development](https://github.com/obra/superpowers) — the most widely-adopted TDD skill in the agent skills ecosystem.
