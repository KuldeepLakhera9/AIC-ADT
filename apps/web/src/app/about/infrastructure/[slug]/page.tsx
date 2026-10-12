import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { INFRASTRUCTURE_MASTER_DATA } from "@/data/institutional";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return INFRASTRUCTURE_MASTER_DATA.facilities.map((facility) => ({
    slug: facility.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const facility = INFRASTRUCTURE_MASTER_DATA.facilities.find(
    (f) => f.slug === slug,
  );

  if (!facility) {
    return {
      title: "Facility Not Found | AIC-ADT Baramati Foundation",
    };
  }

  return {
    title: `${facility.name} | AIC-ADT Infrastructure`,
    description: facility.shortDesc,
  };
}

export default async function FacilityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const facility = INFRASTRUCTURE_MASTER_DATA.facilities.find(
    (f) => f.slug === slug,
  );

  if (!facility) {
    notFound();
  }

  // Get other facilities for quick navigation
  const otherFacilities = INFRASTRUCTURE_MASTER_DATA.facilities.filter(
    (f) => f.slug !== facility.slug,
  );

  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Header */}
      <PageHeader
        badge={facility.category}
        badgeVariant="botanical"
        title={facility.name}
        description={facility.overview}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Infrastructure", href: "/about/infrastructure" },
          {
            label: facility.name,
            href: `/about/infrastructure/${facility.slug}`,
          },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href={facility.bookingInfo.ctaHref}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              {facility.bookingInfo.ctaLabel} →
            </Link>
            <Link
              href="/about/infrastructure"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              All Campus Facilities
            </Link>
          </div>
        }
      />

      {/* 2. Facility Status & Key Highlight Strip */}
      <section className="bg-white py-8 border-b border-[#DDE5DC]">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC]">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2.5 bg-white rounded-xl border border-[#DDE5DC]">
                {facility.icon}
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#59665D]">
                  Facility Mandate
                </span>
                <div className="text-sm font-bold text-[#17231D]">
                  {facility.tagline}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="botanical">{facility.statusBadge}</Badge>
              <span className="text-xs text-[#647067] hidden sm:inline">
                Access: {facility.bookingInfo.accessType}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Instrumentation & Technical Specifications */}
      <section className="bg-white py-12 lg:py-16 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Hardware &amp; Machinery
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
              Equipment &amp; Technical Specifications
            </h2>
            <p className="text-sm sm:text-base text-[#59665D] mt-2">
              High-precision machines maintained to standard operational
              calibrations for startup prototyping and testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facility.equipment.map((item) => (
              <div
                key={item.name}
                className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] shadow-2xs hover:border-[#004B2A] transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-[#17231D] font-heading">
                    {item.name}
                  </h3>
                  <span className="text-xs font-bold text-[#004B2A] bg-[#F3F7EC] px-2 py-0.5 rounded">
                    Industrial Spec
                  </span>
                </div>

                <div className="mt-3 p-3 bg-white rounded-xl border border-[#EAEFE8]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#59665D] block mb-1">
                    Technical Specification
                  </span>
                  <p className="text-xs text-[#17231D] font-mono leading-relaxed">
                    {item.spec}
                  </p>
                </div>

                <div className="mt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#73992A] block mb-1">
                    Primary Application
                  </span>
                  <p className="text-xs text-[#647067] leading-relaxed">
                    {item.application}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Core Capabilities & Target Users */}
      <section className="bg-[#F8FAF7] py-12 lg:py-16 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Capabilities */}
            <div className="bg-white p-7 lg:p-8 rounded-2xl border border-[#DDE5DC] shadow-2xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
                Operational Scope
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading mb-6">
                Laboratory Capabilities
              </h2>
              <ul className="space-y-4">
                {facility.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3">
                    <span className="text-[#004B2A] font-bold text-base mt-0.5">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm text-[#17231D] leading-relaxed">
                      {cap}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Users & Eligibility */}
            <div className="bg-white p-7 lg:p-8 rounded-2xl border border-[#DDE5DC] shadow-2xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
                Who Can Access
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading mb-6">
                Eligible Users &amp; Beneficiaries
              </h2>
              <ul className="space-y-4">
                {facility.targetUsers.map((user) => (
                  <li key={user} className="flex items-start gap-3">
                    <span className="text-[#73992A] font-bold text-base mt-0.5">
                      •
                    </span>
                    <span className="text-xs sm:text-sm text-[#17231D] leading-relaxed">
                      {user}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[#EAEFE8]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#59665D] mb-2">
                  Pricing &amp; Subsidies
                </div>
                <p className="text-xs text-[#647067] leading-relaxed">
                  {facility.bookingInfo.pricingNotice}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Safety Guidelines & Booking Procedures */}
      <section className="bg-white py-12 lg:py-16 border-b border-[#DDE5DC]">
        <Container>
          <div className="rounded-2xl border border-[#DDE5DC] bg-[#F8FAF7] p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                  Compliance &amp; Safety
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
                  Standard Operating Procedures &amp; Safety Rules
                </h2>
                <ul className="space-y-3 pt-2">
                  {facility.guidelines.map((guide) => (
                    <li
                      key={guide}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#59665D]"
                    >
                      <span className="text-[#004B2A] font-bold">ℹ</span>
                      <span>{guide}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#DDE5DC] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
                    Facility Coordinator
                  </span>
                  <div className="text-sm font-bold text-[#004B2A] mt-1">
                    {facility.bookingInfo.contactPerson}
                  </div>
                  <div className="text-xs text-[#647067] mt-1">
                    Access Mode: {facility.bookingInfo.accessType}
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    href={facility.bookingInfo.ctaHref}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs font-bold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
                  >
                    {facility.bookingInfo.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Explore Other Facilities */}
      <section className="bg-[#F8FAF7] py-12 lg:py-16">
        <Container>
          <div className="max-w-2xl mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              Other Specialized Facilities
            </h2>
            <p className="text-xs sm:text-sm text-[#59665D] mt-1">
              Explore adjacent laboratories and co-working resources at AIC-ADT
              Baramati.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherFacilities.map((other) => (
              <Link
                key={other.slug}
                href={`/about/infrastructure/${other.slug}`}
                className="p-5 rounded-xl bg-white border border-[#DDE5DC] hover:border-[#004B2A] transition-colors shadow-2xs group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{other.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#73992A] bg-[#F3F7EC] px-2 py-0.5 rounded">
                      {other.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#17231D] group-hover:text-[#004B2A] transition-colors font-heading">
                    {other.name}
                  </h3>
                  <p className="text-xs text-[#647067] mt-2 line-clamp-2">
                    {other.shortDesc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAEFE8] text-[11px] font-bold text-[#004B2A] flex items-center justify-between">
                  <span>View Lab Details</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
