# /debug-mode — Hypothesis-driven debug with runtime instrumentation

Invoke this command for bugs that are hard to find by reading code alone: intermittent failures,
race conditions, timing issues, performance regressions, or any bug where two or more previous
attempts failed to identify the root cause.

This follows Cursor's recommended "Debug Mode" protocol: generate hypotheses → instrument code
to observe state → ask user to reproduce → analyze runtime evidence → apply targeted fix.

TASK:
{{args}}

## WHEN TO USE

Use `/debug-mode` when:
- You've read the code and still cannot locate the bug
- The bug is intermittent or timing-sensitive
- The problem reproduces for the user but not in tests
- Two or more attempts to fix the wrong place already failed
- You need runtime state to narrow the root cause

Do NOT use for bugs obvious from reading the code — use `/debug-issue` for those.

## OPERATING RULES

1. Do NOT propose a fix before completing Steps 1–4. Premature fixes without evidence are the
   leading cause of debug loops.
2. Do NOT change logic during instrumentation — only add observability (logging, breakpoints,
   counters). Changing logic mid-investigation invalidates the evidence.
3. Generate at least 3 hypotheses. Rank by likelihood with brief justification.
4. Remove ALL instrumentation before committing the fix.
5. Verify the fix by asking the user to reproduce the original scenario again.

## STEP 1 — GATHER REPRODUCTION CONTEXT

Ask the user (or infer from the task) the following. Be specific:
- What are the exact steps to reproduce?
- What is the expected behavior?
- What is the actual behavior?
- Is this always reproducible or intermittent? If intermittent, what percentage of the time?
- When did it start? Is it tied to a recent commit, deployment, or data change?
- What has already been tried?

## STEP 2 — GENERATE HYPOTHESES

Based on the reproduction context and code inspection, produce a ranked list of 3–5 hypotheses.

Format each as:
- **H1 (most likely):** [What might be wrong] — [Why this ranks highest]
- **H2:** [Alternative root cause] — [Evidence that supports or weakens this]
- **H3–H5:** [Additional candidates]

Do not skip this step. Name the hypotheses before touching any code.

## STEP 3 — INSTRUMENT THE CODE

Add targeted observability to validate or invalidate the top 2–3 hypotheses.

Rules for instrumentation:
- Log input values, intermediate state, branching decisions, and return values at the relevant points.
- Use clear, searchable log labels (e.g., `[debug-mode H1]`, `[debug-mode H2]`).
- Instrument the minimal set of locations needed — do not add logging everywhere.
- Do NOT modify logic. If a suspected bug location looks wrong, note it but do not fix it yet.

After instrumenting: explain to the user which hypothesis each instrumentation point is designed
to validate and ask them to run the reproduction scenario.

## STEP 4 — ANALYZE RUNTIME EVIDENCE

When the user provides output:
- Map each log line back to its hypothesis.
- State explicitly which hypotheses are confirmed, which are eliminated, and which remain uncertain.
- Identify the minimal root cause supported by the evidence.

If the evidence is ambiguous: add a second instrumentation pass targeting the remaining candidates.
Do NOT guess. Do NOT fix before the root cause is confirmed.

## STEP 5 — TARGETED FIX

Once the root cause is confirmed by evidence:
- Apply the smallest correct fix to the confirmed root cause only.
- Remove all instrumentation added in Step 3.
- Explain what the fix does and why it addresses the root cause.

## STEP 6 — VERIFY

- Ask the user to run the original reproduction scenario again.
- Confirm the bug is gone.
- Run the relevant test suite if one exists.
- If the bug recurs or a different failure appears, re-enter at Step 2 with updated hypotheses.

## FIX LOOP CAP

If you have completed Steps 1–6 twice without resolving the bug, stop.
Document:
- The two hypotheses that were confirmed and then rejected
- The evidence that contradicted each fix
- The remaining uncertainty about root cause

Escalate to the user with this report. Do not continue blind patching.

## OUTPUT FORMAT

After each step, emit a brief status block:

```
STEP [N] COMPLETE: [one-line summary]
Hypotheses: H1=[status], H2=[status], H3=[status]
Next action: [what happens next]
```

Final report:
- Root cause confirmed: [description]
- Fix applied: [file(s) changed, what changed]
- Instrumentation removed: yes/no
- Verification: [result of re-running the repro]
- Residual risk: [anything still uncertain]
