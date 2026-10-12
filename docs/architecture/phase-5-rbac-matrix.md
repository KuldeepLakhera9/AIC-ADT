# Phase 5 — Role-Based Access Control (RBAC) Matrix

**Document Version:** 1.0.0  
**Status:** Approved & Implemented  
**Classification:** Institutional Access Control Policy  
**System:** AIC-ADT Baramati Foundation CMS Platform  
**Target Date:** October 2026

---

## 1. Governance Principles

The AIC-ADT Baramati Foundation Content Management System enforces strict Role-Based Access Control (RBAC). The security model adheres to three foundational tenets:

1. **Principle of Least Privilege:** Users receive exclusively the set of permissions essential for their operational role.
2. **Permission-Centric Enforcement:** Business logic and API endpoints must never check hardcoded role strings (e.g. `user.role === 'ADMIN'`). All checks must inspect granular permissions (e.g. `@RequirePermissions(Permission.CONTENT_PUBLISH)`).
3. **Defense-in-Depth:** Frontend navigation and action visibility adapts based on granted permissions, but the backend NestJS `PermissionsGuard` remains the authoritative gatekeeper for every single request.

---

## 2. Granular Permissions Registry

The system defines 18 fine-grained permissions categorized across 7 functional domains:

| Permission Identifier | Domain | Scope & Description |
| :--- | :--- | :--- |
| `dashboard.read` | Dashboard | Access administrative dashboard and operational overview metrics. |
| `content.read` | Content | Read draft, in-review, published, and archived content items. |
| `content.create` | Content | Create new draft articles, programs, events, and institutional pages. |
| `content.update` | Content | Modify existing content items within permitted scope. |
| `content.submit_review` | Content | Submit a draft item to the editorial approval workflow. |
| `content.review` | Content | Perform editorial review, provide feedback, or request changes. |
| `content.approve` | Content | Officially grant approval for content to be published. |
| `content.publish` | Content | Transition approved content to public `PUBLISHED` state. |
| `content.archive` | Content | Transition published content to `ARCHIVED` state. |
| `media.read` | Media | View and browse uploaded digital assets in the media repository. |
| `media.upload` | Media | Upload new approved photos, documents, and assets. |
| `media.delete` | Media | Remove media assets from the repository. |
| `users.read` | User Governance | List and inspect administrative user accounts and statuses. |
| `users.manage` | User Governance | Create, update, or deactivate administrator accounts. |
| `roles.manage` | User Governance | Configure roles and assign user permissions. |
| `audit.read` | Audit & Security | Inspect security audit trails and content revision histories. |
| `applications.review` | Incubation | Review startup cohort applications and founder submissions (reserved). |
| `impact.manage` | Impact Metrics | Manage and update verified impact statistics and ESG reports. |

---

## 3. Authoritative Role-to-Permission Mapping

The CMS architecture recognizes 7 distinct user roles within the institutional hierarchy:

### Matrix Table

| Permission | Super Admin (`ADMIN`) | Content Editor (`CONTENT_EDITOR`) | Approver / Publisher (`APPROVER`) | Program Manager (`PROGRAM_MANAGER`) | Impact Manager (`IMPACT_MANAGER`) | Application Reviewer (`REVIEWER`) | Public Applicant (`PUBLIC_APPLICANT`) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `dashboard.read` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `content.read` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `content.create` | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| `content.update` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `content.submit_review` | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| `content.review` | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `content.approve` | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `content.publish` | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `content.archive` | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `media.read` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `media.upload` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `media.delete` | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `users.read` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `users.manage` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `roles.manage` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `audit.read` | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ |
| `applications.review` | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| `impact.manage` | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Total Permissions** | **18** | **7** | **10** | **7** | **8** | **3** | **0** |

---

## 4. Role Responsibility Profiles

### 4.1 Super Admin (`ADMIN`)
- **Operational Scope:** Institutional oversight, system configuration, user lifecycle, role management, audit inspection, and emergency content actions.
- **Access Level:** Complete unrestricted access across all 18 CMS permissions.

### 4.2 Content Editor (`CONTENT_EDITOR`)
- **Operational Scope:** Authoring and assembling articles, announcements, and program details.
- **Workflow Bounds:** May draft and edit content, upload necessary photography/documents, and submit drafts for review. Cannot approve, publish, or delete media.

### 4.3 Publisher / Approver (`APPROVER`)
- **Operational Scope:** Senior editorial governance, compliance check, and publishing authority.
- **Workflow Bounds:** Reviews submitted items against institutional standards, requests modifications, approves items, executes public release, and manages media asset retirement.

### 4.4 Program Manager (`PROGRAM_MANAGER`)
- **Operational Scope:** Managing initiative data, application deadlines, and program curricula.
- **Workflow Bounds:** Authoring and updating program content, submitting updates for approval.

### 4.5 Data & Impact Manager (`IMPACT_MANAGER`)
- **Operational Scope:** Maintaining verified KPI metrics, agricultural milestones, and ESG impact statements.
- **Workflow Bounds:** Full management rights over impact registries, drafting related case studies, and submitting updates for editorial review.

### 4.6 Application Reviewer (`REVIEWER`)
- **Operational Scope:** Reserved for incubation application triage and founder interview evaluations.
- **Workflow Bounds:** Read-only access to applicant records and applicant audit trails. Zero administrative CMS content authoring permissions.

### 4.7 Public Applicant (`PUBLIC_APPLICANT`)
- **Operational Scope:** External startup founders and public visitors.
- **Workflow Bounds:** 0 CMS permissions. Strictly blocked from `/admin/*` interfaces and administrative API routes.

---

## 5. Technical Implementation Details

### 5.1 Type Definitions & Code Source
Located in [apps/api/src/auth/auth.types.ts](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/api/src/auth/auth.types.ts):
```typescript
export enum Permission {
  DASHBOARD_READ = 'dashboard.read',
  CONTENT_READ = 'content.read',
  CONTENT_CREATE = 'content.create',
  CONTENT_UPDATE = 'content.update',
  CONTENT_SUBMIT_REVIEW = 'content.submit_review',
  CONTENT_REVIEW = 'content.review',
  CONTENT_APPROVE = 'content.approve',
  CONTENT_PUBLISH = 'content.publish',
  CONTENT_ARCHIVE = 'content.archive',
  MEDIA_READ = 'media.read',
  MEDIA_UPLOAD = 'media.upload',
  MEDIA_DELETE = 'media.delete',
  USERS_READ = 'users.read',
  USERS_MANAGE = 'users.manage',
  ROLES_MANAGE = 'roles.manage',
  AUDIT_READ = 'audit.read',
  APPLICATIONS_REVIEW = 'applications.review',
  IMPACT_MANAGE = 'impact.manage',
}
```

### 5.2 Declarative Endpoint Enforcement
Protected NestJS controllers enforce permissions using the `@RequirePermissions` decorator paired with `SessionAuthGuard` and `PermissionsGuard`:

```typescript
@UseGuards(SessionAuthGuard, PermissionsGuard)
@Controller('content')
export class ContentController {
  @Post()
  @RequirePermissions(Permission.CONTENT_CREATE)
  async createContent(@Body() dto: CreateContentDto) {
    // Authorized authoring logic
  }

  @Post(':id/publish')
  @RequirePermissions(Permission.CONTENT_PUBLISH)
  async publishContent(@Param('id') id: string) {
    // Authorized publishing logic
  }
}
```

### 5.3 Fine-Grained Record-Level Checks
In addition to role-based permission checks, content modification endpoints verify record-level ownership and assigned scopes:
- A `CONTENT_EDITOR` may only edit draft items that they created, unless specifically granted collaborator access.
- A `PROGRAM_MANAGER` can only modify program entities assigned to their specific initiative portfolio.
- When an entity has progressed to `IN_REVIEW` or `PUBLISHED`, write actions are restricted to `APPROVER` and `ADMIN` roles.
