# Phase 5 — CMS Security Review & Threat Assessment

This document presents the comprehensive security evaluation and architecture verification of the AIC-ADT Baramati Foundation Content Management System (CMS).

> [!NOTE]
> This review documents local code review, static analysis, unit/integration security test suites, and architectural threat modeling. No formal third-party penetration testing or external ISO/SOC2 security certification has been performed at this stage.

---

## 1. Scope & Threat Model

The review assesses the attack surfaces across three core tiers:
1. **Administrative CMS Frontend** (`apps/web/src/app/admin/*`): Session-bound Next.js App Router client and server components.
2. **CMS Core API Engine** (`apps/api/src/*`): NestJS backend exposing authenticated editorial endpoints and public delivery routes.
3. **Database & Storage Subsystems** (`PostgreSQL`, `Prisma ORM`, `Local File Storage / S3-compatible adapter`).

---

## 2. Authentication & Session Security

### 2.1 Session Store Architecture
- **Cryptographic Token Hashing**: Session tokens generated via `crypto.randomBytes(32).toString('hex')` are hashed using SHA-256 (`tokenHash`) before storage in PostgreSQL (`Session` table). Raw tokens are never stored in plaintext.
- **Session Lifespan**: Fixed at 7 days (`SESSION_TTL_MS = 604,800,000 ms`).
- **Active Expiration Enforcement**: `SessionService.validateSession()` strictly verifies `expiresAt > new Date()`. Expired sessions are deleted and return HTTP `401 Unauthorized`.
- **Account State Verification**: On every authenticated request, `SessionService` verifies `user.status === UserStatus.ACTIVE`. Suspended, inactive, or pending accounts are blocked immediately with HTTP `403 Forbidden`.

### 2.2 Transport & Cookie Security
- **HTTP-Only Session Cookies**: Session tokens are transported in the `aic_session` cookie configured with:
  - `httpOnly: true`: Completely inaccessible to browser JavaScript / XSS scripts.
  - `secure: isProduction`: Requires HTTPS in production deployments.
  - `sameSite: 'lax'`: Mitigates Cross-Site Request Forgery (CSRF).
  - `path: '/'`.
- **CSRF Defense**: Implements double-submit CSRF cookie pattern (`aic_csrf_token`). State-changing administrative requests validate origin and CSRF headers.

### 2.3 Brute-Force & Enumeration Defenses
- **Timing Attack Resistance**: Password verification uses `bcrypt.compare` with consistent salt rounds (12).
- **Account Enumeration Defense**: `AuthController.login()` returns a uniform error message (`"Invalid email or password credentials."`) regardless of whether the email exists.
- **Login Rate Limiting**: Global rate limiting via `ThrottlerGuard` restricts repeated authentication attempts per IP address.

---

## 3. Authorization & Role-Based Access Control (RBAC)

### 3.1 Role Hierarchy & Granular Permissions
The CMS implements a 4-tier RBAC matrix with discrete permissions:

| Role | Permitted Actions |
| :--- | :--- |
| **ADMIN** (Super Admin) | Full administrative access, user management, audit review, direct publishing, admin overrides. |
| **APPROVER** (Senior Approver) | Content review, approval, rejection, publishing, unpublishing, archival. |
| **EDITOR** (Domain Officer) | Content drafting, editing owned records, submitting for review, media uploads. |
| **VIEWER** (Auditor / Staff) | Read-only access to drafts, audit logs, and internal registers. |

### 3.2 Guard Enforcement
- **Backend-First Security**: Every administrative route is guarded by `SessionAuthGuard` and `PermissionsGuard`. Bypassing the Next.js frontend to hit `/api/v1/content/*` or `/api/v1/media/*` directly results in immediate `401 Unauthorized` or `403 Forbidden`.
- **Record-Level Ownership**: `NewsService` and `EventService` enforce ownership checks: editors can only edit content where `authorId === currentUser.id`. Unauthorized cross-user modifications are rejected with `403 Forbidden`.
- **Anti-Self-Approval (Dual Custody)**: `WorkflowService` explicitly bars an author from approving their own submission (`entity.authorId === currentUser.id`), requiring independent review by another authorized officer unless overridden by Super Admin.

---

## 4. Content & Workflow Integrity

### 4.1 Strict State Transition Graph
The editorial lifecycle enforces valid state transitions:
$$\text{DRAFT} \longrightarrow \text{IN\_REVIEW} \longrightarrow \text{APPROVED} \longrightarrow \text{PUBLISHED} \longrightarrow \text{ARCHIVED}$$
Direct jumps (e.g. `DRAFT -> PUBLISHED`) are blocked with HTTP `400 Bad Request`.

### 4.2 Slug Integrity & Uniqueness
- Slugs are validated against regex `^[a-z0-9]+(?:-[a-z0-9]+)*$`.
- Slug uniqueness is verified against the database and in-memory indexes. Duplicate creation throws HTTP `409 Conflict`.

### 4.3 Concurrent Revision Protection
Each entity maintains a strictly monotonic `currentVersion` integer. Updates increment the version and record an immutable revision snapshot in `ContentRevision`.

---

## 5. File & Media Security

### 5.1 Upload Payload Verification
- **Magic Bytes Inspection**: `detectMimeTypeFromBuffer` validates actual file headers (JPEG `FF D8 FF`, PNG `89 50 4E 47`, WebP `RIFF...WEBP`, PDF `%PDF-`). Disguised executables (e.g. `malware.exe` renamed to `photo.jpg`) are blocked with HTTP `400 Bad Request`.
- **Extension Allowlist**: Only `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`, `.pdf` are permitted.
- **SVG Security**: Prohibits active script elements (`<script>`, `javascript:`, event handlers `onload`, `<foreignObject>`, `<iframe>`).
- **File Size Restrictions**: Enforces 10 MB maximum for images and 25 MB for statutory PDF documents.

### 5.2 Storage & Path Traversal Defenses
- **Sanitized Filenames**: `sanitizeFilename` strips path traversal sequences (`../`, `..\`), special characters, and path separators, leaving only safe alphanumeric tokens.
- **Server-Generated Storage Keys**: Assets are stored under UUID-based storage keys (e.g., `media/images/2026-10/7d8902f3.png`). The user's original filename is never used as an on-disk storage path.
- **Reference Integrity Guard**: `MediaService.delete()` checks if an asset is referenced by active news articles or events. Referenced media cannot be deleted, throwing HTTP `409 Conflict`.

---

## 6. Public Endpoint Data Sanitization

All public endpoints (`/api/v1/public/*`) enforce server-side visibility rules:
- Queries unconditionally filter by `status: PUBLISHED` and `visibility: PUBLIC`.
- DTOs strip sensitive internal fields: `storagePath`, `storageKey`, `uploaderId`, `authorId`, `reviewerNotes`, `currentVersion`.
- Non-published or private items return generic HTTP `404 Not Found` to prevent enumeration.
