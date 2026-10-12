import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EVENTS_DATA } from "@/data/events";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EVENTS_DATA.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS_DATA.find((e) => e.slug === slug);

  if (!event) {
    return {
      title: "Event Not Found | AIC-ADT Baramati Foundation",
    };
  }

  return {
    title: `${event.title} | AIC-ADT Baramati Foundation`,
    description: event.shortDescription,
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;
  const event = EVENTS_DATA.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const isUpcoming = event.status === "Upcoming";

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Events & Workshops", href: "/events" },
    { label: event.title, href: `/events/${event.slug}` },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Section */}
        <header className="bg-white rounded-2xl border border-[#DDE5DC] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#E8F0EB] text-[#004B2A] border border-[#73992A]/30">
                {event.category}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                  isUpcoming
                    ? "bg-[#E8F0EB] text-[#004B2A] border border-[#73992A]/30"
                    : "bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                {isUpcoming ? "● Upcoming Event" : "Concluded Event"}
              </span>
            </div>

            <span className="text-xs text-[#59665D] font-medium">
              Source: {event.verifiedSource}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
              {event.title}
            </h1>
            <p className="text-base sm:text-lg text-[#59665D] leading-relaxed max-w-4xl">
              {event.shortDescription}
            </p>
          </div>

          {/* Quick Facts Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-[#E8F0EB] text-xs">
            <div className="bg-[#F8FAF7] p-4 rounded-xl border border-[#DDE5DC]">
              <span className="text-[#59665D] block mb-1">
                Date &amp; Schedule:
              </span>
              <strong className="text-[#17231D] font-bold text-sm block">
                {event.date.formatted}
              </strong>
              {event.date.time && (
                <span className="text-[#59665D] block mt-0.5">
                  {event.date.time}
                </span>
              )}
            </div>

            <div className="bg-[#F8FAF7] p-4 rounded-xl border border-[#DDE5DC]">
              <span className="text-[#59665D] block mb-1">
                Location Format:
              </span>
              <strong className="text-[#17231D] font-bold text-sm block">
                {event.venue.type}
              </strong>
              <span className="text-[#59665D] block mt-0.5 line-clamp-1">
                {event.venue.name}
              </span>
            </div>

            <div className="bg-[#F8FAF7] p-4 rounded-xl border border-[#DDE5DC]">
              <span className="text-[#59665D] block mb-1">Fee Structure:</span>
              <strong className="text-[#17231D] font-bold text-sm block">
                {event.registration.fee}
              </strong>
              <span className="text-[#59665D] block mt-0.5">
                {event.registration.statusNote}
              </span>
            </div>

            <div className="bg-[#F8FAF7] p-4 rounded-xl border border-[#DDE5DC]">
              <span className="text-[#59665D] block mb-1">
                Organizing Body:
              </span>
              <strong className="text-[#17231D] font-bold text-sm block line-clamp-1">
                {event.organizer}
              </strong>
              <span className="text-[#004B2A] font-semibold block mt-0.5">
                AIC-ADT Baramati
              </span>
            </div>
          </div>
        </header>

        {/* Detailed Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <section className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#17231D] font-heading">
                Program Overview &amp; Scope
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[#59665D] leading-relaxed">
                {event.fullDescription.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Agenda / Highlights */}
            <section className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#17231D] font-heading">
                Key Agenda &amp; Program Highlights
              </h2>
              <ul className="space-y-3 text-sm text-[#59665D]">
                {event.agendaOrHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#E8F0EB] text-[#004B2A] font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Target Audience */}
            <section className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#17231D] font-heading">
                Intended Participants &amp; Eligibility
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {event.targetAudience.map((audience, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-[#F8FAF7] border border-[#DDE5DC] text-[#17231D] font-medium flex items-center gap-2"
                  >
                    <span className="text-[#73992A] font-bold">●</span>
                    <span>{audience}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column (1 col) */}
          <div className="space-y-6">
            {/* Official Registration & Intake Card */}
            <div className="bg-white rounded-xl border-2 border-[#004B2A] p-6 shadow-xs space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                  Registration Status
                </span>
                <h3 className="text-lg font-bold text-[#17231D] font-heading">
                  {event.registration.statusNote}
                </h3>
              </div>

              <div className="space-y-2 text-xs text-[#59665D] border-t border-[#E8F0EB] pt-4">
                {event.registration.deadline && (
                  <div>
                    <span className="text-[#59665D] block">
                      Application Cutoff:
                    </span>
                    <strong className="text-[#17231D]">
                      {event.registration.deadline}
                    </strong>
                  </div>
                )}
                <div>
                  <span className="text-[#59665D] block">Inquiries Desk:</span>
                  <a
                    href={`mailto:${event.registration.contactEmail}`}
                    className="font-semibold text-[#004B2A] hover:underline"
                  >
                    {event.registration.contactEmail}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                {event.registration.externalUrl ? (
                  <a
                    href={event.registration.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#004B2A] text-white font-bold text-sm hover:bg-[#00643A] transition-colors shadow-xs"
                  >
                    <span>{event.registration.buttonLabel}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <a
                    href={`mailto:${event.registration.contactEmail}?subject=Inquiry: ${encodeURIComponent(event.title)}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#F8FAF7] border border-[#DDE5DC] text-[#17231D] font-bold text-sm hover:bg-[#E8F0EB] hover:text-[#004B2A] hover:border-[#004B2A] transition-colors"
                  >
                    <span>Connect with Desk</span>
                    <span aria-hidden="true">✉</span>
                  </a>
                )}
              </div>

              <p className="text-[11px] text-[#59665D] leading-relaxed italic bg-[#F8FAF7] p-3 rounded-lg border border-[#DDE5DC]">
                Note: In accordance with institutional policies, online intake
                forms for national schemes link to official ministries. Direct
                desk inquiries are handled by AIC-ADT management.
              </p>
            </div>

            {/* Venue & Directions Card */}
            <div className="bg-white rounded-xl border border-[#DDE5DC] p-6 space-y-4 text-xs">
              <h3 className="font-bold text-[#17231D] font-heading text-sm">
                Venue Location
              </h3>
              <p className="text-[#59665D] leading-relaxed">
                {event.venue.address}
              </p>
              {event.venue.directionsUrl && (
                <div>
                  <Link
                    href={event.venue.directionsUrl}
                    className="inline-flex items-center gap-1 font-bold text-[#004B2A] hover:underline"
                  >
                    <span>Transit Guide &amp; Directions</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Back link */}
            <div>
              <Link
                href="/events"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#59665D] hover:text-[#004B2A] transition-colors"
              >
                <span aria-hidden="true">←</span>
                <span>Return to All Events &amp; Workshops</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
