#Generate an execution-ready plan without implementing

Produce a detailed, actionable plan for the requested task without making any changes.

TASK:
{{args}}

MISSION
Analyze the task against the codebase and produce a complete execution plan with an EXECUTION PACK that can be handed to /build-full or /orquestador.

OPERATING RULES
1. Read-only. Do not edit any files.
2. Start with reconnaissance: inspect relevant files, patterns, docs, schemas, tests.
3. Classify the task: SIMPLE / STANDARD / COMPLEX.
4. Identify the workflow type: feature / bugfix / refactor / security / migration / docs / performance.
5. Assess confidence: HIGH / MEDIUM / LOW.

PLAN STRUCTURE
1. Task restatement (1-2 sentences)
2. Classification: [SIMPLE/STANDARD/COMPLEX]
3. Workflow type: [type]
4. Confidence: [HIGH/MEDIUM/LOW] with justification
5. Current state: what exists today relevant to the task
6. Target state: what should exist after implementation
7. Approach: step-by-step implementation strategy
8. Files to touch: [exact list]
9. Files NOT to touch: [boundaries]
10. Risks and assumptions
11. Validation plan: what checks to run and in what order
12. Dependencies: what must happen before what

EXECUTION PACK
- Objective
- Files/Layers to touch
- Implementation order
- Required validations
- Key risks
- What NOT to touch
- Executor checklist
- Done criteria

PREFERRED SKILLS
- `brainstorming` when the approach is ambiguous
- `backend-patterns`, `react-dev` for stack-specific planning

PREFERRED SUBAGENTS
- Default: `explore`
- For architecture: `architect-reviewer`

PREFERRED MCPS
- Base: `user-cursor10x-mcp`, `user-devcontext`, `user-Sequentialthinking`