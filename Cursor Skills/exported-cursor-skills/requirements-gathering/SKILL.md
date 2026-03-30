---
name: requirements-gathering
description: >-
  Extracts structured requirements from vague or underspecified requests. Produces
  acceptance criteria, explicit scope boundaries, constraints, and open questions.
  Use after brainstorming or when the user gives a fuzzy goal ("make it better",
  "add X", "support Y") and before planning or implementation. Bridges ideation to
  execution-ready specs.
---

# Requirements Gathering

## Purpose

Turn ambiguous requests into a **structured requirements brief** that planning and implementation can follow without guesswork. This skill is **not** open-ended design exploration—that is `brainstorming`. Here the focus is **clarity, boundaries, and testable outcomes**.

## When to Use

- The user’s ask lacks concrete success criteria, scope, or constraints.
- You are about to plan, estimate, or implement but critical facts are missing or assumed.
- Brainstorming produced ideas but nothing is yet captured as requirements.
- The request mixes multiple goals; you need to separate and prioritize them.

## When to Skip or Defer

- The request is already specific (clear inputs, outputs, files, and done-when).
- Pure creative exploration is still needed—run `brainstorming` first, then return here.
- Only trivial, one-line behavior is requested and repo context already defines the contract.

## Process

### 1. Classify the gap

Silently note what is missing:

- **Problem / outcome** — What problem is solved? For whom?
- **Scope** — What is in vs out?
- **Constraints** — Time, tech, compliance, performance, compatibility.
- **Evidence** — What exists in the repo or docs that already answers part of this?

Use repository inspection and `/docs` when available; do not invent project facts.

### 2. Ask only what blocks a good brief

Prefer **one focused question per turn** when interacting with the user. If you can infer a reasonable default from the codebase, state the assumption in the brief instead of blocking.

### 3. Resolve conflicts

If goals conflict (e.g. speed vs full refactor), surface the tradeoff and record the **decision** or mark as **open** with options.

### 4. Produce the brief

Always output the full template below in the assistant message (and optionally save under the project’s `docs/` tree if the user or project convention expects it—never invent paths for global/dotfiles-only workspaces).

---

## Output: Requirements Brief Template

Use these headings verbatim so downstream commands (plan, scout, orchestrator) can scan them.

### Objective

One or two sentences: the desired outcome in user or business terms.

### Problem / Context

Why this matters now; current pain or trigger.

### Stakeholders & Users

Who is affected; primary actor(s).

### In Scope

Bulleted, **specific** items that **will** be delivered.

### Out of Scope

Bulleted items explicitly **not** included (prevents scope creep).

### Functional Requirements

Numbered list. Each item must be **observable** (what the system does or shows).

- Bad: "Improve performance."
- Good: "List view loads the first page of results in under 2s on a cold cache for ≤10k rows."

### Non-Functional Requirements

Constraints: performance, security, accessibility, i18n, offline, browser support, etc. Mark **unknown** where not specified.

### Acceptance Criteria

Testable checks tied to functional requirements. Prefer "Given / When / Then" or checklist form.

- Each criterion should be verifiable without interpreting intent.

### Dependencies & Assumptions

- External systems, APIs, feature flags, migrations.
- Assumptions you relied on (and that should be validated).

### Risks & Open Questions

- Risks to timeline, correctness, or rollback.
- **Open questions** with owner or "needs user input."

### Traceability (optional)

Small table if helpful:

| Requirement ID | Source (user quote / ticket / doc) | Notes |

---

## Quality Bar

- **No vague superlatives** ("robust", "intuitive") without measurable meaning.
- **Scope boundaries** must be explicit; "everything else is out of scope" is acceptable only if In Scope is exhaustive for the iteration.
- **Acceptance criteria** must be checkable; if something is not testable, refine the requirement or mark it as a spike/research item.
- **Preserve compatibility** unless widening scope is agreed: call out API or contract impacts.

## Handoff

- **To planning**: Pass the brief as the source of truth; plans should reference requirement IDs or headings.
- **After brainstorming**: Condense dialogue into this template; drop exploratory options that were rejected.
- **If still ambiguous**: Ship the brief with a prominent **Open Questions** section and do not pretend gaps are closed.

## Relationship to Other Skills

| Skill | Role |
| ----- | ---- |
| `brainstorming` | Explores options and design collaboratively before requirements stabilize. |
| `requirements-gathering` | Locks down what "done" means and what is excluded. |
| Planning / ticket rules | Use the Acceptance Criteria and In/Out Scope as the backbone of tasks and verification. |
