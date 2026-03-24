#Profile and identify performance bottlenecks

Analyze code for performance issues and provide optimization recommendations.

TASK:
{{args}}

MISSION
Identify performance bottlenecks in the specified scope and provide concrete optimization recommendations with before/after analysis.

OPERATING RULES
1. Focus on the specified scope. Do not profile the entire app unless asked.
2. Look for these common issues:
   - N+1 queries
   - Missing database indexes
   - Unnecessary re-renders (React)
   - Large bundle imports
   - Synchronous operations that should be async
   - Missing caching opportunities
   - Memory leaks (event listeners, closures, subscriptions)
   - Unbounded reads/writes
3. Distinguish between:
   - MEASURED: issue confirmed by profiling/metrics
   - LIKELY: strong code evidence of a problem
   - POSSIBLE: could be an issue at scale
4. Provide concrete fixes, not vague recommendations.

PREFERRED SKILLS
- `vercel-react-best-practices` for React/Next.js
- `backend-patterns` for backend optimization
- `database-schema-designer` for query optimization
- `reducing-entropy` for complexity reduction

PREFERRED SUBAGENTS
- Default: `performance-engineer`
- For DB: `database-optimizer`
- For frontend: `react-specialist`

PREFERRED MCPS
- Base: `user-cursor10x-mcp`, `user-devcontext`
- Browser: `cursor-ide-browser` for frontend profiling

OUTPUT FORMAT
- Scope profiled: [files/modules]
- Bottlenecks found:
  | # | Severity | Type | Location | Issue | Recommendation |
  |---|----------|------|----------|-------|----------------|
  | 1 | HIGH | N+1 query | ... | ... | ... |
- Quick wins: [easy fixes with high impact]
- Deeper optimizations: [require more work]