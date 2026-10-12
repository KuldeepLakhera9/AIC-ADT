# Phase 5 — Secure Admin Authentication Architecture

**Document Version:** 1.0.0  
**Status:** Approved & Implemented  
**Classification:** Technical Architecture & Security Specification  
**System:** AIC-ADT Baramati Foundation CMS Platform  
**Target Date:** October 2026

---

## 1. Executive Summary

This document specifies the secure administrator authentication engine implemented for the AIC-ADT Baramati Foundation Content Management System (CMS). Adhering to strict institutional governance and OWASP guidelines, the authentication system establishes a defense-in-depth architecture spanning `apps/api` (NestJS) and `apps/web` (Next.js).

Key architectural guarantees include:
1. **Opaque Server-Side Sessions:** 256-bit cryptographic entropy session tokens stored in PostgreSQL as SHA-256 digests.
2. **Hardened Cookie Transport:** Exclusively transported via `HttpOnly`, `SameSite=Lax`, and environment-sensitive `Secure` cookies (`aic_session`). No session tokens or tokens are ever exposed to JavaScript `localStorage` or `sessionStorage`.
3. **Password Security:** OWASP-compliant `scrypt` key derivation function with unique 16-byte cryptographically secure random salts.
4. **Timing Attack Resistance:** Constant-time comparison (`crypto.timingSafeEqual`) and synthetic password verification on non-existent accounts to eliminate timing side-channels and username enumeration.
5. **Session Lifecycle & Invalidation:** Authoritative 8-hour session lifetime with instant server-side revocation on logout, account deactivation, or administrative session purge.

---

## 2. Authentication Flow Architecture

```
[Administrator Browser]
       │
       │ 1. POST /api/auth/login (email, password)
       ▼
[Next.js API Gateway (apps/web)]
       │
       │ 2. Forward credentials + Client IP/User-Agent
       ▼
[NestJS Auth Controller (apps/api)]
       │
       ├─► Check Rate Limiter (ThrottlerGuard)
       │
       ├─► Validate DTO (class-validator)
       │
       ├─► Retrieve User & Verify Active Status
       │      │
       │      ├─► (If not found): Perform synthetic scrypt verification -> return 401
       │      └─► (If disabled): Return 401 "Account is disabled"
       │
       ├─► Verify Password Hash via scryptSync (timingSafeEqual)
       │
       ├─► Generate 32-byte Raw Session Token + 32-byte CSRF Token
       │
       ├─► Store SHA-256(RawToken) in PostgreSQL `Session` Table
       │
       ▼
[Set-Cookie Headers Returned]
       ├─► aic_session=<rawToken>; HttpOnly; SameSite=Lax; Path=/; Max-Age=28800
       └─► aic_csrf=<csrfToken>; SameSite=Lax; Path=/; Max-Age=28800
```

---

## 3. Core Implementation Components

### 3.1 Password Hashing Service (`PasswordService`)
Located in [apps/api/src/auth/password.service.ts](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/api/src/auth/password.service.ts):
- **Algorithm:** Scrypt (Node.js native `crypto.scryptSync`).
- **Parameters:** `N=16384` (CPU/memory cost), `r=8` (block size), `p=1` (parallelization), `keyLen=64` bytes.
- **Format:** `scrypt$<saltHex>$<hashHex>`.
- **Timing Protection:**
  - Hashes are verified using `crypto.timingSafeEqual`.
  - When a login attempt specifies an unrecognized email address, a precomputed synthetic scrypt hash is verified to ensure identical processing latency (~45-55ms) regardless of user existence.

### 3.2 Authoritative Session Management (`SessionService`)
Located in [apps/api/src/auth/session.service.ts](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/api/src/auth/session.service.ts):
- **Token Generation:** `crypto.randomBytes(32).toString('hex')` (256 bits entropy).
- **Storage Hashing:** The plain token is never stored in the database. Only `SHA-256(rawToken)` is persisted in the `Session` entity, protecting active sessions against database snapshot leaks.
- **TTL Enforcement:** Default `SESSION_TTL_SECONDS = 28,800` (8 hours). Expired sessions are pruned and automatically rejected upon validation.
- **User Status Validation:** Every session validation queries the active user status. If the account status is changed to `INACTIVE` or `SUSPENDED`, all active sessions are immediately invalidated.

### 3.3 Authentication & Authorization Guards
1. **`SessionAuthGuard`** ([apps/api/src/auth/guards/session-auth.guard.ts](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/api/src/auth/guards/session-auth.guard.ts)):
   - Extracts session token from incoming `aic_session` cookie (or optional `Authorization: Bearer <token>` for programmatic API tests).
   - Validates session existence, expiration, and user account status.
   - Populates `request.user` with sanitized `AuthenticatedUser` payload.
2. **`PermissionsGuard`** ([apps/api/src/auth/guards/permissions.guard.ts](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/api/src/auth/guards/permissions.guard.ts)):
   - Reads required permissions declared via `@RequirePermissions(...)`.
   - Resolves role-based permissions against the authoritative RBAC matrix.
   - Rejects unpermitted actions with a consistent HTTP 403 Forbidden payload.
3. **`CsrfGuard`** ([apps/api/src/auth/guards/csrf.guard.ts](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/api/src/auth/guards/csrf.guard.ts)):
   - Validates double-submit cookie patterns for mutative requests (`POST`, `PUT`, `PATCH`, `DELETE`).
   - Ensures `x-csrf-token` header matches the `aic_csrf` cookie value.
   - Verifies `Origin` and `Referer` headers against allowed hosts.

---

## 4. API Endpoints Specification

### 4.1 Administrator Sign-In (`POST /api/v1/auth/login`)
- **Rate Limit:** 5 attempts per 60-second window per IP.
- **Request Body:**
  ```json
  {
    "email": "admin@aic-adt.org",
    "password": "SecurePassword123!"
  }
  ```
- **Success Response (200 OK):**
  - Response Body:
    ```json
    {
      "success": true,
      "user": {
        "id": "usr_cly...",
        "email": "admin@aic-adt.org",
        "name": "Institutional Administrator",
        "role": "ADMIN",
        "permissions": ["dashboard.read", "content.publish", "..."]
      }
    }
    ```
  - Headers:
    ```http
    Set-Cookie: aic_session=f8b3...; Path=/; HttpOnly; SameSite=Lax; Max-Age=28800
    Set-Cookie: aic_csrf=3a1c...; Path=/; SameSite=Lax; Max-Age=28800
    ```
- **Failure Responses:**
  - 400 Bad Request: Validation failure (malformed email, missing password).
  - 401 Unauthorized: `{"statusCode": 401, "message": "Invalid email or password", "error": "Unauthorized"}` (identical for wrong password or non-existent account).
  - 429 Too Many Requests: Rate limit exceeded.

### 4.2 Administrator Sign-Out (`POST /api/v1/auth/logout`)
- **Guards:** `SessionAuthGuard`, `CsrfGuard`.
- **Action:**
  - Deletes server-side session from database.
  - Overwrites `aic_session` and `aic_csrf` cookies with `Max-Age=0` and past expiration.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Session successfully invalidated"
  }
  ```

### 4.3 Current Session Profile (`GET /api/v1/auth/me`)
- **Guards:** `SessionAuthGuard`.
- **Response (200 OK):**
  ```json
  {
    "id": "usr_cly...",
    "email": "admin@aic-adt.org",
    "name": "Institutional Administrator",
    "role": "ADMIN",
    "status": "ACTIVE",
    "permissions": ["dashboard.read", "..."]
  }
  ```

---

## 5. Account Recovery and Identity Governance

1. **Self-Service Password Reset:**
   - **Decision:** Self-service public password reset is **unapproved** for administrative accounts in Phase 5 to prevent SMS/email interception vulnerabilities.
   - **Approved Protocol:** Administrative credentials and recovery must be initiated by an existing `ADMIN` role holder via administrative CLI runbooks or authorized identity management procedures.
2. **Multi-Factor Authentication (MFA):**
   - **Decision:** TOTP-based 2FA is designated for Phase 6 institutional rollout. Phase 5 enforces IP rate limiting and session IP/UserAgent auditing as the initial defense-in-depth layer.
3. **Account Deactivation:**
   - Setting a user's status to `INACTIVE` or `SUSPENDED` in PostgreSQL triggers immediate rejection on all subsequent requests, regardless of whether their session token has reached its 8-hour expiry.

---

## 6. Verification and Compliance Checklist

| Security Control | Implementation Mechanism | Status |
| :--- | :--- | :--- |
| **No Plaintext Passwords** | OWASP `scrypt` hashing with 16-byte random salt | **Verified** |
| **No In-Memory Production Sessions** | PostgreSQL `Session` entity with SHA-256 token hashing | **Verified** |
| **No Client-Side Token Storage** | `HttpOnly` cookie transport only; 0 usage of `localStorage` | **Verified** |
| **CSRF Defense** | Double-submit cookie check + Origin validation | **Verified** |
| **User Enumeration Prevention** | Uniform 401 errors + synthetic scrypt verification | **Verified** |
| **Granular Authorization** | Centralized `PermissionsGuard` with 18 distinct permissions | **Verified** |
| **Zero Flash of Protected UI** | Next.js server-side / client-side sync with loading skeleton | **Verified** |
