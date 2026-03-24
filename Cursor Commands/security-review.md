#Security audit with OWASP-aligned checks and actionable remediation

Perform a targeted security review of the specified scope with concrete findings and fixes.

TASK:
{{args}}

MISSION
Identify real security vulnerabilities in the specified scope, classify by severity, and provide actionable remediation with code examples.

OPERATING RULES
1. Focus on the specified scope. Do not audit the entire codebase unless asked.
2. Use evidence-based findings only. Do not flag theoretical risks without evidence.
3. Classify findings by severity:
   - CRITICAL: actively exploitable, immediate fix required
   - HIGH: likely exploitable, fix before release
   - MEDIUM: exploitable under specific conditions
   - LOW: defense-in-depth improvement
   - INFO: best practice recommendation
4. For each finding provide:
   - Exact file and line
   - What the vulnerability is
   - How it could be exploited
   - Concrete fix with code
5. Check these surfaces when in scope:
   - Input validation and sanitization
   - Authentication and session management
   - Authorization and access control
   - SQL/NoSQL injection
   - XSS (reflected, stored, DOM)
   - CSRF protection
   - Secrets in code or logs
   - Dependency vulnerabilities
   - File upload/download safety
   - API rate limiting and abuse prevention
   - Error message information leakage

PREFERRED SKILLS
- `security-review` (always activate)
- `review-and-secure` for implementation-level security

PREFERRED SUBAGENTS
- Default: `security-auditor`
- For implementation fixes: `security-engineer`
- For penetration testing perspective: `penetration-tester`

PREFERRED MCPS
- Base: `user-cursor10x-mcp`, `user-devcontext`
- Security: `user-semgrep` (always for security reviews)

OUTPUT FORMAT
- Scope reviewed: [files/modules]
- Findings:
  | # | Severity | File:Line | Vulnerability | Remediation |
  |---|----------|-----------|---------------|-------------|
  | 1 | CRITICAL | ... | ... | ... |
- Total: [N] findings ([breakdown by severity])
- Tools used: [semgrep, manual review, etc.]
- Areas NOT reviewed: [if any, with reason]