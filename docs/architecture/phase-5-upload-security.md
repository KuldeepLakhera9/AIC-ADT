# Phase 5 Media & Upload Security Specification

**Project:** AIC-ADT Baramati Foundation Institutional Website & CMS  
**Phase:** Phase 5 — Content Management System & Editorial Workflows (Task 6)  
**Document:** `docs/architecture/phase-5-upload-security.md`  
**Status:** **APPROVED SECURITY SPECIFICATION**

---

## 1. Upload Threat Model & Defensive Controls

File upload endpoints represent one of the most critical security boundaries in institutional content systems. The following threat vectors are addressed by defensive controls:

| Threat Vector | Potential Impact | Defensive Control |
| :--- | :--- | :--- |
| **MIME / Extension Spoofing** | Executable scripts uploaded disguised as images (e.g. `shell.php.jpg`). | Content magic bytes verification on raw buffers. Rejects extension mismatches. |
| **Cross-Site Scripting (XSS) via SVG** | Embedded `<script>` or inline event handlers in SVG executed in browser context. | Mandatory SVG lexical scanner rejecting `<script>`, `onload=`, `onerror=`, `javascript:`. |
| **Path Traversal / LFI** | Filenames like `../../etc/passwd` overwriting critical system files. | Filename sanitized to basename with character filtering. Opaque server UUIDs for storage. |
| **Denial of Service (Storage Exhaustion)** | Huge files consuming disk space and crashing services. | Strict file size enforcement (10 MB for images, 50 MB for PDFs) and Express body limiters. |
| **Unauthenticated Uploads** | Unauthorized third parties writing arbitrary files to server. | `SessionAuthGuard` requiring active authenticated administrator session. |
| **Privilege Escalation** | Low-privilege users deleting or modifying sensitive media. | Granular permissions `MEDIA_UPLOAD`, `MEDIA_UPDATE`, and `MEDIA_DELETE`. |
| **Accidental Content Breakage** | Deleting logos or posters actively embedded in published news/events. | Relational reference check blocking deletion if `usageCount > 0` or foreign keys exist. |

---

## 2. Magic Bytes Content Inspection

The server never trusts client-supplied `Content-Type` headers. Magic byte detection examines raw buffer headers:

1. **JPEG:** Bytes `0..2` must match `0xFF 0xD8 0xFF`.
2. **PNG:** Bytes `0..7` must match `[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]`.
3. **WebP:** Bytes `0..3` must equal ASCII `RIFF`, and bytes `8..11` must equal ASCII `WEBP`.
4. **PDF:** Bytes `0..4` must equal ASCII `%PDF-`.
5. **SVG:** XML/SVG text format starting with `<` and containing `<svg`. Subject to active content inspection.

If content bytes do not match the declared extension, the request is immediately rejected with HTTP `400 Bad Request`.

---

## 3. Malware & Antivirus Scanning Architecture

### 3.1 Policy & Disclaimer
In compliance with enterprise safety constraints, the system **never makes fraudulent claims** that uploaded files are malware-free without a running scanner. 

### 3.2 Scanning Pipeline Integration
For production data center deployment in Baramati:
1. **Engine:** ClamAV Daemon (`clamd`) running on a dedicated unix socket `/run/clamav/clamd.ctl` or network port `clamav:3310`.
2. **Circuit Breaker:** If ClamAV daemon is unreachable, the system enters fail-secure mode for confidential documents or marks files with `quarantineStatus: PENDING_SCAN`.
3. **Execution Pipeline:**
   ```
   Upload Stream ──> Buffer In-Memory
                     ├──> Magic Bytes & Extension Check
                     ├──> Dimension Extraction
                     ├──> SHA-256 Checksum Calculation
                     ├──> ClamAV Daemon Socket Ping (STREAM)
                     │    ├──> Infected: Abort & Audit Security Alert
                     │    └──> Clean: Persist to Segmented Storage
   ```

---

## 4. Rate Limiting & Resource Caps

- Upload endpoints are guarded by `@nestjs/throttler`:
  - Limit: Maximum 30 uploads per minute per authenticated user session.
- Multer busboy limits:
  - Max file size: 50 MB (`52,428,800` bytes).
  - Max files per request: 1 (`FileInterceptor('file')`).
  - Max field size: 1 MB.
