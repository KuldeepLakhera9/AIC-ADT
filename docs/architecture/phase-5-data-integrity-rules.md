# Phase 5 Database Integrity Rules & Retention Policies

**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 5 — Content Management System & Editorial Workflows (Task 2)  
**Roles:** Chief Data Officer, Senior Database Administrator, Compliance Lead  
**Date:** October 12, 2026  
**Status:** **APPROVED DATA GOVERNANCE & INTEGRITY DIRECTIVE**  

---

## 1. Executive Summary

This document establishes the mandatory data integrity constraints, foreign key referential actions, concurrency control mechanisms, and statutory audit retention policies for the AIC-ADT Baramati Foundation PostgreSQL 16+ relational database.

These rules ensure that institutional records cannot be orphaned, accidentally destroyed, or tampered with, in full alignment with the Government of India's Digital Personal Data Protection (DPDP) Act 2023 and the Atal Innovation Mission statutory reporting guidelines.

---

## 2. Referential Integrity & Delete Policies

To prevent accidental cascade deletions of statutory or historical records, delete behaviors are strictly differentiated:

| Relationship | Parent Entity | Child Entity | Foreign Key Action | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **User $\to$ Sessions** | `User` | `Session` | `ON DELETE CASCADE` | When a user is deleted/suspended, all active sessions must terminate immediately. |
| **User $\to$ Audit Logs** | `User` | `AuditLog` | `ON DELETE SET NULL` | Audit records must remain permanently preserved even if an employee or author account is removed. |
| **Media $\to$ Publications** | `MediaAsset` | `Publication` | `ON DELETE RESTRICT` | A PDF document asset cannot be deleted while a statutory publication still references it. |
| **Media $\to$ Entities (Thumbnails)** | `MediaAsset` | `Startup`, `News`, `Event` | `ON DELETE SET NULL` | Deleting an image nullifies the thumbnail reference without destroying the content record. |
| **Content $\to$ Translations** | Parent Entity | Child Translation | `ON DELETE CASCADE` | Removing a parent entity cleanly cascades to its localized translation records. |
| **User $\to$ ContentRevisions**| `User` | `ContentRevision` | `ON DELETE RESTRICT` | Historical authorship records must be preserved for accountability. |

---

## 3. Uniqueness Constraints & Indexes

### 3.1 Slugs
- All canonical slugs (`Startup.slug`, `Event.slug`, `NewsArticle.slug`, `Publication.slug`, `Program.slug`, `Facility.slug`) have explicit `UNIQUE` constraints.
- Slugs are constrained to lowercase alphanumeric characters with hyphens: `/^[a-z0-9-]+$/`.

### 3.2 Translation Uniqueness
Composite uniqueness prevents duplicate translations for the same locale:
```sql
ALTER TABLE startup_translations ADD CONSTRAINT uq_startup_translations_locale UNIQUE (startup_id, locale);
ALTER TABLE event_translations ADD CONSTRAINT uq_event_translations_locale UNIQUE (event_id, locale);
ALTER TABLE news_translations ADD CONSTRAINT uq_news_translations_locale UNIQUE (article_id, locale);
ALTER TABLE publication_translations ADD CONSTRAINT uq_publication_translations_locale UNIQUE (publication_id, locale);
ALTER TABLE program_translations ADD CONSTRAINT uq_program_translations_locale UNIQUE (program_id, locale);
ALTER TABLE facility_translations ADD CONSTRAINT uq_facility_translations_locale UNIQUE (facility_id, locale);
```

### 3.3 Indexing Strategy
1. **Public Discovery Indexes:** B-tree indexes on `(locale, status)` to ensure fast resolution of `status = 'PUBLISHED'` queries.
2. **Category & Filtering Indexes:** Indexes on `sector`, `cohort`, `event_category`, `news_category`, `is_statutory`.
3. **Date Sorting Indexes:** Indexes on `publish_date DESC` and `start_date ASC` to power chronologically ordered listings.

---

## 4. Concurrency Control (Optimistic Locking)

To prevent simultaneous edits by multiple editors from overwriting each other:
1. Every editable entity includes a `currentVersion: Int` column.
2. When submitting an update, the CMS client sends the expected version:
   ```sql
   UPDATE startups 
   SET current_version = current_version + 1, updated_at = NOW() 
   WHERE id = $id AND current_version = $expectedVersion;
   ```
3. If the query affects 0 rows, NestJS throws a `409 ConflictException` with the message:
   `"CONCURRENCY CONFLICT: Another editor has updated this record since you opened it. Please refresh and review their changes before re-submitting."`

---

## 5. Transactional Integrity for Multi-Entity Operations

All compound editorial state transitions are wrapped in atomic PostgreSQL transactions (`prisma.$transaction`):
1. **Publish Operation:**
   - Updates `Translation.status` $\to$ `PUBLISHED`.
   - Sets `publishedAt = NOW()`.
   - Creates an immutable entry in `audit_logs`.
   - Dispatches cache revalidation queue item.
   - If any step fails, the entire transaction rolls back cleanly.

---

## 6. Audit Log Retention & Compliance

1. **Immutability:** The `audit_logs` table has no `UPDATE` or `DELETE` permissions granted to standard application roles.
2. **Statutory Retention:** Audit logs must be retained online for a minimum of **365 days** (1 year), after which they are archived to encrypted off-site cold storage.
3. **Sensitive Data Redaction:** IP addresses, session tokens, and passwords are never written in raw form to `audit_logs.metadata`.
