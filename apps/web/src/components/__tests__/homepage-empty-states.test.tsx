import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Mock empty datasets to verify compliance with empty state acceptance criteria
vi.mock("@/data/homepage", async () => {
  const actual =
    await vi.importActual<typeof import("@/data/homepage")>("@/data/homepage");
  return {
    ...actual,
    PROGRAM_CARDS: [],
    FEATURED_STARTUPS: [],
    IMPACT_METRICS: [],
    UPCOMING_EVENTS: [],
    REPORT_PUBLICATIONS: [],
  };
});

describe("Production Homepage Empty States (Phase 4 Task 3)", () => {
  it("renders sensible empty states when datasets are empty without fabricating numbers or displaying zeroes", async () => {
    // Dynamic import to ensure mock is applied
    const { default: HomePage } = await import("@/app/page");
    const html = renderToStaticMarkup(<HomePage />);

    // Programs empty state
    expect(html).toContain(
      "Program cohorts and incubation guidelines for the upcoming cycle are under administrative review.",
    );

    // Startups empty state
    expect(html).toContain(
      "Incubatee venture profiles for the current cohort are being verified in accordance with national incubation registry standards.",
    );

    // Impact empty state - verifies zero fabrication and no zero displays
    expect(html).toContain(
      "Audited impact metrics for the upcoming statutory cycle are undergoing annual compliance review under NITI Aayog guidelines.",
    );

    // Events empty state
    expect(html).toContain(
      "No public intake cohorts or masterclasses are currently scheduled. Cohort intake circulars are published in accordance with institutional calendars.",
    );

    // Reports empty state
    expect(html).toContain(
      "Annual publications and statutory disclosure documents are uploaded following board audit approvals.",
    );

    // Verify no fabricated zeroes are rendered in impact section
    expect(html).not.toContain(">0<");
  });
});
