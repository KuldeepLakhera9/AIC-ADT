# Phase 5 — CMS Admin Shell and Interface Architecture

**Document Version:** 1.0.0  
**Status:** Approved & Implemented  
**Classification:** Frontend Architecture & UI Specification  
**System:** AIC-ADT Baramati Foundation CMS Platform  
**Target Date:** October 2026

---

## 1. Executive Summary

This document specifies the design, layout architecture, and user experience components of the administrative interface for the AIC-ADT Baramati Foundation Content Management System (CMS). Built using Next.js 16 (App Router) and Tailwind CSS, the interface provides a dedicated, hardened management console that completely replaces public website chrome on `/admin*` routes.

Key capabilities include:
1. **Dedicated Administrative Shell:** Isolated layout ([AdminShell.tsx](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/components/admin/AdminShell.tsx)) providing a persistent desktop sidebar, responsive off-canvas mobile drawer, institutional header, and real-time user identity indicator.
2. **Permission-Aware Navigation:** Sidebar navigation dynamically reflects the active user's permissions, preventing visual clutter while maintaining authoritative backend API enforcement.
3. **Zero Broken Links:** All 11 navigation routes link to fully implemented administrative management pages with search, action bars, and authentic empty states.
4. **State Feedback Hierarchy:** Built-in skeleton screens during session verification, actionable error banners on network disruptions, and zero-count empty states without fabricated metrics.
5. **Session Expiry Governance:** Automated session termination detection routing expired visitors directly to `/admin/login?expired=true`.

---

## 2. Layout Structure & Navigation System

```
┌────────────────────────────────────────────────────────────────────────┐
│ TOP HEADER: [AIC Logo] [Breadcrumbs]          [User Profile] [Sign Out]│
├───────────────────┬────────────────────────────────────────────────────┤
│ SIDEBAR           │ MAIN CONTENT REGION                                │
│                   │                                                    │
│ • Dashboard       │  ┌──────────────────────────────────────────────┐  │
│ • Review Queue    │  │ Welcome & Role Badge Banner                  │  │
│ • Pages & Content │  └──────────────────────────────────────────────┘  │
│ • Programs        │  ┌───────────┐ ┌───────────┐ ┌───────────┐         │
│ • Startups        │  │ Status 1  │ │ Status 2  │ │ Status 3  │ ...     │
│ • News & Notices  │  └───────────┘ └───────────┘ └───────────┘         │
│ • Events          │  ┌─────────────────────────┐ ┌──────────────────┐  │
│ • Publications    │  │ Recently Updated        │ │ Quick Actions    │  │
│ • Media Library   │  │ Recently Published      │ │ Audit Activity   │  │
│ • Users & Roles   │  └─────────────────────────┘ └──────────────────┘  │
│ • Audit Trail     │                                                    │
│                   │                                                    │
│ [Session Status]  │                                                    │
└───────────────────┴────────────────────────────────────────────────────┘
```

---

## 3. Component Architecture

### 3.1 `AdminLayout` ([apps/web/src/app/admin/layout.tsx](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/app/admin/layout.tsx))
- **Metadata Hardening:** Declares `robots: { index: false, follow: false }` to permanently exclude administrative paths from search indexing.
- **Root Shell Container:** Wraps child administrative pages with `AdminShell`.

### 3.2 `AdminShell` ([apps/web/src/components/admin/AdminShell.tsx](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/components/admin/AdminShell.tsx))
- **Session Verification:** Proactively queries `/api/auth/me`. If unauthenticated or expired, redirects to `/admin/login?expired=true`.
- **Login Route Passthrough:** Detects `pathname === '/admin/login'` and bypasses administrative chrome to render the standalone login card.
- **Top Header Bar:**
  - **Institutional Branding:** AIC emblem, institutional title, and "CMS Administration" subtitle.
  - **Dynamic Breadcrumbs:** Auto-generated from URL path segments (e.g. `Console / Review Queue`).
  - **Identity Badge:** Displays user's initials avatar, full name, role identifier (`ADMIN`, `CONTENT_EDITOR`, etc.), and live session pulse.
  - **Sign Out Action:** Triggers POST to `/api/auth/logout`, clearing server-side session and cookies before redirecting to login.
- **Desktop Sidebar:**
  - Compact width (`w-64`) with dark slate aesthetics (`bg-slate-900 border-r border-slate-800`).
  - Highlights active route with brand green styling (`bg-emerald-950/60 text-emerald-400 border-emerald-600/40`).
  - Displays contextual badges (e.g., "Approvals" badge on Review Queue).
  - Displays session timeout notice (`Idle Timeout: 8h`, `TLS / CSRF ON`).
- **Responsive Mobile Drawer:**
  - Accessible hamburger trigger on screens `< 768px`.
  - Slide-out drawer with backdrop blur and tap-outside dismissal.
  - Automatic closure upon navigation.

---

## 4. Permission-Aware Navigation Registry

All menu items declare an explicit required permission. If the user's session lacks that permission, the item is omitted from the navigation:

| Navigation Item | Route Path | Required Permission | Icon Identifier |
| :--- | :--- | :--- | :--- |
| **Dashboard** | `/admin/dashboard` | `dashboard.read` | `dashboard` |
| **Review Queue** | `/admin/review-queue` | `content.review` | `review` |
| **Pages & Content** | `/admin/pages` | `content.read` | `pages` |
| **Programs** | `/admin/programs` | `content.read` | `programs` |
| **Startups Ecosystem** | `/admin/startups` | `content.read` | `startups` |
| **News & Notices** | `/admin/news` | `content.read` | `news` |
| **Events & Calendar** | `/admin/events` | `content.read` | `events` |
| **Reports & Publications** | `/admin/publications` | `content.read` | `publications` |
| **Media Library** | `/admin/media` | `media.read` | `media` |
| **Users & Roles** | `/admin/users` | `users.read` | `users` |
| **Audit Trail** | `/admin/audit` | `audit.read` | `audit` |

*Security Note:* In alignment with the Principle of Defense-in-Depth, hidden navigation items are a UX convenience only; every underlying API route independently validates session authentication and permissions via NestJS guards.

---

## 5. Administrative Route Registry (Zero Broken Links)

To comply with the strict requirement that no menu items point to nonexistent routes, all 11 subviews are implemented:

1. [apps/web/src/app/admin/dashboard/page.tsx](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/app/admin/dashboard/page.tsx): Main operational cockpit with status counters, recent edits, recent publications, and authorized quick actions.
2. [apps/web/src/app/admin/review-queue/page.tsx](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/app/admin/review-queue/page.tsx): Editorial approval triage with "Review Queue is Clear" empty state.
3. [apps/web/src/app/admin/pages/page.tsx](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/app/admin/pages/page.tsx): Institutional page section manager.
4. [apps/web/src/app/admin/programs/page.tsx](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/app/admin/programs/page.tsx): Incubation scheme configurations (Pre-incubation, SISFS, MeitY).
5. [apps/web/src/app/admin/startups/page.tsx](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/app/admin/startups/page.tsx): Incubatee cohort companies and TRL milestone catalog.
6. [apps/web/src/app/admin/news/page.tsx](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/app/admin/news/page.tsx): Institutional announcement authoring and press releases.
7. [apps/web/src/app/admin/events/page.tsx](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/app/admin/events/page.tsx): Intake deadlines, workshops, and demo day scheduler.
8. [apps/web/src/app/admin/publications/page.tsx](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/app/admin/publications/page.tsx): Statutory filings, annual reports, and scientific whitepapers.
9. [apps/web/src/app/admin/media/page.tsx](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/app/admin/media/page.tsx): Digital asset management and photography repository.
10. [apps/web/src/app/admin/users/page.tsx](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/app/admin/users/page.tsx): Personnel governance and RBAC assignment.
11. [apps/web/src/app/admin/audit/page.tsx](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/apps/web/src/app/admin/audit/page.tsx): Append-only PostgreSQL audit trail viewer.

---

## 6. UX & Error Handling Guidelines

1. **Authentic Zero-States:** When the database contains 0 records, the interface renders genuine 0s rather than sample cards or mock counts.
2. **Actionable Error State:** If an API endpoint fails, the widget renders a red error banner explaining the condition with a dedicated "Retry Dashboard Fetch" button, preventing silent zero displays.
3. **No Information Disclosure:** Stack traces, internal database schema details, and server IPs are strictly omitted from client-facing UI errors.
4. **Touch Target Accessibility:** All buttons and interactive links enforce a minimum touch target height of 40–44px.
