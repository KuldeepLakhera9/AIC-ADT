import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CAMPUS_HEADQUARTERS } from "@/data/contact";

export const metadata: Metadata = {
  title: "Privacy Policy | AIC-ADT Baramati Foundation",
  description:
    "Institutional privacy policy governing personal data collection, processing, and security practices of AIC-ADT Baramati Foundation under applicable Indian laws.",
};

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold tracking-wide uppercase border border-[#73992A]/30">
            <span>🛡️</span>
            <span>Institutional Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
            Institutional Privacy Policy
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            Effective Date: October 2026 • Governing Body: AIC-ADT Baramati
            Foundation (CIN: U74999PN2019NPL184742)
          </p>
        </header>

        {/* Quick Policy Switchers */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-4 py-2 rounded-lg bg-[#004B2A] text-white font-bold shadow-2xs">
            Privacy Policy
          </span>
          <Link
            href="/terms-of-service"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Terms of Use
          </Link>
          <Link
            href="/resources/policies-downloads"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Statutory Disclosures &amp; RTI
          </Link>
        </div>

        {/* Main Policy Content */}
        <article className="bg-white rounded-2xl border border-[#DDE5DC] p-6 sm:p-10 space-y-8 text-sm sm:text-base text-[#17231D] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              1. Institutional Scope &amp; Legal Entity
            </h2>
            <p className="text-[#59665D]">
              This Privacy Policy explains how{" "}
              <strong>AIC-ADT Baramati Foundation</strong>{" "}
              (&quot;Foundation&quot;, &quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;), a Section 8 not-for-profit company incorporated
              under the Companies Act, 2013 and hosted by the Agricultural
              Development Trust (ADT) Baramati, collects, handles, and protects
              personal data obtained through this official website and
              affiliated incubation intake systems.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              2. Categories of Information Collected
            </h2>
            <p className="text-[#59665D]">
              We limit data collection to that which is strictly necessary for
              legitimate incubation operations, statutory reporting, and public
              communication:
            </p>
            <ul className="space-y-2 text-[#59665D] list-disc pl-5 text-sm">
              <li>
                <strong>Technical Server Logs:</strong> Standard web server
                connection logs, including IP address, browser user-agent,
                requested resource URLs, and timestamp records for server
                diagnostics, network isolation, and DDoS protection.
              </li>
              <li>
                <strong>Voluntary Communications:</strong> Contact details (such
                as name, email address, telephone number, organization)
                voluntarily provided when transmitting electronic mail to our
                published desks.
              </li>
              <li>
                <strong>Startup &amp; Program Applications:</strong> Applicant
                founder identities, educational credentials, patent records, and
                business proposals submitted during incubation rounds (handled
                pursuant to confidential evaluation protocols).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              3. Purpose of Processing
            </h2>
            <p className="text-[#59665D]">
              Collected personal and institutional data is processed exclusively
              for:
            </p>
            <ul className="space-y-2 text-[#59665D] list-disc pl-5 text-sm">
              <li>
                Evaluating eligibility and scoring proposals for incubation,
                pre-incubation, and government seed capital grants (DPIIT SISFS,
                MeitY GENESIS).
              </li>
              <li>
                Fulfilling statutory compliance and audit reporting to the Atal
                Innovation Mission (AIM), NITI Aayog, Government of India.
              </li>
              <li>
                Responding to public inquiries, research collaboration requests,
                and lab testing bookings.
              </li>
              <li>
                Maintaining the technical security and integrity of our campus
                web servers.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              4. Data Retention &amp; Non-Commercialization
            </h2>
            <p className="text-[#59665D]">
              <strong>
                We do not sell, rent, commercialize, or trade personal data
              </strong>{" "}
              to third-party marketing agencies or external data brokers under
              any circumstances. Information is shared only with certified
              government authorities (such as NITI Aayog or DPIIT) where
              required by official grant sanction terms, or with independent
              evaluators bound by non-disclosure agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              5. Infrastructure Security Baseline
            </h2>
            <p className="text-[#59665D]">
              In accordance with institutional security guidelines (SEC-BAS-03),
              our production systems operate on local data-center infrastructure
              with loopback-only service bindings, isolated VLANs, encrypted TLS
              transmission, and strict role-based access controls to prevent
              unauthorized access or data breaches.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              6. Grievance Officer &amp; Redressal
            </h2>
            <p className="text-[#59665D]">
              Pursuant to the Information Technology Act, 2000 and the Digital
              Personal Data Protection (DPDP) Act, 2023, questions, requests for
              data correction, or privacy grievances may be directed to our
              designated Institutional Secretariat:
            </p>
            <div className="bg-[#F8FAF7] p-5 rounded-xl border border-[#DDE5DC] text-xs sm:text-sm space-y-1">
              <strong className="text-[#17231D] block font-bold">
                Grievance &amp; Compliance Cell
              </strong>
              <span>AIC-ADT Baramati Foundation</span>
              <br />
              <span>
                Sharadanagar, Post Box No. 35, Baramati, Pune, Maharashtra –
                413115
              </span>
              <br />
              <span>Official Email: </span>
              <a
                href={`mailto:${CAMPUS_HEADQUARTERS.emails.general}?subject=Privacy%20Grievance`}
                className="text-[#004B2A] font-bold hover:underline"
              >
                {CAMPUS_HEADQUARTERS.emails.general}
              </a>
              <br />
              <span>
                Telephone: {CAMPUS_HEADQUARTERS.helplines.landlinePrimary}
              </span>
            </div>
          </section>
        </article>
      </Container>
    </div>
  );
}
