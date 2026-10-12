import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "../../app/page";
import {
  HERO_DATA,
  INTRO_PILLARS,
  PROGRAM_CARDS,
  INNOVATION_DOMAINS,
  FEATURED_PILOT,
  FEATURED_STARTUPS,
  IMPACT_METRICS,
  UPCOMING_EVENTS,
  REPORT_PUBLICATIONS,
  COLLABORATION_CTA,
} from "../../data/homepage";

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;");
}

describe("Production Homepage Implementation (Phase 4 Task 3)", () => {
  const html = renderToStaticMarkup(<HomePage />);

  describe("Section C: Institutional Hero", () => {
    it("renders overline, verified H1 display headline, and body copy", () => {
      expect(html).toContain(HERO_DATA.overline);
      expect(html).toContain(HERO_DATA.headline);
      expect(html).toContain(HERO_DATA.body);
    });

    it("renders dual CTAs with correct destinations and min touch targets", () => {
      expect(html).toContain(`href="${HERO_DATA.primaryCta.href}"`);
      expect(html).toContain(HERO_DATA.primaryCta.label);
      expect(html).toContain(`href="${HERO_DATA.secondaryCta.href}"`);
      expect(html).toContain(HERO_DATA.secondaryCta.label);
      expect(html).toContain("min-h-[44px]");
    });

    it("renders institutional credential pills", () => {
      HERO_DATA.credentials.forEach((cred) => {
        expect(html).toContain(cred);
      });
    });

    it("renders the 110-acre campus facility frame with infrastructure highlights", () => {
      expect(html).toContain("110-Acre Campus Testbed");
      expect(html).toContain("NABL Lab");
      expect(html).toContain("FabLab");
      expect(html).toContain("Pilot Plant");
      expect(html).toContain("IoT Farm");
      expect(html).toContain('href="/about/infrastructure"');
    });
  });

  describe("Section D: Institutional Introduction & Genesis", () => {
    it("renders Section D heading and institutional mission text", () => {
      expect(html).toContain("Institutional Genesis");
      expect(html).toContain("Where Scientific Rigor Meets Farm-Level Reality");
      expect(html).toContain("Atal Innovation Mission (NITI Aayog)");
    });

    it("renders the 3 strategic institutional pillars", () => {
      INTRO_PILLARS.forEach((pillar) => {
        expect(html).toContain(escapeHtml(pillar.title));
        expect(html).toContain(escapeHtml(pillar.description));
        expect(html).toContain(`href="${pillar.href}"`);
      });
    });

    it("provides contextual navigation to institutional charter and leadership", () => {
      expect(html).toContain('href="/about"');
      expect(html).toContain("Read Full Institutional Charter");
    });
  });

  describe("Section E: Focus Areas & Incubation Continuum", () => {
    it("renders Section E heading and continuum description", () => {
      expect(html).toContain("Incubation Continuum");
      expect(html).toContain(
        "Structured Incubation Programs for Every Growth Stage",
      );
    });

    it("renders all 3 incubation stage cards with funding tranches and active badges", () => {
      PROGRAM_CARDS.forEach((prog) => {
        expect(html).toContain(escapeHtml(prog.title));
        expect(html).toContain(escapeHtml(prog.stage));
        expect(html).toContain(escapeHtml(prog.duration));
        expect(html).toContain(escapeHtml(prog.grantTranche));
        expect(html).toContain(escapeHtml(prog.description));
        expect(html).toContain(`href="${prog.href}"`);
      });
      expect(html).toContain("Cohort 4 Applications Open");
    });
  });

  describe("Section F: Agriculture & Technology Showcase", () => {
    it("renders thematic focus area heading and 6 innovation domain cards", () => {
      expect(html).toContain("Thematic Focus Areas");
      expect(html).toContain("Pillars of Agricultural Innovation");
      INNOVATION_DOMAINS.forEach((domain) => {
        expect(html).toContain(escapeHtml(domain.title));
        expect(html).toContain(escapeHtml(domain.shortDesc));
        expect(html).toContain(`href="${domain.href}"`);
      });
    });

    it("renders the featured technical telemetry field pilot banner", () => {
      expect(html).toContain(escapeHtml(FEATURED_PILOT.title));
      expect(html).toContain(escapeHtml(FEATURED_PILOT.acreage));
      expect(html).toContain(escapeHtml(FEATURED_PILOT.metric));
      expect(html).toContain(escapeHtml(FEATURED_PILOT.metricLabel));
      expect(html).toContain(escapeHtml(FEATURED_PILOT.description));
      expect(html).toContain(`href="${FEATURED_PILOT.href}"`);
    });
  });

  describe("Section G: Startup & Innovation Ecosystem", () => {
    it("renders venture building heading and link to startup directory", () => {
      expect(html).toContain("Venture Building in Action");
      expect(html).toContain("Innovations Born in Baramati");
      expect(html).toContain('href="/startups"');
      expect(html).toContain("Browse Full Directory (50+ Startups)");
    });

    it("renders the 3 verified startup ventures with founders and impact metrics", () => {
      FEATURED_STARTUPS.forEach((startup) => {
        expect(html).toContain(escapeHtml(startup.name));
        expect(html).toContain(escapeHtml(startup.sector));
        expect(html).toContain(escapeHtml(startup.founders));
        expect(html).toContain(escapeHtml(startup.scheme));
        expect(html).toContain(escapeHtml(startup.impactSummary));
        expect(html).toContain(escapeHtml(startup.verifiedMetric));
        expect(html).toContain(`href="${startup.href}"`);
      });
    });
  });

  describe("Section H: Verified Impact Metrics", () => {
    it("renders institutional dark anchor container with audit badge", () => {
      expect(html).toContain("Audited Institutional Impact");
      expect(html).toContain("FY 2024-25");
      expect(html).toContain("Empowering Deep-Tech Across Rural Ecosystems");
    });

    it("renders all 4 audited metrics with explicit verified source citations", () => {
      IMPACT_METRICS.forEach((m) => {
        expect(html).toContain(escapeHtml(m.value));
        expect(html).toContain(escapeHtml(m.label));
        expect(html).toContain(`Source: ${escapeHtml(m.verifiedSource)}`);
      });
    });

    it("links to historical cohort progression", () => {
      expect(html).toContain('href="/impact"');
    });
  });

  describe("Section I: Calendar, Events & Intake Deadlines", () => {
    it("renders calendar section heading and upcoming events list", () => {
      expect(html).toContain("Calendar &amp; Deadlines");
      expect(html).toContain("Upcoming Cohorts &amp; Technical Events");
      UPCOMING_EVENTS.forEach((evt) => {
        expect(html).toContain(escapeHtml(evt.title));
        expect(html).toContain(escapeHtml(evt.day));
        expect(html).toContain(escapeHtml(evt.month));
        expect(html).toContain(escapeHtml(evt.year));
        expect(html).toContain(escapeHtml(evt.type));
        expect(html).toContain(escapeHtml(evt.venue));
        expect(html).toContain(`href="${evt.href}"`);
      });
    });

    it("displays urgent deadline warning tag for active cohort intake", () => {
      expect(html).toContain("Intake Active — Grants up to ₹20L");
    });
  });

  describe("Section J: Institutional Reports & Publications", () => {
    it("renders publications section with transparency heading", () => {
      expect(html).toContain("Transparency &amp; Research");
      expect(html).toContain("Institutional Knowledge &amp; Annual Reports");
      expect(html).toContain('href="/resources"');
    });

    it("renders verified downloadable sample publications with real download attributes", () => {
      REPORT_PUBLICATIONS.forEach((rep) => {
        expect(html).toContain(escapeHtml(rep.title));
        expect(html).toContain(escapeHtml(rep.type));
        expect(html).toContain(escapeHtml(rep.fileSize));
        expect(html).toContain(escapeHtml(rep.verificationBadge));
        expect(html).toContain(`href="${rep.downloadUrl}"`);
        expect(html).toContain("download");
      });
    });
  });

  describe("Section K: Institutional Collaboration CTA", () => {
    it("renders collaboration headline, copy, and dual action CTAs", () => {
      expect(html).toContain(COLLABORATION_CTA.headline);
      expect(html).toContain(COLLABORATION_CTA.body);
      expect(html).toContain(`href="${COLLABORATION_CTA.primaryButton.href}"`);
      expect(html).toContain(COLLABORATION_CTA.primaryButton.label);
      expect(html).toContain(
        `href="${COLLABORATION_CTA.secondaryButton.href}"`,
      );
      expect(html).toContain(COLLABORATION_CTA.secondaryButton.label);
    });
  });

  describe("Accessibility & Technical Foundations", () => {
    it("contains exactly one H1 element for accessible heading hierarchy", () => {
      const h1Matches = html.match(/<h1/g);
      expect(h1Matches).not.toBeNull();
      expect(h1Matches?.length).toBe(1);
    });

    it("contains H2 elements for all major sections", () => {
      const h2Matches = html.match(/<h2/g);
      expect(h2Matches).not.toBeNull();
      // Sections D, E, F, G, H, I, J, K have H2
      expect(h2Matches?.length ?? 0).toBeGreaterThanOrEqual(8);
    });
  });
});
