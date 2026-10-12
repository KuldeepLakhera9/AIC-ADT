import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GUIDELINES_LIST } from "@/data/publications";
import { PublicationCard } from "@/components/publications/PublicationCard";

export const metadata: Metadata = {
  title: "Program Guidelines & Scheme Rules | AIC-ADT Baramati Foundation",
  description:
    "Official operational manuals and compliance guidelines for Startup India Seed Fund Scheme (SISFS), MeitY GENESIS, and resident incubation agreements at AIC-ADT.",
};

export default function ProgramGuidelinesPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: "Program Guidelines", href: "/resources/program-guidelines" },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold tracking-wide uppercase border border-[#73992A]/30">
            <span>📜</span>
            <span>Operating Frameworks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
            Program Guidelines &amp; Scheme Manuals
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            Official operating guidelines, statutory compliance requirements,
            milestone tranche schedules, and incubation terms governing all
            supported ventures at AIC-ADT Baramati Foundation.
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
            Program Guidelines
          </span>
          <Link
            href="/programs/apply-instructions"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Application Instructions &amp; Rubric
          </Link>
          <Link
            href="/programs/schemes/startup-india"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            SISFS Scheme Details
          </Link>
        </div>

        {/* Guidelines Grid */}
        <section aria-label="Scheme Operating Guidelines" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {GUIDELINES_LIST.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </section>

        {/* Eligibility & Legal Advisory */}
        <section className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-[#17231D] font-heading">
            Government Compliance &amp; Utilization Certificates
          </h2>
          <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
            All seed disbursements under DPIIT and MeitY schemes require formal
            quarterly milestone reviews and audited Utilization Certificates
            (UC) signed by a practicing Chartered Accountant. Founders are
            encouraged to review the respective operational manual thoroughly
            prior to signing incubation agreements.
          </p>
          <div>
            <Link
              href="/programs/apply-instructions"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004B2A] hover:underline"
            >
              <span>Review 100-Point Evaluation Rubric</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
