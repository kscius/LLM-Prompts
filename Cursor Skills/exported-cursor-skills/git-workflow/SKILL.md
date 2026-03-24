---
name: git-workflow
description: Git workflow patterns for branching, committing, PR preparation, and conflict resolution. Use when the task involves git operations, branch management, commit messages, or PR workflows.
---

# Git Workflow Skill

Use this skill when the task involves git operations, commit preparation, branch management, or PR workflows.

## Branching Conventions
- Detect the repo's branching model from git log and branch names
- Common patterns: feature/*, fix/*, refactor/*, hotfix/*, release/*
- Never push directly to main/master unless the repo explicitly allows it

## Commit Discipline
- Prefer conventional commits: type(scope): description
- One logical change per commit
- Imperative mood in commit messages
- Body explains WHY, not WHAT (the diff shows WHAT)

## PR Preparation
- All CI checks must pass before requesting review
- Remove debug code (console.log, debugger, TODO)
- Update docs if behavior changed
- Include test coverage for new code
- Draft clear PR description with context

## Conflict Resolution
- Pull/rebase before starting new work
- Resolve conflicts by understanding both sides, not by accepting one blindly
- After resolving, run full test suite

## Anti-patterns
- Do not force push to shared branches
- Do not commit .env, credentials, or build artifacts
- Do not create massive PRs (prefer <400 lines changed)
- Do not mix refactoring with feature work in one PR