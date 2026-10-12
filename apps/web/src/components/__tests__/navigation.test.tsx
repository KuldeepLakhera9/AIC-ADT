import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import {
  MAIN_NAV_ITEMS,
  FOOTER_SECTIONS,
  INSTITUTIONAL_INFO,
} from "@/config/navigation";

describe("Phase 4 Global Layout & Navigation Test Suite", () => {
  describe("Navigation Configuration Integrity", () => {
    it("ensures all top-level navigation items have valid canonical routes", () => {
      expect(MAIN_NAV_ITEMS.length).toBeGreaterThanOrEqual(7);

      for (const item of MAIN_NAV_ITEMS) {
        expect(item.title).toBeTruthy();
        expect(item.href).toMatch(/^\/[a-z0-9\-/]*$/);
        expect(item.href).not.toBe("#");

        if (item.sections) {
          for (const section of item.sections) {
            for (const subItem of section.items) {
              expect(subItem.title).toBeTruthy();
              expect(subItem.href).toMatch(/^\/[a-z0-9\-/]*$/);
              expect(subItem.href).not.toBe("#");
              expect(subItem.description).toBeTruthy();
            }
          }
        }
      }
    });

    it("verifies that all footer directory links are well-formed canonical URLs", () => {
      expect(FOOTER_SECTIONS.length).toBe(4);

      for (const section of FOOTER_SECTIONS) {
        expect(section.title).toBeTruthy();
        expect(section.links.length).toBeGreaterThan(0);

        for (const link of section.links) {
          expect(link.title).toBeTruthy();
          expect(link.href).toMatch(/^\/[a-z0-9\-/]*$/);
          expect(link.href).not.toBe("#");
        }
      }
    });

    it("verifies institutional information integrity", () => {
      expect(INSTITUTIONAL_INFO.name).toBe("AIC-ADT Baramati Foundation");
      expect(INSTITUTIONAL_INFO.address.pincode).toBe("413115");
      expect(INSTITUTIONAL_INFO.address.city).toBe("Baramati");
      expect(INSTITUTIONAL_INFO.helplines.landline).toBe("+91 2112 255500");
      expect(INSTITUTIONAL_INFO.emails.primary).toBe("aicadt@adtbaramati.com");
    });
  });

  describe("Header Component Rendering & Accessibility", () => {
    it("renders the top utility strip with government endorsement and helpline", () => {
      const html = renderToStaticMarkup(<Header />);
      expect(html).toContain("Atal Innovation Mission (NITI Aayog)");
      expect(html).toContain("ADT Baramati");
      expect(html).toContain(INSTITUTIONAL_INFO.helplines.landline);
      expect(html).toContain("EN");
      expect(html).toContain("मराठी");
      expect(html).toContain("Portal");
    });

    it("renders the main brand lockup pointing to root", () => {
      const html = renderToStaticMarkup(<Header />);
      expect(html).toContain('href="/"');
      expect(html).toContain("AIC-ADT Baramati Foundation");
      expect(html).toContain(
        "Centre for AgTech, Biotech &amp; Rural Innovation",
      );
    });

    it("renders all 7 approved navigation pillars on desktop", () => {
      const html = renderToStaticMarkup(<Header />);
      expect(html).toContain("About");
      expect(html).toContain("Programs");
      expect(html).toContain("Startups");
      expect(html).toContain("Innovation &amp; Labs");
      expect(html).toContain("Impact");
      expect(html).toContain("Events");
      expect(html).toContain("Resources");
      expect(html).toContain("Contact");
    });

    it("renders accessible dropdown triggers with aria-haspopup and aria-expanded attributes", () => {
      const html = renderToStaticMarkup(<Header />);
      expect(html).toContain('aria-haspopup="true"');
      expect(html).toContain('aria-expanded="false"');
    });

    it("renders mobile drawer toggle with accessible aria labels", () => {
      const html = renderToStaticMarkup(<Header />);
      expect(html).toContain('aria-controls="mobile-nav-drawer"');
      expect(html).toContain('aria-label="Open navigation menu"');
      expect(html).toContain("Apply");
    });

    it("renders primary action button linking to incubation application instructions", () => {
      const html = renderToStaticMarkup(<Header />);
      expect(html).toContain("Apply for Incubation");
      expect(html).toContain('href="/programs/apply-instructions"');
    });
  });

  describe("Footer Component Rendering & Compliance", () => {
    it("renders institutional overview, parent organization and physical address", () => {
      const html = renderToStaticMarkup(<Footer />);
      expect(html).toContain("AIC-ADT Baramati Foundation");
      expect(html).toContain("Agricultural Development Trust, Baramati");
      expect(html).toContain("Post Box No. 35 (Malegaon Col.), Sharadanagar");
      expect(html).toContain("413115");
      expect(html).toContain("/contact/directions");
    });

    it("renders verified helplines, email aliases and operating hours", () => {
      const html = renderToStaticMarkup(<Footer />);
      expect(html).toContain(INSTITUTIONAL_INFO.helplines.landline);
      expect(html).toContain(INSTITUTIONAL_INFO.helplines.incubationMobile);
      expect(html).toContain(INSTITUTIONAL_INFO.emails.primary);
      expect(html).toContain("Monday – Saturday: 09:00 AM – 06:00 PM IST");
    });

    it("renders statutory compliance disclosures and dynamic copyright", () => {
      const currentYear = new Date().getFullYear().toString();
      const html = renderToStaticMarkup(<Footer />);
      expect(html).toContain(currentYear);
      expect(html).toContain("Privacy Policy");
      expect(html).toContain("Terms of Use");
      expect(html).toContain("RTI Disclosures");
      expect(html).toContain("Accessibility Statement");
      expect(html).toContain("/resources/policies-downloads");
    });

    it("renders 4 programmatic directory link categories", () => {
      const html = renderToStaticMarkup(<Footer />);
      expect(html).toContain("Incubation Programs");
      expect(html).toContain("Specialized Labs");
      expect(html).toContain("Venture Ecosystem");
      expect(html).toContain("Governance &amp; Policies");
    });
  });

  describe("Breadcrumbs Navigation Component", () => {
    it("renders semantic breadcrumb trail with accessible markup", () => {
      const items = [
        { label: "Programs", href: "/programs" },
        { label: "Schemes", href: "/programs" },
        { label: "Startup India Seed Fund" },
      ];

      const html = renderToStaticMarkup(<Breadcrumbs items={items} />);
      expect(html).toContain('<nav aria-label="Breadcrumb"');
      expect(html).toContain('href="/"');
      expect(html).toContain("Home");
      expect(html).toContain('href="/programs"');
      expect(html).toContain("Programs");
      expect(html).toContain('aria-current="page"');
      expect(html).toContain("Startup India Seed Fund");
    });
  });
});
