import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CAMPUS_HEADQUARTERS, DEPARTMENT_DESKS } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact & Institutional Directory | AIC-ADT Baramati Foundation",
  description:
    "Official contact directory, campus address, incubation helplines, department desks, and working hours for AIC-ADT Baramati Foundation.",
};

export default function ContactPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold tracking-wide uppercase border border-[#73992A]/30">
            <span>📞</span>
            <span>Institutional Helpline &amp; Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
            Connect with AIC-ADT Baramati
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            Reach our incubation admissions desk, NABL analytical lab testing
            coordinators, corporate CSR cell, or campus reception through
            verified institutional channels.
          </p>
        </header>

        {/* Quick Route Switchers */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-4 py-2 rounded-lg bg-[#004B2A] text-white font-bold shadow-2xs">
            General Inquiries &amp; Directory
          </span>
          <Link
            href="/contact/partnerships"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Corporate CSR &amp; Partnership Desk
          </Link>
          <Link
            href="/contact/directions"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Location &amp; Travel Directions
          </Link>
        </div>

        {/* Primary Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Campus Headquarters */}
          <section className="bg-white rounded-2xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#E8F0EB] text-[#004B2A] flex items-center justify-center font-bold text-lg">
              📍
            </div>
            <h2 className="text-xl font-bold text-[#17231D] font-heading">
              Campus Headquarters
            </h2>
            <address className="not-italic text-sm text-[#59665D] leading-relaxed space-y-1">
              <strong className="text-[#17231D] block font-semibold">
                {CAMPUS_HEADQUARTERS.institution}
              </strong>
              <span>Agricultural Development Trust Campus,</span>
              <br />
              <span>{CAMPUS_HEADQUARTERS.address.line1},</span>
              <br />
              <span>
                {CAMPUS_HEADQUARTERS.address.city},{" "}
                {CAMPUS_HEADQUARTERS.address.district},
              </span>
              <br />
              <span>
                {CAMPUS_HEADQUARTERS.address.state} —{" "}
                {CAMPUS_HEADQUARTERS.address.pincode},{" "}
                {CAMPUS_HEADQUARTERS.address.country}
              </span>
            </address>

            <div className="pt-2 text-xs text-[#59665D] border-t border-[#E8F0EB] space-y-1">
              <div>
                <span className="font-semibold text-[#17231D]">
                  GPS Coordinates:
                </span>{" "}
                {CAMPUS_HEADQUARTERS.coordinates.latitude},{" "}
                {CAMPUS_HEADQUARTERS.coordinates.longitude}
              </div>
              <div className="pt-1">
                <Link
                  href="/contact/directions"
                  className="font-bold text-[#004B2A] hover:underline"
                >
                  View Transit Guide &amp; Directions →
                </Link>
              </div>
            </div>
          </section>

          {/* Card 2: Telephone Hierarchy */}
          <section className="bg-white rounded-2xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#E8F0EB] text-[#004B2A] flex items-center justify-center font-bold text-lg">
              ☎️
            </div>
            <h2 className="text-xl font-bold text-[#17231D] font-heading">
              Official Helplines
            </h2>
            <div className="space-y-3 text-sm text-[#59665D]">
              <div>
                <span className="text-xs text-[#59665D] block">
                  Incubation Mobile Helpline:
                </span>
                <a
                  href={`tel:${CAMPUS_HEADQUARTERS.helplines.incubationMobile.replace(/\s+/g, "")}`}
                  className="text-base font-bold text-[#004B2A] hover:underline block"
                >
                  {CAMPUS_HEADQUARTERS.helplines.incubationMobile}
                </a>
              </div>

              <div>
                <span className="text-xs text-[#59665D] block">
                  Campus Landline (IVR / Reception):
                </span>
                <a
                  href={`tel:${CAMPUS_HEADQUARTERS.helplines.landlinePrimary.replace(/\s+/g, "")}`}
                  className="font-bold text-[#17231D] hover:text-[#004B2A] hover:underline block"
                >
                  {CAMPUS_HEADQUARTERS.helplines.landlinePrimary} / 255518
                </a>
              </div>

              <div className="pt-2 border-t border-[#E8F0EB] text-xs">
                <span className="font-semibold text-[#17231D] block">
                  Working Hours:
                </span>
                <span>{CAMPUS_HEADQUARTERS.workingHours}</span>
              </div>
            </div>
          </section>

          {/* Card 3: Electronic Correspondence */}
          <section className="bg-white rounded-2xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#E8F0EB] text-[#004B2A] flex items-center justify-center font-bold text-lg">
              ✉️
            </div>
            <h2 className="text-xl font-bold text-[#17231D] font-heading">
              Institutional Email
            </h2>
            <div className="space-y-3 text-sm text-[#59665D]">
              <div>
                <span className="text-xs text-[#59665D] block">
                  Primary Central Mailbox:
                </span>
                <a
                  href={`mailto:${CAMPUS_HEADQUARTERS.emails.general}`}
                  className="text-base font-bold text-[#004B2A] hover:underline block break-all"
                >
                  {CAMPUS_HEADQUARTERS.emails.general}
                </a>
              </div>

              <p className="text-xs text-[#59665D] leading-relaxed">
                Centralized triage ensures inquiries are routed to the CEO,
                Incubation Managers, or Laboratory Superintendents within one
                business day.
              </p>

              <div className="pt-2 border-t border-[#E8F0EB]">
                <a
                  href={`mailto:${CAMPUS_HEADQUARTERS.emails.general}?subject=General%20Institutional%20Inquiry`}
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-[#004B2A] text-white font-bold text-xs hover:bg-[#00643A] transition-colors"
                >
                  <span>Compose Email to Central Desk</span>
                  <span aria-hidden="true" className="ml-1">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Specialized Departmental Desks Section */}
        <section
          aria-labelledby="department-desks-heading"
          className="space-y-6"
        >
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
              Directory Structure
            </span>
            <h2
              id="department-desks-heading"
              className="text-2xl sm:text-3xl font-bold text-[#17231D] font-heading"
            >
              Specialized Department Desks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEPARTMENT_DESKS.map((desk) => (
              <div
                key={desk.id}
                className="bg-white rounded-xl border border-[#DDE5DC] p-6 space-y-4 hover:border-[#73992A] transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#004B2A] bg-[#E8F0EB] px-2.5 py-0.5 rounded-full">
                      {desk.leadRole}
                    </span>
                    <span className="text-xs text-[#59665D]">{desk.hours}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#17231D] font-heading">
                    {desk.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
                    {desk.focus}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8F0EB] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[#59665D] mr-1">Phone:</span>
                    <a
                      href={`tel:${desk.phone.replace(/\s+/g, "")}`}
                      className="font-bold text-[#17231D] hover:text-[#004B2A]"
                    >
                      {desk.phone}
                    </a>
                  </div>
                  <a
                    href={`mailto:${desk.email}?subject=Inquiry:%20${encodeURIComponent(desk.name)}`}
                    className="font-bold text-[#004B2A] hover:underline"
                  >
                    Direct Email →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Direct Action Notice (No fake form submission) */}
        <section className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-[#17231D] font-heading">
            Direct Communication &amp; Verification Protocol
          </h2>
          <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
            In compliance with our institutional data policy, all communications
            are handled directly through verified email mailboxes and
            institutional telephone lines. We do not use unauthenticated web
            submission forms that lack verified backend endpoints. For scheduled
            in-person visits to labs or incubator offices, please notify our
            reception in advance.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
            <Link
              href="/about/infrastructure"
              className="text-[#004B2A] hover:underline"
            >
              Explore Campus Facilities →
            </Link>
            <Link
              href="/programs/apply-instructions"
              className="text-[#004B2A] hover:underline"
            >
              Review Incubation Instructions →
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
