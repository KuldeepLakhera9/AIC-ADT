import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { MENTORS_DATA } from "@/data/programs";

export const metadata: Metadata = {
  title: "Mentor Network & Empanelment | AIC-ADT Baramati Foundation",
  description:
    "Meet our empaneled mentors in agronomy, venture capital, patent prosecution, and IoT engineering guiding AIC-ADT agritech startups.",
};

export default function MentorshipPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        badge="Ecosystem Mentorship"
        badgeVariant="botanical"
        title="Multidisciplinary Mentor Network &amp; Advisory Board"
        description="AIC-ADT bridges early-stage agritech founders with veteran venture capitalists, patent attorneys, crop scientists, and manufacturing engineers to accelerate commercialization."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
          { label: "Mentorship", href: "/programs/mentorship" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              Apply to Empanel as Mentor →
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              Incubation Programs
            </Link>
          </div>
        }
      />

      {/* Overview Banner */}
      <section className="bg-white py-10 lg:py-14 border-b border-[#DDE5DC]">
        <Container>
          <div className="rounded-2xl border border-[#DDE5DC] bg-[#F8FAF7] p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xs">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Domain-Specific Guidance
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#17231D] font-heading">
                Four Pillars of Technical &amp; Strategic Mentorship
              </h2>
              <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                Founders receive weekly milestone-driven reviews and access to
                specialized masterclasses spanning agronomic validation,
                intellectual property, venture math, and hardware prototyping.
              </p>
            </div>

            <div className="flex gap-4 shrink-0">
              <div className="bg-white p-4 rounded-xl border border-[#DDE5DC] text-center min-w-[130px] shadow-2xs">
                <div className="text-2xl font-extrabold text-[#004B2A] font-heading">
                  69+
                </div>
                <div className="text-[11px] font-semibold text-[#59665D] mt-0.5">
                  Empaneled Mentors
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#DDE5DC] text-center min-w-[130px] shadow-2xs">
                <div className="text-2xl font-extrabold text-[#73992A] font-heading">
                  4
                </div>
                <div className="text-[11px] font-semibold text-[#59665D] mt-0.5">
                  Advisory Domains
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mentors Grid */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
              Featured Advisory &amp; Technical Mentors
            </h2>
            <p className="text-sm sm:text-base text-[#59665D] mt-2">
              Cross-referenced and active advisors supporting our incubated
              cohorts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MENTORS_DATA.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white p-6 rounded-2xl border border-[#DDE5DC] shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-[#E8F0D9] text-[#004B2A] font-heading font-extrabold text-base flex items-center justify-center border border-[#73992A]/30">
                      {mentor.avatarPlaceholder}
                    </div>
                    <Badge variant="botanical">✓ Verified</Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#17231D] font-heading">
                      {mentor.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#73992A] mt-0.5">
                      {mentor.role}
                    </div>
                    <div className="text-xs text-[#59665D] mt-1">
                      {mentor.organization}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-bold text-[#59665D] block mb-1">
                      Domain Focus
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {mentor.domains.map((dom, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium bg-[#F8FAF7] text-[#59665D] px-2 py-0.5 rounded border border-[#EAEFE8]"
                        >
                          {dom}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#EAEFE8] text-[11px] text-[#59665D] flex items-center justify-between">
                  <span>Advisory Pillar</span>
                  <span className="font-semibold text-[#004B2A]">
                    {mentor.expertiseArea}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Become a Mentor Callout */}
      <section className="bg-white py-14 lg:py-20">
        <Container>
          <div className="rounded-3xl border border-[#DDE5DC] bg-[#004B2A] text-white p-8 sm:p-12">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B9F5D8]">
                Contribute Your Expertise
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Join the AIC-ADT Agritech Mentor Empanelment
              </h2>
              <p className="text-sm text-[#E2E8F0] leading-relaxed">
                Are you an agritech operator, corporate executive, patent
                practitioner, or experienced investor? We welcome qualified
                professionals to mentor our early cohorts.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white text-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
                >
                  Submit Mentor Expression of Interest →
                </Link>
                <Link
                  href="/about/leadership"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors min-h-[44px]"
                >
                  Governing Leadership
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
