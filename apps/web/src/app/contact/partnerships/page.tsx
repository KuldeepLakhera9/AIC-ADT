import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CAMPUS_HEADQUARTERS } from "@/data/contact";

export const metadata: Metadata = {
  title: "Corporate CSR & Institutional Partnerships Desk | AIC-ADT Baramati",
  description:
    "Direct intake desk for corporate CSR agriculture programs, university research MoUs, investor syndicate empanelment, and sector mentors.",
};

export default function PartnershipsContactPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
    { label: "Partnerships Desk", href: "/contact/partnerships" },
  ];

  const partnershipTracks = [
    {
      title: "Corporate CSR Partnerships (Section 135)",
      description:
        "Collaborate on high-impact smallholder agriculture interventions, climate-tech pilots, women farmer entrepreneurship, and rural livelihood generation.",
      examples: "Capgemini, HDFC Bank Parivartan, ED&F Man Commodities",
      action: "csr@adtbaramati.com / aicadt@adtbaramati.com",
    },
    {
      title: "Academic & ICAR Research MoUs",
      description:
        "Joint research translation, doctoral candidate testbed access, technology transfer of indigenous biotech formulations, and scientific symposiums.",
      examples: "ICAR-KVK Baramati, State Agricultural Universities, CFTRI",
      action: "aicadt@adtbaramati.com",
    },
    {
      title: "Venture Capital & Angel Syndicates",
      description:
        "Participate in closed demo days, evaluate DPIIT SISFS / MeitY GENESIS cohorts, co-invest alongside catalytic seed grants, and provide commercial market linkages.",
      examples: "Omnivore, Ankur Capital, Bharat Innovation Fund network",
      action: "aicadt@adtbaramati.com",
    },
    {
      title: "Mentor Empanelment Network",
      description:
        "Senior agronomists, IP attorneys, precision hardware engineers, and supply chain veterans guiding resident founders through structured advisory sessions.",
      examples: "69+ active empaneled domain experts",
      action: "aicadt@adtbaramati.com",
    },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold tracking-wide uppercase border border-[#73992A]/30">
            <span>🤝</span>
            <span>Strategic Ecosystem Alliances</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
            Corporate CSR &amp; Partnership Desk
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            Collaborate with AIC-ADT to scale rural entrepreneurship, deploy
            corporate social responsibility funds in deep-tech agriculture, and
            build transformative farm-to-fork linkages.
          </p>
        </header>

        {/* Navigation Switchers */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            ← General Contact &amp; Helplines
          </Link>
          <span className="px-4 py-2 rounded-lg bg-[#004B2A] text-white font-bold shadow-2xs">
            Partnership Desk
          </span>
          <Link
            href="/about/partners"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            Institutional Partners Directory
          </Link>
          <Link
            href="/programs/schemes/csr"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            CSR Schemes Overview
          </Link>
        </div>

        {/* 4 Partnership Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {partnershipTracks.map((track, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4 hover:border-[#73992A] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#17231D] font-heading">
                  {track.title}
                </h2>
                <p className="text-sm text-[#59665D] leading-relaxed">
                  {track.description}
                </p>
                <div className="pt-2 text-xs text-[#59665D]">
                  <span className="font-semibold text-[#17231D]">
                    Ecosystem References:
                  </span>{" "}
                  <span>{track.examples}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8F0EB]">
                <a
                  href={`mailto:${CAMPUS_HEADQUARTERS.emails.partnerships}?subject=Partnership%20Inquiry:%20${encodeURIComponent(track.title)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004B2A] hover:underline"
                >
                  <span>Inquire via Partnership Desk</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Outreach Secretariat Card */}
        <section className="bg-white rounded-2xl border-2 border-[#004B2A] p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
              Direct Executive Contact
            </span>
            <h2 className="text-2xl font-bold text-[#17231D] font-heading">
              Connect with Strategic Outreach Leadership
            </h2>
            <p className="text-sm text-[#59665D] leading-relaxed max-w-3xl">
              For corporate foundations, CSR committees, or academic delegations
              planning formal campus audits and MoU signings, our leadership
              team provides structured briefing dossiers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E8F0EB] text-xs">
            <div>
              <span className="text-[#59665D] block mb-1">Direct Email:</span>
              <a
                href={`mailto:${CAMPUS_HEADQUARTERS.emails.partnerships}`}
                className="font-bold text-sm text-[#004B2A] hover:underline break-all"
              >
                {CAMPUS_HEADQUARTERS.emails.partnerships}
              </a>
            </div>
            <div>
              <span className="text-[#59665D] block mb-1">
                Direct Telephone:
              </span>
              <a
                href={`tel:${CAMPUS_HEADQUARTERS.helplines.landlinePrimary.replace(/\s+/g, "")}`}
                className="font-bold text-sm text-[#17231D] hover:text-[#004B2A]"
              >
                {CAMPUS_HEADQUARTERS.helplines.landlinePrimary}
              </a>
            </div>
            <div>
              <span className="text-[#59665D] block mb-1">
                Secretariat Office:
              </span>
              <span className="font-semibold text-sm text-[#17231D] block">
                Sharadanagar Campus, Baramati
              </span>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
