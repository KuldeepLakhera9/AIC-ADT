# Phase 5 — CMS Operations & Maintenance Runbook

**AIC-ADT Baramati Foundation — Atal Incubation Centre**  
**Document Reference**: `AIC-OPS-RUNBOOK-001`  
**Classification**: System Administration & Operational SOP  
**Date**: October 12, 2026

---

## 1. Overview & Purpose

This runbook outlines operational procedures, routine maintenance tasks, emergency incident response, backup and restoration workflows, and security hygiene for the AIC-ADT Baramati Foundation CMS and public website.

---

## 2. Service Architecture & Component Topology

```
[ Public Users ] ─── HTTPS:443 ───> [ Reverse Proxy / Nginx ]
                                          │
                     ┌────────────────────┴────────────────────┐
                     ▼                                         ▼
            [ Next.js Web Frontend ]                  [ NestJS CMS API ]
            (Port 3000 / PM2 or Pod)                  (Port 4000 / PM2 or Pod)
                     │                                         │
                     │          ┌──────────────────────────────┤
                     ▼          ▼                              ▼
            [ Static Assets / CDN ]            [ PostgreSQL Database: 5432 ]
                                               [ Private Media Storage / S3 ]
```

---

## 3. Routine Operational Procedures

### 3.1 Health Monitoring & Service Pings

1. **Backend API Health Check**:
   ```bash
   curl -s -i https://api.aic-adt.in/health
   # Expected Output: HTTP/1.1 200 OK {"status":"ok","info":{"database":{"status":"up"}}}
   ```
2. **Public Website Availability**:
   ```bash
   curl -s -I https://aic-adt.in/
   # Expected Output: HTTP/1.1 200 OK
   ```

### 3.2 Administrative User Provisioning & Deactivation

1. **Creating an Administrative User**:
   Administrative users must be provisioned via the seed script or administrative CLI utility:
   ```bash
   # From apps/api root
   pnpm run prisma:seed
   ```
2. **Deactivating a Compromised or Departing User**:
   Never delete users directly; set `status = SUSPENDED` or `INACTIVE` to instantly invalidate all active sessions while preserving compliance audit history:
   ```sql
   UPDATE "users" SET "status" = 'SUSPENDED', "updated_at" = NOW() WHERE "email" = 'user@aic-adt.in';
   DELETE FROM "sessions" WHERE "user_id" = (SELECT id FROM "users" WHERE "email" = 'user@aic-adt.in');
   ```

### 3.3 Active Session Purging & Invalidation

To invalidate all active sessions across the institution (e.g., during security credential rotations):
```sql
TRUNCATE TABLE "sessions";
```
*Note: This terminates all active admin logins immediately. Users must re-authenticate with their credentials.*

---

## 4. Database Backup & Disaster Recovery Procedures

### 4.1 Automated Daily Backup SOP

Database backups must run nightly via automated cron jobs.

```bash
#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="/var/backups/postgres/aic-adt"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/aic_cms_${TIMESTAMP}.sql.gz"

mkdir -p "${BACKUP_DIR}"

# Execute compressed PostgreSQL dump using pg_dump
pg_dump -h "${DB_HOST}" -p "${DB_PORT:-5432}" -U "${DB_USER}" -d "${DB_NAME}" --no-owner --clean | gzip -9 > "${BACKUP_FILE}"

# Restrict permissions
chmod 600 "${BACKUP_FILE}"

# Retain backups for 30 days locally
find "${BACKUP_DIR}" -type f -name "aic_cms_*.sql.gz" -mtime +30 -delete

echo "Backup completed successfully: ${BACKUP_FILE}"
```

### 4.2 Disaster Recovery & Restoration SOP

> [!CAUTION]
> Never drop or reset a production database without verifying an existing verified backup. Always test the backup file in an isolated staging environment before executing production recovery.

1. **Verify Backup Archive**:
   ```bash
   gzip -t /var/backups/postgres/aic-adt/aic_cms_20261012_120000.sql.gz
   ```
2. **Execute Controlled Database Restoration**:
   ```bash
   gunzip -c /var/backups/postgres/aic-adt/aic_cms_20261012_120000.sql.gz | psql -h "${DB_HOST}" -p "${DB_PORT:-5432}" -U "${DB_USER}" -d "${DB_NAME}"
   ```
3. **Run Prisma Migration Verification**:
   ```bash
   pnpm --filter @aic/api exec prisma migrate status
   ```

---

## 5. Media & Storage Maintenance

### 5.1 Storage Verification & Sync
- **Local Directory Structure**:
  - Public Assets: `uploads/public/`
  - Private Assets: `uploads/private/`
- **Integrity Check**:
  ```bash
  # Verify files exist for all media asset records
  pnpm --filter @aic/api exec tsx scripts/verify-media-integrity.ts
  ```

### 5.2 Deletion Policy
- Physical asset files are only unlinked from disk after their referencing database record is removed.
- Media assets referenced by active content cannot be deleted (`409 Conflict`). Unlink references in the content editor prior to requesting deletion.

---

## 6. Audit Log Retention & Compliance

1. **Retention Schedule**:
   - Audit logs (`AuditLog` table) are retained indefinitely for institutional compliance and statutory requirements.
   - Partitioning by month (`audit_logs_y2026m10`) is recommended when row count exceeds 1,000,000 rows.
2. **Compliance Export**:
   ```bash
   psql -h "${DB_HOST}" -U "${DB_USER}" -d "${DB_NAME}" -c "\copy (SELECT * FROM audit_logs WHERE created_at >= '2026-01-01') TO '/var/backups/audit_export_2026.csv' WITH CSV HEADER;"
   ```

---

## 7. Incident Response & Troubleshooting

### Incident 1: Public Website Shows Cached or Stale Content
- **Cause**: CDN edge cache or Next.js ISR cache has not revalidated after a publish event.
- **Remediation**:
  Trigger on-demand revalidation via curl:
  ```bash
  curl -X POST https://aic-adt.in/api/revalidate \
    -H "Authorization: Bearer ${REVALIDATION_SECRET}" \
    -H "Content-Type: application/json" \
    -d '{"path": "/news", "type": "page"}'
  ```

### Incident 2: High Error Rate on File Uploads (400 Bad Request)
- **Cause**: User is attempting to upload disallowed MIME types or files disguised with false extensions.
- **Remediation**: Check API logs for `MIME spoofing detected`. Inform user that files must match legitimate JPEG, PNG, WebP, or PDF binary signatures.

### Incident 3: Backend API Outage / Database Connection Exhaustion
- **Cause**: Temporary database spike or network disruption.
- **Behavior**: Public website continues serving stale/static pages via cached ISR and built-in seed registers without throwing 500 errors.
- **Remediation**: Inspect database connection metrics (`SELECT count(*) FROM pg_stat_activity;`), terminate orphaned locks, and restart the API process via PM2/Kubernetes.
