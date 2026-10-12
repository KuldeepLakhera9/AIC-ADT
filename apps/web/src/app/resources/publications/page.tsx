import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WHITEPAPERS_LIST } from "@/data/publications";
import { PublicationCard } from "@/components/publications/PublicationCard";

export const metadata: Metadata = {
  title: "Research Whitepapers & Publications | AIC-ADT Baramati Foundation",
  description:
    "Applied agricultural technology research whitepapers, smallholder farm mechanization studies, and policy monographs published by AIC-ADT Baramati Foundation.",
};

export default function PublicationsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: "Publications & Whitepapers", href: "/resources/publications" },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold tracking-wide uppercase border border-[#73992A]/30">
            <span>📑</span>
            <span>Applied AgriTech Research</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
            Research Whitepapers &amp; Monographs
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            Rigorous applied research, smallholder field survey data, and policy
            recommendations published by AIC-ADT in partnership with
            agricultural universities, KVK Baramati, and research institutions.
          </p>
        </header>

        {/* Quick Route Switchers */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Link
            href="/resources"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            ← Resources Hub
          </Link>
          <span className="px-4 py-2 rounded-lg bg-[#004B2A] text-white font-bold shadow-2xs">
            Research Whitepapers
          </span>
          <Link
            href="/resources/annual-reports"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Annual Reports
          </Link>
          <Link
            href="/innovation"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Innovation Showcase
          </Link>
        </div>

        {/* Whitepapers Grid */}
        <section
          aria-label="Whitepapers and Research Monographs"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {WHITEPAPERS_LIST.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </section>

        {/* Academic Collaboration Callout */}
        <section className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-[#17231D] font-heading">
            Call for Collaborative Applied Research
          </h2>
          <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
            AIC-ADT welcomes research proposals from accredited ICAR institutes,
            state agricultural universities, and doctoral researchers interested
            in leveraging our 110-acre living laboratories and NABL testing
            equipment for empirical studies.
          </p>
          <div>
            <Link
              href="/contact/partnerships"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004B2A] hover:underline"
            >
              <span>Connect with Academic Partnership Desk</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
