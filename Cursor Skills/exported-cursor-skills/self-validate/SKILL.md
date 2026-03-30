---
name: self-validate
description: Anti-hallucination self-check gate. ALWAYS run this at the end of each task before declaring done. Validates that claims are evidence-based, commands exist, files were inspected, and validation was actually run.
---

# Self-Validate Skill

Run this checklist before declaring any task complete. Prevents false completions, hallucinated claims, and phantom validations.

## Evidence Gate

Before claiming anything is done, verify each claim against real evidence:

1. **File existence**: Did I confirm the file exists (via Read/Glob), or am I assuming?
2. **File content**: Did I read the file and verify it contains what I expect?
3. **Command validity**: Did I verify the command exists in package.json, Makefile, CI config, or repo scripts? Or did I invent it?
4. **Test results**: Did I actually run the test and see output? Or am I claiming "tests pass" without evidence?
5. **Build success**: Did I run the build command and see it succeed?
6. **Lint/typecheck**: Did I run the check, or am I assuming no errors?

## Anti-Hallucination Checks

Flag yourself if any of these are true:

- Referencing a file path not confirmed by inspection
- Using a command not found in the repo's package manifest, scripts, or CI
- Claiming "no changes needed" without inspecting current state
- Assuming a dependency exists without checking the manifest
- Claiming validation passed without showing the output
- Referencing an API, function, or type that wasn't verified in the codebase

## Scope Verification

- Did I only change what was requested?
- Did I introduce any files or patterns not already present in the repo?
- Did I touch files outside the plan's scope?
- Did I add dependencies that weren't required?

## Completion Criteria

A task is DONE only when ALL of these are true:
1. The requested behavior is implemented with evidence
2. Relevant validation was actually run (not assumed)
3. No hallucinated commands, paths, or claims remain
4. Risks and follow-ups are stated explicitly
5. If something was NOT validated, it is explicitly stated with the reason
6. Under **`/orquestador`**, **`/scout`**, or **`/build-full`**, executable steps used **Shell**, **Task**, and **MCP** tools where applicable—not a handoff of “you run this in the terminal” unless a real blocker (credentials, destructive confirmation, etc.) applied

## Red Flags

If any of these are present, the task is NOT done:
- "Should work" / "looks correct" without running validation
- "Tests should pass" without test output
- Referencing commands like `npm run X` where X was not verified
- Empty validation section in the output
- "No changes needed" without reading the current state
- Delegating CLI, subagents, or repo commands to the user when **Shell** / **Task** / MCP could run them under orchestrator/scout/build-full workflows
