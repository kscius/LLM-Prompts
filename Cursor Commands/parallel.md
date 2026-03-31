# /parallel — Run multiple agents in parallel and compare results (Best-of-N)

Use this command when the correct solution is genuinely uncertain — hard architectural decisions,
complex bugs with multiple plausible root causes, or situations where you want different
models or approaches to attempt the same problem independently.

Cursor 2.5+ supports native parallel agents via git worktrees, each running in its own
isolated environment. This command structures the setup, execution, and comparison.

TASK:
{{args}}

## WHEN TO USE

Use `/parallel` when:
- Multiple valid implementation approaches exist and the best choice is not obvious
- A hard problem where different models may attack it differently (e.g., Claude vs. GPT-4o)
- You want to benchmark output quality before committing to one approach
- An architectural decision has meaningful trade-offs that need side-by-side evidence
- A difficult bug has 2–3 plausible root causes and you want to test fixes in isolation

Do NOT use for:
- Simple tasks with a clear single approach (overhead not worth it)
- Tasks where all agents would need to mutate the same migration chain or shared state
- Work with external side effects (e.g., sending emails, writing to production DB)

## STEP 1 — DEFINE THE TASK AND SUCCESS CRITERIA

Before spawning any agents, specify:
1. **Task:** What exact problem should each agent attempt?
2. **Success criterion:** How will you evaluate which result is better?
   - Test suite passes?
   - Performance benchmark?
   - Code review quality?
   - Architectural clarity?
3. **Number of approaches:** 2 or 3 (more than 3 adds noise without proportional benefit)
4. **Differentiation:** How should the approaches differ?
   - Different models (specify in the Cursor agent dropdown or via CLI)
   - Same model, different constraints (e.g., "performance-first" vs. "readability-first")
   - Different architectural patterns (e.g., "event-driven" vs. "request-response")

## STEP 2 — SET UP GIT WORKTREES

Each approach needs its own isolated working copy:

```bash
# Create worktrees for each approach (from repo root):
git worktree add ../approach-a -b parallel/approach-a
git worktree add ../approach-b -b parallel/approach-b
# Add approach-c if running 3 approaches:
git worktree add ../approach-c -b parallel/approach-c
```

Verify worktrees are clean copies of the current branch state:
```bash
git worktree list
```

Each worktree is fully independent — changes in one do not affect the others.

## STEP 3 — DEFINE AGENT PROMPTS

Write the prompt that will be sent to each agent. Prompts should be:
- Identical in task description (same problem)
- Different only in the approach constraint (if differentiating by strategy)
- Explicit about the success criterion

Example differentiation:
- Approach A: "Implement [task]. Optimize for type safety and explicit error handling."
- Approach B: "Implement [task]. Optimize for minimal code and high readability."
- Approach C: "Implement [task]. Use the event-driven pattern established in src/events/."

## STEP 4 — LAUNCH AGENTS IN PARALLEL

### Option A — Native Cursor UI (Cursor 2.5+)

1. In the Cursor agent panel, open the model dropdown.
2. Select "Run in parallel worktrees" (if available on your plan/version).
3. Submit the prompt — Cursor creates isolated worktrees and runs agents simultaneously.
4. Monitor progress in the multi-agent panel.

### Option B — CLI (headless parallel)

Run each approach in its own Shell process concurrently:

```bash
# From each worktree directory (run these simultaneously):
# Window 1:
cd ../approach-a && node ~/.cursor/hooks/agent-dispatch.js \
  --prompt "Approach A: [task description]" --mode plan --cwd .

# Window 2:
cd ../approach-b && node ~/.cursor/hooks/agent-dispatch.js \
  --prompt "Approach B: [task description]" --mode plan --cwd .
```

Use `--mode plan` or `--mode ask` for read-only evaluation, `--force` only when you want
agents to actually apply changes in each worktree.

## STEP 5 — EVALUATE RESULTS

When all agents have completed, compare using the pre-defined success criteria:

```bash
# Run tests in each worktree:
cd ../approach-a && npm test   # (or equivalent)
cd ../approach-b && npm test

# Run lint:
cd ../approach-a && npm run lint
cd ../approach-b && npm run lint

# Check diff size:
cd ../approach-a && git diff main --stat
cd ../approach-b && git diff main --stat
```

Evaluation checklist:
- [ ] All tests pass? (gate — disqualify any approach where tests fail)
- [ ] Lint/typecheck clean?
- [ ] Success criterion met (performance, readability, architectural fit)?
- [ ] Does the approach follow existing repo patterns?
- [ ] Diff is proportional to the problem size (no unnecessary churn)?

## STEP 6 — SELECT AND APPLY THE WINNER

Once a winning approach is identified:

```bash
# In Cursor UI: click "Apply" on the winning worktree (if native worktree UI available)
# OR via CLI: cherry-pick or merge the winning branch:

git checkout main  # (or your working branch)
git merge parallel/approach-a  # (replace with winning branch)
```

Run the full test suite one more time after merging to confirm clean integration.

## STEP 7 — CLEAN UP WORKTREES

```bash
git worktree remove ../approach-a
git worktree remove ../approach-b
git worktree remove ../approach-c  # if used

# Delete the comparison branches:
git branch -D parallel/approach-a parallel/approach-b
```

## OUTPUT FORMAT

After evaluation, produce a comparison report:

```
PARALLEL RUN RESULTS
====================
Task: [description]
Success criterion: [how evaluated]

Approach A ([model/strategy]):
- Tests: [pass/fail — N/N]
- Lint: [clean/N errors]
- Criterion met: [yes/no — notes]
- Diff size: [N files, N insertions, N deletions]
- Notable strengths: [...]
- Notable weaknesses: [...]

Approach B ([model/strategy]):
[same format]

WINNER: Approach [X]
Reason: [why it won]
Applied: [yes/no — how]
Worktrees cleaned: [yes/no]
```
