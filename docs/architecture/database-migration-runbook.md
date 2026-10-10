# AIC-ADT Baramati Foundation — Database Migration Runbook

## 1. Overview & Golden Rules

This runbook outlines standard operating procedures for creating, reviewing, applying, verifying, and recovering database schema migrations across development, staging, and production environments for the AIC-ADT platform.

> [!CAUTION]
> **RULE 1: NEVER RUN `prisma db push` IN PRODUCTION OR STAGING.**
> Automatic schema synchronization (`db push`) bypasses version-controlled migration records, lacks rollback tracking, and can silently drop columns or tables.
>
> **RULE 2: NEVER RUN `prisma migrate reset` AGAINST PRODUCTION DATA.**
> Migration resets destructively truncate tables and recreate the entire schema from scratch.

---

## 2. Local Development Workflow

All commands should be executed from the repository root using `pnpm`.

```mermaid
flowchart TD
    A["1. Update schema.prisma"] --> B["2. Generate migration (--create-only)"]
    B --> C["3. Review generated migration.sql"]
    C --> D{"Review Passed?"}
    D -- No --> E["Edit migration.sql or re-adjust schema"]
    E --> C
    D -- Yes --> F["4. Apply migration in dev (prisma:migrate:dev)"]
    F --> G["5. Regenerate Prisma Client (prisma:generate)"]
    G --> H["6. Verify migration status (prisma:migrate:status)"]
    H --> I["7. Commit migration directory to Git"]
```

### Step 1: Update the Prisma Schema
Modify `apps/api/prisma/schema.prisma` to declare the desired model, enum, or relation changes. Ensure all table and column names comply with architectural conventions (`UUID` primary keys, `TIMESTAMPTZ(6)`, `@map` snake_case names).

### Step 2: Generate Migration SQL (Draft Mode)
Generate the draft migration without applying it immediately to inspect and review the raw SQL:

```bash
pnpm --filter @aic/api exec prisma migrate dev --name <migration_name> --create-only
```

*Example:*
```bash
pnpm --filter @aic/api exec prisma migrate dev --name add_startup_directory --create-only
```

This creates a new timestamped migration directory under `apps/api/prisma/migrations/<timestamp>_<migration_name>/migration.sql`.

### Step 3: Review the Generated SQL Checklist
Open the generated `migration.sql` file and perform a mandatory engineering review:

- [ ] **Data Safety:** Does the migration drop any existing columns, tables, or constraints (`DROP TABLE`, `DROP COLUMN`)?
- [ ] **Default Values:** Are new non-nullable columns accompanied by appropriate `DEFAULT` values to prevent errors on existing rows?
- [ ] **Index Concurrency:** Are indexes created on high-volume foreign keys or frequently filtered columns?
- [ ] **Type & Precision:** Are strings bounded by `VARCHAR(n)` rather than unbounded text where appropriate?
- [ ] **Foreign Keys:** Are appropriate `ON DELETE` cascading or restriction policies declared (`ON DELETE CASCADE` vs `ON DELETE SET NULL`)?

### Step 4: Apply Migration in Local Development
Apply the verified migration to the local development PostgreSQL database:

```bash
pnpm --filter @aic/api prisma:migrate:dev
```

### Step 5: Regenerate the Prisma Client
Prisma automatically regenerates the client after `migrate dev`. If invoking independently or after pulling remote Git branches:

```bash
pnpm --filter @aic/api prisma:generate
```

### Step 6: Verify Migration Status
Confirm that the database schema is fully synchronized with the migration history:

```bash
pnpm --filter @aic/api prisma:migrate:status
```

Expected output:
```text
1 migration found in prisma/migrations
Database schema is up to date!
```

### Step 7: Run Development Seed (Optional)
If seed data is needed for local development testing:

```bash
pnpm --filter @aic/api prisma:seed
```

---

## 3. Production Deployment Runbook

### 3.1 Pre-Migration Backup (Mandatory)
Before applying migrations to production, capture a full transactional logical backup using `pg_dump`:

```bash
# Capture pre-migration snapshot
pg_dump -h 127.0.0.1 -p 5432 -U aic_app -d aic_adt_db \
  -F c -b -v -f "/var/backups/aic_adt_pre_migration_$(date +%Y%m%d_%H%M%S).dump"
```

### 3.2 Production Migration Execution
In production or staging, execute `prisma migrate deploy`. This command strictly applies pending versioned migrations from `apps/api/prisma/migrations` within transactional boundaries without prompting for interactive input or using shadow databases:

```bash
pnpm --filter @aic/api prisma:migrate:deploy
```

Verify successful execution:
```bash
pnpm --filter @aic/api prisma:migrate:status
```

---

## 4. Failure Recovery & Disaster Troubleshooting

### Scenario A: Migration Failed Mid-Execution in Development
If a migration fails due to a SQL syntax error, type conflict, or constraint violation:

1. Inspect the error output and identify the failing statement in `apps/api/prisma/migrations/<failing_migration>/migration.sql`.
2. Delete the unapplied migration folder or edit the SQL to resolve the error.
3. Re-run `pnpm --filter @aic/api prisma:migrate:dev`.

### Scenario B: Migration Marked as Failed in `_prisma_migrations` Table
When a migration fails midway in production or staging, Prisma records its `finished_at` as `NULL` and flags it as failed. Subsequent `migrate deploy` commands will refuse to proceed until resolved.

#### Recovery Option 1: Mark Migration as Rolled Back (if changes were undone manually)
```bash
pnpm --filter @aic/api exec prisma migrate resolve --rolled-back "<migration_name>"
```
*Example:*
```bash
pnpm --filter @aic/api exec prisma migrate resolve --rolled-back "20261010094159_init_foundation"
```

#### Recovery Option 2: Mark Migration as Applied (if SQL was manually fixed and executed)
If the database was manually corrected via `psql` to match the migration state:
```bash
pnpm --filter @aic/api exec prisma migrate resolve --applied "<migration_name>"
```

### Scenario C: Complete Database Restoration from Snapshot
If a catastrophic migration failure requires reverting the entire database to the pre-migration snapshot:

```bash
# Terminate existing active application connections
psql -h 127.0.0.1 -U aic_admin -d postgres -c \
  "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'aic_adt_db' AND pid <> pg_backend_pid();"

# Restore database from pre-migration dump
pg_restore -h 127.0.0.1 -U aic_app -d aic_adt_db --clean --if-exists -v "/var/backups/aic_adt_pre_migration_<timestamp>.dump"
```

---

## 5. Shadow Database Configuration

Prisma Migrate uses a **shadow database** during development (`prisma migrate dev`) to detect schema drift and validate migrations.

In accordance with least-privilege security policies, the application user `aic_app` does not hold `CREATEDB` permissions. Therefore, a dedicated shadow database `aic_adt_shadow_db` is provisioned:

```bash
# In .env (local development only):
SHADOW_DATABASE_URL="postgresql://aic_app:aic_app_dev_password@127.0.0.1:5432/aic_adt_shadow_db?schema=public"
```

This enables seamless development migration generation without granting superuser privileges to the application role.
