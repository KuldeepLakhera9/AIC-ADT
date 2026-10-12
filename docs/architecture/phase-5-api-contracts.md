# Phase 5 API Contracts & REST Interface Specifications

**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 5 — Content Management System & Editorial Workflows (Task 2)  
**Roles:** Lead API Architect, Senior Backend Engineer  
**Date:** October 12, 2026  
**Status:** **APPROVED API CONTRACT SPECIFICATION**  

---

## 1. Global API Conventions

All endpoints adhere to the production architecture established in Phase 3 (`apps/api`):
1. **Base URL:** `/api/v1`
2. **Success Envelope:** Wrapped via `TransformResponseInterceptor`:
   ```json
   {
     "success": true,
     "statusCode": 200,
     "data": "<T>",
     "correlationId": "uuid-v4",
     "timestamp": "2026-10-12T12:00:00.000Z",
     "meta": {}
   }
   ```
3. **Error Envelope:** Handled via `GlobalExceptionFilter`:
   ```json
   {
     "success": false,
     "statusCode": 400,
     "error": "Bad Request",
     "message": ["slug must be a valid lowercase URL slug"],
     "correlationId": "uuid-v4",
     "timestamp": "2026-10-12T12:00:00.000Z",
     "path": "/api/v1/admin/startups"
   }
   ```
4. **Header Propagation:** Client passes `X-Correlation-ID`; server responds with matching header.
5. **Data Protection:** Database models are never directly returned. Response DTOs strictly strip password hashes, session tokens, private notes, and internal review comments.

---

## 2. Public Read-Only Content Endpoints

Public endpoints require no authentication and serve published records to the Next.js frontend with sub-second response times.

### 2.1 Public Startup Directory
- **Endpoint:** `GET /api/v1/public/startups`
- **Purpose:** Retrieve paginated, verified cohort startups for public directory.
- **Access:** Public (Anonymous)
- **Query Parameters:**
  - `locale`: `'en' | 'mr'` (default: `'en'`)
  - `page`: Integer $\ge 1$ (default: `1`)
  - `limit`: Integer $1 \dots 50$ (default: `12`)
  - `sector`: Enum (`AGRI_TECH`, `SMART_FARMING`, etc.)
  - `cohort`: String
  - `search`: String (searches name, tagline)
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "data": [
      {
        "slug": "krishisense",
        "name": "KrishiSense Technologies",
        "tagline": "IoT-Powered Automated Micro-Irrigation & Soil Telemetry",
        "sector": "AGRI_TECH",
        "cohort": "2024-Cohort-3",
        "fundingScheme": "SISFS",
        "founders": "Vikram Shinde, Anjali Patil",
        "location": "Baramati, Pune",
        "reachMetric": "14,500+ Farmers Enrolled",
        "trlLevel": "TRL 7",
        "logoUrl": "/uploads/public/krishisense-logo.png",
        "verified": true,
        "isFallback": false
      }
    ],
    "meta": {
      "page": 1,
      "limit": 12,
      "totalItems": 6,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
  ```

### 2.2 Public Startup Detail Profile
- **Endpoint:** `GET /api/v1/public/startups/:slug`
- **Purpose:** Retrieve full startup profile by unique slug.
- **Access:** Public
- **Query Parameters:** `locale` (`'en' | 'mr'`, default: `'en'`)
- **Error Responses:** `404 Not Found` if slug does not exist or startup translation is not published.

---

### 2.3 Public Events Calendar
- **Endpoint:** `GET /api/v1/public/events`
- **Query Parameters:** `locale`, `page`, `limit`, `category`, `status` (`UPCOMING`, `CONCLUDED`)

### 2.4 Public News Announcements
- **Endpoint:** `GET /api/v1/public/news`
- **Query Parameters:** `locale`, `page`, `limit`, `category`, `search`

### 2.5 Public Publications & Reports
- **Endpoint:** `GET /api/v1/public/publications`
- **Query Parameters:** `locale`, `page`, `limit`, `category`, `statutoryOnly` (boolean)

---

## 3. Administrative Authentication & Session Endpoints

### 3.1 Administrator Login
- **Endpoint:** `POST /api/v1/auth/login`
- **Purpose:** Authenticate staff user, establish secure session, and set HTTP-only cookie.
- **Access:** Public
- **Request DTO:**
  ```typescript
  export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
  }
  ```
- **Success Response (200 OK):** Sets Set-Cookie: `aic_session=<token>; Path=/; HttpOnly; SameSite=Lax; Max-Age=28800`.
  ```json
  {
    "success": true,
    "statusCode": 200,
    "data": {
      "user": {
        "id": "c1f7a83d-e189-4a0e-92c2-8d77c4e43b12",
        "email": "editor@aic-adt.org",
        "fullName": "Editorial Officer",
        "role": "CONTENT_EDITOR"
      }
    }
  }
  ```
- **Audit Event:** Emits `AUTH_LOGIN_SUCCESS` (or `AUTH_LOGIN_FAILED`).

### 3.2 Administrator Logout
- **Endpoint:** `POST /api/v1/auth/logout`
- **Access:** Authenticated
- **Success Response (200 OK):** Clears cookie, invalidates session in PostgreSQL, records `AUTH_LOGOUT`.

### 3.3 Active Session Profile
- **Endpoint:** `GET /api/v1/auth/me`
- **Access:** Authenticated
- **Purpose:** Verifies active session token from cookie and returns user permissions.

---

## 4. Administrative Content Management Endpoints

Protected by `SessionAuthGuard` and `RolesGuard`. State changes generate entries in `audit_logs`.

### 4.1 Admin Startup CRUD

| Method | Path | Required Role | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/admin/startups` | `CONTENT_AUTHOR+` | List all startups across draft/published states. |
| `POST` | `/api/v1/admin/startups` | `CONTENT_AUTHOR+` | Create a new startup profile draft. |
| `GET` | `/api/v1/admin/startups/:id`| `CONTENT_AUTHOR+` | Get complete internal startup record and revisions. |
| `PUT` | `/api/v1/admin/startups/:id`| `CONTENT_AUTHOR+` | Update startup core fields and create revision draft. |
| `DELETE` | `/api/v1/admin/startups/:id`| `ADMIN` | Soft-delete / Archive startup record. |

#### Create Startup Request DTO (`CreateStartupDto`):
```typescript
export class CreateStartupDto {
  @IsString()
  @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @IsEnum(Sector)
  sector: Sector;

  @IsString()
  cohort: string;

  @IsString()
  fundingScheme: string;

  @IsString()
  founders: string;

  @IsString()
  location: string;

  @IsString()
  reachMetric: string;

  @IsString()
  labsUsed: string;

  @IsString()
  trlLevel: string;

  @IsOptional()
  @IsUrl()
  websiteUrl?: string;

  @IsOptional()
  @IsUUID()
  logoAssetId?: string;

  @IsBoolean()
  verified: boolean;

  @IsBoolean()
  featuredInHomepage: boolean;

  @ValidateNested()
  @Type(() => CreateStartupTranslationDto)
  translation: CreateStartupTranslationDto;
}
```

---

## 5. Editorial Workflow & Review Endpoints

Endpoints implementing the state transitions defined in [phase-5-content-workflow.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/architecture/phase-5-content-workflow.md).

### 5.1 Submit Content for Review
- **Endpoint:** `POST /api/v1/admin/content/:domain/:id/submit-review`
- **Required Role:** `CONTENT_AUTHOR`, `CONTENT_EDITOR`, `PROGRAM_MANAGER`, `ADMIN`
- **Request Body:** `{ "locale": "en" | "mr", "revisionNotes": string }`
- **Action:** Changes status from `DRAFT` $\to$ `IN_REVIEW`.

### 5.2 Request Revisions (Reject to Author)
- **Endpoint:** `POST /api/v1/admin/content/:domain/:id/request-changes`
- **Required Role:** `REVIEWER`, `APPROVER`, `CONTENT_EDITOR`, `ADMIN`
- **Request Body:** `{ "locale": "en" | "mr", "reviewNotes": string }`
- **Action:** Changes status from `IN_REVIEW` $\to$ `CHANGES_REQUESTED`.

### 5.3 Formal Approval
- **Endpoint:** `POST /api/v1/admin/content/:domain/:id/approve`
- **Required Role:** `APPROVER`, `ADMIN`
- **Constraint:** Author cannot be approver (Dual-Custody enforcement).
- **Action:** Changes status from `IN_REVIEW` $\to$ `APPROVED`.

### 5.4 Publish Content
- **Endpoint:** `POST /api/v1/admin/content/:domain/:id/publish`
- **Required Role:** `CONTENT_EDITOR`, `ADMIN`
- **Action:** Transitions status $\to$ `PUBLISHED`, updates `publishedAt`, fires Next.js on-demand cache revalidation webhook.

---

## 6. Media Management Endpoints

### 6.1 Upload Media Asset
- **Endpoint:** `POST /api/v1/admin/media/upload`
- **Content-Type:** `multipart/form-data`
- **Required Role:** `CONTENT_AUTHOR+`
- **File Constraints:**
  - Maximum size: 10MB (images), 50MB (PDFs).
  - Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/svg+xml`, `application/pdf`.
  - Anti-virus scanning and magic bytes inspection.
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "data": {
      "id": "f8a9203c-834b-4b10-a7d1-e63b1e2203da",
      "filename": "f8a9203c_annual_report_2025.pdf",
      "originalName": "AIC_ADT_Annual_Report_2024_25.pdf",
      "mimeType": "application/pdf",
      "fileSizeBytes": 4518290,
      "storagePath": "/storage/public/f8a9203c_annual_report_2025.pdf",
      "url": "/uploads/public/f8a9203c_annual_report_2025.pdf"
    }
  }
  ```
