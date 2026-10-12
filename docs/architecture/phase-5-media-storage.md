# Phase 5 Media Storage Architecture Specification

**Project:** AIC-ADT Baramati Foundation Institutional Website & CMS  
**Phase:** Phase 5 — Content Management System & Editorial Workflows (Task 6)  
**Document:** `docs/architecture/phase-5-media-storage.md`  
**Status:** **APPROVED SPECIFICATION**

---

## 1. Storage Abstraction Overview

The AIC-ADT Baramati Foundation CMS media management engine isolates file storage behind a vendor-neutral service interface (`IStorageService`). This architecture decouples application business logic from physical storage providers and permits:
1. **Local Disk Storage Adapter (`LocalStorageService`):** Default development and self-hosted Baramati campus data center deployment.
2. **S3-Compatible Storage Adapter (`S3StorageService`):** Pluggable without code changes for MinIO, AWS S3, or institutional private object storage.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        STORAGE SERVICE INTERFACE                       │
│                           (IStorageService)                            │
│    uploadFile() • getFileStream() • deleteFile() • getPublicUrl()      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌─────────────────────────────────────┐   ┌─────────────────────────────────────┐
│       PUBLIC STORAGE ADAPTER        │   │       PRIVATE STORAGE ADAPTER       │
│ Root: storage/public                │   │ Root: storage/private               │
│ Access: Static Nginx / Public CDN   │   │ Access: Authenticated NestJS Stream │
│ Content: Photography, Brochures,    │   │ Content: Financial Audits, Decks,   │
│ Posters, Public Annual Reports      │   │ Restricted Compliance Filings       │
└─────────────────────────────────────┘   └─────────────────────────────────────┘
```

---

## 2. Directory Hierarchy & Storage Segregation

### 2.1 Physical Separation
To prevent inadvertent leakage of confidential applicant records or internal financial filings:
- **Public Assets (`storage/public`):**
  - Serves verified public assets through Nginx at `/uploads/public/<storage_key>`.
  - Client cache headers: `Cache-Control: public, max-age=86400, stale-while-revalidate=3600`.
- **Private / Restricted Assets (`storage/private`):**
  - Stored outside web server document roots. Direct HTTP access is completely blocked (`403 Forbidden` at Nginx layer).
  - Delivered strictly through authenticated NestJS streams (`GET /api/v1/media/:id/download`) verifying `SessionAuthGuard` and `MEDIA_READ` permission.

### 2.2 Storage Key Generation
- The server generates opaque, non-guessable storage keys:
  $$\text{storageKey} = \text{UUIDv4} + \text{verifiedExtension}$$
  *Example:* `9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.png`
- The user's original filename is sanitized and preserved strictly in the database metadata table for display and downloads.

---

## 3. Metadata Model (`media_assets`)

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Primary Key | Stable unique media asset identifier. |
| `original_name` | VarChar(255) | Not Null | Sanitized display filename. |
| `storage_key` | VarChar(500) | Unique, Not Null | Non-guessable server-generated filename. |
| `storage_path` | VarChar(500) | Not Null | Internal filesystem absolute path (hidden from API). |
| `public_url` | VarChar(500) | Nullable | Publicly accessible URL (`null` for private assets). |
| `mime_type` | VarChar(100) | Not Null | Verified content MIME type. |
| `file_size_bytes` | Integer | Not Null | Exact file size in bytes (max 50 MB). |
| `file_extension` | VarChar(20) | Not Null | Validated extension with leading dot. |
| `checksum_sha256`| VarChar(64) | Not Null | SHA-256 cryptographic digest of file bytes. |
| `media_type` | Enum | `IMAGE`, `DOCUMENT`, `VIDEO`, `OTHER` | High-level media category. |
| `visibility` | Enum | `PUBLIC`, `PRIVATE`, `ARCHIVED` | Access level policy. |
| `width` | Integer | Nullable | Image width in pixels. |
| `height` | Integer | Nullable | Image height in pixels. |
| `alt_text_en` | VarChar(255) | Nullable | English accessibility alternative text. |
| `alt_text_mr` | VarChar(255) | Nullable | Marathi accessibility alternative text. |
| `caption` | VarChar(500) | Nullable | Editorial caption. |
| `attribution` | VarChar(255) | Nullable | Photographer, agency, or author attribution. |
| `document_type` | Enum | `ANNUAL_REPORT`, `FINANCIAL_AUDIT`, etc. | Classification for PDF documents. |
| `reporting_period`| VarChar(50) | Nullable | Financial or academic fiscal period (e.g. `2024-25`). |
| `is_statutory` | Boolean | Default `false` | Statutory compliance flag under Indian societies/trust acts. |
| `usage_count` | Integer | Default `0` | Reference counter linking content items. |
| `uploader_id` | UUID | Foreign Key $\to$ `users.id` | Staff member responsible for upload. |
| `created_at` | Timestamptz | Default `now()` | Upload timestamp. |
| `updated_at` | Timestamptz | Updated At | Metadata modification timestamp. |

---

## 4. Storage Driver Implementation

### 4.1 Path Traversal Prevention
`LocalStorageService` resolves storage keys using `path.resolve` and verifies that the resulting target path starts strictly with the designated storage root:
```typescript
const root = visibility === MediaVisibility.PUBLIC ? this.publicRoot : this.privateRoot;
const resolved = path.resolve(root, storageKey);
if (!resolved.startsWith(root)) {
  throw new InternalServerErrorException('Security violation: Path traversal detected.');
}
```

### 4.2 Error Handling and Cleanup
When an upload transaction fails, the physical file is cleaned up from disk to prevent storage leaks.
When an asset is deleted, the database record and physical disk file are purged synchronously.
