import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { NEWS_ARTICLES } from "@/data/news";
import { NewsFilterClient } from "@/components/news/NewsFilterClient";

export const metadata: Metadata = {
  title: "News & Institutional Announcements | AIC-ADT Baramati Foundation",
  description:
    "Official press releases, funding milestones, infrastructure commissioning, and ecosystem partnership announcements from AIC-ADT Baramati Foundation.",
};

export default function NewsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "News & Announcements", href: "/news" },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold tracking-wide uppercase border border-[#73992A]/30">
            <span>📰</span>
            <span>Official Communications Cell</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
            News &amp; Official Announcements
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            Verified institutional press releases, national cohort intakes,
            specialized lab commissionings, and strategic ecosystem alliances
            authorized by the AIC-ADT Baramati Foundation.
          </p>
        </header>

        {/* Quick Route Switchers */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-4 py-2 rounded-lg bg-[#004B2A] text-white font-bold shadow-2xs">
            All Announcements
          </span>
          <Link
            href="/events"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Events &amp; Workshops
          </Link>
          <Link
            href="/resources/publications"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Research Whitepapers
          </Link>
        </div>

        {/* Interactive News Listing Filter */}
        <section aria-label="Official Releases Listing">
          <NewsFilterClient initialArticles={NEWS_ARTICLES} />
        </section>

        {/* Media Inquiries Callout */}
        <section className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-[#17231D] font-heading">
            Media &amp; Press Inquiry Protocol
          </h2>
          <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
            Journalists, industry analysts, and media publications seeking
            official comments, executive interviews with leadership, or campus
            filming permissions are requested to contact the Institutional
            Communications Desk. High-resolution brand marks and photography can
            be downloaded from our brand assets repository.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
            <Link
              href="/resources/policies-downloads"
              className="text-[#004B2A] hover:underline"
            >
              Download Brand Identity Kit →
            </Link>
            <Link href="/contact" className="text-[#004B2A] hover:underline">
              Contact Communications Desk →
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
