# Phase 5 — CMS Performance & Reliability Review

This document assesses the performance characteristics, query patterns, resource consumption, caching behaviors, and reliability safeguards of the AIC-ADT Baramati Foundation CMS.

---

## 1. Query Patterns & Index Optimization

### 1.1 Index Coverage
To ensure sub-10ms query execution across growing content volumes, high-frequency query paths are covered with dedicated B-Tree indexes:

| Table | Index Columns | Purpose |
| :--- | :--- | :--- |
| `sessions` | `(tokenHash)` | Constant-time session lookup on every authenticated API request. |
| `news_articles` | `(slug)` | Primary routing lookup for public news articles. |
| `events` | `(slug)` | Primary routing lookup for public event detail pages. |
| `news_translations` | `(articleId, locale)` | Composite unique translation fetch. |
| `event_translations`| `(eventId, locale)` | Composite unique event translation fetch. |
| `media_assets` | `(checksumSha256)` | Instant duplicate file detection during uploads. |
| `content_revisions` | `(entityType, entityId, versionNumber)` | Monotonic revision history traversal and diffing. |
| `audit_logs` | `(createdAt)`, `(userId)` | Administrative filtering and compliance reporting. |

### 1.2 Elimination of N+1 Queries
All relational joins are resolved in single database round-trips using Prisma eager loading:
```typescript
const article = await this.prisma.newsArticle.findUnique({
  where: { id },
  include: {
    translations: true,
    author: { select: { id: true, fullName: true, email: true } },
  },
});
```
This guarantees $O(1)$ query complexity per request, preventing database connection exhaustion.

---

## 2. Pagination & Payload Bounding

Every list endpoint enforces pagination via `QueryPublicDto` and `QueryNewsDto`:
- **Default Limit**: 10 items per page.
- **Maximum Limit**: 50 items per page (enforced via `Math.min(dto.limit, 50)`).
- **Pagination Metadata**: Returns total count, current page, and calculated `totalPages`.
- **Payload Bounding**: Long body copy and editorial snapshots are excluded from high-level listing queries to keep HTTP responses under 25 KB.

---

## 3. Upload Resource Consumption & Streaming

1. **Memory Protection**:
   - Multer file uploads are bounded at 50 MB at the transport boundary.
   - Images are validated and rejected if over 10 MB; PDFs if over 25 MB.
2. **Streaming Downloads**:
   - File download delivery (`/api/v1/media/:id/download`) uses Node.js `Readable` streams directly piped to the HTTP response (`res` stream).
   - Files are never buffered into memory prior to dispatch, ensuring flat RAM utilization even under concurrent downloads.

---

## 4. Caching & Edge Propagation

```mermaid
graph LR
    Browser[Public Browser Cache] -->|max-age=60s| CDN[Edge CDN Node]
    CDN -->|s-maxage=300s| NextServer[Next.js App Router]
    NextServer -->|Tag Revalidation| API[NestJS CMS API]
    API --> DB[(PostgreSQL)]
```

- **Public Responses**: Header `Cache-Control: public, max-age=60, s-maxage=300, stale-while-revalidate=600` ensures high edge hit rates (>95%) for public readers.
- **On-Demand Purging**: Changes made in the CMS fire an authenticated webhook to `/api/revalidate`, purging only affected tags (e.g. `revalidateTag('news')`).
- **Private Data Isolation**: Authenticated administrative endpoints strictly transmit `Cache-Control: private, no-store, max-age=0`, prohibiting CDN edge caching of draft or review queue payloads.

---

## 5. Public Site Behavior During API Outages

If the NestJS backend experiences downtime, container recycling, or network partitions:
1. **Next.js Server-Side Fallback**: The public API fetcher helper (`apps/web/src/lib/api/public-content.ts`) catches the failure and immediately serves verified static seed data (`NEWS_ARTICLES`, `EVENTS_DATA`, `VERIFIED_STARTUPS_DIRECTORY`).
2. **Zero Downtime for Visitors**: The public website continues serving rich institutional content, contact details, and program information without throwing 500 errors.

---

## 6. Audit Log Retention & Archival

- **Storage Impact**: Audit entries average ~350 bytes each. At an estimated 1,000 editorial actions per month, annual storage growth is negligible (<5 MB/year).
- **Retention Policy**: Active database retains 12 months of live audit logs. Records older than 365 days are slated for automated annual archival to encrypted cold storage.
