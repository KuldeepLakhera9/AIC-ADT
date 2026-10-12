# Phase 5: Content Revision Strategy & Rollback Architecture

**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 5 — Content Management System & Editorial Workflows (Task 7)  
**Status:** Approved & Implemented  
**Date:** October 12, 2026  

---

## 1. Executive Summary

Public institutional content for the AIC-ADT Baramati Foundation must remain continuously accessible and legally verifiable. Updating published content must never cause downtime, content flashing, or accidental disclosure of work-in-progress drafts.

This specification documents the **Live Revision Staging** and **Safe Rollback Architecture** implemented across PostgreSQL, Prisma, NestJS, and Next.js.

---

## 2. Live Revision Staging (Zero Disruption)

Naive CMS architectures overwrite records directly upon editing, exposing unvetted drafts on the public website. The AIC-ADT platform implements decoupled version staging:

```
[Public Website Visitors] ──────> Reads Live PUBLISHED Translation (v1)
                                               ▲
                                               │ (Untouched)
[Editorial Staff] ─────────────> Branches New Staged Revision (v2) in DRAFT
                                               │
                                      Undergoes Review & Approval
                                               │
                                 [On Dual-Custody Publish]
                                               ▼
                              Atomic PostgreSQL Transaction Merges v2
                             Public Cache Revalidated Instantaneously
```

### Technical Workflow:
1. When an editor selects **"Edit Published Content"**, the system invokes `POST /api/v1/workflow/entities/:entityType/:id/branch-revision`.
2. The entity `currentVersion` is incremented ($v \to v + 1$).
3. The live translation row (`NewsTranslation` or `EventTranslation`) remains in `status = PUBLISHED` and continues serving public traffic.
4. A new record is created in `content_revisions` with:
   - `version_number`: Next version number ($v + 1$).
   - `status`: `DRAFT`.
   - `data_snapshot`: JSONB payload containing the new proposed content.
   - `changelog`: Optional editor notes describing the intent of the change.
5. Once peer-reviewed and approved, the approved revision snapshot is merged atomically into the live translation record in a PostgreSQL transaction on publish.

---

## 3. Database Schema: `content_revisions`

```prisma
model ContentRevision {
  id            String            @id @default(uuid()) @db.Uuid
  entityType    ContentEntityType @map("entity_type")
  entityId      String            @map("entity_id") @db.Uuid
  versionNumber Int               @map("version_number")
  locale        String            @db.VarChar(5)
  status        ContentStatus     @default(DRAFT)
  dataSnapshot  Json              @map("data_snapshot") @db.JsonB
  authorId      String?           @map("author_id") @db.Uuid
  reviewerId    String?           @map("reviewer_id") @db.Uuid
  reviewNotes   String?           @map("review_notes") @db.Text
  changelog     String?           @db.VarChar(500)
  createdAt     DateTime          @default(now()) @map("created_at") @db.Timestamptz(6)

  // Relationships
  author        User?             @relation("RevisionAuthor", fields: [authorId], references: [id], onDelete: SetNull)
  reviewer      User?             @relation("RevisionReviewer", fields: [reviewerId], references: [id], onDelete: SetNull)

  @@unique([entityType, entityId, versionNumber, locale], name: "uq_revisions_entity_version_locale")
  @@index([entityType, entityId], name: "idx_revisions_entity")
  @@index([status], name: "idx_revisions_status")
  @@index([authorId], name: "idx_revisions_author")
  @@index([reviewerId], name: "idx_revisions_reviewer")
  @@index([createdAt(sort: Desc)], name: "idx_revisions_created_at")
  @@map("content_revisions")
}
```

---

## 4. Controlled Non-Destructive Rollback Architecture

A critical principle of AIC-ADT data integrity is that **rollback never erases history**.

### Rollback Guarantees:
1. **Target Verification**: The system verifies that the target version $v_{\text{target}}$ exists in `content_revisions`.
2. **Mandatory Justification**: The operator must provide a written reason ($\ge 10$ characters) explaining the institutional rationale for the restoration.
3. **Monotonic Version Increment**: Rather than resetting the version number backwards, rollback creates a new version:
   $$v_{\text{new}} = v_{\text{current}} + 1$$
4. **Controlled Staging**: The historical snapshot data is loaded into $v_{\text{new}}$ and placed into `DRAFT` status, allowing editors to review the restored content before re-publishing.
5. **Audit Trail Preservation**: An immutable audit log entry `WORKFLOW_ROLLBACK` is generated, linking the actor, previous version, restored version, target historical version, and justification.
6. **No Row Deletion**: Historical records in `content_revisions` and `audit_logs` are never deleted or truncated.

---

## 5. Revision Comparison & Inspection Interface

The CMS Review Queue provides a dedicated **Revisions & Rollback** inspection drawer:
- **Historical Timeline**: Visualizes all past iterations with timestamps, author identity, reviewer sign-offs, and changelog descriptions.
- **Data Snapshot Payload**: Inspects title, summary, body content, and metadata at each historical point in time.
- **Rollback Activation**: Operators can select any historical snapshot and trigger safe restoration directly from the management drawer.
