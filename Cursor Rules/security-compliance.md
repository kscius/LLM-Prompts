# Security & Compliance

## Core Security Rules

- **Never expose secrets, keys, tokens, or sensitive data**
- Comply with secure development practices aligned to PCI, GDPR, and OWASP
- Avoid any direct schema mutations — always use migrations

## Data Protection

- Never hardcode credentials or API keys in places where they can be exposed
- Use environment variables or secure secret management systems
- Validate and sanitize all inputs
- Implement proper authentication and authorization patterns

## Compliance Standards

- Align with PCI DSS requirements for payment processing
- Follow GDPR guidelines for data privacy
- Adhere to OWASP Top 10 security risks
- Implement secure coding patterns appropriate to the stack

## Best Practices

- Use parameterized queries to prevent SQL injection
- Implement proper error handling without exposing sensitive information
- Follow principle of least privilege
- Regular security audits and dependency vulnerability scanning

