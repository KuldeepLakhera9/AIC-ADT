import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CAMPUS_HEADQUARTERS } from "@/data/contact";

export const metadata: Metadata = {
  title: "Terms of Use | AIC-ADT Baramati Foundation",
  description:
    "Terms and conditions governing the access, document citation, and usage of the official digital portal of AIC-ADT Baramati Foundation.",
};

export default function TermsOfServicePage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Terms of Use", href: "/terms-of-service" },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold tracking-wide uppercase border border-[#73992A]/30">
            <span>⚖️</span>
            <span>Legal Framework</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
            Terms of Website Usage
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            Effective Date: October 2026 • Published by AIC-ADT Baramati
            Foundation
          </p>
        </header>

        {/* Quick Legal Switchers */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Link
            href="/privacy-policy"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="px-4 py-2 rounded-lg bg-[#004B2A] text-white font-bold shadow-2xs">
            Terms of Use
          </span>
          <Link
            href="/resources/policies-downloads"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Statutory Disclosures &amp; RTI
          </Link>
        </div>

        {/* Main Content */}
        <article className="bg-white rounded-2xl border border-[#DDE5DC] p-6 sm:p-10 space-y-8 text-sm sm:text-base text-[#17231D] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              1. Acceptance of Terms
            </h2>
            <p className="text-[#59665D]">
              By accessing, browsing, or downloading publications from the
              official website of <strong>AIC-ADT Baramati Foundation</strong>,
              you agree to comply with and be bound by these Terms of Use. If
              you do not agree with these terms, please discontinue use of this
              site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              2. Intellectual Property &amp; Trademark Protection
            </h2>
            <p className="text-[#59665D]">
              The trademarks, service marks, insignia, curricula, and official
              logos of the Agricultural Development Trust (ADT) and AIC-ADT
              Baramati Foundation are proprietary assets protected under Indian
              intellectual property laws. The historical or incorrect
              abbreviation &quot;AIC-DBT&quot; is strictly disclaimed and
              deprecated. Unauthorized reproduction of institutional insignia is
              prohibited without express written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              3. Permitted Usage &amp; Academic Citation
            </h2>
            <p className="text-[#59665D]">
              Downloadable public publications, research whitepapers, and annual
              reports hosted on this platform may be utilized for academic
              research, education, and policy analysis, provided that proper
              source attribution is given:
            </p>
            <div className="bg-[#F8FAF7] p-4 rounded-xl border border-[#DDE5DC] text-xs sm:text-sm italic text-[#59665D]">
              Citation Format: &quot;AIC-ADT Baramati Foundation, [Document
              Title], Published at Sharadanagar, Baramati (2026).&quot;
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              4. External Portals &amp; Third-Party Services
            </h2>
            <p className="text-[#59665D]">
              This website provides authoritative hyperlinks to external
              government portals (including Startup India Seed Fund portal,
              MeitY Startup Hub, and NITI Aayog). The Foundation is not
              responsible for the independent privacy practices, uptime, or
              technical content of third-party domains.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              5. Disclaimers &amp; Limitation of Liability
            </h2>
            <p className="text-[#59665D]">
              While every effort is made to maintain factual accuracy across all
              published records, information is provided on an &quot;as-is&quot;
              basis. Application to incubation programs or government schemes
              does not guarantee selection or grant disbursement, which remains
              contingent upon independent evaluation committee approvals and
              government sanctions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              6. Governing Law &amp; Jurisdiction
            </h2>
            <p className="text-[#59665D]">
              These terms shall be governed by and construed in accordance with
              the laws of the Republic of India. Any legal dispute arising out
              of website use shall be subject to the exclusive jurisdiction of
              the competent courts in{" "}
              <strong>Baramati / Pune, Maharashtra</strong>.
            </p>
            <div className="pt-2 text-xs text-[#59665D]">
              <span>Secretariat Inquiries: </span>
              <a
                href={`mailto:${CAMPUS_HEADQUARTERS.emails.general}`}
                className="text-[#004B2A] font-semibold hover:underline"
              >
                {CAMPUS_HEADQUARTERS.emails.general}
              </a>
            </div>
          </section>
        </article>
      </Container>
    </div>
  );
}
