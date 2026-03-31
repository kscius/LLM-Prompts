---
name: debugging
description: >-
  Systematic debugging workflow for diagnosing and fixing bugs, errors, and
  unexpected behavior. Use when investigating failures, reading stack traces,
  reproducing issues, root-causing regressions, or when the cause of a problem
  is unknown. Applies structured hypothesis-driven debugging before patching.
---

# Debugging

Diagnose root cause before patching. Speculation without evidence wastes iterations.

## When to Use

- An error, crash, or unexpected behavior needs to be understood
- A fix was applied but the issue persists or regressed
- A test is failing and the cause is not obvious from the error message
- A user reported a bug that cannot be reproduced from the description alone
- The codebase is unfamiliar and you need to trace execution before editing

## Process

### 1. Read the error completely

Before doing anything else:

- Read the full error message — not just the first line
- Note the error type, message, file path, and line number
- Check the stack trace from bottom (root call) to top (failure point)
- If a test failure: read the expected vs actual diff carefully

### 2. Reproduce before fixing

Do not patch code you cannot reproduce. Confirm:

- Does the error occur consistently or intermittently?
- What exact inputs / state trigger it?
- Which environment (dev / test / prod)?
- Did it ever work? What changed since then?

Use `git log --oneline -20` and `git diff` to identify recent changes if a regression.

### 3. Narrow the blast radius

Before reading all files:

- Which file/function does the stack trace point to?
- What module owns that code?
- What inputs reach the failing line?

Read **that specific file and function** first. Expand only when needed.

### 4. Form hypotheses (max 3)

State 2–3 candidate root causes ranked by likelihood based on evidence:

```
Hypothesis 1 (most likely): [specific claim about what is wrong, why]
Hypothesis 2: [alternative explanation]
Hypothesis 3 (if applicable): [third candidate]
```

Do not start editing until you have hypotheses.

### 5. Verify, don't assume

Test each hypothesis against evidence:

- Read the relevant code path end-to-end
- Add temporary `console.log` / `print` / `puts` to confirm state if needed
- Check that imports, types, and function signatures match expected usage
- Verify that env vars, config values, and service dependencies are what you think they are

**Do not patch** until the root cause is confirmed by evidence.

### 6. Apply the minimal fix

Once root cause is confirmed:

- Make the smallest change that fixes the root cause
- Do not refactor unrelated code in the same change
- If a type or contract needs to change, update all callers

### 7. Verify the fix

After applying the fix:

- Re-run the failing test or reproduction case
- Run the full relevant test suite to catch regressions
- If the fix only works in isolation but not end-to-end, dig deeper

### 8. Prevent recurrence

After fixing, consider:

- Add a test that would have caught this
- If the bug was silent (no error, just wrong behavior), add an assertion
- Update docs or comments if the code is non-obvious

## Common Patterns

### Stack overflow / infinite recursion
Trace call graph; find where recursion exits; check base case.

### Null / undefined / nil reference
Add null check at the point of failure; trace where the value originates; confirm callers always provide it or handle absence.

### Race condition
Look for shared mutable state accessed by concurrent code; check for missing locks, missing `await`, or incorrect async ordering.

### Wrong data
Add logging before the failure; confirm what the data looks like at each transformation step; find where it diverges from expected.

### Environment-specific failure
Check env vars, secrets, feature flags, and service availability in each environment; diff configs across environments.

### Works locally, fails in CI
Check: missing env vars, platform differences (Windows vs Linux paths), timezone assumptions, dependency version drift.

## Output Format

```
## Debug Report

**Error / Symptom**: [exact error message or behavior]
**Reproduced**: yes / no / intermittent
**Root cause**: [specific finding with file path and line if known]
**Hypothesis tested**: [what was confirmed or ruled out]
**Fix applied**: [minimal description of the change]
**Validation**: [test or reproduction result after fix]
**Regression risk**: [what other areas might be affected]
```

## Guardrails

- Do not patch blindly — root cause must be confirmed before editing
- Do not expand scope to unrelated refactors during a debugging session
- If after 3 fix attempts the issue persists, stop and re-analyze from scratch
- State explicitly when the root cause is still uncertain
