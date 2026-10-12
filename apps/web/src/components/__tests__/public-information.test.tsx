import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import EventsPage from "@/app/events/page";
import EventDetailPage, {
  generateStaticParams as generateEventStaticParams,
} from "@/app/events/[slug]/page";
import PastEventsPage from "@/app/events/past/page";
import ResourcesPage from "@/app/resources/page";
import AnnualReportsPage from "@/app/resources/annual-reports/page";
import PublicationsPage from "@/app/resources/publications/page";
import ProgramGuidelinesPage from "@/app/resources/program-guidelines/page";
import PoliciesDownloadsPage from "@/app/resources/policies-downloads/page";
import NewsPage from "@/app/news/page";
import NewsDetailPage, {
  generateStaticParams as generateNewsStaticParams,
} from "@/app/news/[slug]/page";
import ContactPage from "@/app/contact/page";
import PartnershipsContactPage from "@/app/contact/partnerships/page";
import DirectionsPage from "@/app/contact/directions/page";
import PrivacyPolicyPage from "@/app/privacy-policy/page";
import TermsOfServicePage from "@/app/terms-of-service/page";
import NotFound from "@/app/not-found";
import { EVENTS_DATA } from "@/data/events";
import { PUBLICATIONS_DATA } from "@/data/publications";
import { NEWS_ARTICLES } from "@/data/news";
import { CAMPUS_HEADQUARTERS } from "@/data/contact";
import { EventCard } from "@/components/events/EventCard";
import { PublicationCard } from "@/components/publications/PublicationCard";
import { NewsCard } from "@/components/news/NewsCard";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/'/g, "&#x27;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

describe("Phase 4 — Task 6: Public Information, Events, Reports & Contact QA Suite", () => {
  /* -------------------------------------------------------------------------- */
  /* 1. Events Pillar Tests                                                     */
  /* -------------------------------------------------------------------------- */
  describe("Events & Masterclasses", () => {
    it("renders events overview page with header, breadcrumbs, and filter client", async () => {
      const html = renderToStaticMarkup(await EventsPage());
      expect(html).toContain("Workshops, Demo Days &amp; Intake Deadlines");
      expect(html).toContain("Ecosystem Calendar");
      expect(html).toContain('href="/events/past"');
      expect(html).toContain('href="/programs/training"');
      expect(html).toContain("Official Event Registration Notice");
    });

    it("renders EventCard with date box, category, and verified status", () => {
      const sampleEvent = EVENTS_DATA[0];
      const html = renderToStaticMarkup(<EventCard event={sampleEvent} />);

      expect(html).toContain(escapeHtml(sampleEvent.title));
      expect(html).toContain(sampleEvent.date.day);
      expect(html).toContain(sampleEvent.date.month);
      expect(html).toContain(sampleEvent.category);
      expect(html).toContain(`href="/events/${sampleEvent.slug}"`);
    });

    it("returns static params for all verified events", async () => {
      const params = await generateEventStaticParams();
      expect(params.length).toBe(EVENTS_DATA.length);
      expect(params.map((p) => p.slug)).toContain("sisfs-cohort-4");
      expect(params.map((p) => p.slug)).toContain("millet-processing-workshop");
      expect(params.map((p) => p.slug)).toContain("agri-robotics-demo-day");
    });

    it("renders EventDetailPage with full agenda, audience, and registration destination", async () => {
      const html = renderToStaticMarkup(
        await EventDetailPage({
          params: Promise.resolve({ slug: "sisfs-cohort-4" }),
        }),
      );

      expect(html).toContain("Startup India Seed Fund");
      expect(html).toContain("Program Overview &amp; Scope");
      expect(html).toContain("Key Agenda &amp; Program Highlights");
      expect(html).toContain("Intended Participants &amp; Eligibility");
      expect(html).toContain("seedfund.startupindia.gov.in");
    });

    it("renders PastEventsPage with historical records archive", () => {
      const html = renderToStaticMarkup(<PastEventsPage />);
      expect(html).toContain("Concluded Events &amp; Training Records");
      expect(html).toContain("Historical Institutional Archive");
      expect(html).toContain('href="/events"');
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 2. Resources & Publications Pillar Tests                                   */
  /* -------------------------------------------------------------------------- */
  describe("Resources & Publications", () => {
    it("renders Resources Hub overview with 4 pillar cards and master search", () => {
      const html = renderToStaticMarkup(<ResourcesPage />);
      expect(html).toContain(
        "Institutional Reports, Guidelines &amp; Policies",
      );
      expect(html).toContain("Annual Progress Reports");
      expect(html).toContain("Research Whitepapers");
      expect(html).toContain("Scheme Guidelines");
      expect(html).toContain("Policies &amp; Disclosures");
      expect(html).toContain('href="/resources/annual-reports"');
      expect(html).toContain('href="/resources/publications"');
      expect(html).toContain('href="/resources/program-guidelines"');
      expect(html).toContain('href="/resources/policies-downloads"');
    });

    it("renders PublicationCard with verified download file meta and badge", () => {
      const samplePub = PUBLICATIONS_DATA[0];
      const html = renderToStaticMarkup(
        <PublicationCard publication={samplePub} />,
      );

      expect(html).toContain(escapeHtml(samplePub.title));
      expect(html).toContain(samplePub.category);
      expect(html).toContain(samplePub.file.fileType);
      expect(html).toContain(samplePub.file.fileSize);
      expect(html).toContain(escapeHtml(samplePub.verificationBadge));
      expect(html).toContain(samplePub.file.url);
    });

    it("renders AnnualReportsPage with audited annual reports", () => {
      const html = renderToStaticMarkup(<AnnualReportsPage />);
      expect(html).toContain("Annual Progress Reports");
      expect(html).toContain("Statutory Disclosures");
      expect(html).toContain("AIC-ADT-Annual-Report-FY2024-25-Sample.pdf");
      expect(html).toContain("Archival Records &amp; Physical Inspection");
    });

    it("renders PublicationsPage with applied research whitepapers", () => {
      const html = renderToStaticMarkup(<PublicationsPage />);
      expect(html).toContain("Research Whitepapers &amp; Monographs");
      expect(html).toContain("AIC-ADT-AgriTech-Whitepaper-Sample.pdf");
      expect(html).toContain("Call for Collaborative Applied Research");
    });

    it("renders ProgramGuidelinesPage with scheme operating manuals", () => {
      const html = renderToStaticMarkup(<ProgramGuidelinesPage />);
      expect(html).toContain("Program Guidelines &amp; Scheme Manuals");
      expect(html).toContain("SISFS-Incubation-Scheme-Guidelines-Sample.pdf");
      expect(html).toContain(
        "Government Compliance &amp; Utilization Certificates",
      );
    });

    it("renders PoliciesDownloadsPage with statutory RTI and POSH disclosures", () => {
      const html = renderToStaticMarkup(<PoliciesDownloadsPage />);
      expect(html).toContain("Policies, RTI Disclosures &amp; Brand Assets");
      expect(html).toContain("Workplace Safety &amp; POSH Cell");
      expect(html).toContain("Right to Information (RTI) Transparency");
      expect(html).toContain('href="/privacy-policy"');
      expect(html).toContain('href="/terms-of-service"');
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 3. News & Announcements Tests                                              */
  /* -------------------------------------------------------------------------- */
  describe("News & Press Releases", () => {
    it("renders NewsPage with releases listing and media inquiry protocol", async () => {
      const html = renderToStaticMarkup(await NewsPage());
      expect(html).toContain("News &amp; Official Announcements");
      expect(html).toContain("Official Communications Cell");
      expect(html).toContain("Media &amp; Press Inquiry Protocol");
      expect(html).toContain('href="/events"');
    });

    it("renders NewsCard with headline, category, and source attribution", () => {
      const sampleNews = NEWS_ARTICLES[0];
      const html = renderToStaticMarkup(<NewsCard article={sampleNews} />);

      expect(html).toContain(escapeHtml(sampleNews.headline));
      expect(html).toContain(sampleNews.category);
      expect(html).toContain(escapeHtml(sampleNews.sourceAttribution));
      expect(html).toContain(`href="/news/${sampleNews.slug}"`);
    });

    it("returns static params for all verified news releases", async () => {
      const params = await generateNewsStaticParams();
      expect(params.length).toBe(NEWS_ARTICLES.length);
      expect(params.map((p) => p.slug)).toContain(
        "sisfs-cohort-4-announcement",
      );
      expect(params.map((p) => p.slug)).toContain(
        "nabl-analytical-testing-scope",
      );
    });

    it("renders NewsDetailPage with editorial body, key facts, and provenance notice", async () => {
      const html = renderToStaticMarkup(
        await NewsDetailPage({
          params: Promise.resolve({ slug: "sisfs-cohort-4-announcement" }),
        }),
      );

      expect(html).toContain(
        "Opens National Call for Startup India Seed Fund Scheme",
      );
      expect(html).toContain("Verification &amp; Provenance");
      expect(html).toContain("Official Portal Reference");
      expect(html).toContain("seedfund.startupindia.gov.in");
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 4. Contact & Transit Navigation Tests                                      */
  /* -------------------------------------------------------------------------- */
  describe("Contact & Transit Wayfinding", () => {
    it("renders ContactPage with official phone numbers, email, and address", () => {
      const html = renderToStaticMarkup(<ContactPage />);
      expect(html).toContain("Connect with AIC-ADT Baramati");
      expect(html).toContain(CAMPUS_HEADQUARTERS.address.pincode);
      expect(html).toContain(CAMPUS_HEADQUARTERS.helplines.incubationMobile);
      expect(html).toContain(CAMPUS_HEADQUARTERS.helplines.landlinePrimary);
      expect(html).toContain(CAMPUS_HEADQUARTERS.emails.general);
      expect(html).toContain("Specialized Department Desks");
      expect(html).toContain(
        "Direct Communication &amp; Verification Protocol",
      );
    });

    it("renders PartnershipsContactPage with 4 CSR and research partnership tracks", () => {
      const html = renderToStaticMarkup(<PartnershipsContactPage />);
      expect(html).toContain("Corporate CSR &amp; Partnership Desk");
      expect(html).toContain("Corporate CSR Partnerships (Section 135)");
      expect(html).toContain("Academic &amp; ICAR Research MoUs");
      expect(html).toContain("Venture Capital &amp; Angel Syndicates");
      expect(html).toContain("Mentor Empanelment Network");
    });

    it("renders DirectionsPage with transit instructions for Air, Rail, and Road", () => {
      const html = renderToStaticMarkup(<DirectionsPage />);
      expect(html).toContain("How to Reach AIC-ADT Baramati");
      expect(html).toContain("Sharadanagar Campus, Baramati");
      expect(html).toContain("Pune International Airport");
      expect(html).toContain("Daund Railway Junction");
      expect(html).toContain("Baramati MSRTC Central Bus Station");
      expect(html).toContain("Visitor Security &amp; Campus Protocol");
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 5. Legal & Error State Tests                                               */
  /* -------------------------------------------------------------------------- */
  describe("Legal & Error Pages", () => {
    it("renders PrivacyPolicyPage with DPDP Act 2023 alignment and Grievance Officer", () => {
      const html = renderToStaticMarkup(<PrivacyPolicyPage />);
      expect(html).toContain("Institutional Privacy Policy");
      expect(html).toContain("Categories of Information Collected");
      expect(html).toContain("Technical Server Logs");
      expect(html).toContain("Data Retention &amp; Non-Commercialization");
      expect(html).toContain("Grievance Officer &amp; Redressal");
      expect(html).toContain(CAMPUS_HEADQUARTERS.emails.general);
    });

    it("renders TermsOfServicePage with intellectual property disclaimers", () => {
      const html = renderToStaticMarkup(<TermsOfServicePage />);
      expect(html).toContain("Terms of Website Usage");
      expect(html).toContain(
        "Intellectual Property &amp; Trademark Protection",
      );
      expect(html).toContain("Permitted Usage &amp; Academic Citation");
      expect(html).toContain("Baramati / Pune, Maharashtra");
    });

    it("renders NotFound page with recovery links across all institutional pillars", () => {
      const html = renderToStaticMarkup(<NotFound />);
      expect(html).toContain("404");
      expect(html).toContain("Page Not Found");
      expect(html).toContain("Return to Overview");
      expect(html).toContain('href="/"');
      expect(html).toContain('href="/programs"');
      expect(html).toContain('href="/events"');
      expect(html).toContain('href="/resources"');
      expect(html).toContain('href="/contact"');
    });
  });
});
