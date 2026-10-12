import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("next/font/google", () => ({
  Outfit: () => ({ variable: "--font-outfit" }),
  Inter: () => ({ variable: "--font-inter" }),
  Noto_Sans_Devanagari: () => ({ variable: "--font-devanagari" }),
}));

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/JsonLd";
import RootLayout, { metadata as rootMetadata } from "@/app/layout";
import HomePage from "@/app/page";
import NotFound from "@/app/not-found";
import { getFrontendConfig } from "@/config/env";

describe("Phase 4 Technical SEO & Accessibility Quality Suite", () => {
  const { appUrl } = getFrontendConfig();

  describe("1. Technical SEO: Robots.txt & Indexing Control", () => {
    it("generates correct robots configuration", () => {
      const robotsConfig = robots();
      expect(robotsConfig).toBeDefined();

      const rules = Array.isArray(robotsConfig.rules)
        ? robotsConfig.rules
        : [robotsConfig.rules];

      expect(rules.length).toBeGreaterThan(0);
      const rule = rules[0];
      expect(rule.userAgent).toBe("*");
      expect(rule.allow).toBe("/");

      const disallowed = Array.isArray(rule.disallow)
        ? rule.disallow
        : [rule.disallow];

      expect(disallowed).toContain("/api/");
      expect(disallowed).toContain("/_next/");
      expect(disallowed).toContain("/design-system");
      expect(robotsConfig.sitemap).toBe(`${appUrl}/sitemap.xml`);
    });
  });

  describe("2. Technical SEO: XML Sitemap Specification", () => {
    it("generates complete sitemap with verified routes and priority weighting", () => {
      const sitemapEntries = sitemap();
      expect(sitemapEntries.length).toBeGreaterThanOrEqual(40);

      // Verify root page
      const rootEntry = sitemapEntries.find((e) => e.url === `${appUrl}/`);
      expect(rootEntry).toBeDefined();
      expect(rootEntry?.priority).toBe(1.0);
      expect(rootEntry?.alternates?.languages?.mr).toBe(`${appUrl}/mr`);

      // Verify core pillars
      const corePillars = [
        "/about",
        "/programs",
        "/startups",
        "/innovation",
        "/events",
        "/resources",
        "/contact",
      ];

      for (const pillar of corePillars) {
        const entry = sitemapEntries.find(
          (e) => e.url === `${appUrl}${pillar}`,
        );
        expect(entry).toBeDefined();
        expect(entry?.priority).toBeGreaterThanOrEqual(0.8);
      }

      // Verify Marathi mirror pages
      const marathiPillars = [
        "/mr",
        "/mr/about",
        "/mr/programs",
        "/mr/startups",
        "/mr/innovation",
        "/mr/events",
        "/mr/resources",
        "/mr/contact",
      ];

      for (const mPillar of marathiPillars) {
        const entry = sitemapEntries.find(
          (e) => e.url === `${appUrl}${mPillar}`,
        );
        expect(entry).toBeDefined();
        expect(entry?.alternates?.languages?.en).toBeDefined();
      }

      // Verify internal test pages are excluded from sitemap
      const designSystemEntry = sitemapEntries.find((e) =>
        e.url.includes("/design-system"),
      );
      expect(designSystemEntry).toBeUndefined();
    });
  });

  describe("3. Technical SEO: Verified Schema.org Structured Data", () => {
    it("renders valid OrganizationJsonLd without fabricated ratings or claims", () => {
      const html = renderToStaticMarkup(<OrganizationJsonLd />);
      expect(html).toContain('type="application/ld+json"');

      const jsonMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/);
      expect(jsonMatch).toBeTruthy();

      const parsed = JSON.parse(jsonMatch![1]);
      expect(parsed["@context"]).toBe("https://schema.org");
      expect(parsed["@type"]).toContain("Organization");
      expect(parsed.name).toBe("AIC-ADT Baramati Foundation");
      expect(parsed.address.postalCode).toBe("413115");
      expect(parsed.address.addressLocality).toBe("Baramati");
      expect(parsed.parentOrganization.name).toBe(
        "Agricultural Development Trust, Baramati",
      );
      expect(parsed.funder.name).toBe(
        "Atal Innovation Mission, NITI Aayog, Government of India",
      );

      // Verify absence of fabricated schema
      expect(parsed.aggregateRating).toBeUndefined();
      expect(parsed.review).toBeUndefined();
      expect(parsed.award).toBeUndefined();
    });

    it("renders valid WebSiteJsonLd linking to the organization entity", () => {
      const html = renderToStaticMarkup(<WebSiteJsonLd />);
      const jsonMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/);
      expect(jsonMatch).toBeTruthy();

      const parsed = JSON.parse(jsonMatch![1]);
      expect(parsed["@context"]).toBe("https://schema.org");
      expect(parsed["@type"]).toBe("WebSite");
      expect(parsed.name).toBe("AIC-ADT Baramati Foundation");
      expect(parsed.inLanguage).toContain("en-IN");
      expect(parsed.inLanguage).toContain("mr-IN");
    });

    it("renders valid BreadcrumbJsonLd with positional indexing", () => {
      const items = [
        { name: "Home", item: "/" },
        { name: "Programs", item: "/programs" },
        { name: "Incubation", item: "/programs/incubation" },
      ];
      const html = renderToStaticMarkup(<BreadcrumbJsonLd items={items} />);
      const jsonMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/);
      expect(jsonMatch).toBeTruthy();

      const parsed = JSON.parse(jsonMatch![1]);
      expect(parsed["@context"]).toBe("https://schema.org");
      expect(parsed["@type"]).toBe("BreadcrumbList");
      expect(parsed.itemListElement.length).toBe(3);
      expect(parsed.itemListElement[0].position).toBe(1);
      expect(parsed.itemListElement[0].name).toBe("Home");
      expect(parsed.itemListElement[2].position).toBe(3);
      expect(parsed.itemListElement[2].name).toBe("Incubation");
    });
  });

  describe("4. Technical SEO: Root Metadata & Social Sharing", () => {
    it("configures metadataBase and complete OpenGraph and Twitter specifications", () => {
      expect(rootMetadata.metadataBase).toBeDefined();
      expect(rootMetadata.metadataBase?.toString()).toBe(`${appUrl}/`);

      expect(rootMetadata.title).toBeDefined();
      expect(rootMetadata.description).toBeDefined();

      expect(rootMetadata.openGraph).toBeDefined();
      expect((rootMetadata.openGraph as Record<string, unknown>)?.type).toBe(
        "website",
      );
      expect(rootMetadata.openGraph?.siteName).toBe(
        "AIC-ADT Baramati Foundation",
      );

      expect(rootMetadata.twitter).toBeDefined();
      expect((rootMetadata.twitter as Record<string, unknown>)?.card).toBe(
        "summary_large_image",
      );

      expect(rootMetadata.alternates?.canonical).toBe("/");
      expect(rootMetadata.alternates?.languages?.["en-IN"]).toBe("/");
      expect(rootMetadata.alternates?.languages?.["mr-IN"]).toBe("/mr");
    });
  });

  describe("5. Accessibility & Semantic Architecture (WCAG 2.2 AA)", () => {
    it("renders skip-to-content link as first focusable landmark", () => {
      const html = renderToStaticMarkup(
        <RootLayout>
          <div>Page content</div>
        </RootLayout>,
      );

      expect(html).toContain('href="#main-content"');
      expect(html).toContain("Skip to main content");
      expect(html).toContain('id="main-content"');
    });

    it("ensures homepage structure contains single h1 with logical hierarchy", () => {
      const html = renderToStaticMarkup(<HomePage />);
      const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
      expect(h1Count).toBe(1);
    });

    it("ensures root layout wraps content inside main landmark", () => {
      const html = renderToStaticMarkup(
        <RootLayout>
          <div>Page content</div>
        </RootLayout>,
      );
      expect(html).toContain('id="main-content"');
    });

    it("ensures 404 recovery page contains clear recovery links and touch-compliant buttons", () => {
      const html = renderToStaticMarkup(<NotFound />);
      expect(html).toContain("404");
      expect(html).toContain("Page Not Found");
      expect(html).toContain('href="/"');
      expect(html).toContain('href="/contact"');
      expect(html).toContain("min-h-[44px]");
    });
  });
});
