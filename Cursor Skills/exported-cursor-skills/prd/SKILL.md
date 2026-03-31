---
name: prd
description: Generate a structured Product Requirements Document (PRD) as a single source of truth before implementation. Use when the user wants to capture requirements, define a feature formally, write a spec, or produce a PRD. Bridges brainstorming/requirements-gathering to the execution phase.
---

# PRD — Product Requirements Document

Generate a clear, structured PRD that becomes the single source of truth for a feature before implementation starts. This prevents scope creep, aligns stakeholders, and gives the agent concrete acceptance criteria to execute against.

## When to Use

- Before implementing a new feature of any significance
- When a user says "write a spec", "create a PRD", "document the requirements"
- After `brainstorming` or `requirements-gathering` to formalize the output
- When multiple engineers or agents will work on the same feature

## Process

### Step 1: Gather Context

Before writing, understand:

1. **What problem does this solve?** (Ask if not obvious)
2. **Who is the user?** (Which user segment, role, or persona)
3. **What's the current behavior?** (What happens today without this feature)
4. **What are the constraints?** (Tech stack, timeline, dependencies)
5. **What is explicitly out of scope?**

Use the `brainstorming` skill first if intent is vague. Use `requirements-gathering` if acceptance criteria are unclear.

### Step 2: Write the PRD

Use this template. Omit sections that genuinely don't apply — don't pad.

```markdown
# PRD: [Feature Name]

**Status:** Draft | Review | Approved  
**Date:** YYYY-MM-DD  
**Author:** [agent or human]

---

## 1. Problem Statement

One paragraph: what user pain or business need does this address? Why does it matter now?

## 2. Goals

What success looks like — 2-4 measurable outcomes:
- [ ] Goal 1 (measurable: e.g. "reduces checkout abandonment by X%")
- [ ] Goal 2

## 3. Non-Goals

Explicitly out of scope to prevent scope creep:
- Not: [specific thing]
- Not: [specific thing]

## 4. User Stories

For each user type or scenario:

> As a **[user role]**, I want to **[action]** so that **[outcome]**.

**Acceptance Criteria:**
- [ ] Given [context], when [action], then [observable result]
- [ ] Given [context], when [action], then [observable result]

## 5. Proposed Solution

High-level description of the approach. Not a technical spec — describe the behavior, not the implementation.

Include:
- Key user flows (numbered steps)
- Edge cases to handle
- States: empty, loading, error, success

## 6. Technical Notes

Known constraints, dependencies, or implementation considerations:
- Depends on: [APIs, services, libraries]
- Breaking changes: yes/no — [if yes, describe]
- Migration required: yes/no — [if yes, describe]
- Security considerations: [auth, PII, permissions]

## 7. Success Metrics

How to measure if this feature achieved its goals:
- Metric 1: [baseline → target]
- Metric 2: [baseline → target]

## 8. Open Questions

Unresolved decisions that block or affect implementation:
- [ ] [Question] — owner: [person/team], needed by: [date]

## 9. Out of Scope / Future Work

Things intentionally deferred to a later iteration:
- [Feature idea] → v2

---

_This PRD is approved for implementation when all ✅ acceptance criteria are testable and open questions are resolved._
```

### Step 3: Review Before Handing Off

Before accepting the PRD as complete, verify:

- [ ] Every acceptance criterion is **observable** — not "works well" but "returns 401 for expired tokens"
- [ ] Non-goals are explicit — not just "we won't do X" but written down
- [ ] Open questions have owners
- [ ] Success metrics are measurable, not vanity metrics
- [ ] Edge cases are named (empty state, error state, loading state)

## Good vs Bad Acceptance Criteria

| Bad | Good |
|-----|------|
| "Form works correctly" | "Submitting form with empty email shows 'Email required' error message below field" |
| "Fast loading" | "Page initial load < 2s on 3G network" |
| "Secure" | "API returns 401 for requests with expired JWT tokens" |
| "Handle errors" | "When payment fails, user sees error toast with retry button; cart is preserved" |

## Where to Save the PRD

- In repo: `docs/prds/YYYY-MM-DD-<feature-slug>.md`
- Or: `.cursor/plans/prd-YYYY-MM-DD-<feature-slug>.md` (ephemeral, session use)
- If the repo uses a different docs convention, follow it

## Integration with this Setup

- **Before this skill:** `brainstorming` (explore intent), `requirements-gathering` (extract constraints)
- **After this skill:** `ship-feature` or `/orquestador` consumes the PRD as the binding spec
- **Pairs with:** `sdlc-checkpoint` (gate: PRD approved before build starts)
- The PRD's acceptance criteria become the `done_criteria` in the EXECUTION PACK
