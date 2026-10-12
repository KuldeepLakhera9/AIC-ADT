# Phase 5 — Database & Migration Safety Review

This document provides a thorough audit of the PostgreSQL database schema, committed Prisma migrations, foreign key constraints, transactional boundaries, credential protections, and disaster recovery procedures for the AIC-ADT Baramati Foundation CMS.

---

## 1. Migration Inventory & Schema Evolution

The database schema is managed via Prisma Migrate and versioned in `apps/api/prisma/migrations/`:

| Migration Directory | Applied Schema Elements | Key Constraints Added |
| :--- | :--- | :--- |
| `20261010094159_init_foundation` | Initial foundation models: `User`, `Role`, `UserStatus`, `AuditLog`. | Primary keys (UUIDv4), unique emails. |
| `20261012123000_add_session_model` | `Session` model for server-side stateful authentication. | `tokenHash` index, foreign key to `User(id)` with `ON DELETE CASCADE`. |
| `20261012141500_add_news_content_model` | `NewsArticle`, `NewsTranslation` models. | Unique slug `uq_news_slug`, composite unique `uq_news_translations_locale(articleId, locale)`. |
| `20261012143000_add_event_content_model` | `Event`, `EventTranslation` models. | Unique slug `uq_event_slug`, composite unique `uq_event_translations_locale(eventId, locale)`. |
| `20261012150000_add_media_asset_model` | `MediaAsset` model with SHA-256 checksums and MIME metadata. | Checksum index, unique storage key. |
| `20261012154500_add_content_revision_and_workflow` | `ContentRevision` immutable revision snapshots. | Monotonic versioning, composite index `(entityType, entityId, versionNumber)`. |

All migrations are tracked and locked in `apps/api/prisma/migrations/migration_lock.toml`.

---

## 2. Foreign Key & Uniqueness Constraints

1. **Composite Locale Uniqueness**:
   ```sql
   CREATE UNIQUE INDEX "uq_news_translations_locale" ON "news_translations"("article_id", "locale");
   CREATE UNIQUE INDEX "uq_event_translations_locale" ON "event_translations"("event_id", "locale");
   ```
   Ensures that an article or event cannot have duplicate translations for the same locale code.
2. **Slug Uniqueness**:
   Slugs across news releases and events enforce case-sensitive unique indexes, preventing URL collision.
3. **Reference Integrity & Cascade Policy**:
   - `Session` records use `ON DELETE CASCADE`: Deleting or deactivating a user automatically purges active session tokens.
   - `MediaAsset` records are protected against accidental cascade deletion: content entities maintain nullable foreign keys, and `MediaService` blocks physical asset deletion if referenced by content.

---

## 3. Transaction Safety

Multi-step database updates are strictly wrapped in atomic Prisma interactive transactions (`this.prisma.$transaction(async (tx) => { ... })`).

### Example: News Article Creation
```typescript
await this.prisma.$transaction(async (tx) => {
  // 1. Create parent article record
  const article = await tx.newsArticle.create({ ... });
  // 2. Create initial English translation record
  await tx.newsTranslation.create({ ... });
  // 3. Create immutable audit log entry
  await tx.auditLog.create({ ... });
  return article;
});
```
If any step fails (e.g. audit log validation error), the entire operation rolls back automatically, preventing orphaned records or corrupted states.

---

## 4. Credential Security & Network Topology

1. **Environment Isolation**: Database connection strings are supplied exclusively via the server-only environment variable `DATABASE_URL`.
2. **Log Sanitization**: `AppLoggerService` and `DatabaseService` sanitize and mask database passwords in connection error logs (e.g. `postgresql://aic_app:***@127.0.0.1:5432/aic_adt_db`).
3. **Port Exposure**: In production configurations:
   - PostgreSQL port `5432` binds exclusively to `127.0.0.1` or the internal Docker container network.
   - External internet access to PostgreSQL port `5432` is prohibited via firewall rules.

---

## 5. Backup & Disaster Recovery Procedures

### 5.1 Automated Daily Backups
The database infrastructure utilizes scheduled daily pg_dump backups with gzip compression:
```bash
pg_dump -U aic_app -h localhost -d aic_adt_db -Fc -f /backups/aic_adt_db_$(date +%Y%m%d_%H%M%S).dump
```

### 5.2 Restoration Procedure
In the event of database corruption or hardware failure:
```bash
# 1. Stop API application
docker stop aic_api_container

# 2. Restore from verified dump file
pg_restore -U aic_app -h localhost -d aic_adt_db --clean --if-exists /backups/aic_adt_db_latest.dump

# 3. Verify migration parity
pnpm --filter @aic/api exec prisma migrate status

# 4. Restart API application
docker start aic_api_container
```
All backup dumps are encrypted at rest using AES-256 before offsite replication.
