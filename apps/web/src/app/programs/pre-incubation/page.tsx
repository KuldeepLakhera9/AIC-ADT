import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { PROGRAMS_CONTINUUM } from "@/data/programs";

export const metadata: Metadata = {
  title: "Pre-Incubation Program | AIC-ADT Baramati Foundation",
  description:
    "Ideation and early prototype validation for student innovators, researchers, and agritech founders at AIC-ADT Baramati Foundation.",
};

export default function PreIncubationPage() {
  const program = PROGRAMS_CONTINUUM.find((p) => p.slug === "pre-incubation");

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
          { label: "Pre-Incubation", href: "/programs/pre-incubation" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/programs/apply-instructions"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              Apply for Pre-Incubation →
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              All Programs
            </Link>
          </div>
        }
      />

      {/* Program Fast Facts */}
      <section className="bg-white py-8 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
                Duration
              </span>
              <div className="text-sm font-bold text-[#17231D] mt-0.5">
                {program.duration}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
                Maturity Focus
              </span>
              <div className="text-sm font-bold text-[#004B2A] mt-0.5">
                {program.trlLevel}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
                Cohort Status
              </span>
              <div className="text-sm font-bold text-[#73992A] mt-0.5">
                {program.status}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
                Target Stage
              </span>
              <div className="text-sm font-bold text-[#17231D] mt-0.5">
                {program.stage}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Program Overview & Audience */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Curriculum &amp; Purpose
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
                From Raw Scientific Concept to Functional Proof-of-Concept
              </h2>
              <p className="text-sm sm:text-base text-[#647067] leading-relaxed">
                {program.summary}
              </p>

              <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#59665D]">
                  Campus Laboratories Accessible
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
                Who Should Apply?
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
                  Funding Scope
                </h4>
                <p className="text-xs text-[#647067] leading-relaxed">
                  {program.fundingScope}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Offerings & Selection Process */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#DDE5DC] shadow-2xs space-y-4">
              <h3 className="text-xl font-bold text-[#17231D] font-heading">
                Key Support &amp; Offerings
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
                Selection &amp; Evaluation Process
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#17231D]">
                {program.selectionProcess.map((proc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#73992A] font-bold font-mono">
                      0{idx + 1}.
                    </span>
                    <span>{proc}</span>
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
                Ready to Submit Your Pre-Incubation Concept?
              </h3>
              <p className="text-xs sm:text-sm text-[#E8F0EB] mt-1">
                Read our application checklist and eligibility guidelines before
                applying.
              </p>
            </div>
            <Link
              href="/programs/apply-instructions"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white text-[#004B2A] hover:bg-[#F3F7EC] transition-colors shrink-0 min-h-[44px]"
            >
              Application Instructions →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
