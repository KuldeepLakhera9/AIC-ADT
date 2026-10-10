# AIC-ADT Baramati Foundation — Security Baseline Architecture

## 1. Executive Summary & Defense-in-Depth Strategy

The AIC-ADT Baramati Foundation digital platform handles public institutional data, proprietary agricultural technology intellectual property, multi-step incubation applications, and sensitive evaluation scoring rubrics. This document establishes the technical security baseline and defense-in-depth architecture across the network, application runtime, and database tiers.

```mermaid
flowchart TD
    subgraph Edge ["1. Edge & Network Perimeter"]
        FW["Hardware Firewall / DMZ VLAN"] --> NGINX["Nginx Ingress (TLS 1.3 / Rate Limiting)"]
    end
    subgraph AppLayer ["2. Application Runtime (NestJS)"]
        NGINX --> HELMET["Helmet Security Headers"]
        HELMET --> CORS["Strict Origin CORS Allowlist"]
        CORS --> THROTTLE["Throttler Rate Limiter (100 req/min)"]
        THROTTLE --> BODY["Express Body Parser (1MB limit)"]
        BODY --> VALID["Class-Validator Whitelisting Pipe"]
        VALID --> SANITIZE["Global Exception Filter (Error Redaction)"]
    end
    subgraph DataLayer ["3. Database Tier (PostgreSQL 16+)"]
        SANITIZE --> PRISMA["Prisma ORM (Parameterized Queries)"]
        PRISMA --> ROLE["Least-Privilege Role (aic_app)"]
        ROLE --> DB[("PostgreSQL Cluster (Loopback Only 127.0.0.1)")]
    end
```

---

## 2. Review of Foundational Security Controls

### 2.1 Cross-Origin Resource Sharing (CORS)
* **Policy:** Explicit origin allowlist loaded from `CORS_ORIGIN`. Wildcard origins (`*`) are strictly prohibited in production.
* **Credentials:** `credentials: true` is configured to support secure cross-origin HTTP-only session cookies between the approved frontend origin and the API.
* **Refusal Mechanism:** Disallowed origins are rejected gracefully via standard CORS origin omission (`callback(null, false)`), preventing browsers from inspecting API responses while avoiding 500 server crashes.
* **Allowed Methods:** Explicitly restricted to `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`. Arbitrary verbs (`TRACE`, `CONNECT`) are rejected.
* **Allowed Headers:** Explicitly restricted to `Content-Type`, `Authorization`, `x-correlation-id`, `x-request-id`.

### 2.2 Request Payload Size Limits
* **Configuration:** Express `json` and `urlencoded` parsers are bounded by `BODY_LIMIT` (default `1mb`).
* **Protection:** Shields the Node.js event loop against Denial-of-Service (DoS) and memory starvation attacks stemming from oversized JSON payloads.

### 2.3 Security Headers (Helmet)
Configured in `apps/api/src/main.ts` using `helmet()`:
* **`X-Content-Type-Options: nosniff`**: Prevents MIME-type sniffing attacks.
* **`X-Frame-Options: SAMEORIGIN`**: Protects against clickjacking and UI redressing attacks.
* **`Strict-Transport-Security (HSTS)`**: Enforced in production via Nginx edge reverse proxy (`max-age=31536000; includeSubDomains; preload`).
* **`Content-Security-Policy (CSP)`**: Configured on the Next.js frontend to restrict script execution, inline styles, and frame ancestors.
* **`X-DNS-Prefetch-Control: off`**: Mitigates DNS prefetching privacy leaks.
* **`X-Download-Options: noopen`**: Prevents Internet Explorer from opening downloads in site context.

### 2.4 Error Responses & Information Leakage Defense
* **Global Exception Filter:** All uncaught exceptions, NestJS `HttpException` instances, and Prisma database errors are intercepted by `GlobalExceptionFilter`.
* **Zero Stack Traces in Production:** Detailed stack traces and internal class names are strictly suppressed when `NODE_ENV === 'production'`.
* **Uniform Error Envelope:** All error responses adhere to a consistent contract:
  ```json
  {
    "success": false,
    "statusCode": 400,
    "error": "Bad Request",
    "message": "Invalid application stage payload provided",
    "timestamp": "2026-10-10T15:24:00.000Z",
    "path": "/api/v1/applications",
    "correlationId": "corr-uuid-4"
  }
  ```

### 2.5 Cookie Configuration Prerequisites
In alignment with [ADR-008](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/architecture/architecture-decisions.md#adr-008-authentication-strategy--secure-server-side-sessions-via-http-only-cookies) (Session Authentication), session cookies implemented in future authentication phases must adhere to these mandatory security attributes:
* **`HttpOnly: true`**: Completely blocks access to session tokens via JavaScript `document.cookie`, preventing token theft via XSS.
* **`Secure: true`**: Enforces transmission over encrypted HTTPS channels only (omitted only when `NODE_ENV === 'development'`).
* **`SameSite: 'Lax'`**: Blocks unauthorized third-party cross-site request forgery while allowing top-level navigational links.
* **`Path: '/'`**: Scopes cookie to the application root.
* **`Max-Age`**: Enforces session expiration aligned with idle timeout policies (e.g. 8 hours for administrators, 30 days for applicants).

### 2.6 CSRF Protection Prerequisites
* **Stateless Read Requests:** Safe HTTP verbs (`GET`, `HEAD`, `OPTIONS`) carry no state alterations and require no CSRF tokens.
* **State-Changing Endpoints:** In Phase 3 authentication/intake phases, state-changing requests (`POST`, `PUT`, `DELETE`) will use custom request header validation (`x-csrf-token` matching an encrypted cookie) combined with `SameSite=Lax` cookie semantics.

### 2.7 Rate Limiting & Abuse Prevention
* **Implementation:** Configured globally via `@nestjs/throttler` (`ThrottlerModule`).
* **Default Thresholds:** `THROTTLE_TTL=60` seconds with a cap of `THROTTLE_LIMIT=100` requests per IP address.
* **Edge Rate Limiting:** Complemented by Nginx edge rate-limiting in production (`limit_req_zone $binary_remote_addr zone=api_limit:10m rate=30r/s`).

### 2.8 File-Upload Restrictions (Architecture for Future Media Module)
When the file upload handler (`apps/api/src/modules/media/`) is implemented in Phase 3 Task 8:
* **Magic Byte Validation:** Files must be validated using binary magic bytes (e.g. `file-type`), not relying solely on user-supplied `Content-Type` headers or file extensions.
* **File Size Caps:** Pitch decks capped at 10MB; profile logos and avatars capped at 2MB.
* **Permitted MIME Types:** Restricted to `application/pdf`, `image/png`, `image/jpeg`, `image/webp`. Executable files (`.exe`, `.sh`, `.php`, `.js`) are rejected unconditionally.
* **Storage Partitioning:** Public assets (logos) stored in `storage/public/`; confidential applicant business plans stored in `storage/private/` with access gated by RBAC session checks.
* **Filename Normalization:** Uploaded files renamed with random UUIDs (`${uuidv4()}.pdf`) to prevent path traversal (`../../etc/passwd`) attacks.

### 2.9 Access Logging & Credential Redaction
* **Format:** Single-line structured JSON logs with ISO-8601 timestamps and request correlation IDs (`x-correlation-id`).
* **Automated Redaction:** `AppLoggerService` regex sanitizers automatically replace sensitive keys:
  * Passwords: `"password": "[REDACTED]"`
  * Authentication Tokens: `"Bearer eyJ..."` -> `"Bearer [REDACTED]"`
  * Database Connection Strings: `postgresql://user:***@host...`
  * Credit Card / Aadhaar / PAN numbers.

---

## 3. Security Controls Matrix

The table below delineates the status, implementation details, and responsible project phase for every platform security control:

| Security Control | Status | Implementation Details | Owner / Phase |
| :--- | :--- | :--- | :--- |
| **Least-Privilege Database Role** | **IMPLEMENTED** | Role `aic_app` holds no superuser/createdb rights. Dedicated DB `aic_adt_db`. | Phase 3, Task 5 |
| **Network Interface Isolation** | **IMPLEMENTED** | PostgreSQL port mapped strictly to `127.0.0.1:5432:5432`. | Phase 3, Task 5 |
| **CORS Origin Whitelisting** | **IMPLEMENTED** | Environment-driven origin allowlist in NestJS `main.ts` with explicit methods. | Phase 3, Task 4 & 6 |
| **Security Headers (Helmet)** | **IMPLEMENTED** | `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, CSP. | Phase 3, Task 4 & 6 |
| **Request Size Limits** | **IMPLEMENTED** | Express body parsers capped at 1MB (`BODY_LIMIT`). | Phase 3, Task 4 & 6 |
| **Structured JSON Logging** | **IMPLEMENTED** | Single-line JSON logging with correlation IDs and credential redaction. | Phase 3, Task 4 |
| **Input Validation Pipeline** | **IMPLEMENTED** | NestJS `ValidationPipe` with `whitelist: true`, `forbidNonWhitelisted: true`. | Phase 3, Task 4 |
| **Database Parameterization** | **IMPLEMENTED** | Prisma ORM prepared statements eliminate SQL injection vulnerabilities. | Phase 3, Task 5 |
| **Frontend Secret Protection** | **IMPLEMENTED** | `apps/web/src/config/env.ts` throws on sensitive `NEXT_PUBLIC_*` variables. | Phase 3, Task 6 |
| **Rate Limiting** | **IMPLEMENTED** | `@nestjs/throttler` (100 req/60s) active on API endpoints. | Phase 3, Task 4 |
| **Session Authentication (RBAC)** | *PENDING* | Server-side sessions with HTTP-only cookies, password hashing (Argon2id). | **Phase 3, Task 7 (Auth Module)** |
| **CSRF Defense Tokens** | *PENDING* | Double-submit CSRF cookie protection for authenticated mutation routes. | **Phase 3, Task 7 (Auth Module)** |
| **File Upload MIME & Size Validation** | *PENDING* | Binary magic-number inspection and private/public storage partitioning. | **Phase 3, Task 8 (Media Module)** |
| **Production TLS 1.3 / HSTS** | *PENDING* | Nginx SSL certificates, TLS 1.3 cipher suites, OCSP stapling on Baramati host. | **Phase 3, Task 10 (Deployment)** |
| **Automated DB Backup Encryption** | *PENDING* | Nightly `pg_dump` with AES-256 GPG encryption and 30-day retention rotation. | **Phase 3, Task 10 (Deployment)** |
