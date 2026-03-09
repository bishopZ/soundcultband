# Agent Guidelines: Soundcult Band Website

Context and learnings for AI agents and developers working on this codebase.

---

## Rules for Future Changes

### Lint and Type-Check

1. **Run linter and type-check after every code change.**
   - Run `npm run lint` and `npm run type-check` after making edits.
   - If any errors are found, resolve them before considering the change complete.
   - Do not leave lint or type errors unfixed.

### Data and Schema

1. **All schema changes must be backwards compatible** with existing production data.
   - Add optional properties, not required ones, unless you run a migration.
   - Never rename or remove properties without a migration that updates existing data.

2. **Prefer schema migrations** for breaking changes:
   - Document the migration in code or a migrations folder.
   - Run migrations before or during deploy, not ad-hoc.

