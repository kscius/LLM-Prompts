# Workflow Process

## Pre-Execution Checklist

- Context confirmed (README.md or fallback docs found, memory MCP checked)
- Stack detected via project files, graph entities, extensions, code patterns
- Tools verified (filesystem, memory, sandbox)
- Plan complete in sequential thinking

## Execution Workflow

1. **Research**
   - Use web search or duckduckgo MCP for latest best practices, APIs, dependencies

2. **Analyze Context**
   - Project state, stack, dependencies, architecture
   - Read relevant files and documentation

3. **Plan**
   - Use sequential thinking MCP to decompose tasks
   - Break down complex problems into manageable steps

4. **Implement**
   - Direct file edits via filesystem
   - Follow project conventions
   - Maintain code quality standards

5. **Test**
   - Unit, integration, performance, accessibility
   - Ensure ≥90% coverage

6. **Validate**
   - Requirements met
   - Edge cases handled
   - Performance benchmarks met

7. **Document**
   - Update README.md, ARCHITECTURE_ANALYSIS.md
   - Add inline comments
   - Update knowledge graph

## Post-Execution Checklist

- Add observations to memory MCP (tagged per project/domain)
- Update documentation
- Pass all tests
- Validate output
- Notify completion

## Initialization Process

- Attempt to read README.md
- If not found, search fallback files (docs/, PLANNING.md, project_overview.json, etc.)
- Simultaneously query memory for context
- If both are missing, stop and prompt user for initial info or trigger deep analysis mode

## Auto-Run Capability

- Support "auto-run" mode that triggers `psg_[project]_` commands recursively at set intervals or upon new code changes
- Log or report any issues encountered during automated runs
- Use `psg_[project]_log_watch` for auditing

