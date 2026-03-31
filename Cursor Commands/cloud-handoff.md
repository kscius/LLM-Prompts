# /cloud-handoff — Delegate a task to a Cursor Cloud Agent (async)

Use this command to hand off a well-scoped task to a Cursor Cloud Agent that runs in a remote
Ubuntu VM — independently of your machine, continuing even after you close your laptop.

Cloud Agents (Cursor Jan 2026+) can: clone the repo, create a branch, implement the task,
run tests, and open a PR with a video/screenshot artifact. You monitor from cursor.com/agents
or get notified via Slack/email.

TASK:
{{args}}

## WHEN TO USE

Use `/cloud-handoff` when:
- The task is well-scoped with clear acceptance criteria
- Estimated local agent time is >10–15 minutes and you want async execution
- You want to continue working on something else while this runs
- The task ends with a PR (Cloud Agents produce PR artifacts natively)
- You want a demo video/screenshot artifact alongside the code

Do NOT use for:
- Tasks requiring access to local files, secrets, or services not available via git remote
- Tasks that need interactive back-and-forth with you mid-execution
- Destructive operations on production databases or infrastructure
- Tasks where the repo is not accessible to Cursor's cloud infrastructure
- Work that requires local `.env` secrets (cloud agents cannot access your local env)

## STEP 1 — SCOPE CHECK

Before handoff, verify:
1. Is the task bounded and unambiguous? (Cloud agents cannot ask clarifying questions mid-run)
2. Does the repo have a public or Cursor-connected git remote?
3. Are all necessary environment variables or secrets configured in Cursor's cloud settings
   (cursor.com/settings → Cloud Secrets)?
4. Is the success criterion clear? (What does "done" look like — test passing, PR opened?)

If any answer is no, resolve it before handing off. An ambiguous handoff to a cloud agent
produces an ambiguous (and expensive) result.

## STEP 2 — WRITE THE TASK PROMPT

Cloud agent prompts must be self-contained — the agent has no prior conversation context.
Include everything it needs:

```
## Task
[What to implement/fix/do — one clear objective]

## Acceptance criteria
- [Observable outcome 1]
- [Observable outcome 2]
- [Test that must pass, if applicable]

## Constraints
- Do NOT modify: [files or patterns to avoid]
- Follow existing conventions in: [relevant module or pattern to reference]
- Branch name: cloud/[feature-slug]
- PR title: [suggested title]

## Context
- Relevant files: [paths or modules to look at first]
- Related pattern: [if there's an existing file to follow as a model]
- Stack: [language, framework, test runner]
```

## STEP 3 — HAND OFF VIA CLI

Use one of these methods based on your Cursor version:

### Method A — `&` prefix (recommended, Cursor CLI Jan 2026+)

```bash
cursor agent -p "&[your full task prompt here]" --cwd /path/to/repo
```

The `&` prefix signals a cloud agent session. Cursor returns a tracking URL immediately.

### Method B — `-c` flag (cloud session flag)

```bash
cursor agent -c --prompt "[your full task prompt here]" --cwd /path/to/repo
```

### Method C — Via agent-dispatch.js with cloud mode

```bash
node ~/.cursor/hooks/agent-dispatch.js \
  --prompt "&[task prompt]" \
  --cwd /path/to/repo
```

After running: capture the returned session URL from stdout.

## STEP 4 — MONITOR AND REVIEW

1. **Track progress:** Visit `cursor.com/agents` or check the URL returned by the CLI.
2. **Notifications:** If Slack or email notifications are configured, you will be alerted
   on completion.
3. **PR artifact:** When the cloud agent finishes, it opens a PR in your repo. The PR will
   include:
   - Code changes
   - Test results summary
   - Video recording (if computer use is enabled)
   - Screenshot of the final state

4. **Review the PR** as you would any other PR: check changes, run CI, request review, merge.

## STEP 5 — IF THE HANDOFF FAILS OR PRODUCES WRONG RESULTS

If the cloud agent produces incorrect or incomplete output:
- Review the session log at `cursor.com/agents` to understand where it went wrong
- Update the task prompt (add missing context, tighten the constraints)
- Re-handoff with the updated prompt
- If it fails twice on the same task, the task is likely too ambiguous or requires local
  context — run it locally instead

## PREREQUISITES

- Cursor plan: Cloud Agents require Max Mode or a plan that includes cloud agent access.
  Check your plan at `cursor.com/settings`.
- CLI installed: `cursor` command must be available in PATH. Verify with `cursor --version`.
- Cloud secrets: If the task needs API keys or tokens, configure them at
  `cursor.com/settings → Cloud Secrets` (not local `.env`).

## OUTPUT FORMAT

When invoking, produce a handoff summary:

```
CLOUD HANDOFF INITIATED
=======================
Task: [one-line description]
Repo: [remote URL]
Branch target: [suggested branch name]
Success criteria:
  - [criterion 1]
  - [criterion 2]
CLI command used: [exact command run]
Tracking URL: [returned by CLI or "pending — check cursor.com/agents"]
Estimated completion: [if estimable, or "unknown — monitor via tracking URL"]
```
