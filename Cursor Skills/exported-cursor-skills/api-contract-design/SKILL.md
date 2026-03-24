---
name: api-contract-design
description: API contract design patterns for REST, GraphQL, and internal service boundaries. Use when designing, modifying, or reviewing API endpoints, request/response shapes, or service contracts.
---

# API Contract Design Skill

Use this skill when designing, modifying, or reviewing API endpoints and contracts.

## Design Principles
- Contracts are the public API; treat changes as breaking until proven otherwise
- Version APIs when making breaking changes
- Validate request shape at the boundary
- Return consistent response shapes across similar endpoints
- Document contracts explicitly (OpenAPI, TypeScript types, etc.)

## REST Conventions
- Use nouns for resources, HTTP verbs for actions
- GET for reads, POST for creation, PUT/PATCH for updates, DELETE for removal
- Consistent response envelope: { data, meta?, error? }
- Use proper status codes: 200, 201, 204, 400, 401, 403, 404, 409, 422, 500
- Paginate list endpoints: { data: [], meta: { page, limit, total } }

## Validation
- Validate all required fields at the boundary
- Return specific validation errors per field
- Distinguish between "field missing" (400) and "field invalid" (422)
- Sanitize inputs that will be stored or rendered

## Backward Compatibility
- Additive changes (new fields) are safe
- Removing fields is a breaking change
- Changing field types is a breaking change
- Changing validation rules can be a breaking change
- Always consider existing consumers before changing contracts

## Testing
- Test happy path, validation errors, auth errors, not-found, and server errors
- Test pagination boundaries
- Test with minimal required fields and with all optional fields