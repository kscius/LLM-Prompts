---
name: testing-strategy
description: Testing strategy patterns for unit, integration, and e2e tests. Use when deciding what to test, how to test, or reviewing test quality and coverage.
---

# Testing Strategy Skill

Use this skill when making testing decisions or writing/reviewing tests.

## Test Pyramid
- Many unit tests (fast, isolated, specific)
- Fewer integration tests (service boundaries, API contracts)
- Few e2e tests (critical user flows only)

## What to Test
- Business logic: always
- Data transformations: always
- API endpoints: request/response contracts
- UI components: rendering, user interactions, state changes
- Edge cases: empty, null, boundary, concurrent, error paths
- Regressions: add a test for every bug you fix

## What NOT to Test
- Framework internals (React rendering engine, Express routing)
- Simple getters/setters with no logic
- Implementation details (prefer testing behavior)
- Third-party library behavior

## Test Quality Checklist
- Each test has one clear assertion
- Test names describe behavior ("should return 404 when user not found")
- Tests are independent (no shared mutable state)
- Tests are deterministic (no random, no timing)
- Mocks are minimal (mock boundaries, not internals)
- Setup is clear and minimal

## When to Write Tests
- Before fixing a bug (reproduce first)
- After implementing new behavior
- Before refactoring (characterization tests)
- When confidence in a code path is low