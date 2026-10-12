# Phase 5 — Content Validation & Security Safeguards

## 1. Overview & Objectives

This specification details the validation, data integrity, and defensive security controls implemented across the AIC-ADT Baramati Foundation CMS content engine. Content management operations must adhere to strict server-side validation, zero-trust parameter processing, anti-mass-assignment protections, and sanitization boundaries to ensure high institutional integrity.

---

## 2. Server-Side DTO Validation Matrix

All incoming API requests pass through the NestJS `ValidationPipe` with strict validation settings:
- `whitelist: true` (strips undeclared payload properties).
- `forbidNonWhitelisted: true` (throws HTTP 400 if undeclared fields are passed).
- `transform: true` (casts query and body parameters to typed primitives).

### 2.1 Creation DTO (`CreateNewsDto`)

| Field | Type | Rules & Decorators | Error Response Condition |
| :--- | :--- | :--- | :--- |
| `slug` | `string` | `@IsString()`, `@Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)` | Format must be lowercase alphanumeric with single hyphen separators. |
| `category` | `enum` | `@IsEnum(NewsCategory)` | Must match registered enum values (`OFFICIAL_ANNOUNCEMENT`, `FUNDING_MILESTONE`, etc.). |
| `publishDate` | `string` | `@IsISO8601()` | Must be a valid ISO 8601 date string. |
| `sourceAttribution` | `string` | `@IsString()`, `@MaxLength(255)` | Attribution string cannot exceed 255 characters. |
| `externalPressLink` | `string?`| `@IsOptional()`, `@IsUrl()` | If provided, must be a well-formed URL. |
| `locale` | `string?`| `@IsOptional()`, `@IsIn(['en', 'mr'])` | Defaults to `'en'`. |
| `headline` | `string` | `@IsString()`, `@MinLength(5)`, `@MaxLength(300)` | Mandatory headline between 5 and 300 characters. |
| `summary` | `string` | `@IsString()`, `@MinLength(10)`, `@MaxLength(1000)`| Summary description between 10 and 1000 characters. |
| `content` | `any?`   | `@IsOptional()` | Structured content body. |
| `tags` | `string[]?`| `@IsOptional()`, `@IsArray()`, `@IsString({ each: true })` | Array of strings. |

### 2.2 Update DTO (`UpdateNewsDto`)

`UpdateNewsDto` makes all content fields optional via `@IsOptional()`, but **completely excludes `status`**, `authorId`, `currentVersion`, `createdAt`, and `updatedAt`. Any attempt to send `status` in the update payload is rejected by `ValidationPipe` as a forbidden field (`HTTP 400`).

---

## 3. Slug Uniqueness & Scope Enforcement

### 3.1 Uniqueness Invariant

URL slugs must be globally unique per content type. To enforce this:
1. **Database Constraint:** `NewsArticle.slug` has a unique constraint `@unique` in PostgreSQL.
2. **Pre-Query Conflict Detection:** Prior to inserting or updating records, `NewsService` validates uniqueness:
   ```typescript
   const existing = await this.prisma.newsArticle.findUnique({
     where: { slug: dto.slug },
   });
   if (existing && existing.id !== currentId) {
     throw new ConflictException(
       `A news article with slug "${dto.slug}" already exists.`
     );
   }
   ```
3. **Locale Scoping:** When translations are saved, the composite key `@@unique([articleId, locale])` ensures an article cannot have duplicate translations for the same locale.

---

## 4. Query Safety & Allowlisted Sorting

Arbitrary sorting by user-supplied database column names introduces security vulnerabilities (such as internal column exposure or SQL timing side-channels).

Sorting is strictly restricted to an allowlist:
```typescript
export const ALLOWED_NEWS_SORT_FIELDS = [
  'createdAt',
  'updatedAt',
  'publishDate',
  'slug',
] as const;
```

If a client supplies any other field name (e.g., `?sortBy=passwordHash` or `?sortBy=id`), the query validator rejects the request with HTTP 400:
`"sortBy must be one of the following values: createdAt, updatedAt, publishDate, slug"`.

### 4.1 Pagination Caps

- Default `page`: `1` (min: 1).
- Default `limit`: `10`.
- Maximum `limit`: `50` (enforced via `@Max(MAX_LIMIT)` in `QueryNewsDto`).
Attempts to request unbounded batches (e.g. `limit=10000`) are blocked.

---

## 5. Prevention of Mass Assignment

### 5.1 Threat Model

In conventional CRUD frameworks, an authenticated editor might send `PATCH /api/v1/content/news/:id` with:
```json
{
  "headline": "Updated Title",
  "status": "PUBLISHED"
}
```
If the backend unpacks `req.body` directly into the database query (`prisma.update({ data: req.body })`), an unauthorized user can bypass editorial review and publish articles immediately.

### 5.2 Defensive Countermeasure

1. **Explicit DTO Filtering:** `UpdateNewsDto` explicitly declares only safe content fields.
2. **Dedicated Workflow Endpoints:** Status transitions are only accessible through dedicated RPC endpoints that verify authorization:
   - `POST /api/v1/content/news/:id/submit-review`: Transitions `DRAFT` → `IN_REVIEW`.
   - `POST /api/v1/content/news/:id/archive`: Transitions `PUBLISHED` → `ARCHIVED`.
   - `POST /api/v1/content/news/:id/restore`: Transitions `ARCHIVED` → `DRAFT`.
3. **Status Mutability Lock:** The general `update()` service method updates content while retaining the existing translation's `status` unchanged.

---

## 6. Record-Level Authorization & Ownership Verification

### 6.1 Ownership Validation Logic

Before allowing an update or review submission:
```typescript
const isAuthor = article.authorId === user.id;
const hasManagePermission =
  user.role === Role.SUPER_ADMIN ||
  user.role === Role.ADMIN ||
  user.permissions.includes(Permission.CONTENT_PUBLISH);

if (!isAuthor && !hasManagePermission) {
  throw new ForbiddenException(
    'You are not authorized to modify content authored by another user.'
  );
}
```

### 6.2 State Transition Guards

- Only records in `DRAFT` status can be submitted for review. Attempting to submit an `IN_REVIEW` or `PUBLISHED` record throws `BadRequestException`.
- Only records in `PUBLISHED` status can be archived.
- Only records in `ARCHIVED` status can be restored to `DRAFT`.

---

## 7. Content Sanitization & Safe Rendering Strategy

### 7.1 Stored Content Strategy

Content entered in rich text and Markdown blocks is stored as clean JSON or raw Markdown strings in the database. Raw, untrusted HTML is not allowed to execute scripts.

### 7.2 Frontend Defense-in-Depth

1. **React Automatic Escaping:** All headings, slugs, summaries, attributions, and text elements are rendered through React JSX expressions (`{article.headline}`), which automatically escape HTML entities.
2. **Structured Content Rendering:** Structured content blocks are mapped as structured arrays of strings (e.g. `translation.content.map(...)`) rendered inside native `<p>` elements.
3. **No Direct `dangerouslySetInnerHTML`:** The CMS does not use unsanitized `dangerouslySetInnerHTML`. If rich HTML rendering is enabled in subsequent phases, an isomorphic sanitizer (such as `DOMPurify` / `sanitize-html`) with a strict tag allowlist must be employed.

---

## 8. Transactional Integrity & Audit Consistency

Where multiple related tables must change together (creating a `NewsArticle` with its initial `NewsTranslation`, or transitioning status while recording an `AuditLog`), operations are executed inside an atomic transaction:

```typescript
await this.prisma.$transaction(async (tx) => {
  const article = await tx.newsArticle.create({ ... });
  const translation = await tx.newsTranslation.create({ ... });
  await tx.auditLog.create({
    data: {
      userId: user.id,
      action: 'NEWS_CREATE',
      resource: 'NewsArticle',
      resourceId: article.id,
      payload: { slug: article.slug, locale },
    },
  });
  return { article, translation };
});
```

If any sub-operation fails (e.g. duplicate translation key or database timeout), all operations are rolled back completely, preventing orphaned parent or child records.
