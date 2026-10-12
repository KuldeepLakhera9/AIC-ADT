import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CAMPUS_HEADQUARTERS, TRANSIT_ROUTES } from "@/data/contact";

export const metadata: Metadata = {
  title: "Location & Travel Directions | AIC-ADT Baramati Foundation",
  description:
    "Comprehensive transit instructions to reach the 110-acre Sharadanagar campus of AIC-ADT Baramati from Pune Airport, Daund Junction, and Baramati Bus Stand.",
};

export default function DirectionsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
    { label: "Directions & Transit", href: "/contact/directions" },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold tracking-wide uppercase border border-[#73992A]/30">
            <span>🗺️</span>
            <span>Campus Navigation &amp; Transit Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
            How to Reach AIC-ADT Baramati
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            Detailed travel instructions, transit connections from major
            transport hubs in Maharashtra, and campus entry guidelines for
            visitors, researchers, and startup delegations.
          </p>
        </header>

        {/* Quick Route Switchers */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            ← Contact Directory
          </Link>
          <span className="px-4 py-2 rounded-lg bg-[#004B2A] text-white font-bold shadow-2xs">
            Transit &amp; Directions
          </span>
          <Link
            href="/about/infrastructure"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Campus Infrastructure
          </Link>
        </div>

        {/* Geographic Coordinates & Landmark Summary Banner */}
        <section className="bg-white rounded-2xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Campus Landmark &amp; Geolocation
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
                Sharadanagar Campus, Baramati
              </h2>
              <p className="text-xs sm:text-sm text-[#59665D]">
                Post Box No. 35, Malegaon Colony Road, Baramati, District Pune,
                Maharashtra 413115
              </p>
            </div>

            <a
              href={CAMPUS_HEADQUARTERS.coordinates.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#004B2A] text-white font-bold text-xs sm:text-sm hover:bg-[#00643A] transition-colors shrink-0 shadow-xs"
            >
              <span>Open in Google Maps</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8F0EB] text-xs">
            <div>
              <span className="text-[#59665D] block">
                GPS Latitude / Longitude:
              </span>
              <strong className="text-[#17231D] font-bold">
                {CAMPUS_HEADQUARTERS.coordinates.latitude},{" "}
                {CAMPUS_HEADQUARTERS.coordinates.longitude}
              </strong>
            </div>
            <div>
              <span className="text-[#59665D] block">Nearby Landmark:</span>
              <strong className="text-[#17231D] font-bold">
                KVK Baramati &amp; Agricultural Development Trust
              </strong>
            </div>
            <div>
              <span className="text-[#59665D] block">
                Campus Reception Helpline:
              </span>
              <a
                href={`tel:${CAMPUS_HEADQUARTERS.helplines.landlinePrimary.replace(/\s+/g, "")}`}
                className="font-bold text-[#004B2A] hover:underline"
              >
                {CAMPUS_HEADQUARTERS.helplines.landlinePrimary}
              </a>
            </div>
          </div>
        </section>

        {/* Transit Routes Grid */}
        <section aria-labelledby="transit-modes-heading" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
              Transit Instructions
            </span>
            <h2
              id="transit-modes-heading"
              className="text-2xl sm:text-3xl font-bold text-[#17231D] font-heading"
            >
              Arrival by Air, Train, or Road
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {TRANSIT_ROUTES.map((route, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4 hover:border-[#73992A] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#004B2A] bg-[#E8F0EB] px-2.5 py-1 rounded-full border border-[#73992A]/30">
                      {route.mode}
                    </span>
                    <span className="text-xs font-semibold text-[#59665D]">
                      {route.travelTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#17231D] font-heading">
                    {route.hub}
                  </h3>

                  <div className="text-xs text-[#59665D] pb-1">
                    <span className="font-semibold text-[#17231D]">
                      Distance:
                    </span>{" "}
                    {route.distance}
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-[#59665D] pt-2 border-t border-[#E8F0EB]">
                    {route.instructions.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5">
                        <span className="text-[#73992A] font-bold shrink-0 mt-0.5">
                          ●
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Campus Entry Protocol */}
        <section className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-8 space-y-3">
          <h2 className="text-base font-bold text-[#17231D] font-heading">
            Visitor Security &amp; Campus Protocol
          </h2>
          <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
            All visitors entering Sharadanagar must show government-issued photo
            identification at the main gate reception. Vehicles should follow
            campus speed limits (20 km/h) to protect agricultural research plots
            and student pedestrian walkways. Visitor parking is available
            adjacent to the Atal Incubation Centre complex.
          </p>
        </section>
      </Container>
    </div>
  );
}
