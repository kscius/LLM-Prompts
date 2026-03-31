# /automations-spec — Design a Cursor Automation (trigger-based always-on agent)

Use this command to design a Cursor Automation: an always-on agent that runs without you present,
triggered by a schedule, GitHub event, Slack message, Linear issue, PagerDuty alert, or webhook.

This is a design/specification command. It interviews you about what you want to automate,
then produces a complete spec you can paste into the Cursor Automation builder at
cursor.com/automations (or the Marketplace).

TASK:
{{args}}

## WHAT ARE CURSOR AUTOMATIONS

Cursor Automations (March 2026+) let you build "AI coworkers" that:
- Run in response to triggers (schedule, event, message, alert)
- Have access to MCPs (GitHub, Linear, Slack, databases, APIs)
- Run in cloud VMs (no local machine required)
- Can open PRs, post messages, update issues, or perform any action available via MCPs
- Can improve over time by storing memory from each run

They are distinct from slash commands (which you invoke manually) and cloud handoffs
(which are one-shot delegations). Automations are persistent and recurring.

## STEP 1 — TRIGGER INTERVIEW

Ask the user (or infer from the task) which trigger this automation should respond to.
Select the most specific trigger type:

**Schedule-based:**
- Cron schedule: `0 8 * * 1-5` (e.g., "every weekday at 8am UTC")
- Natural language: "every morning", "weekly on Monday at 9am", "every hour"

**GitHub events:**
- `push` to branch / PR created / PR merged / issue opened / review requested
- Specify: which repo, which branch or label?

**Slack messages:**
- Which workspace and channel?
- What pattern or keyword triggers it? (e.g., "any message in #incidents", "message containing 'deploy'")
- Any specific bot mention (e.g., `@cursor`)?

**Linear issues:**
- Which team or project?
- Which status transition? (e.g., "issue moved to 'In Review'", "priority changed to Urgent")

**PagerDuty alerts:**
- Which service?
- Which severity? (all / only Critical / only P1)

**Custom webhook:**
- URL pattern / payload shape
- Authentication expected?

## STEP 2 — TASK INTERVIEW

What should the agent do when triggered?

Be as specific as possible. Vague tasks produce unreliable automations. Push for:
- The concrete action (e.g., "create a Linear issue", "open a draft PR", "post a summary to Slack")
- The data sources it needs (e.g., "read GitHub PR diff", "query database for open invoices")
- The transformation (e.g., "summarize", "classify severity", "generate migration SQL")
- The output (e.g., "post in Slack", "open PR with changes", "reply to Linear issue")

## STEP 3 — MCPs NEEDED

Based on trigger and task, identify which MCPs the automation requires:

Common MCPs for automations:
- `user-github` — create PRs, comment on issues, fetch diffs
- Linear MCP — create/update issues, query projects
- Slack MCP — post messages, read channel history
- `user-cursor10x-mcp` — memory across runs (for improving automations over time)
- `user-devcontext` — task state across runs
- Database MCP — read production data or analytics
- `user-context7` — fetch library documentation when the agent needs to code
- Custom REST API MCP — any internal service

## STEP 4 — MEMORY DESIGN

Should this automation remember outcomes from previous runs?

- **Yes (stateful):** The agent reads prior run outcomes and improves over time.
  Example: "If the last 3 runs produced no useful findings, adjust the search criteria."
  Add to instructions: "At the end of each run, store the outcome in memory. At the start
  of each run, retrieve prior outcomes and adjust strategy if results have been consistently
  empty or noisy."
- **No (stateless):** Each run is fully independent. Simpler and cheaper for frequent
  triggers (e.g., every 5 minutes).

## STEP 5 — FAILURE BEHAVIOR

What should happen if the agent fails, is unsure, or encounters an error?

Options (choose the appropriate default or mix):
- **Silent skip:** If nothing actionable is found, take no action and log the outcome.
- **Alert:** Post a message to a Slack channel (or open an issue) when the automation fails.
- **Graceful degradation:** If data is partial, produce a partial result with a note rather
  than failing silently.
- **Escalate:** If confidence is below a threshold, tag a human in the output for review.

## STEP 6 — PRODUCE THE AUTOMATION SPEC

Based on answers to Steps 1–5, produce the complete spec:

```
## Automation Spec
Name: [short name, kebab-case]
Description: [one paragraph — what this does and why]

### Trigger
Type: [schedule | github | slack | linear | pagerduty | webhook]
Configuration:
  [trigger-specific parameters]

### Agent Instructions
(Paste this into the Cursor Automation builder's "Instructions" field)

---
[Clear, self-contained instructions for the agent. Do not assume conversation history.
Include all context the agent needs to complete its task from scratch on each invocation.]

At the start of each run:
1. [What to retrieve / check first]

Core task:
2. [What to do with the retrieved data]
3. [Transformation or analysis step]

Output:
4. [Where and how to deliver the result]

On failure or ambiguity:
5. [Failure behavior]

[If stateful — add:]
Memory:
- At start: retrieve prior runs from memory
- At end: store outcome summary to memory for future runs
---

### Required MCPs
- [MCP 1] — purpose
- [MCP 2] — purpose

### Expected Output
[What artifact the automation produces: PR, Slack message, Linear issue, etc.]

### Failure Behavior
[Reiterate failure handling for the Automation builder's "On failure" setting]

### Test Scenario
[How to verify this automation works: trigger it manually with this test input...]

### Marketplace Template
[Optional: if this automation could be published, suggest a generic template name
and description for other teams to discover and customize it]
```

## STEP 7 — IMPLEMENTATION PATH

After reviewing the spec:
1. Go to `cursor.com/automations` → Create new automation.
2. Select the trigger type and configure it.
3. Paste the "Agent Instructions" from Step 6 into the Instructions field.
4. Add the required MCPs from Step 6.
5. Set the failure behavior.
6. Use the "Test" button to trigger a manual run and verify the output.
7. Activate.

## OUTPUT FORMAT

Produce the full spec from Step 6 and ask:
"Does this match what you want? Should I adjust the trigger, task, or failure behavior before
you configure it in the Automation builder?"
