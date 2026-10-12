# Phase 5 — Public Content API Architecture

This document defines the architecture, endpoint specifications, server-side visibility rules, response sanitization policies, and caching contracts for the public read-only Content API (`/api/v1/public/*`) of the AIC-ADT Baramati Foundation CMS.

---

## 1. Architectural Principles

1. **Strict Server-Side Visibility Enforcement**: Public queries NEVER rely on frontend clients to filter out drafts or unapproved content. The server query filters unconditionally demand `status: ContentStatus.PUBLISHED` and `visibility: ContentVisibility.PUBLIC`.
2. **Explicit Public Response DTOs**: Internal database entities and Prisma models are never exposed raw. Every endpoint maps to an explicit public Data Transfer Object (DTO) that guarantees zero internal leakages.
3. **Information Disclosure Prevention**: Non-published or private entities return generic HTTP `404 Not Found` rather than `403 Forbidden` to prevent resource enumeration.
4. **Resilient Public Delivery**: Unauthenticated read operations are decoupled from CMS administrative workflows and protected against denial-of-service via rate limiting (`ThrottlerGuard`) and HTTP cache controls (`Cache-Control: public, max-age=60, s-maxage=300, stale-while-revalidate=600`).

---

## 2. Public API Endpoints Specification

All public endpoints are versioned under `/api/v1/public/` and require no authentication credentials.

| Resource | HTTP Method & Path | Description | Visibility Constraint |
| :--- | :--- | :--- | :--- |
| **News Articles** | `GET /api/v1/public/news` | Paginated listing of published news releases | `status = 'PUBLISHED'` |
| **News Detail** | `GET /api/v1/public/news/:slug` | Retrieve single published news item by slug | `status = 'PUBLISHED'` |
| **Public Events** | `GET /api/v1/public/events` | Paginated listing of published upcoming workshops & events | `status = 'PUBLISHED'` |
| **Event Detail** | `GET /api/v1/public/events/:slug` | Detailed agenda & registration metadata for published event | `status = 'PUBLISHED'` |
| **Incubated Startups** | `GET /api/v1/public/startups` | Directory of verified public startup profiles | `visibility = 'PUBLIC'` |
| **Startup Detail** | `GET /api/v1/public/startups/:slug` | Deep-dive profile of an incubated portfolio startup | `visibility = 'PUBLIC'` |
| **Programs** | `GET /api/v1/public/programs` | Incubation, pre-incubation, acceleration programs continuum | `status = 'PUBLISHED'` |
| **Program Detail** | `GET /api/v1/public/programs/:slug` | Detailed curriculum, eligibility & intake criteria | `status = 'PUBLISHED'` |
| **Publications** | `GET /api/v1/public/publications` | Audited annual reports, policy whitepapers, guidelines | `visibility = 'PUBLIC'` |
| **Publication Detail** | `GET /api/v1/public/publications/:slug` | Metadata & verified public document access | `visibility = 'PUBLIC'` |
| **Institutional Pages**| `GET /api/v1/public/pages/:slug` | Dynamic institutional pages (governance, infrastructure) | `status = 'PUBLISHED'` |
| **Public Media Metadata**| `GET /api/v1/public/media/:id` | Sanitized metadata for public imagery and assets | `visibility = 'PUBLIC'` |

---

## 3. Server-Side Visibility & Data Sanitization Rules

### 3.1 Prohibited Data in Public Responses
Public endpoints are strictly prohibited from exposing:
- **Editorial State Internals**: Records in `DRAFT`, `IN_REVIEW`, `CHANGES_REQUESTED`, `APPROVED` (not yet published), or `ARCHIVED` status.
- **Internal Review Comments & Notes**: Reviewer feedback, editorial rejection reasons, and approval audit logs.
- **User Account Information**: User IDs, author email addresses, password hashes, session tokens, or RBAC roles.
- **Physical Storage Details**: Internal server filesystem paths (`storagePath`), cloud storage bucket names, private presigned tokens, or cloud provider credentials.
- **Private Entity Records**: Startup financial models marked confidential, private grant contracts, or internal audit documents.

### 3.2 Response Sanitization Pattern
`PublicService` executes explicit field pruning prior to serialization:

```typescript
// Example: Public News DTO mapping
return {
  id: news.id,
  slug: news.slug,
  headline: news.headline,
  summary: news.summary,
  content: news.content,
  category: news.category,
  publishDate: news.publishDate,
  featuredImageUrl: news.featuredImageUrl,
  sourceAttribution: news.sourceAttribution,
  externalPressLink: news.externalPressLink,
  tags: news.tags,
  keyFacts: news.keyFacts,
  locale: news.locale,
};
// authorId, currentVersion, reviewerNotes, storagePath are deleted
```

---

## 4. Query Filtering & Pagination

Public endpoints accept sanitized query parameters adhering to `QueryPublicDto`:

- `page`: 1-based page index (defaults to `1`, minimum `1`).
- `limit`: Number of items per page (defaults to `10`, maximum `50`).
- `search`: Keyword string matching titles, summaries, or tags.
- `locale`: Language code (`en` or `mr`, defaults to `en`).
- `category`: Domain-specific category filter.

Every listing endpoint returns standard pagination metadata:
```json
{
  "data": [ ... ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

## 5. HTTP Cache Headers & Edge Delivery

Public endpoints transmit caching headers designed for Reverse Proxy / CDN caching:

```http
Cache-Control: public, max-age=60, s-maxage=300, stale-while-revalidate=600
```

- **Browser Cache (`max-age=60`)**: Browser caches responses for 60 seconds.
- **Shared CDN / Reverse Proxy (`s-maxage=300`)**: Edge nodes cache responses for 5 minutes.
- **Background Revalidation (`stale-while-revalidate=600`)**: If a request arrives within 10 minutes of cache expiration, edge serves the stale response while revalidating asynchronously with the API.

---

## 6. Error Handling & Enumeration Defense

- When a requested slug or ID does not exist: returns HTTP `404 Not Found`.
- When a requested slug exists in `DRAFT` or `ARCHIVED` status: returns HTTP `404 Not Found` (never `403`).
- When a requested media item has `visibility: 'PRIVATE'`: returns HTTP `404 Not Found`.
- In disconnected or offline database states: `PublicService` provides graceful fallback to verified seed registers to maintain 100% public uptime.
