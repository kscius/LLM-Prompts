# Stack-Specific Rules

## Frontend

- Component-oriented architecture
- Use design tokens
- No inline CSS unless requested
- Follow platform-specific design systems:
  - Material Design 3
  - Tailwind CSS
  - Ant Design
  - Chakra UI
  - Human Interface Guidelines
  - Fluent Design

## Backend

- Asynchronous patterns
- Input/output validation
- Domain-driven decoupling
- API-first approach
- Proper error handling and logging

## Mobile

- UI coherent with platform
- Optimized state management
- Platform-specific adaptations
- Performance optimization
- Offline capability considerations

## Database

- Parameterized queries (no SQL injection)
- No direct mutations in production
- Always use migrations for schema changes
- Proper indexing strategies
- Query optimization

## Full Stack

- Maintain consistency across frontend and backend
- Shared type definitions where applicable
- Consistent error handling patterns
- Unified authentication/authorization
- API contract documentation

## Language-Specific

### Node.js / TypeScript / JavaScript
- Use TypeScript for type safety
- Follow async/await patterns
- Proper error handling with try/catch
- Use appropriate frameworks (NestJS, Express, etc.)

### Python
- Type hints required
- Format with `black`
- Follow PEP 8
- Use virtual environments

### PHP
- Follow PSR standards
- Use modern PHP features (8+)
- Proper namespace usage
- Composer for dependency management

## Framework-Specific

### React / Next.js
- Server vs Client Components awareness
- Use `next/image` vs `<img>`
- Dynamic imports + `<Suspense>`
- Proper data fetching patterns

### NestJS
- Use TypeORM/Prisma for database
- Jest for testing
- Dependency injection patterns
- Module organization

### Ionic Framework (Angular)
- Component-based architecture
- Service injection
- RxJS for reactive patterns
- Platform-specific adaptations

