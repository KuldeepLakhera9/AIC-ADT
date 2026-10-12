import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { SCHEMES_DATA } from "@/data/programs";

export const metadata: Metadata = {
  title: "Corporate CSR Innovation Partnerships | AIC-ADT Baramati Foundation",
  description:
    "Explore catalytic CSR innovation grants from Capgemini India, HDFC Bank Parivartan, and ED&F Man Commodities at AIC-ADT Baramati.",
};

export default function CsrSchemesPage() {
  const scheme = SCHEMES_DATA.find((s) => s.slug === "csr");

  if (!scheme) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        badge={scheme.badge}
        badgeVariant="botanical"
        title={scheme.name}
        description={scheme.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
          { label: "Corporate CSR", href: "/programs/schemes/csr" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              Partner With Us for CSR →
            </Link>
            <Link
              href="/about/partners"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              All Corporate Partners
            </Link>
          </div>
        }
      />

      {/* Snapshot */}
      <section className="bg-white py-8 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
                Corporate Donors
              </span>
              <div className="text-sm font-bold text-[#17231D] mt-1">
                Capgemini, HDFC Bank, ED&amp;F Man
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
                Grant Scope
              </span>
              <div className="text-sm font-bold text-[#004B2A] mt-1">
                {scheme.grantCap}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
                Program Mandate
              </span>
              <div className="text-sm font-bold text-[#73992A] mt-1">
                {scheme.supportedStartupsCount}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mechanisms & Eligibility */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Section 135 Mandate
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
                Directing Statutory CSR into Rural Tech Solutions
              </h2>
              <ul className="space-y-3.5 text-xs sm:text-sm text-[#59665D]">
                {scheme.fundingMechanism.map((mech, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#004B2A] font-bold text-base">
                      ✓
                    </span>
                    <span className="leading-relaxed">{mech}</span>
                  </li>
                ))}
              </ul>

              <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#59665D]">
                  Thematic Challenges
                </span>
                <p className="text-xs text-[#647067] leading-relaxed">
                  {scheme.applicationNote}
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] space-y-6 shadow-2xs">
              <h3 className="text-xl font-bold text-[#17231D] font-heading">
                Eligibility &amp; Social Metrics
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#59665D]">
                {scheme.eligibilityCriteria.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#73992A] font-bold text-base">
                      •
                    </span>
                    <span className="leading-relaxed">{crit}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-[#EAEFE8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#004B2A] mb-3">
                  Verification Tranches
                </h4>
                <ul className="space-y-2 text-xs text-[#17231D]">
                  {scheme.disbursementMilestones.map((tranche, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-[#73992A]">•</span>
                      <span>{tranche}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Beneficiary */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20">
        <Container>
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
              Featured CSR Innovation Beneficiary
            </h2>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#DDE5DC] shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge variant="botanical">
                  {scheme.featuredCaseStudy.sector}
                </Badge>
                <span className="text-xs font-bold text-[#59665D]">
                  Founders: {scheme.featuredCaseStudy.founderNames}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#17231D] font-heading">
                {scheme.featuredCaseStudy.startupName}
              </h3>
              <p className="text-sm font-semibold text-[#004B2A]">
                {scheme.featuredCaseStudy.impactHeadline}
              </p>
              <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                {scheme.featuredCaseStudy.description}
              </p>
            </div>

            <Link
              href={`/startups/${scheme.featuredCaseStudy.slug}`}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors shrink-0 min-h-[44px]"
            >
              View Full Profile →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
