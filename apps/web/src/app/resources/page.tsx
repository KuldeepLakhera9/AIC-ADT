import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PUBLICATIONS_DATA } from "@/data/publications";
import { PublicationFilterClient } from "@/components/publications/PublicationFilterClient";

export const metadata: Metadata = {
  title: "Resources Hub & Publications | AIC-ADT Baramati Foundation",
  description:
    "Official institutional knowledge repository of AIC-ADT Baramati Foundation: annual progress reports, research whitepapers, scheme guidelines, and statutory RTI disclosures.",
};

export default function ResourcesPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Resources & Documents", href: "/resources" },
  ];

  const resourcePillars = [
    {
      title: "Annual Progress Reports",
      description:
        "Statutory annual filings, fiscal disclosures, and AIM compliance reports.",
      href: "/resources/annual-reports",
      badge: "Institutional Filings",
      icon: "📊",
    },
    {
      title: "Research Whitepapers",
      description:
        "Applied agritech monographs, soil health field studies, and policy analysis.",
      href: "/resources/publications",
      badge: "Scientific Studies",
      icon: "📑",
    },
    {
      title: "Scheme Guidelines",
      description:
        "Operational manuals for SISFS, MeitY GENESIS, and residency agreements.",
      href: "/resources/program-guidelines",
      badge: "Operational Norms",
      icon: "📜",
    },
    {
      title: "Policies & Disclosures",
      description:
        "RTI proactive disclosures, POSH committee details, and corporate brand kit.",
      href: "/resources/policies-downloads",
      badge: "Statutory Compliance",
      icon: "⚖️",
    },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold tracking-wide uppercase border border-[#73992A]/30">
            <span>📚</span>
            <span>Official Knowledge Repository</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
            Institutional Reports, Guidelines &amp; Policies
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            Public documentation, statutory filings, scientific whitepapers, and
            transparent scheme guidelines published by the AIC-ADT Baramati
            Foundation.
          </p>
        </header>

        {/* 4 Thematic Pillars Navigation Grid */}
        <section
          aria-label="Knowledge Pillars"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {resourcePillars.map((pillar) => (
            <Link
              key={pillar.href}
              href={pillar.href}
              className="bg-white p-6 rounded-xl border border-[#DDE5DC] hover:border-[#73992A] hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl" aria-hidden="true">
                    {pillar.icon}
                  </span>
                  <span className="text-[11px] font-bold text-[#004B2A] bg-[#E8F0EB] px-2 py-0.5 rounded-full">
                    {pillar.badge}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-[#17231D] font-heading group-hover:text-[#004B2A] transition-colors">
                  {pillar.title}
                </h2>
                <p className="text-xs text-[#59665D] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#E8F0EB] flex items-center justify-between text-xs font-bold text-[#004B2A]">
                <span>Browse Section</span>
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </section>

        {/* Master Publication Directory Filter Client */}
        <section aria-label="All Publications Directory" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              Search All Publications
            </h2>
          </div>
          <PublicationFilterClient
            initialPublications={PUBLICATIONS_DATA}
            defaultCategory="All"
          />
        </section>

        {/* Transparency Note */}
        <section className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-8 space-y-3">
          <h2 className="text-base font-bold text-[#17231D] font-heading">
            Institutional Verification &amp; Security Baseline
          </h2>
          <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
            In strict compliance with information security guidelines, all
            downloadable documents hosted in this repository are verified
            authentic publications stored on local data-center storage. External
            unverified links and internal draft files are strictly prohibited
            from public directory indexing.
          </p>
        </section>
      </Container>
    </div>
  );
}
