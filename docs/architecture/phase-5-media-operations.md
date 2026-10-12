# Phase 5 Media Operations & Administration Guide

**Project:** AIC-ADT Baramati Foundation Institutional Website & CMS  
**Phase:** Phase 5 — Content Management System & Editorial Workflows (Task 6)  
**Document:** `docs/architecture/phase-5-media-operations.md`  
**Status:** **APPROVED RUNBOOK**

---

## 1. Administrative Workflow Operations

### 1.1 Uploading Photographic & Graphic Collateral
1. Authenticated editors access `/admin/media`.
2. Click **+ Upload Media File** to open the upload console.
3. Select an approved file format (`.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`).
4. Set **Storage Visibility** to `Public Asset`.
5. Enter **Alternative Text** in English (mandatory for accessibility) and Marathi (recommended).
6. Click **Upload Asset**. The asset is hashed with SHA-256, verified for magic byte integrity, stored on disk, and assigned a persistent UUID.

### 1.2 Uploading Statutory Reports & Pitch Decks
1. Access `/admin/media` $\to$ **Upload Media File**.
2. Select `.pdf` file (up to 50 MB).
3. If public (e.g. Annual Report), select `Public Asset` and choose **Document Type** `ANNUAL_REPORT`. Enter **Reporting Period** (e.g. `2024-2025`).
4. If confidential (e.g. financial audits, pitch decks), select `Confidential / Private`. The file will be stored in `storage/private` with no direct web URL, accessible only to staff with `MEDIA_READ` permission via `/api/v1/media/:id/download`.

### 1.3 Updating Metadata & Alternative Text
1. Locate the asset in the Grid or Table view.
2. Click **Edit** (pencil icon).
3. Update accessibility alt text, editorial caption, or source attribution.
4. Changes are saved immediately and recorded in the audit log (`MEDIA_METADATA_UPDATED`).

---

## 2. Retention Policy & Deletion Governance

### 2.1 Content Reference Checks
To ensure published web pages do not suffer from broken images or dead PDF links:
- When a user attempts to delete an asset, the system queries:
  - `NewsArticle.thumbnailAssetId`
  - `Event.bannerAssetId`
  - `usageCount`
- If referenced by any content item, the API rejects deletion with `409 Conflict`:
  > *"Cannot delete media asset 'annual-poster.png': It is currently referenced by 1 Event(s). Unlink the asset from content or set its visibility to ARCHIVED."*

### 2.2 Archival as Safe Alternative
If an asset is retired but historic audit trails must be preserved, staff can change visibility from `PUBLIC` to `ARCHIVED`. This prevents new content from linking to the asset while preserving existing references.

---

## 3. API Route Summary

| Method | Path | Required Permissions | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/media` | `MEDIA_READ` | Paginated listing with search, type, and visibility filters. |
| `GET` | `/api/v1/media/:id` | `MEDIA_READ` | Detailed asset record with dimension and usage metadata. |
| `POST` | `/api/v1/media/upload` | `MEDIA_UPLOAD` | Multipart upload with server-side validation. |
| `PUT` | `/api/v1/media/:id` | `MEDIA_UPDATE` | Metadata update (alt text, caption, visibility). |
| `DELETE` | `/api/v1/media/:id` | `MEDIA_DELETE` | Delete asset if unreferenced. |
| `GET` | `/api/v1/media/:id/download` | `MEDIA_READ` | Authenticated binary streaming for private documents. |
