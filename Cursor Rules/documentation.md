# Documentation & Communication

## Regla de creación de documentación (Documentation Rules)

**Do not create documentation files (.md) unless explicitly requested.**

- **Do NOT** create new .md files (including README, CONTRIBUTING, or other docs) unless the user explicitly asks for it (e.g. “documenta esto”, “crea un README”, “genera documentación”).
- **Exception:** Update existing .md files when code changes make them outdated.
- For code changes, add inline comments only when necessary for complex logic.
- Provide summaries in the chat response, not in new files.

This rule ensures documentation is created only when the user wants it; the agent does not proactively add README or doc files without request.

## Documentation Standards

- When giving code snippets, include in-line comments or docstrings
- Reference official documentation if relevant (e.g., library docs, internal wiki)
- Maintain clear documentation for all features

## Code Documentation

- Include docstrings (Google style) for functions and classes
- Add inline comments explaining complex decisions
- Document API endpoints and their parameters
- Maintain README files with setup and usage instructions

## Project Documentation

- Keep `README.md` updated with project setup instructions
- Document architecture decisions in `ARCHITECTURE.md` or similar
- Maintain changelog for significant changes
- Document deployment procedures

## Communication Guidelines

- Deliver modular, clear responses ready to copy and paste
- Avoid verbosity unless requested
- When in doubt, ask for clarification
- Provide clear, accurate explanations
- Use sequential thinking when needed to detail reasoning step-by-step

## Deliverables

When completing tasks, ensure:
- Commented code
- Deployment instructions
- API documentation
- Performance notes
- Usage examples

