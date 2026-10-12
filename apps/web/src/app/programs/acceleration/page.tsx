import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { PROGRAMS_CONTINUUM } from "@/data/programs";

export const metadata: Metadata = {
  title: "Growth Acceleration Program | AIC-ADT Baramati Foundation",
  description:
    "Fast-tracked commercial scaling, institutional venture capital syndication, and national FPO market expansion for mature agritech startups.",
};

export default function AccelerationPage() {
  const program = PROGRAMS_CONTINUUM.find((p) => p.slug === "acceleration");

  if (!program) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        badge={program.badge}
        badgeVariant="botanical"
        title={program.name}
        description={program.tagline}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
          { label: "Acceleration", href: "/programs/acceleration" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/programs/apply-instructions"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              Apply for Acceleration →
            </Link>
            <Link
              href="/about/partners"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              VC &amp; Investor Network
            </Link>
          </div>
        }
      />

      {/* Fast Facts */}
      <section className="bg-white py-8 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
                Cohort Duration
              </span>
              <div className="text-sm font-bold text-[#17231D] mt-0.5">
                {program.duration}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
                Technology Stage
              </span>
              <div className="text-sm font-bold text-[#004B2A] mt-0.5">
                {program.trlLevel}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
                Intake Model
              </span>
              <div className="text-sm font-bold text-[#73992A] mt-0.5">
                {program.status}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
                Investment Focus
              </span>
              <div className="text-sm font-bold text-[#17231D] mt-0.5">
                Pre-Series A / Series A
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Scaling Deep Dive */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Scaling Agritech Beyond Proof of Concept
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
                Market Penetration, Enterprise Pilots &amp; Institutional VC
                Syndicates
              </h2>
              <p className="text-sm sm:text-base text-[#647067] leading-relaxed">
                {program.summary}
              </p>

              <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#59665D]">
                  Advanced Resources Available
                </span>
                <div className="flex flex-wrap gap-2">
                  {program.facilityAccess.map((fac) => (
                    <Badge key={fac} variant="botanical">
                      {fac}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] space-y-6 shadow-2xs">
              <h3 className="text-xl font-bold text-[#17231D] font-heading">
                Ideal Profile for Acceleration
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#59665D]">
                {program.audience.map((aud, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#004B2A] font-bold text-base">
                      •
                    </span>
                    <span>{aud}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-[#EAEFE8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
                  Capital Linkages
                </h4>
                <p className="text-xs text-[#647067] leading-relaxed">
                  {program.fundingScope}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Offerings & Process */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#DDE5DC] shadow-2xs space-y-4">
              <h3 className="text-xl font-bold text-[#17231D] font-heading">
                Acceleration Track Benefits
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#17231D]">
                {program.offerings.map((off, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#004B2A] font-bold">✓</span>
                    <span>{off}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#DDE5DC] shadow-2xs space-y-4">
              <h3 className="text-xl font-bold text-[#17231D] font-heading">
                Eligibility &amp; Evaluation
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#17231D]">
                {program.eligibility.map((el, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#004B2A] font-bold">✓</span>
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-12">
        <Container>
          <div className="rounded-2xl border border-[#DDE5DC] bg-[#004B2A] text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold font-heading">
                Explore Institutional Acceleration with AIC-ADT
              </h3>
              <p className="text-xs sm:text-sm text-[#E8F0EB] mt-1">
                Connect with our venture partners and schedule a preliminary
                growth review.
              </p>
            </div>
            <Link
              href="/programs/apply-instructions"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white text-[#004B2A] hover:bg-[#F3F7EC] transition-colors shrink-0 min-h-[44px]"
            >
              Review Requirements →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
