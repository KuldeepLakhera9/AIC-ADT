import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AboutPage from "../../app/about/page";
import MissionVisionPage from "../../app/about/mission-vision/page";
import LeadershipPage from "../../app/about/leadership/page";
import InfrastructurePage from "../../app/about/infrastructure/page";
import FacilityDetailPage, {
  generateStaticParams,
} from "../../app/about/infrastructure/[slug]/page";
import PartnersPage from "../../app/about/partners/page";
import NotFound from "../../app/not-found";
import {
  ABOUT_OVERVIEW_DATA,
  MISSION_VISION_DATA,
  LEADERSHIP_DATA,
  INFRASTRUCTURE_MASTER_DATA,
  INSTITUTIONAL_PARTNERS_DATA,
} from "../../data/institutional";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/'/g, "&#x27;")
    .replace(/"/g, "&quot;");
}

describe("Institutional Public Pages (Phase 4 Task 4)", () => {
  describe("1. About Overview Page (/about)", () => {
    const html = renderToStaticMarkup(<AboutPage />);

    it("renders page header, single H1, and breadcrumbs", () => {
      expect(html).toContain(escapeHtml(ABOUT_OVERVIEW_DATA.hero.title));
      expect(html).toContain("Atal Innovation Mission");
      expect(html).toContain('href="/"');
      expect(html).toContain('aria-current="page"');
      expect(html).toContain("<h1");
    });

    it("renders 50-year ADT heritage and Atal Innovation Mission founding context", () => {
      expect(html).toContain("Agricultural Development Trust (ADT)");
      expect(html).toContain("Atal Innovation Mission (AIM), NITI Aayog");
      expect(html).toContain("Section 8 Not-for-Profit");
    });

    it("renders key stats and institutional pillars", () => {
      expect(html).toContain("110-Acre Living Farm Testbed");
      expect(html).toContain("₹5.2 Cr+ Mobilized");
      expect(html).toContain("69+ Mentors");
    });

    it("renders infrastructure links and exploration actions", () => {
      expect(html).toContain('href="/about/infrastructure"');
      expect(html).toContain('href="/programs"');
    });
  });

  describe("2. Mission, Vision & Values Page (/about/mission-vision)", () => {
    const html = renderToStaticMarkup(<MissionVisionPage />);

    it("renders vision statement and mission pillars", () => {
      expect(html).toContain(escapeHtml(MISSION_VISION_DATA.hero.title));
      expect(html).toContain(escapeHtml(MISSION_VISION_DATA.vision.statement));
      expect(html).toContain(escapeHtml(MISSION_VISION_DATA.mission.statement));
      expect(MISSION_VISION_DATA.mission.pillars.length).toBeGreaterThan(0);
      expect(html).toContain(
        escapeHtml(MISSION_VISION_DATA.mission.pillars[0]),
      );
    });

    it("renders 5 core values with taglines", () => {
      MISSION_VISION_DATA.values.forEach((val) => {
        expect(html).toContain(escapeHtml(val.title));
        expect(html).toContain(escapeHtml(val.tagline));
      });
    });

    it("renders UN Sustainable Development Goals (SDG) alignment matrix", () => {
      expect(html).toContain("UN Sustainable Development Goals");
      MISSION_VISION_DATA.sdgs.forEach((sdg) => {
        expect(html).toContain(`SDG ${sdg.sdgNumber}`);
        expect(html).toContain(escapeHtml(sdg.sdgTitle));
        expect(html).toContain(escapeHtml(sdg.metricTarget));
      });
    });

    it("renders 2030 strategic horizon roadmap", () => {
      MISSION_VISION_DATA.roadmap.forEach((milestone) => {
        expect(html).toContain(escapeHtml(milestone.horizon));
        expect(html).toContain(milestone.year);
        expect(html).toContain(escapeHtml(milestone.title));
      });
    });
  });

  describe("3. Leadership & Governance Page (/about/leadership)", () => {
    const html = renderToStaticMarkup(<LeadershipPage />);

    it("renders statutory direction with Board of Directors", () => {
      expect(html).toContain("Board of Directors");
      expect(html).toContain("Mr. Prataprao Pawar");
      expect(html).toContain("Prof. Adv. Ganesh Hingmire");
    });

    it("renders Advisory Council with agritech and venture specialists", () => {
      expect(html).toContain("Advisory Council");
      expect(html).toContain("Mr. Hemendra Mathur");
      expect(html).toContain("Senior Venture Advisor");
    });

    it("renders Executive Management team with CEO and operational managers", () => {
      expect(html).toContain("Executive Management");
      expect(html).toContain("Ms. Jaya Tiwari");
      expect(html).toContain("Chief Executive Officer (CEO)");
      expect(html).toContain("Ms. Sonali Saste");
      expect(html).toContain("Mr. Avinash Pudale");
    });

    it("verifies members have verified status badge and corporate compliance information", () => {
      expect(html).toContain("Verified");
      expect(html).toContain(
        LEADERSHIP_DATA.governanceCommitment.cinNumberBadge,
      );
    });
  });

  describe("4. Campus & Research Infrastructure Page (/about/infrastructure)", () => {
    const html = renderToStaticMarkup(<InfrastructurePage />);

    it("renders campus stats banner with 110 acres and 5 specialized labs", () => {
      expect(html).toContain("110 Acres");
      expect(html).toContain("50+ Acres");
      expect(html).toContain("5 Specialized");
      expect(html).toContain("100% Microgrid");
    });

    it("renders cards for all 5 specialized laboratories linking to detail slugs", () => {
      INFRASTRUCTURE_MASTER_DATA.facilities.forEach((fac) => {
        expect(html).toContain(escapeHtml(fac.name));
        expect(html).toContain(`href="/about/infrastructure/${fac.slug}"`);
      });
    });

    it("renders the 110-acre living farm testbed section and Lab-to-Land pipeline", () => {
      expect(html).toContain("110-Acre Living Agricultural Testbed");
      expect(html).toContain("The AIC-ADT Lab-to-Land Pipeline");
      expect(html).toContain("Stage 01");
      expect(html).toContain("Stage 04");
    });
  });

  describe("5. Specialized Facility Detail Pages (/about/infrastructure/[slug])", () => {
    it("returns static params for all 5 approved facility slugs", async () => {
      const params = await generateStaticParams();
      expect(params).toHaveLength(5);
      expect(params.map((p) => p.slug)).toEqual([
        "fab-lab",
        "analytical-lab",
        "food-innovation-lab",
        "digital-media-lab",
        "co-working-space",
      ]);
    });

    it("renders FabLab makerspace detail page with equipment and specs", async () => {
      const jsx = await FacilityDetailPage({
        params: Promise.resolve({ slug: "fab-lab" }),
      });
      const html = renderToStaticMarkup(jsx);

      expect(html).toContain("FabLab Makerspace &amp; Hardware Prototyping");
      expect(html).toContain("Industrial 3D Printers (FDM &amp; SLA)");
      expect(html).toContain("CO2 Laser Cutter &amp; Engraver");
      expect(html).toContain("Precision CNC Router");
      expect(html).toContain("PCB Prototyping &amp; Milling Machine");
      expect(html).toContain("Mr. Avinash Pudale");
    });

    it("renders NABL Analytical Laboratory detail page with GC-MS and HPLC", async () => {
      const jsx = await FacilityDetailPage({
        params: Promise.resolve({ slug: "analytical-lab" }),
      });
      const html = renderToStaticMarkup(jsx);

      expect(html).toContain("NABL Analytical Testing Laboratory");
      expect(html).toContain("Gas Chromatography-Mass Spectrometry (GC-MS)");
      expect(html).toContain("High-Performance Liquid Chromatography (HPLC)");
      expect(html).toContain("Double-Beam UV-Vis Spectrophotometer");
    });

    it("renders Food Innovation Lab detail page with retort and vacuum drying", async () => {
      const jsx = await FacilityDetailPage({
        params: Promise.resolve({ slug: "food-innovation-lab" }),
      });
      const html = renderToStaticMarkup(jsx);

      expect(html).toContain(
        "Food Innovation Lab &amp; Pilot Processing Plant",
      );
      expect(html).toContain("Vacuum Dehydration System");
      expect(html).toContain("Retort Processing &amp; Sterilization Autoclave");
      expect(html).toContain("Mr. Vaibhav Yadav");
    });

    it("renders adjacent facility links for cross-navigation", async () => {
      const jsx = await FacilityDetailPage({
        params: Promise.resolve({ slug: "digital-media-lab" }),
      });
      const html = renderToStaticMarkup(jsx);

      expect(html).toContain("Other Specialized Facilities");
      expect(html).toContain('href="/about/infrastructure/fab-lab"');
      expect(html).toContain('href="/about/infrastructure/co-working-space"');
    });
  });

  describe("6. Categorized Partners Directory Page (/about/partners)", () => {
    const html = renderToStaticMarkup(<PartnersPage />);

    it("renders all 5 partner categories", () => {
      INSTITUTIONAL_PARTNERS_DATA.categories.forEach((cat) => {
        expect(html).toContain(escapeHtml(cat.title));
      });
    });

    it("renders key partners (AIM, DPIIT, MeitY, Capgemini, HDFC)", () => {
      expect(html).toContain("Atal Innovation Mission (AIM)");
      expect(html).toContain("DPIIT — Startup India");
      expect(html).toContain("MeitY Startup Hub (MSH)");
      expect(html).toContain("Capgemini India");
      expect(html).toContain("HDFC Bank Parivartan");
    });

    it("renders verified partner badges and partnership avenues", () => {
      expect(html).toContain("Verified");
      expect(html).toContain("Corporate CSR Grants");
      expect(html).toContain("Academic Translation");
      expect(html).toContain("Venture Syndicate Access");
      expect(html).toContain("Enterprise Field Pilots");
    });
  });

  describe("7. Not-Found State (/not-found)", () => {
    const html = renderToStaticMarkup(<NotFound />);

    it("renders 404 heading, explanation, and institutional recovery links", () => {
      expect(html).toContain("404");
      expect(html).toContain("Page Not Found");
      expect(html).toContain('href="/"');
      expect(html).toContain('href="/contact"');
      expect(html).toContain('href="/about"');
      expect(html).toContain('href="/about/infrastructure"');
      expect(html).toContain('href="/about/leadership"');
      expect(html).toContain('href="/about/partners"');
    });
  });
});
