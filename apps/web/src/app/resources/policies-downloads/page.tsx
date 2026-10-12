import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { POLICIES_LIST } from "@/data/publications";
import { PublicationCard } from "@/components/publications/PublicationCard";

export const metadata: Metadata = {
  title: "Policies, RTI Disclosures & Downloads | AIC-ADT Baramati Foundation",
  description:
    "Statutory governance policies, POSH Internal Complaints Committee, voluntary RTI Section 4 disclosures, and official media brand kit of AIC-ADT Baramati Foundation.",
};

export default function PoliciesDownloadsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: "Policies & Downloads", href: "/resources/policies-downloads" },
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
            <span>Statutory Governance &amp; Media Assets</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
            Policies, RTI Disclosures &amp; Brand Assets
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            Institutional governance mandates, workplace safety protocols
            (POSH), proactive Right to Information (RTI) disclosures, and
            high-resolution vector brand assets for partners and media
            publications.
          </p>
        </header>

        {/* Quick Legal Switchers */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Link
            href="/resources"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            ← Resources Hub
          </Link>
          <span className="px-4 py-2 rounded-lg bg-[#004B2A] text-white font-bold shadow-2xs">
            Policies &amp; Downloads
          </span>
          <Link
            href="/privacy-policy"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Terms of Use
          </Link>
        </div>

        {/* Policies & Brand Downloads Grid */}
        <section
          aria-label="Policies and Media Kit Documents"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {POLICIES_LIST.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </section>

        {/* Statutory Disclosures Informational Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-[#DDE5DC] p-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">
                🛡️
              </span>
              <h2 className="text-base font-bold text-[#17231D] font-heading">
                Workplace Safety &amp; POSH Cell
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
              In accordance with the Sexual Harassment of Women at Workplace
              (Prevention, Prohibition and Redressal) Act, 2013, the AIC-ADT
              Foundation maintains an active Internal Complaints Committee
              (ICC). All resident founders, interns, and employees may submit
              confidential grievances to{" "}
              <a
                href="mailto:aicadt@adtbaramati.com"
                className="text-[#004B2A] font-semibold hover:underline"
              >
                aicadt@adtbaramati.com
              </a>
              .
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#DDE5DC] p-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">
                🏛️
              </span>
              <h2 className="text-base font-bold text-[#17231D] font-heading">
                Right to Information (RTI) Transparency
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
              As a Section 8 non-profit company supported by public funds from
              NITI Aayog (Atal Innovation Mission) and Ministry of Electronics
              &amp; IT (MeitY), AIC-ADT proactively discloses institutional
              governance, grant disbursement criteria, and audited accounts
              under Section 4(1)(b) transparency principles.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
