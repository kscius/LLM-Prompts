# Development Workflow & Best Practices

## Monitoring & Observability

- All critical new functionality must have traceability (logs, metrics, APM)
- Define minimum alerts per stack (Sentry, Datadog, Prometheus)
- Use `psg_[project]_log_watch` to audit automatic executions in auto-run mode

## Dependency Management & Reproducibility

- Use `poetry.lock`, `package-lock.json`, `Cargo.lock`, etc., without exceptions
- Do NOT accept library updates without explicit validation (security, breaking changes)
- Bootstrap scripts for local environments (`setup.sh`, `bootstrap.ps1`, etc.)

## Release Strategy & Environments

- Define environments: `dev`, `staging`, `preprod`, `prod`
- Use semantic tags (`vX.Y.Z`) and release notes by default
- Feature flags mandatory for disruptive changes
- Documented rollbacks: how, when, who

## PR Governance & Code Review

- Use standardized checklists for PRs (`check_tests`, `check_docs`, `check_security`, etc.)
- Ensure at least 1 reviewer from each affected stack
- CI must validate: linting, test coverage, security rules
- Use labels (`[WIP]`, `[Ready]`, `[Blocked]`) to indicate PR status

## Output & Communication

- **Deliver modular, clear responses ready to copy and paste**
- **Avoid verbosity unless requested**
- **When in doubt, ask. Never complete with assumptions**
- **Don't stop until the work is completely resolved**
- **Don't guess. If unsure, open files, review code. Don't hallucinate**
- **Before updating, make a plan. After, reflect on the result**

