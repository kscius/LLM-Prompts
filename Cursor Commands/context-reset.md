# /context-reset — Structured context recovery for long or diverging agent sessions

Use this command when the current conversation has gone on long enough that the agent is
making circular mistakes, contradicting earlier decisions, or losing track of what was built.

This is a defensive reset protocol: it preserves all critical state and opens a fresh
conversation with full context, eliminating the context window degradation that causes
agent quality to drop in long sessions.

## WHEN TO USE

Signs that context reset is needed:
- Agent contradicts itself across turns ("I'll add X" → later "X is already there" → later
  "I'll add X again")
- Agent re-suggests approaches that were already rejected in this session
- Agent ignores decisions made in the first half of the conversation
- Loop count is 10+ turns without clear resolution
- Response quality visibly declined compared to the first few turns
- You've finished one unit of work and are starting a materially different one

When NOT to use:
- Conversation is short (<15 turns) and working well
- You're mid-implementation on a task and want continuity — finish the unit first

## STEP 1 — PRODUCE A STATE SUMMARY

Before ending the conversation, generate this summary. Fill it in with real values:

```
## Context Reset — State at [YYYY-MM-DD HH:MM]

### Task
[One sentence: what was being built or fixed]

### Status
- Done: [what is complete and working]
- In progress: [what was started but not finished]
- Blocked: [if anything is blocked, why]

### Key decisions made in this conversation
- [Decision 1]: [what was decided and why]
- [Decision 2]: [what was decided and why]
- [Add as many as needed]

### Files modified
- [path/to/file.ts] — [one-line description of change]
- [path/to/file2.rb] — [one-line description of change]

### WHAT NOT TO DO (explicit constraints from this session)
- Do NOT [approach A] — reason: [why it was rejected]
- Do NOT [approach B] — reason: [why it was rejected]

### Next step (exactly)
[One concrete next action. This is what the new conversation should start with.]

### Open questions (if any)
- [Any unresolved decision that the new conversation may need to resolve]
```

## STEP 2 — REFERENCE PRIOR CONVERSATION (optional but recommended)

If the conversation history is relevant (discoveries made, code investigated, decisions
reasoned through), note it for the new session.

In the new conversation, start with:

```
@Past Chats [reference to the just-ended conversation]

Continue from the state summary below. Treat the "WHAT NOT TO DO" list as hard constraints.
Start with: [paste the "Next step" from the state summary]

[Paste full state summary here]
```

When to use `@Past Chats` vs. copy-paste:
- Long conversation with many important context points → use `@Past Chats` (agent reads
  selectively)
- Short session or you need just 1–2 key facts → paste directly into new conversation
- Never paste the entire conversation — it adds noise and wastes context window

## STEP 3 — OPEN A NEW CONVERSATION

1. In Cursor, open a new agent chat (Cmd/Ctrl+N or new tab).
2. Paste the `@Past Chats` reference and state summary.
3. Begin immediately with the "Next step" — do not re-explain the entire history.

## STEP 4 — VALIDATE CONTINUITY

In the first reply of the new conversation, verify:
- Did the agent understand the current status correctly?
- Did the agent acknowledge the "WHAT NOT TO DO" constraints?
- Is the proposed next action aligned with the state summary?

If not: paste the state summary again and ask the agent to confirm it understands before
proceeding.

## NOTES ON CONTEXT MANAGEMENT

**Why this works:** Cursor's `@Past Chats` lets the agent selectively retrieve relevant
prior context rather than loading the entire history linearly. This is more efficient than
a long conversation where early context has been compressed or lost.

**Compaction awareness:** If you see the message "Context was automatically compacted" in
the current conversation, that is the primary trigger for a context reset. Key decisions
made before compaction may no longer be in the active context.

**`preCompact` hook:** If your setup has a `preCompact` hook configured, it preserves critical
state before compaction automatically. Even so, a manual context reset is better for pivoting
to a substantially different sub-task.

## OUTPUT FORMAT

When invoked, immediately produce the state summary from Step 1, then ask:

"Should I open the new conversation with this context, or do you want to review/edit the
state summary first?"
