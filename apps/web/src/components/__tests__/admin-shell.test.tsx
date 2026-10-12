import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => "/admin/dashboard",
}));

import AdminReviewQueuePage from "../../app/admin/review-queue/page";
import AdminPagesPage from "../../app/admin/pages/page";
import AdminProgramsPage from "../../app/admin/programs/page";
import AdminStartupsPage from "../../app/admin/startups/page";
import AdminNewsPage from "../../app/admin/news/page";
import AdminEventsPage from "../../app/admin/events/page";
import AdminPublicationsPage from "../../app/admin/publications/page";
import AdminMediaPage from "../../app/admin/media/page";
import AdminUsersPage from "../../app/admin/users/page";
import AdminAuditPage from "../../app/admin/audit/page";

describe("Administrative CMS Console Pages & Layout Verification", () => {
  it("renders Review Queue page with empty queue state and governance notice", () => {
    const html = renderToStaticMarkup(<AdminReviewQueuePage />);
    expect(html).toContain("Editorial Review Queue");
    expect(html).toContain("Review Queue is Clear");
    expect(html).toContain("Back to Dashboard");
  });

  it("renders Pages management page with section action and empty state", () => {
    const html = renderToStaticMarkup(<AdminPagesPage />);
    expect(html).toContain("Institutional Pages");
    expect(html).toContain("No Custom Page Overrides Active");
    expect(html).toContain("New Page Section");
  });

  it("renders Programs management page with program schema action", () => {
    const html = renderToStaticMarkup(<AdminProgramsPage />);
    expect(html).toContain("Incubation Programs Management");
    expect(html).toContain("Programs Catalog Empty");
    expect(html).toContain("Add Program");
  });

  it("renders Startups management page with incubator portfolio controls", () => {
    const html = renderToStaticMarkup(<AdminStartupsPage />);
    expect(html).toContain("Startup Portfolio Management");
    expect(html).toContain("Startup Portfolio Catalog Empty");
    expect(html).toContain("Add Incubatee Startup");
  });

  it("renders News & Notices page with drafting trigger", () => {
    const html = renderToStaticMarkup(<AdminNewsPage />);
    expect(html).toContain("News &amp; Announcements Management");
    expect(html).toContain("Search headline or slug...");
    expect(html).toContain("Draft News Article");
  });

  it("renders Events page with scheduler trigger", () => {
    const html = renderToStaticMarkup(<AdminEventsPage />);
    expect(html).toContain("Events &amp; Calendar Management");
    expect(html).toContain("No Upcoming or Draft Events Found");
    expect(html).toContain("Schedule Event");
  });

  it("renders Publications page with statutory upload action", () => {
    const html = renderToStaticMarkup(<AdminPublicationsPage />);
    expect(html).toContain("Reports &amp; Publications");
    expect(html).toContain("No Publications Uploaded");
    expect(html).toContain("Upload Publication");
  });

  it("renders Media Library page with asset upload control", () => {
    const html = renderToStaticMarkup(<AdminMediaPage />);
    expect(html).toContain("Media &amp; Asset Repository");
    expect(html).toContain("Media Library Empty");
    expect(html).toContain("Upload Media File");
  });

  it("renders Users and RBAC page with invitation trigger", () => {
    const html = renderToStaticMarkup(<AdminUsersPage />);
    expect(html).toContain("Users &amp; Role-Based Access Control");
    expect(html).toContain("Identity Directory Active");
    expect(html).toContain("Invite Administrator");
  });

  it("renders Audit Trail page with immutable storage notice", () => {
    const html = renderToStaticMarkup(<AdminAuditPage />);
    expect(html).toContain("Security &amp; Governance Audit Trail");
    expect(html).toContain("Audit Trail Initialized");
    expect(html).toContain("PostgreSQL Append-Only");
  });
});
