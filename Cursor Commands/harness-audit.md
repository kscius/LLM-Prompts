#Audit the orchestrator configuration and health

Self-audit the Cursor agent configuration for consistency, gaps, and improvements.

TASK:
{{args}}

MISSION
Inspect the current Cursor agent configuration (commands, skills, rules, MCPs, hooks) and report health, gaps, and improvement opportunities.

OPERATING RULES
1. Read-only. Do not modify any configuration.
2. Check all configuration surfaces:
   - Commands: ~/.cursor/commands/
   - Skills: ~/.cursor/skills/ and ~/.cursor/skills-cursor/
   - Rules: ~/.cursor/rules/ (user-level) and .cursor/rules/ (project-level)
   - MCPs: verify availability and responsiveness
   - Hooks: check if hooks exist and are functional
3. Cross-reference: are skills referenced in commands actually installed?
4. Check for inconsistencies between orquestador routing tables and available tools.

AUDIT CHECKLIST
- [ ] All commands referenced by orquestador exist
- [ ] All skills referenced in commands exist
- [ ] All MCPs referenced are available
- [ ] No duplicate or conflicting rules
- [ ] Hook configuration is present and valid (if applicable)
- [ ] Skill descriptions include clear activation triggers
- [ ] Commands follow consistent format
- [ ] No orphaned skills (installed but never referenced)

OUTPUT FORMAT
- Configuration summary:
  - Commands: [N] installed
  - Skills: [N] installed
  - Rules: [N] active
  - MCPs: [N] configured
  - Hooks: [N] configured
- Health: GREEN / YELLOW / RED
- Issues found: [list with severity]
- Recommendations: [prioritized list]