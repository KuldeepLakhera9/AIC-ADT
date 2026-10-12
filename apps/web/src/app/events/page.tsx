import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getPublicEvents } from "@/lib/api/public-content";
import { EventFilterClient } from "@/components/events/EventFilterClient";

export const metadata: Metadata = {
  title: "Events & Capacity Building Workshops | AIC-ADT Baramati Foundation",
  description:
    "Explore upcoming hands-on agritech workshops, cohort application deadlines, living-lab demonstrations, and concluded training archives at AIC-ADT Baramati Foundation.",
};

export default async function EventsPage() {
  const events = await getPublicEvents('en');
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Events & Workshops", href: "/events" },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold tracking-wide uppercase border border-[#73992A]/30">
            <span>📅</span>
            <span>Ecosystem Calendar &amp; Masterclasses</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
            Workshops, Demo Days &amp; Intake Deadlines
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            Hands-on technical capacity building, drone agronomy certifications,
            food pilot plant demonstrations, and official Government of India
            funding cohort application timelines.
          </p>
        </header>

        {/* Quick Route Switchers */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Link
            href="/events"
            className="px-4 py-2 rounded-lg bg-[#004B2A] text-white font-bold shadow-2xs"
          >
            All Events &amp; Workshops
          </Link>
          <Link
            href="/events/past"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Past Events Archive
          </Link>
          <Link
            href="/programs/training"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Regular Training Modules
          </Link>
        </div>

        {/* Interactive Event Filter Component */}
        <section aria-label="Events Directory">
          <EventFilterClient initialEvents={events} defaultStatus="All" />
        </section>

        {/* Advisory / Policy Note */}
        <section className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-8 space-y-3">
          <h2 className="text-base font-bold text-[#17231D] font-heading">
            Official Event Registration Notice
          </h2>
          <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
            In compliance with AIC-ADT institutional governance, all government
            grant deadlines (such as DPIIT SISFS and MeitY GENESIS) route to the
            respective verified national portals. Campus technical workshops are
            facilitated through authorized departmental desks. We do not use
            unverified third-party ticketing platforms.
          </p>
        </section>
      </Container>
    </div>
  );
}
