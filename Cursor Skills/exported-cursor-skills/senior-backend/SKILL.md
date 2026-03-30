---
name: senior-backend
description: Comprehensive backend development skill for building scalable backend systems using NodeJS, Express, Go, Python, Postgres, GraphQL, REST APIs. Includes API scaffolding, database optimization, security implementation, and performance tuning. Use when designing APIs, optimizing database queries, implementing business logic, handling authentication/authorization, or reviewing backend code.
---

# Senior Backend

> **On-demand loading**: Read files from `references/` and `scripts/` only when specific guidance is needed for the current step.

## When to Use

- Designing or reviewing REST/GraphQL APIs
- Optimizing database queries or schema
- Implementing auth, validation, or business logic
- Scaffolding new backend services
- Performance tuning or security hardening

NOT for: frontend-only work, infrastructure/DevOps-only tasks.

## Available Tools

```bash
python scripts/api_scaffolder.py <project-path>      # Scaffold new API service
python scripts/database_migration_tool.py <path>     # Analyze and optimize DB
python scripts/api_load_tester.py --analyze          # Load test endpoints
```

## Reference Documentation (load on demand)

| File | When to read |
|------|-------------|
| `references/api_design_patterns.md` | API design decisions, REST/GraphQL patterns |
| `references/database_optimization_guide.md` | Query optimization, indexing, migrations |
| `references/backend_security_practices.md` | Auth, input validation, security hardening |

**Tech Stack:** Node.js/Express, Go, Python, PostgreSQL, Prisma, GraphQL, Docker, AWS/GCP/Azure
