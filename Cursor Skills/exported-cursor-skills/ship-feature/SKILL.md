---
name: ship-feature
description: End-to-end feature implementation with validation. Use when the user wants a feature built, shipped, or implemented completely across all affected layers.
---

# ship-feature

Use this skill when the user wants a feature implemented end-to-end.

## Objective
Deliver the requested feature completely:
- inspect the repo first
- align with existing architecture and project rules
- implement across all affected layers
- validate thoroughly
- summarize outcome clearly

## Required behavior
1. Inspect relevant files, schemas, docs, and current architecture.
2. Reconstruct the implementation plan from the conversation and repo state.
3. Use the best matching subagent only when it clearly improves execution:
   - `explore` for codebase reconnaissance
   - `backend-developer` for APIs/server/database work
   - `frontend-developer` for UI/client work
   - `fullstack-developer` for cross-layer features
4. Implement the feature fully. Do not stop after planning.
5. Update docs when APIs, behavior, architecture, setup, or operational steps changed.
6. Run the most relevant validation set:
   - lint
   - typecheck
   - tests
   - build
   - migrations/schema validation when relevant
   - browser/UI verification when relevant
7. If a check fails, fix it and rerun the relevant checks.
8. Before finishing, run a security pass if the task touches auth, secrets, forms, uploads, payments, PII, or public endpoints.

## Output format
- What I inspected
- What I changed
- Checks run and results
- Risks / assumptions
- Remaining blockers