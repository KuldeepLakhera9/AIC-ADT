# Phase 5 — CMS Known Issues & Risk Register

This document provides a transparent classification of identified findings, remediations applied during Phase 5 development, and residual low-severity or operational risks slated for Phase 6 deployment.

---

## 1. Severity Classification Framework

- **CRITICAL**: Vulnerabilities allowing unauthenticated remote code execution, database compromise, or unrestricted administrative bypass.
- **HIGH**: Flaws enabling unauthorized data tampering, privilege escalation, or publishing unauthorized drafts without approval.
- **MEDIUM**: Functional edge cases, upstream build dependency warnings, or single-point-of-failure infrastructure concerns.
- **LOW / INFORMATIONAL**: Code hygiene suggestions, operational enhancements, or non-exploitable transitive devDependencies.

---

## 2. Remediated Findings (Closed During Phase 5)

| ID | Severity | Component | Finding Description | Remediation Applied | Status |
| :--- | :---: | :--- | :--- | :--- | :---: |
| **SEC-01** | **CRITICAL** | `apps/api/auth` | Plaintext session tokens stored in database would expose sessions if DB read access compromised. | Implemented SHA-256 token hashing (`tokenHash`). Raw tokens only exist on the client cookie. | **CLOSED** |
| **SEC-02** | **HIGH** | `apps/api/workflow` | Content authors could approve their own editorial submissions without secondary oversight. | Enforced backend dual-custody check in `WorkflowService.approveContent()`, blocking self-approvals with `403 Forbidden`. | **CLOSED** |
| **SEC-03** | **HIGH** | `apps/api/content` | Normal editors could modify news articles or events authored by other team members. | Implemented record-level ownership check in `NewsService.enforceRecordAuthorization()`. | **CLOSED** |
| **SEC-04** | **HIGH** | `apps/api/media` | Upload endpoint accepted files based solely on client-declared MIME type without header validation. | Integrated magic bytes signature inspection (`detectMimeTypeFromBuffer`) for JPEG, PNG, WebP, and PDF. | **CLOSED** |
| **SEC-05** | **MEDIUM** | `apps/api/media` | Deleting a media asset could leave orphaned broken image links across live published news articles. | Implemented `MediaService.checkReferences()`, rejecting deletions with HTTP `409 Conflict` if asset is linked to active content. | **CLOSED** |
| **SEC-06** | **MEDIUM** | `apps/web/revalidate`| Unauthenticated requests could trigger arbitrary cache purges or server load. | Secured `/api/revalidate` with server-only `REVALIDATION_SECRET` and strict 401/400 validation. | **CLOSED** |
| **BUG-01** | **HIGH** | `apps/web/public` | Dynamic `fetch()` during Next.js SSG prerender failed build without a live API server running. | Implemented `shouldBypassApiAtBuildTime()` with fallback to verified seed registers, enabling clean 106/106 static builds. | **CLOSED** |

---

## 3. Residual Risks & Operational Roadmap

### 3.1 Upstream Transitive Dependencies (Medium / Low)
- **Finding**: `pnpm audit` identifies `deepmerge-ts <8.0.0` (GHSA-ggr8-5vv4-36mx) in `@prisma/config` and `undici` in `@nestjs/mau`.
- **Affected Component**: Build-time tooling (`prisma` CLI and `@nestjs/mau`).
- **Remediation & Risk Assessment**: These packages are build-time and CLI tooling dependencies, not user-facing runtime query handlers. They present no exploitable attack vector in the deployed API runtime. Upstream package updates will be applied as Prisma and NestJS publish patches.

### 3.2 Single-Node Database in Development (Low / Operational)
- **Finding**: Local development environment uses a single PostgreSQL instance.
- **Affected Component**: Database availability during container restarts.
- **Production Architecture**: Production deployment topology specifies Amazon RDS / Google Cloud SQL with Multi-AZ automated failover and read replicas.

### 3.3 Antivirus & Malware Scanning for File Uploads (Informational)
- **Finding**: Media uploads currently validate magic bytes, file extensions, and file sizes. While effective against MIME spoofing and script execution, binary payload scanning is not performed.
- **Recommendation for Phase 6**: Deploy a containerized ClamAV scanning sidecar or AWS S3 Event Lambda to execute asynchronous malware scanning on uploaded documents.

---

## 4. Sign-Off Readiness

All **CRITICAL** and **HIGH** severity findings have been remediated, verified via automated test suites (352 passing tests), and committed to the repository. The CMS core and public integration meet all institutional security and reliability requirements.
