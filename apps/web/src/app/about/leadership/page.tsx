import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { LEADERSHIP_DATA } from "@/data/institutional";

export const metadata: Metadata = {
  title: "Leadership & Governance | AIC-ADT Baramati Foundation",
  description:
    "Governing Board of Directors, Advisory Council, and Executive Management team of the AIC-ADT Baramati Foundation.",
};

export default function LeadershipPage() {
  const { hero, governanceCommitment, members } = LEADERSHIP_DATA;

  const boardMembers = members.filter(
    (m) => m.committee === "Board of Directors",
  );
  const advisors = members.filter((m) => m.committee === "Advisory Council");
  const executiveStaff = members.filter(
    (m) => m.committee === "Executive Management",
  );

  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Header */}
      <PageHeader
        badge={hero.badge}
        badgeVariant="botanical"
        title={hero.title}
        description={hero.leadCopy}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Leadership & Team", href: "/about/leadership" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/about/infrastructure"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              Campus Infrastructure →
            </Link>
            <Link
              href="/resources/annual-reports"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              Audited Governance Reports
            </Link>
          </div>
        }
      />

      {/* 2. Corporate Governance & Fiduciary Commitment */}
      <section className="bg-white py-12 lg:py-16 border-b border-[#DDE5DC]">
        <Container>
          <div className="rounded-2xl border border-[#DDE5DC] bg-[#F8FAF7] p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xs">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                  Fiduciary Responsibility
                </span>
                <Badge variant="leaf">
                  {governanceCommitment.cinNumberBadge}
                </Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#17231D] font-heading">
                {governanceCommitment.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                {governanceCommitment.summary}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#DDE5DC] shrink-0 text-center shadow-2xs min-w-[220px]">
              <div className="text-xs font-bold text-[#59665D] uppercase tracking-wider">
                Compliance Status
              </div>
              <div className="text-sm font-bold text-[#004B2A] mt-1">
                Audited &amp; Compliant
              </div>
              <div className="text-[11px] text-[#647067] mt-1">
                {governanceCommitment.statutoryFiling}
              </div>
              <div className="mt-3 pt-2 border-t border-[#EAEFE8]">
                <Link
                  href="/resources/annual-reports"
                  className="text-xs font-semibold text-[#004B2A] hover:text-[#73992A] transition-colors inline-flex items-center gap-1"
                >
                  <span>Download Annual Reports</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Governing Board of Directors */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Statutory Direction
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-2">
              Governing Board of Directors
            </h2>
            <p className="text-sm sm:text-base text-[#647067]">
              Fiduciary leadership steering strategic goals, financial
              oversight, and national mission alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {boardMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white p-6 rounded-xl border border-[#DDE5DC] flex flex-col justify-between shadow-2xs hover:border-[#73992A] transition-colors group"
              >
                <div className="space-y-4">
                  {/* Clean Editorial Initials Badge Frame */}
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-full bg-[#E8F0D9] text-[#004B2A] font-heading font-extrabold text-lg flex items-center justify-center border border-[#73992A]/30">
                      {member.avatarPlaceholder}
                    </div>
                    {member.isVerified && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EAF5EE] text-[#1B7340] border border-[#1B7340]/20">
                        Verified
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#17231D] font-heading group-hover:text-[#004B2A] transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs font-bold text-[#73992A] mt-0.5">
                      {member.role}
                    </div>
                    <div className="text-xs text-[#59665D] mt-1 font-medium">
                      {member.affiliation}
                    </div>
                  </div>

                  <p className="text-xs text-[#647067] leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EAEFE8] flex flex-wrap gap-1.5">
                  {member.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-[#F8FAF7] text-[#59665D] px-2 py-0.5 rounded border border-[#EAEFE8]"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Advisory Council */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Strategic Guidance
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-2">
              Advisory Council
            </h2>
            <p className="text-sm sm:text-base text-[#647067]">
              Specialists in agritech venture financing, field agronomy trials,
              and early-stage scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advisors.map((advisor) => (
              <div
                key={advisor.id}
                className="bg-[#F8FAF7] p-6 rounded-xl border border-[#DDE5DC] flex flex-col justify-between shadow-2xs hover:border-[#73992A] transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-white text-[#004B2A] font-heading font-extrabold text-base flex items-center justify-center border border-[#DDE5DC]">
                      {advisor.avatarPlaceholder}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8F0D9] text-[#004B2A]">
                      Advisor
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#17231D] font-heading">
                      {advisor.name}
                    </h3>
                    <div className="text-xs font-bold text-[#73992A] mt-0.5">
                      {advisor.role}
                    </div>
                    <div className="text-xs text-[#59665D] mt-1 font-medium">
                      {advisor.affiliation}
                    </div>
                  </div>

                  <p className="text-xs text-[#647067] leading-relaxed">
                    {advisor.bio}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EAEFE8] flex flex-wrap gap-1.5">
                  {advisor.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-white text-[#59665D] px-2 py-0.5 rounded border border-[#EAEFE8]"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Executive Management Team */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Operational Management
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-2">
              Executive Management Team
            </h2>
            <p className="text-sm sm:text-base text-[#647067]">
              Day-to-day administration across incubator operations, laboratory
              management, training, and systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {executiveStaff.map((staff) => (
              <div
                key={staff.id}
                className="bg-white p-5 rounded-xl border border-[#DDE5DC] flex flex-col justify-between shadow-2xs hover:border-[#004B2A] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="w-11 h-11 rounded-full bg-[#E8F0D9] text-[#004B2A] font-heading font-extrabold text-sm flex items-center justify-center border border-[#73992A]/30">
                      {staff.avatarPlaceholder}
                    </div>
                    {staff.isVerified && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EAF5EE] text-[#1B7340]">
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#17231D] font-heading">
                      {staff.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#004B2A] mt-0.5">
                      {staff.role}
                    </div>
                  </div>

                  <p className="text-xs text-[#647067] leading-relaxed line-clamp-4">
                    {staff.bio}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#EAEFE8] flex flex-wrap gap-1">
                  {staff.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-medium bg-[#F8FAF7] text-[#59665D] px-1.5 py-0.5 rounded border border-[#EAEFE8]"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Contact and Mentorship Linkage */}
      <section className="bg-[#004B2A] text-white py-14 lg:py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Connect With the Incubation Leadership Team
            </h2>
            <p className="text-sm sm:text-base text-[#E8F0EB] leading-relaxed">
              Have inquiries about program eligibility, specialized lab access,
              or corporate CSR collaboration? Our team is available on the
              Sharadanagar campus.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white text-[#004B2A] hover:bg-[#F3F7EC] transition-colors shadow-sm min-h-[44px]"
              >
                <span>Contact Departmental Desk</span>
                <span className="ml-1.5 font-bold" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold border-1.5 border-white text-white hover:bg-white/10 transition-colors min-h-[44px]"
              >
                View Active Incubation Schemes
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
