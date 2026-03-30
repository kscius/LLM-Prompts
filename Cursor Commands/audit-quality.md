# Audit quality of skills and rules against defined evaluation criteria

Evaluate the health of the agentic setup: skills, rules, commands, and MCP configuration.

TASK:
{{args}}

MISSION
Run a structured quality audit of the Cursor agentic setup. Score each category. Surface actionable improvements. Do not make changes — produce a prioritized action plan.

SCOPE
When no args are provided, audit ALL categories. When args specify a category (e.g. "skills", "rules", "commands", "mcps"), audit only that category.

---

## EVALUATION CRITERIA

### 1. Skills (`C:\Users\mitza\.cursor\skills\`)

Score each skill on:

| Criterion | Weight | Pass condition |
|-----------|--------|----------------|
| **Activation clarity** | HIGH | `when_to_use` or equivalent section present and specific |
| **Token efficiency** | HIGH | SKILL.md < 150 lines; verbose content in `references/` |
| **On-demand note** | HIGH | File starts with `> **On-demand loading**:` or equivalent |
| **Progressive disclosure** | MEDIUM | Metadata → overview → references pattern followed |
| **No duplication** | MEDIUM | Skill does not duplicate another skill in `C:\Users\mitza\.cursor\skills\` |
| **References present** | LOW | `references/` or `examples/` directory exists when needed |

Scoring:
- GREEN (4-6 criteria met): No action needed
- YELLOW (2-3 met): Improvement recommended
- RED (0-1 met): Requires immediate restructuring

### 2. Rules (`.cursor/rules/`)

Score each rule on:

| Criterion | Weight | Pass condition |
|-----------|--------|----------------|
| **Specificity** | HIGH | Rule is actionable, not a vague slogan |
| **Non-redundancy** | HIGH | Does not duplicate another active rule |
| **Correct `alwaysApply`** | HIGH | `alwaysApply: true` only if broadly applicable to all repos |
| **Glob scope** | MEDIUM | Glob pattern is scoped to relevant files, not `**/*` unless justified |
| **No contradiction** | MEDIUM | Does not contradict a higher-priority rule |
| **Proportionality** | LOW | Rule weight matches its importance (not every guideline is CRITICAL) |

Scoring: same GREEN / YELLOW / RED thresholds as skills.

### 3. Commands (`C:\Users\mitza\.cursor\commands\`)

Score each command on:

| Criterion | Weight | Pass condition |
|-----------|--------|----------------|
| **Clear mission** | HIGH | MISSION section present and states the outcome |
| **Subagent routing** | HIGH | PREFERRED SUBAGENTS or TEAM COMPOSITION defined |
| **Escalation triggers** | MEDIUM | ESCALATION TRIGGERS or blockers defined |
| **Output format** | MEDIUM | OUTPUT FORMAT section present |
| **Skill references** | LOW | PREFERRED SKILLS section lists relevant skills |

### 4. MCPs (`C:\Users\mitza\.cursor\mcp.json`)

Score the MCP configuration on:

| Criterion | Pass condition |
|-----------|----------------|
| **Non-essential disabled** | Hobby/low-value MCPs have `"enabled": false` |
| **Profile documented** | All servers are documented in `docs/mcp-profiles.md` |
| **No duplicate coverage** | No two MCPs serve the same purpose (e.g., two memory MCPs without clear role separation) |
| **Tokens not in git** | `mcp.json` excluded from version control |

---

## OPERATING RULES

1. List all files in each category before scoring.
2. Score each item against the relevant criteria.
3. Assign GREEN / YELLOW / RED per item.
4. Produce a prioritized action list:
   - Priority 1: All RED items
   - Priority 2: Repeated patterns across YELLOW items
   - Priority 3: Quick wins (simple fixes with high impact)
5. Do NOT make edits — output a plan only.
6. Count: how many GREEN, YELLOW, RED per category.

---

## OUTPUT FORMAT

### Summary

| Category | GREEN | YELLOW | RED | Health |
|----------|-------|--------|-----|--------|
| Skills | N | N | N | 🟢 / 🟡 / 🔴 |
| Rules | N | N | N | 🟢 / 🟡 / 🔴 |
| Commands | N | N | N | 🟢 / 🟡 / 🔴 |
| MCPs | N | N | N | 🟢 / 🟡 / 🔴 |

### Detailed Findings

For each category, list items with score and top issues:

| Item | Score | Top Issues |
|------|-------|------------|
| skill-name | 🟡 YELLOW | Missing on-demand note; SKILL.md > 150 lines |
| rule-name.mdc | 🔴 RED | Duplicates rule X; no actionable guidance |

### Priority Action Plan

1. [RED] ...
2. [RED] ...
3. [YELLOW pattern] ...
4. [Quick win] ...

### Health Trends
- Any patterns observed (e.g., "5 of 8 rules have over-broad alwaysApply")
- Recommendations for maintaining quality going forward
