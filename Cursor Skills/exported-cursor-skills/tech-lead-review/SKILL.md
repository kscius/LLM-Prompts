---
name: tech-lead-review
description: >-
  Performs a unified tech-lead review combining code quality, architecture fit,
  and security-sensitive surfaces. Use in CRITIC or pre-merge gates, after scout/plan
  output, when the user asks for a tech lead or staff-engineer review, or when
  orchestration needs a single consolidated verdict before build or merge.
---

# Tech lead review

Apply this skill when you need **one consolidated engineering judgment** across:

- **Code**: correctness, maintainability, tests, and reviewability of the change.
- **Architecture**: alignment with existing boundaries, scalability, and tech debt.
- **Security**: auth, data handling, secrets, injection, and other sensitive surfaces.

This is **not** a substitute for deep specialized work (full pentest, formal threat model). It **is** the right default gate before merge or before expensive build phases.

## When to use

- Orchestrator **CRITIC** phase or equivalent quality gate.
- User asks for “tech lead”, “staff review”, “pre-merge review”, or “should we ship this”.
- After a plan or diff exists and you must decide **APPROVED / CAUTION / REWORK**.
- When running parallel review threads is acceptable: you may still delegate slices to subagents, then **synthesize** here.

## Inputs to gather first

1. **Scope**: which files, features, or PR/commits are in scope; what problem the change solves.
2. **Evidence**: actual diff, key files, tests run (or explicit “not run”).
3. **Constraints**: deadlines, compatibility, rollout (flag, migration, breaking API).
4. **Threat context**: internet-facing, auth, PII, payments, multi-tenant, admin tools.

If scope is unclear, narrow it before judging.

## Review sequence

Execute in order; each step informs the next.

### 1. Code lens (implementation quality)

- **Correctness**: logic errors, race conditions, error handling, idempotency where needed.
- **Boundaries**: layering violations, leaking internals across modules, god objects.
- **Maintainability**: naming, duplication, complexity, observability (logs/metrics) where operations matter.
- **Tests**: coverage of happy path and critical failures; flaky or missing assertions.
- **DX / consistency**: matches repo patterns (formatting, types, error shapes).

Use the `code-reviewer` subagent when the diff is large, cross-cutting, or security-adjacent implementation detail needs a second pass.

### 2. Architecture lens (system fit)

- **Fit**: does the change belong in this layer (service, UI, job, infra)?
- **Coupling**: new hard dependencies, synchronous chains that should be async, shared mutable state.
- **Data and contracts**: API/schema evolution, backward compatibility, migration safety.
- **Scale and ops**: performance hotspots, N+1 queries, unbounded work, config/env assumptions.
- **Debt**: shortcuts that are acceptable vs. ones that compound.

Use the `architect-reviewer` subagent when the change affects service boundaries, data ownership, or multi-team contracts.

### 3. Security lens (sensitive surfaces)

Treat as **in scope** when the change touches any of:

- Authentication, authorization, sessions, CSRF/CORS, webhooks.
- Secrets, crypto, signing, tokens in logs, env handling.
- User-controlled input: HTML/SQL/command injection, path traversal, SSRF.
- File upload/download, SSR, deserialization.
- Payments, PII, regulated data, audit requirements.

Checklist (adapt to stack):

- Validate and encode at **trust boundaries**; no “trust the client”.
- Least privilege for roles, keys, and IAM.
- No secrets in repo or client bundles; no sensitive data in logs/errors shown to users.
- Dependencies: note if manifest/lock changes need explicit audit (do not invent audit commands).

Use the `security-auditor` subagent when the surface is broad, unfamiliar, or high risk.

## Synthesis and verdict

Merge the three lenses into **one** recommendation.

### Verdict labels

| Verdict | Meaning |
|--------|---------|
| **APPROVED** | Safe to proceed merge/build; only minor or follow-up nits. |
| **CAUTION** | Can proceed with documented risks, owners, and follow-ups; no silent debt. |
| **REWORK** | Blocking issues in correctness, security, or architecture; do not merge as-is. |

### Severity for findings

- **Blocker**: wrong behavior, exploitable issue, breaking contract, data loss risk.
- **Major**: maintainability or security debt that should be fixed before merge unless explicitly accepted.
- **Minor**: style, small refactors, non-blocking improvements.

## Output format (required)

Produce the review in this structure:

1. **Scope summary** — what was reviewed and what was out of scope.
2. **Verdict** — APPROVED | CAUTION | REWORK (one line, bold).
3. **Executive summary** — 3–6 bullets a tech lead would tell a PM/exec.
4. **Code findings** — grouped by severity; reference files/lines when known.
5. **Architecture findings** — boundaries, contracts, scale/debt.
6. **Security flags** — explicit “none” if nothing sensitive; else list with severity.
7. **Recommended actions** — ordered list: must-fix before merge, should-fix, nice-to-have.
8. **Validation gap** — what was **not** verified (e.g. no integration tests run) and residual risk.

## Interaction with other skills

- After **implementation**, still run **`self-validate`** before claiming tests or commands passed.
- For **final handoff**, `review-and-secure` remains a lightweight pass; this skill is **broader** (architecture + explicit merge posture).
- Do **not** duplicate full SDLC phase gates; use **`sdlc-checkpoint`** when the workflow requires phase artifacts.

## Guardrails

- Do not claim tools ran unless they did; state uncertainty plainly.
- Prefer smallest fix that addresses blockers; avoid scope creep in review feedback.
- If the change widens access or weakens security, default to **REWORK** unless the user explicitly accepted the risk in writing.
