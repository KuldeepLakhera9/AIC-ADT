import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PAST_EVENTS_LIST } from "@/data/events";
import { EventFilterClient } from "@/components/events/EventFilterClient";

export const metadata: Metadata = {
  title: "Past Events & Training Archive | AIC-ADT Baramati Foundation",
  description:
    "Review historical archives, participant statistics, training certificates, and outcome summaries from concluded workshops and demo days at AIC-ADT Baramati.",
};

export default function PastEventsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Events & Workshops", href: "/events" },
    { label: "Past Events Archive", href: "/events/past" },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-bold tracking-wide uppercase border border-gray-200">
            <span>🏛️</span>
            <span>Historical Institutional Archive</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
            Concluded Events &amp; Training Records
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            Archival records of completed masterclasses, investor conclaves, and
            DGCA drone training programs. Reconciled and certified under the
            AIC-ADT capacity building verification protocol.
          </p>
        </header>

        {/* Navigation Switchers */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Link
            href="/events"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            ← Upcoming &amp; All Events
          </Link>
          <span className="px-4 py-2 rounded-lg bg-[#004B2A] text-white font-bold shadow-2xs">
            Past Events Archive
          </span>
          <Link
            href="/resources/annual-reports"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Annual Progress Reports
          </Link>
        </div>

        {/* Filtered Listing Component */}
        <section aria-label="Concluded Events Grid">
          <EventFilterClient
            initialEvents={PAST_EVENTS_LIST}
            defaultStatus="Concluded"
          />
        </section>
      </Container>
    </div>
  );
}
