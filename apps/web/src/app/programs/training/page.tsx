import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { TRAINING_MODULES } from "@/data/programs";

export const metadata: Metadata = {
  title: "Training Bootcamps & Capacity Building | AIC-ADT Baramati Foundation",
  description:
    "Explore practical agritech bootcamps, millet processing workshops, IoT fabrication seminars, and NABL soil diagnostics training at AIC-ADT Baramati.",
};

export default function TrainingPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        badge="Capacity Building"
        badgeVariant="botanical"
        title="Hands-On Agritech Bootcamps &amp; Practical Workshops"
        description="Empowering rural youth, progressive farmers, women self-help groups, and engineering innovators with practical technical skills in food technology, hardware IoT, and statutory enterprise governance."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
          { label: "Training", href: "/programs/training" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              Inquire About Workshops →
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              Incubation Continuum
            </Link>
          </div>
        }
      />

      {/* Modules Grid */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Structured Curriculum
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
              Featured Capacity Building Modules
            </h2>
            <p className="text-sm sm:text-base text-[#59665D] mt-2">
              Practical learning sessions hosted inside our operational campus
              laboratories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TRAINING_MODULES.map((mod) => (
              <div
                key={mod.id}
                className="bg-[#F8FAF7] p-8 rounded-2xl border border-[#DDE5DC] shadow-2xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="botanical">{mod.category}</Badge>
                    <span className="text-xs font-semibold text-[#59665D]">
                      {mod.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#17231D] font-heading">
                    {mod.title}
                  </h3>

                  <div className="text-xs font-semibold text-[#73992A]">
                    Audience: {mod.targetAudience}
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#59665D] block">
                      Core Syllabus Topics
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#17231D]">
                      {mod.keyTopics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#004B2A] font-bold">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EAEFE8] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <span className="text-[11px] text-[#59665D]">
                    {mod.certification}
                  </span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
                  >
                    Register / Inquire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Institutional FPO Workshop Intake */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20">
        <Container>
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#DDE5DC] max-w-3xl space-y-4 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
              Custom Training for Organizations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
              Conduct a Customized Training Program for Your FPO or College
            </h2>
            <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
              We design tailored 2-day to 5-day residential bootcamps for Farmer
              Producer Organizations, agricultural universities, and corporate
              CSR cohorts utilizing our campus hostel, cafeteria, and lab
              facilities.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
              >
                Contact Training Coordinator (Mr. Abhishek Gite) →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
