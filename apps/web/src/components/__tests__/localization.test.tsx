import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { enDictionary } from "@/lib/i18n/dictionaries/en";
import { mrDictionary } from "@/lib/i18n/dictionaries/mr";
import { getDictionary } from "@/lib/i18n/getDictionary";
import {
  getLocaleFromPath,
  stripLocalePrefix,
  getEquivalentPath,
  isMarathiRouteSupported,
  SUPPORTED_MARATHI_ROUTES,
} from "@/lib/i18n/routes";
import { LanguageSelector } from "../layout/LanguageSelector";
import MarathiLayout from "@/app/mr/layout";
import MarathiHomePage from "@/app/mr/page";
import MarathiAboutPage from "@/app/mr/about/page";
import MarathiProgramsPage from "@/app/mr/programs/page";
import MarathiStartupsPage from "@/app/mr/startups/page";
import MarathiInnovationPage from "@/app/mr/innovation/page";
import MarathiEventsPage from "@/app/mr/events/page";
import MarathiResourcesPage from "@/app/mr/resources/page";
import MarathiContactPage from "@/app/mr/contact/page";

describe("Phase 4 Localization Architecture & Readiness Test Suite", () => {
  describe("1. Dictionary Parity & Type Integrity", () => {
    it("ensures English dictionary contains all required top-level domain sections", () => {
      expect(enDictionary.nav).toBeDefined();
      expect(enDictionary.common).toBeDefined();
      expect(enDictionary.footer).toBeDefined();
      expect(enDictionary.breadcrumbs).toBeDefined();
      expect(enDictionary.a11y).toBeDefined();
      expect(enDictionary.errors).toBeDefined();
      expect(enDictionary.emptyState).toBeDefined();
      expect(enDictionary.advisory).toBeDefined();
      expect(enDictionary.home).toBeDefined();
    });

    it("ensures Marathi dictionary strictly mirrors the English key structure with non-empty values", () => {
      // Nav parity
      const enNavKeys = Object.keys(enDictionary.nav) as Array<
        keyof typeof enDictionary.nav
      >;
      for (const key of enNavKeys) {
        expect(mrDictionary.nav[key]).toBeTruthy();
        expect(typeof mrDictionary.nav[key]).toBe("string");
      }

      // Common UI strings parity
      const enCommonKeys = Object.keys(enDictionary.common) as Array<
        keyof typeof enDictionary.common
      >;
      for (const key of enCommonKeys) {
        expect(mrDictionary.common[key]).toBeTruthy();
        expect(typeof mrDictionary.common[key]).toBe("string");
      }

      // Breadcrumbs parity
      const enBreadcrumbKeys = Object.keys(enDictionary.breadcrumbs) as Array<
        keyof typeof enDictionary.breadcrumbs
      >;
      for (const key of enBreadcrumbKeys) {
        expect(mrDictionary.breadcrumbs[key]).toBeTruthy();
        expect(typeof mrDictionary.breadcrumbs[key]).toBe("string");
      }

      // A11y labels parity
      const enA11yKeys = Object.keys(enDictionary.a11y) as Array<
        keyof typeof enDictionary.a11y
      >;
      for (const key of enA11yKeys) {
        expect(mrDictionary.a11y[key]).toBeTruthy();
        expect(typeof mrDictionary.a11y[key]).toBe("string");
      }

      // Empty states parity
      const enEmptyKeys = Object.keys(enDictionary.emptyState) as Array<
        keyof typeof enDictionary.emptyState
      >;
      for (const key of enEmptyKeys) {
        expect(mrDictionary.emptyState[key]).toBeTruthy();
        expect(typeof mrDictionary.emptyState[key]).toBe("string");
      }

      // Advisory banner parity
      const enAdvisoryKeys = Object.keys(enDictionary.advisory) as Array<
        keyof typeof enDictionary.advisory
      >;
      for (const key of enAdvisoryKeys) {
        expect(mrDictionary.advisory[key]).toBeTruthy();
        expect(typeof mrDictionary.advisory[key]).toBe("string");
      }
    });

    it("retrieves the proper dictionary using getDictionary helper", () => {
      expect(getDictionary("en").nav.about).toBe("About");
      expect(getDictionary("mr").nav.about).toBe("आमच्याबद्दल");
      expect(getDictionary("en").common.learnMore).toBe("Learn More");
      expect(getDictionary("mr").common.learnMore).toBe("अधिक माहिती घ्या");
    });
  });

  describe("2. Route Localization & Path Equivalence Helpers", () => {
    it("identifies locale accurately from pathname", () => {
      expect(getLocaleFromPath("/")).toBe("en");
      expect(getLocaleFromPath("/about")).toBe("en");
      expect(getLocaleFromPath("/programs/agri-incubation")).toBe("en");
      expect(getLocaleFromPath("/mr")).toBe("mr");
      expect(getLocaleFromPath("/mr/")).toBe("mr");
      expect(getLocaleFromPath("/mr/about")).toBe("mr");
      expect(getLocaleFromPath("/mr/contact")).toBe("mr");
    });

    it("strips locale prefix safely to canonical path", () => {
      expect(stripLocalePrefix("/")).toBe("/");
      expect(stripLocalePrefix("/about")).toBe("/about");
      expect(stripLocalePrefix("/mr")).toBe("/");
      expect(stripLocalePrefix("/mr/")).toBe("/");
      expect(stripLocalePrefix("/mr/about")).toBe("/about");
      expect(stripLocalePrefix("/mr/startups")).toBe("/startups");
    });

    it("translates canonical routes between English and Marathi symmetrically", () => {
      // English to Marathi
      expect(getEquivalentPath("/", "mr")).toBe("/mr");
      expect(getEquivalentPath("/about", "mr")).toBe("/mr/about");
      expect(getEquivalentPath("/programs", "mr")).toBe("/mr/programs");
      expect(getEquivalentPath("/startups", "mr")).toBe("/mr/startups");
      expect(getEquivalentPath("/innovation", "mr")).toBe("/mr/innovation");
      expect(getEquivalentPath("/events", "mr")).toBe("/mr/events");
      expect(getEquivalentPath("/resources", "mr")).toBe("/mr/resources");
      expect(getEquivalentPath("/contact", "mr")).toBe("/mr/contact");

      // Marathi to English
      expect(getEquivalentPath("/mr", "en")).toBe("/");
      expect(getEquivalentPath("/mr/about", "en")).toBe("/about");
      expect(getEquivalentPath("/mr/programs", "en")).toBe("/programs");
      expect(getEquivalentPath("/mr/contact", "en")).toBe("/contact");
    });

    it("handles unmirrored sub-routes gracefully with canonical parent fallback", () => {
      // Subpage not yet translated should fallback to nearest parent hub or /mr
      expect(getEquivalentPath("/about/governance", "mr")).toBe("/mr/about");
      expect(getEquivalentPath("/programs/detail", "mr")).toBe("/mr/programs");
      expect(getEquivalentPath("/contact/directions", "mr")).toBe(
        "/mr/contact",
      );
      expect(getEquivalentPath("/unknown/subpage", "mr")).toBe("/mr");
    });

    it("verifies all approved high-level institutional pillars are supported in Marathi", () => {
      const pillars = [
        "/",
        "/about",
        "/programs",
        "/startups",
        "/innovation",
        "/events",
        "/resources",
        "/contact",
      ];
      for (const pillar of pillars) {
        expect(isMarathiRouteSupported(pillar)).toBe(true);
        expect(SUPPORTED_MARATHI_ROUTES.includes(pillar)).toBe(true);
      }
    });
  });

  describe("3. LanguageSelector UI & Accessibility", () => {
    it("renders the language selector with both English and Marathi links", () => {
      const html = renderToStaticMarkup(
        <LanguageSelector currentLocale="en" currentPath="/" />,
      );
      expect(html).toContain("EN");
      expect(html).toContain("मराठी");
      expect(html).toContain('href="/"');
      expect(html).toContain('href="/mr"');
      expect(html).toContain('role="group"');
      expect(html).toContain('aria-label="Language options"');
    });

    it("marks active language with aria-current in English mode", () => {
      const html = renderToStaticMarkup(
        <LanguageSelector currentLocale="en" currentPath="/about" />,
      );
      expect(html).toContain('aria-current="true"');
      expect(html).toContain('href="/mr/about"');
    });

    it("marks active language with aria-current in Marathi mode", () => {
      const html = renderToStaticMarkup(
        <LanguageSelector currentLocale="mr" currentPath="/mr/about" />,
      );
      expect(html).toContain('aria-current="true"');
      expect(html).toContain('href="/about"');
    });

    it("renders with compact mobile variant without breaking markup", () => {
      const html = renderToStaticMarkup(
        <LanguageSelector
          currentLocale="mr"
          currentPath="/mr"
          variant="drawer"
        />,
      );
      expect(html).toContain("मराठी");
      expect(html).toContain("English");
    });
  });

  describe("4. Marathi Layout & Devanagari Typography", () => {
    it("renders Marathi layout with Devanagari font class and institutional review advisory", () => {
      const html = renderToStaticMarkup(
        <MarathiLayout>
          <div>सामग्री चाचणी</div>
        </MarathiLayout>,
      );
      expect(html).toContain('lang="mr"');
      expect(html).toContain("font-devanagari");
      expect(html).toContain("अधिकृत सूचना:");
      expect(html).toContain("संपादकीय पुनरावलोकन प्रक्रियेत");
      expect(html).toContain("View Authoritative English Site");
      expect(html).toContain("सामग्री चाचणी");
    });
  });

  describe("5. Mirrored Marathi Route Pages Rendering", () => {
    it("renders Marathi Homepage with verified headlines, impact metrics, and pillar cards", () => {
      const html = renderToStaticMarkup(<MarathiHomePage />);
      expect(html).toContain(
        "कृषी-जैवतंत्रज्ञान आणि नवउद्योगांच्या माध्यमातून आधुनिक कृषी क्रांतीची निर्मिती",
      );
      expect(html).toContain("अटल इनोव्हेशन मिशन");
      expect(html).toContain("११०-एकर प्रत्यक्ष प्रात्यक्षिक शेत");
      expect(html).toContain("प्रयोगशाळा ते प्रत्यक्ष शेत");
      expect(html).toContain("शासकीय बीजभांडवल योजना");
    });

    it("renders Marathi About Page with Devanagari title and breadcrumbs", () => {
      const html = renderToStaticMarkup(<MarathiAboutPage />);
      expect(html).toContain("एआयसी-एडीटी बारामती फाउंडेशन");
      expect(html).toContain("संस्थात्मक ओळख आणि वारसा");
      expect(html).toContain("मुख्यपृष्ठ");
      expect(html).toContain("आमच्याबद्दल");
    });

    it("renders Marathi Programs Page with program continuum and funding schemes", () => {
      const html = renderToStaticMarkup(<MarathiProgramsPage />);
      expect(html).toContain("इनक्युबेशन कार्यक्रम आणि बीजभांडवल योजना");
      expect(html).toContain("स्टार्टअप इंडिया सीड फंड");
      expect(html).toContain("मेईटी जेनेसिस");
      expect(html).toContain("मुख्यपृष्ठ");
    });

    it("renders Marathi Startups Page with ecosystem filters and directory", () => {
      const html = renderToStaticMarkup(<MarathiStartupsPage />);
      expect(html).toContain("इनक्युबेटेड स्टार्टअप्स निर्देशिका");
      expect(html).toContain("ग्रामहीट");
      expect(html).toContain("इनोसेपियन");
      expect(html).toContain("बायोप्राइम");
    });

    it("renders Marathi Innovation Page with 6 core research domains", () => {
      const html = renderToStaticMarkup(<MarathiInnovationPage />);
      expect(html).toContain("कृषी नवसंशोधन आणि तंत्रज्ञान");
      expect(html).toContain("कृषी तंत्रज्ञान आणि यांत्रिकीकरण");
      expect(html).toContain("स्मार्ट शेती आणि आयओटी सेन्सर्स");
      expect(html).toContain("अन्न प्रक्रिया आणि भरडधान्ये");
    });

    it("renders Marathi Events Page with workshops and calendar", () => {
      const html = renderToStaticMarkup(<MarathiEventsPage />);
      expect(html).toContain("कार्यक्रमांची दिनदर्शिका व कार्यशाळा");
      expect(html).toContain("स्टार्टअप इंडिया सीड फंड");
      expect(html).toContain("भरडधान्य (Millet) मूल्यवर्धन");
    });

    it("renders Marathi Resources Page with publications and compliance hub", () => {
      const html = renderToStaticMarkup(<MarathiResourcesPage />);
      expect(html).toContain("संस्थात्मक साधने, अहवाल व धोरणे");
      expect(html).toContain("वार्षिक प्रगती अहवाल");
      expect(html).toContain("संशोधन श्वेतपत्रिका");
      expect(html).toContain("धोरणे व प्रकटीकरण");
    });

    it("renders Marathi Contact Page with verified headquarters and helplines", () => {
      const html = renderToStaticMarkup(<MarathiContactPage />);
      expect(html).toContain("एआयसी-एडीटी बारामतीशी संपर्क साधा");
      expect(html).toContain("संकुल मुख्यालय");
      expect(html).toContain("अधिकृत हेल्पलाइन");
      expect(html).toContain("संस्थात्मक ईमेल");
      expect(html).toContain("02112 255517");
      expect(html).toContain("info@aicadt.com");
    });
  });
});
