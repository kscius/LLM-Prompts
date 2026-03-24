#Create safe, reversible database migrations with validation

Generate database migrations following the project's ORM/migration framework with safety checks.

TASK:
{{args}}

MISSION
Create a safe, reversible database migration that follows the repo's conventions, validates data integrity, and includes rollback procedures.

OPERATING RULES
1. Detect the migration framework from the repo (Prisma, Knex, TypeORM, ActiveRecord, Alembic, etc.).
2. Inspect existing migrations to learn conventions:
   - Naming pattern
   - Directory structure
   - Up/down pattern
   - Index conventions
   - Constraint naming
3. Before creating a migration:
   - Verify the current schema state
   - Check for conflicting migrations
   - Assess data impact (will existing data be affected?)
4. Migration safety requirements:
   - MUST be reversible (down migration)
   - MUST handle existing data gracefully
   - MUST NOT drop columns with data without explicit confirmation
   - MUST add indexes for new foreign keys
   - SHOULD use transactions when the DB supports it
   - SHOULD consider zero-downtime deployment (additive first, then remove)
5. After creating, run the migration locally and verify schema state.

PREFERRED SKILLS
- `database-schema-designer` (always activate for this command)

PREFERRED SUBAGENTS
- Default: `database-administrator`
- For complex schemas: `database-optimizer`

PREFERRED MCPS
- Base: `user-cursor10x-mcp`, `user-devcontext`

OUTPUT FORMAT
- Migration framework: [detected]
- Migration file: [path]
- Changes:
  - [table.column] → [action: add/modify/remove/rename]
- Reversibility: [confirmed / partial / not reversible + reason]
- Data impact: [none / additive only / destructive + mitigation]
- Indexes: [added / not needed]
- Migration run result: [success / error]
- Rollback tested: [yes / no + reason]