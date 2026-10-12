# Phase 5 — Session Security & Cookie Hardening Specification

**Document Version:** 1.0.0  
**Status:** Approved & Implemented  
**Classification:** Security Architecture Specification  
**System:** AIC-ADT Baramati Foundation CMS Platform  
**Target Date:** October 2026

---

## 1. Architectural Principles

The session architecture for the AIC-ADT Baramati Foundation CMS eliminates client-side bearer tokens in favor of authoritative, server-managed sessions with cryptographically bound cookies.

Key defenses include:
1. **Opaque Session Identifiers:** Clients never inspect, parse, or generate session contents.
2. **Database Hash Storage:** Raw tokens are never persisted in PostgreSQL; only their SHA-256 digests are stored, protecting active sessions against database dump compromises.
3. **Double-Submit CSRF Protection:** Mutative actions require synchronization between an authenticated CSRF cookie and an HTTP request header.
4. **Host & Context Restrictions:** Strict cookie flags ensure session tokens cannot be read by browser scripts, hijacked across cross-origin requests, or leaked across unencrypted links.

---

## 2. Session Token Generation & Storage

### 2.1 Cryptographic Entropy
Session tokens are generated using the operating system's cryptographically secure pseudo-random number generator (CSPRNG):
```typescript
const rawToken = crypto.randomBytes(32).toString('hex'); // 256 bits of entropy
```
This guarantees an infeasible search space ($2^{256}$ possibilities), rendering brute-force enumeration mathematically impossible.

### 2.2 Storage Hash Derivation
Before writing to the PostgreSQL database, the session token is hashed:
```typescript
const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
```
The database records the following entity attributes in the `Session` table:
```prisma
model Session {
  id        String   @id @default(cuid())
  userId    String
  tokenHash String   @unique
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## 3. Cookie Configuration Policy

All session credentials are exchanged exclusively through the Set-Cookie HTTP response header.

| Attribute | `aic_session` Cookie | `aic_csrf` Cookie | Rationale |
| :--- | :--- | :--- | :--- |
| **HttpOnly** | `true` | `false` | Prevents XSS scripts from accessing the authentication token while permitting client reading of the CSRF token. |
| **Secure** | `true` (in production/HTTPS) | `true` (in production/HTTPS) | Ensures tokens are transmitted exclusively over encrypted TLS connections. |
| **SameSite** | `Lax` | `Lax` | Blocks cross-site request forgery on third-party POST requests while allowing smooth top-level navigational landing. |
| **Path** | `/` | `/` | Restricts cookies to the authoritative CMS application domain. |
| **Max-Age** | 28,800 seconds (8 hours) | 28,800 seconds (8 hours) | Automatically discards stale cookies from client storage upon expiry. |

---

## 4. Cross-Site Request Forgery (CSRF) Defense

CORS policies alone do not prevent cross-site request forgery on browser-initiated form actions or certain script payloads. To guarantee absolute CSRF resistance, the platform implements a dual-layer defense:

### 4.1 Double-Submit Cookie Verification
1. Upon successful login, the server sets a high-entropy `aic_csrf` cookie alongside the session cookie.
2. For all state-changing HTTP requests (`POST`, `PUT`, `PATCH`, `DELETE`), the client application must attach this value in the `x-csrf-token` header.
3. The NestJS `CsrfGuard` extracts both values:
   ```typescript
   const cookieCsrf = request.cookies['aic_csrf'];
   const headerCsrf = request.headers['x-csrf-token'];

   if (!cookieCsrf || !headerCsrf || cookieCsrf !== headerCsrf) {
     throw new ForbiddenException('Invalid or missing CSRF token');
   }
   ```

### 4.2 Origin & Referer Verification
`CsrfGuard` inspects the request `Origin` or `Referer` headers to ensure the calling client matches the institutional domain whitelist (`localhost`, `127.0.0.1`, or production domain `aic-adt.org`). Requests bearing cross-domain or spoofed origins are immediately rejected.

---

## 5. Lifecycle Management & Invalidation

### 5.1 Authoritative Session Lifetime
- **Default TTL:** 8 hours (28,800 seconds).
- **Inactivity Purge:** Sessions older than their `expiresAt` timestamp are treated as invalid and rejected with an HTTP 401 code.

### 5.2 Immediate Revocation Triggers
Sessions are immediately terminated on the server side under the following conditions:
1. **Explicit Sign-Out:** The user clicks "Sign Out". The server deletes the matching `Session` record from PostgreSQL and clears both cookies with `Max-Age=0`.
2. **Account Deactivation:** An administrator changes the user's status from `ACTIVE` to `INACTIVE` or `SUSPENDED`. Every subsequent request validates `user.status` and rejects the session immediately.
3. **Password Change or Security Reset:** Modifying user credentials invalidates all active sessions belonging to that user ID.
4. **Administrative Session Purge:** Security personnel can execute a bulk purge of sessions for a compromised account or during an incident response protocol.

---

## 6. Audit & Forensic Telemetry

Each session creation logs security metadata to aid threat detection and auditing:
- **Client IP Address:** Captured from trusted proxy headers (`x-forwarded-for`).
- **User-Agent String:** Logged for browser anomaly tracking.
- **Timestamp Tracking:** `createdAt` and `updatedAt` for session duration forensics.
- **Sanitized Logging:** Session tokens, passwords, and authorization cookies are strictly redacted and excluded from application logs.
