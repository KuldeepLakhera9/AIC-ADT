# Phase 5: Security, Editorial & Compliance Audit Policy

**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 5 — Content Management System & Editorial Workflows (Task 7)  
**Status:** Approved & Implemented  
**Date:** October 12, 2026  

---

## 1. Executive Summary

This document establishes the institutional audit policy for the AIC-ADT Baramati Foundation Content Management System. AIC-ADT operates as an Atal Incubation Centre supported by AIM, NITI Aayog (Government of India) and the Agricultural Development Trust (ADT) Baramati.

To ensure non-repudiation, operational accountability, and forensic readiness, all administrative mutations, authentication events, and workflow transitions are recorded in an append-only audit log.

---

## 2. Audited Event Taxonomy

| Event Category | Action Identifier | Trigger Condition | Captured Metadata (Non-Sensitive) |
| :--- | :--- | :--- | :--- |
| **Authentication & Security** | `AUTH_LOGIN` | Successful administrator sign-in | `userId`, `ipAddress`, `userAgent` |
| | `AUTH_LOGIN_FAILED` | Failed sign-in attempt | `emailAttempted`, `ipAddress`, `userAgent`, failure reason |
| | `AUTH_LOGOUT` | Session termination | `sessionId`, `userId` |
| | `AUTH_REVOKE_SESSIONS` | Invalidation of active sessions | Target `userId`, actor `adminId` |
| **Editorial Workflow** | `WORKFLOW_SUBMIT_REVIEW` | Author submits content draft | `locale`, `versionNumber`, `revisionId`, submission notes |
| | `WORKFLOW_REQUEST_CHANGES` | Reviewer returns draft with feedback | `locale`, `versionNumber`, reviewer notes ($\ge 10$ chars) |
| | `WORKFLOW_APPROVE` | Peer reviewer signs off on content | `locale`, `versionNumber`, approval notes |
| | `WORKFLOW_APPROVE_ADMIN_OVERRIDE` | Admin emergency self-approval override | `locale`, `versionNumber`, `{ overrideReason: '...' }` |
| | `WORKFLOW_PUBLISH` | Content published live | `locale`, `versionNumber`, `publishedAt` timestamp |
| | `WORKFLOW_BRANCH_REVISION` | New revision staged for published content | `locale`, previous version, new version, changelog |
| | `WORKFLOW_ROLLBACK` | Restoration to historical snapshot | `locale`, target version, new version, rollback reason |
| | `WORKFLOW_ARCHIVE` | Content retired from public view | `locale`, archive timestamp |
| | `WORKFLOW_RESTORE` | Archived record restored to draft | `locale`, restoration timestamp |
| **Media Operations** | `MEDIA_UPLOAD` | File uploaded and registered | `mediaId`, filename, MIME type, size, storage key |
| | `MEDIA_DELETE` | Media asset soft-deleted/purged | `mediaId`, storage key, usage count |
| | `MEDIA_UPDATE` | Alt text, caption, or attribution edited | `mediaId`, updated fields |

---

## 3. Privacy, Data Protection & Redaction Principles

The audit logging subsystem enforces strict data minimization:
1. **Never Log Secrets**: Passwords, password hashes, plaintext tokens, session tokens, CSRF tokens, or private encryption keys are **categorically prohibited** from audit metadata.
2. **Never Log Full Request Bodies**: Indiscriminate request body dumping is forbidden to prevent accidental capture of personal data or credentials.
3. **Structured Non-Sensitive Context**: Metadata is limited to identifiers, version numbers, change reasons, operational timestamps, and network origins (`ipAddress`, `userAgent`).

---

## 4. Immutability & Access Control

### 4.1 Write Once, Read Many (WORM) Principle
- Audit records in PostgreSQL (`audit_logs`) are **append-only**.
- There are **no API endpoints** or CMS interface controls for modifying, updating, or deleting audit logs.
- Database triggers and application guards prohibit `UPDATE` or `DELETE` operations on the `audit_logs` table during standard runtime operations.

### 4.2 Privileged Access Policy
- Access to inspect audit logs requires the `AUDIT_READ` permission.
- Authorized roles: `ADMIN`, `APPROVER`, `CONTENT_EDITOR`.
- All queries to `GET /api/v1/workflow/audit-logs` are throttled and authenticated via high-entropy session cookies.

---

## 5. Retention & Archival Mandate

1. **Active Retention**: Audit logs are retained online in PostgreSQL for **24 months** for operational review and governance monitoring.
2. **Statutory Archive**: At 24 months, logs are encrypted and exported to cold storage (object store with object lock enabled) with a mandatory retention period of **7 years**, fulfilling institutional compliance mandates from NITI Aayog.
