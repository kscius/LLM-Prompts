---
name: react-full-build
description: React/Next.js end-to-end implementation with UI verification. Use for React or Next.js tasks that should be built, validated, and shipped completely.
---

# react-full-build

Use this skill for React / Next.js tasks that should be implemented and validated end-to-end.

## Objective
Ship a frontend or fullstack change with strong implementation and UI verification.

## Workflow
1. Inspect:
   - app/router structure
   - relevant components
   - state management
   - API/data fetching
   - tests
   - design system / shared UI
2. Prefer existing patterns over introducing new abstractions.
3. Apply these skills when relevant:
   - `react-dev`
   - `vercel-react-best-practices`
   - `web-design-guidelines`
   - `webapp-testing`
4. Delegate as needed:
   - `frontend-developer` for UI implementation
   - `fullstack-developer` when frontend + API changes are coupled
   - `debugger` for runtime/render/hydration/test failures
5. Validate with the strongest available subset:
   - lint
   - typecheck
   - unit/integration tests
   - build
   - browser automation / UI checks
   - accessibility review when relevant
6. Fix any failing checks before completion.

## Frontend quality bar
- preserve accessibility
- keep components cohesive
- avoid unnecessary effects
- keep state local when possible
- avoid introducing render-time instability
- preserve loading/error/empty states

## Output format
- Components/pages touched
- Behavior implemented
- Validation performed
- UX/accessibility notes
- Remaining risks