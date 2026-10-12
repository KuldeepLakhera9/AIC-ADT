# Phase 5 — CMS Dashboard API Specification

**Document Version:** 1.0.0  
**Status:** Approved & Implemented  
**Classification:** Backend API Specification  
**System:** AIC-ADT Baramati Foundation CMS Platform  
**Target Date:** October 2026

---

## 1. Overview & Architectural Goals

The CMS Dashboard API provides narrowly scoped, aggregated telemetry for administrative users of the AIC-ADT Baramati Foundation portal. Designed to minimize payload size and avoid downloading raw database tables to the browser, the endpoint aggregates:
1. Content status counts (Draft, In Review, Approved, Published, Archived).
2. Pending review backlog count.
3. Recent content edits (limited to top 5 items).
4. Recent publication releases (limited to top 5 items).
5. Urgent administrative attention items.
6. Append-only audit logs (subject to `audit.read` authorization).

---

## 2. Endpoint Specification

### `GET /api/v1/dashboard/overview`

- **Controller:** [DashboardController](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/api/src/dashboard/dashboard.controller.ts)
- **Guards:** [SessionAuthGuard](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/api/src/auth/guards/session-auth.guard.ts), [PermissionsGuard](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/api/src/auth/guards/permissions.guard.ts)
- **Required Permission:** `dashboard.read`
- **Rate Limit:** 100 requests per 60 seconds (inherited from Global Throttler)
- **Cookie Requirement:** Valid `aic_session` HttpOnly cookie

#### Request Headers
```http
GET /api/v1/dashboard/overview HTTP/1.1
Host: api.aic-adt.org
Cookie: aic_session=f8b3...
Accept: application/json
```

#### Response Payload (200 OK)
```json
{
  "contentStatus": {
    "draft": 0,
    "inReview": 0,
    "approved": 0,
    "published": 0,
    "archived": 0,
    "total": 0
  },
  "pendingReviewCount": 0,
  "recentlyUpdated": [],
  "recentlyPublished": [],
  "attentionItems": [],
  "recentActivity": [
    {
      "id": "e5b8...-uuid",
      "action": "USER_LOGIN",
      "resource": "SESSION",
      "userEmail": "admin@aic-adt.org",
      "userName": "Institutional Administrator",
      "timestamp": "2026-10-12T10:00:00.000Z"
    }
  ]
}
```

#### Error Responses
- **401 Unauthorized:** Missing, expired, or invalid session cookie.
  ```json
  {
    "statusCode": 401,
    "message": "Unauthorized session token",
    "error": "Unauthorized"
  }
  ```
- **403 Forbidden:** User role lacks `dashboard.read` permission.
  ```json
  {
    "statusCode": 403,
    "message": "Forbidden resource: missing required permission 'dashboard.read'",
    "error": "Forbidden"
  }
  ```

---

## 3. Data Privacy & Role Filtering

The backend enforces role-level data scoping before returning the overview payload:

1. **Audit Log Privacy (`audit.read`):**
   - The PostgreSQL `audit_logs` table contains operational tracking data (IPs, user actions, resources).
   - If the requesting user possesses `audit.read` (e.g. `ADMIN` or `APPROVER`), the latest 5 audit records are formatted and included in `recentActivity`.
   - If the user lacks `audit.read` (e.g. `CONTENT_EDITOR` or `PROGRAM_MANAGER`), `recentActivity` is returned as an empty array `[]`. Sensitive audit telemetry is never leaked to unauthorized roles.
2. **Review Comments Redaction:**
   - Private review notes and reviewer identities are not included in the dashboard summary payload. Full review histories are reserved for the dedicated Review Queue endpoint.
3. **Password & Token Exclusion:**
   - All user model queries explicitly select only `fullName` and `email`. Password hashes, token digests, and session identifiers are permanently excluded.

---

## 4. Database Query Strategy & Zero-Fabrication Guarantee

In strict compliance with institutional requirements:
- The system **never fabricates sample numbers or fake demo records**.
- In the initial phase, when content tables are empty, the endpoint returns authentic zeros:
  `draft: 0, inReview: 0, approved: 0, published: 0, archived: 0, total: 0`.
- The frontend renders these authentic counts along with meaningful empty states directing authorized editors to create records.

---

## 5. Next.js Proxy Route Architecture

To enable secure client-side communication in Next.js without exposing internal API ports to browser code, a server proxy route is implemented:

**Path:** [apps/web/src/app/api/dashboard/overview/route.ts](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/app/api/dashboard/overview/route.ts)
- Extracts incoming `Cookie` header from browser request.
- Forwards request to NestJS backend (`INTERNAL_API_URL` or `http://localhost:4000/api/v1/dashboard/overview`).
- Propagates backend response status code (200, 401, 403) and body back to the client.
- On connection failure, returns HTTP 503 Service Unavailable with a clean error message.
