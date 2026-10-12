import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { SUCCESS_STORIES } from "@/data/startups";

export const metadata: Metadata = {
  title: "Startup Success Stories & Impact Case Studies | AIC-ADT Baramati",
  description:
    "Read in-depth impact case studies of agritech ventures accelerated by AIC-ADT Baramati, including GramHeet and Innosapien Agro Technologies.",
};

export default function SuccessStoriesPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        badge="Grassroots Impact"
        badgeVariant="botanical"
        title="Startup Success Stories &amp; Empirical Case Studies"
        description="Detailed narratives examining how deep-tech inventions tested on our living farm testbeds and funded through central seed schemes generate measurable economic improvements for Indian smallholders."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Startups", href: "/startups" },
          { label: "Success Stories", href: "/startups/success-stories" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/startups"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              Full Startup Directory →
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              Apply for Incubation
            </Link>
          </div>
        }
      />

      {/* Case Studies Container */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="space-y-16 lg:space-y-24">
            {SUCCESS_STORIES.map((story) => (
              <article
                key={story.slug}
                id={story.slug}
                className="scroll-mt-24 p-8 sm:p-12 rounded-3xl bg-[#F8FAF7] border border-[#DDE5DC] shadow-2xs space-y-8"
              >
                {/* Story Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#DDE5DC]">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <Badge variant="botanical">{story.sector}</Badge>
                      <span className="text-xs font-bold text-[#59665D]">
                        Founders: {story.founderNames}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
                      {story.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#73992A] font-semibold">
                      {story.subtitle}
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#DDE5DC] text-center shrink-0 min-w-[200px] shadow-2xs">
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#004B2A] font-heading">
                      {story.heroMetric}
                    </div>
                    <div className="text-xs font-semibold text-[#59665D] mt-1">
                      {story.heroMetricLabel}
                    </div>
                  </div>
                </div>

                {/* 3-Stage Case Study Narrative */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-2xl border border-[#DDE5DC] space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] block">
                      1. The Rural Challenge
                    </span>
                    <h3 className="text-base font-bold text-[#17231D] font-heading">
                      The Market Dilemma
                    </h3>
                    <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                      {story.challengeNarrative}
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#DDE5DC] space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#004B2A] block">
                      2. Incubation Support
                    </span>
                    <h3 className="text-base font-bold text-[#17231D] font-heading">
                      The AIC-ADT Intervention
                    </h3>
                    <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                      {story.aicInterventionNarrative}
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#DDE5DC] space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#73992A] block">
                      3. Empirical Results
                    </span>
                    <h3 className="text-base font-bold text-[#17231D] font-heading">
                      Measured Farm Outcomes
                    </h3>
                    <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                      {story.empiricalOutcomeNarrative}
                    </p>
                  </div>
                </div>

                {/* Verified Founder Quote */}
                {story.verifiedQuotes.length > 0 && (
                  <div className="p-6 rounded-2xl bg-[#F3F7EC] border border-[#DDE5DC] border-l-4 border-l-[#004B2A]">
                    <blockquote className="text-xs sm:text-sm font-medium text-[#17231D] italic leading-relaxed">
                      &ldquo;{story.verifiedQuotes[0].quote}&rdquo;
                    </blockquote>
                    <div className="mt-3 text-xs font-bold text-[#004B2A]">
                      — {story.verifiedQuotes[0].author},{" "}
                      <span className="font-normal text-[#59665D]">
                        {story.verifiedQuotes[0].designation}
                      </span>
                    </div>
                  </div>
                )}

                {/* Milestones & Profile Link */}
                <div className="pt-4 border-t border-[#DDE5DC] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-wrap gap-2 text-xs">
                    {story.keyMilestones.map((milestone, idx) => (
                      <span
                        key={idx}
                        className="bg-white px-3 py-1 rounded-full border border-[#DDE5DC] text-[#59665D] font-medium"
                      >
                        ✓ {milestone}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/startups/${story.startupSlug}`}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors shrink-0 min-h-[44px]"
                  >
                    View Startup Dossier →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20">
        <Container>
          <div className="rounded-3xl border border-[#DDE5DC] bg-[#004B2A] text-white p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Build Your Own Agritech Success Story
            </h2>
            <p className="text-xs sm:text-sm text-[#E8F0EB] leading-relaxed">
              Join AIC-ADT Baramati Foundation to test on living farm acreage,
              access central grant schemes, and accelerate your commercial
              impact.
            </p>
            <div className="pt-2">
              <Link
                href="/programs/apply-instructions"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white text-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
              >
                Apply for Next Incubation Cohort →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
