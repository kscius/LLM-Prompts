---
name: sdlc-checkpoint
description: >-
  Validates phase outputs before advancing the SDLC. Defines expected artifacts
  per phase (intake, scout, plan, critic, build, test, review, document, close)
  and produces a clear PASS / CONDITIONAL / BLOCK verdict with gaps. Use at
  orchestrator or command phase boundaries, before expensive work, or when the
  user asks to verify a gate or "are we ready to proceed".
---

# SDLC checkpoint (phase gates)

## Purpose

Run a **structured gate** between SDLC phases so the next phase does not start on missing or weak inputs. This skill produces an explicit **verdict** and a **gap list**—not a full re-plan unless the gate fails badly.

## When to use

- **Orchestration**: after each named phase completes (intake → scout → plan → critic → build → test → review → document → close).
- **Before expensive work**: merging, deploying, running long test suites, broad refactors.
- **User asks**: "gate check", "phase complete?", "ready for build?", "what's missing before we continue?"
- **Recovery**: after an interrupt or handoff; re-validate the last completed phase.

## When to skip or lighten

- **Trivial or single-file fixes** with clear repo evidence and no contract or security impact: use a **lite** checkpoint (see below) or skip if user and context already satisfy done-when.
- **Read-only reconnaissance**: scout-only flows may only need intake + scout gates.
- Do not block on **nice-to-have** docs or polish unless the workflow type requires them.

## Inputs to collect first

1. **Workflow type** (feature, bugfix, refactor, security, migration, docs, performance, infrastructure, research, or ad hoc).
2. **Phase just completed** and **next phase** intended.
3. **Artifacts actually produced** in this session (messages, files, plans, test output)—cite evidence; do not assume.
4. **Risk tier** (low / medium / high): auth, payments, schema, infra, and user-visible behavior raise the bar.

---

## Gate catalog (expected artifacts)

Use the rows for the **completed** phase. Mark each item **Met**, **Partial**, or **Missing**. Items marked N/A must have a one-line justification.

### Phase: Intake

| Artifact | Expectation |
| -------- | ----------- |
| Context | Prior session/repo context loaded when available (`cursor10x`, `devcontext`, or explicit user state). |
| Problem clarity | Objective and constraints understood; vague asks either brainstormed or requirements brief exists. |
| Scope | In-scope vs out-of-scope explicit enough for scout/plan. |
| Next step | Clear whether to scout, plan, build, or ask user. |

### Phase: Scout

| Artifact | Expectation |
| -------- | ----------- |
| Classification | SIMPLE / STANDARD / COMPLEX (or equivalent) with rationale. |
| Map | Key files, modules, owners, or APIs touched; unknowns listed. |
| Constraints | Stack, commands, or patterns **verified from repo** where relevant—not invented. |
| Risks | Top risks and unknowns for the next phase. |

### Phase: Plan

| Artifact | Expectation |
| -------- | ----------- |
| Approach | Chosen path and sequence; alternatives noted if discarded. |
| Touchpoints | Files/modules likely to change. |
| Acceptance | Testable acceptance criteria or done-when checks. |
| Validation | What will be run (lint, tests, build)—aligned with repo evidence. |

### Phase: Critic (pre-build / pre-merge)

| Artifact | Expectation |
| -------- | ----------- |
| Review | Consolidated verdict (e.g. APPROVED / CAUTION / REWORK) or equivalent. |
| Security | Sensitive surfaces explicitly considered or N/A justified. |
| Tests | Plan for what must pass before merge/build. |

### Phase: Build

| Artifact | Expectation |
| -------- | ----------- |
| Implementation | Code or config changes match plan scope. |
| Hygiene | No unrelated churn; secrets not introduced. |

### Phase: Test

| Artifact | Expectation |
| -------- | ----------- |
| Execution | Relevant checks **actually run** or explicitly not run with reason. |
| Results | Pass/fail summarized; failures have owner/next step. |

### Phase: Review

| Artifact | Expectation |
| -------- | ----------- |
| Quality | Second-pass review or checklist complete for visible risk. |
| Regression | Obvious breakage paths considered. |

### Phase: Document

| Artifact | Expectation |
| -------- | ----------- |
| User-facing / contract | Docs or release notes updated when behavior or APIs changed (per project `/docs` policy). |
| Internal | N/A if no doc expectation for this workflow. |

### Phase: Close

| Artifact | Expectation |
| -------- | ----------- |
| Self-validation | `self-validate` or equivalent honesty pass on claims vs evidence. |
| Memory | Milestones/decisions stored when the project uses memory MCPs. |
| Handoff | User knows what shipped, what is deferred, and residual risk. |

---

## Lite checkpoint (low-risk / small scope)

For **low-risk, localized** work, only verify:

1. **Scope match** — changes align with the ask.
2. **Evidence** — commands claimed run did run (or stated as not run).
3. **Obvious footguns** — secrets, auth bypass, broken imports—none present.

If all three hold → **PASS (lite)**.

---

## Verdict rules

- **PASS**: All required artifacts for this phase **Met** at the current risk tier; proceed.
- **CONDITIONAL**: One or more **Partial** items; proceed only with documented mitigations (follow-up task, owner, or explicit user acceptance).
- **BLOCK**: Any **Missing** item that is **required** for this workflow type and risk tier; do not start the next phase until resolved or scope is formally reduced.

Escalate **PARTIAL** on security, auth, schema, or payment surfaces to **BLOCK** unless the user explicitly accepts risk in writing.

---

## Output template (use verbatim headings)

### Checkpoint

- **Workflow**:
- **Completed phase**:
- **Next phase**:
- **Risk tier**:

### Artifact table

Short table or bullet list: artifact → Met | Partial | Missing | N/A (reason).

### Verdict

**PASS** | **CONDITIONAL** | **BLOCK** — one line rationale.

### Gaps (if any)

Numbered list of what is missing or weak; each gap has **owner** (agent / user) and **remedy**.

### Proceed?

**Yes** / **Yes with conditions** / **No** — one sentence.

---

## Integration notes

- Pair with **`requirements-gathering`** after intake when specs are still fuzzy.
- Pair with **`tech-lead-review`** during or after **Critic** for consolidated engineering judgment.
- Do not claim validation passed without **evidence** (test output, file paths, or explicit user confirmation).
