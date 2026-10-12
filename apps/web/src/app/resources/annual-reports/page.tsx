import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ANNUAL_REPORTS_LIST } from "@/data/publications";
import { PublicationCard } from "@/components/publications/PublicationCard";

export const metadata: Metadata = {
  title: "Annual Progress Reports | AIC-ADT Baramati Foundation",
  description:
    "Official institutional annual progress reports and statutory disclosures of AIC-ADT Baramati Foundation submitted to Atal Innovation Mission and NITI Aayog.",
};

export default function AnnualReportsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: "Annual Reports", href: "/resources/annual-reports" },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold tracking-wide uppercase border border-[#73992A]/30">
            <span>📊</span>
            <span>Statutory Disclosures</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
            Annual Progress Reports
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            Statutory annual disclosures detailing incubated venture milestones,
            seed capital disbursements, laboratory testing throughput, and
            compliance metrics submitted to the Atal Innovation Mission, NITI
            Aayog.
          </p>
        </header>

        {/* Navigation Switchers */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Link
            href="/resources"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            ← Resources Hub
          </Link>
          <span className="px-4 py-2 rounded-lg bg-[#004B2A] text-white font-bold shadow-2xs">
            Annual Reports
          </span>
          <Link
            href="/resources/publications"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Research Whitepapers
          </Link>
          <Link
            href="/resources/program-guidelines"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Program Guidelines
          </Link>
        </div>

        {/* Publication Cards Grid */}
        <section aria-label="Annual Reports Listing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ANNUAL_REPORTS_LIST.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </section>

        {/* Archival Request Notice */}
        <section className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-[#17231D] font-heading">
            Archival Records &amp; Physical Inspection
          </h2>
          <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
            Hard-copy audited financial statements and annual filings prior to
            FY 2024–25 are archived in the AIC-ADT Foundation Secretariat at
            Sharadanagar, Baramati. Institutional partners, government auditors,
            and research scholars may inspect historical records by contacting
            the Secretariat.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004B2A] hover:underline"
            >
              <span>Contact Secretariat Desk</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
