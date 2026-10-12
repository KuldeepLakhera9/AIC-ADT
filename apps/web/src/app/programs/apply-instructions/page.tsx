import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import {
  APPLICATION_STEPS,
  APPLICATION_DOCUMENT_CHECKLIST,
  APPLICATION_FAQS,
} from "@/data/programs";

export const metadata: Metadata = {
  title:
    "Application Instructions, Rubric & FAQs | AIC-ADT Baramati Foundation",
  description:
    "Step-by-step application instructions, required document checklist, evaluation rubric, and official FAQs for prospective AIC-ADT agritech applicants.",
};

export default function ApplyInstructionsPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        badge="Applicant Guidance"
        badgeVariant="botanical"
        title="Application Guidelines, Document Checklist &amp; FAQs"
        description="Everything you need to know before submitting your agritech startup application: from preliminary eligibility checks and scoring rubrics to intellectual property guidelines."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
          {
            label: "Application Instructions",
            href: "/programs/apply-instructions",
          },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              Contact Incubation Desk →
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              Compare Programs
            </Link>
          </div>
        }
      />

      {/* 1. Step-by-Step Application Process */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Admissions Roadmap
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
              Six Steps from Application to Induction
            </h2>
            <p className="text-sm sm:text-base text-[#59665D] mt-2">
              Our transparent review timeline typically spans 3 to 4 weeks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPLICATION_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] relative shadow-2xs"
              >
                <span className="text-sm font-extrabold text-[#004B2A] font-mono block mb-2">
                  Step {step.stepNumber}
                </span>
                <h3 className="text-base font-bold text-[#17231D] font-heading">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#647067] mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. Required Document Checklist & Evaluation Rubric */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Document Checklist */}
            <div className="bg-white p-8 rounded-2xl border border-[#DDE5DC] shadow-2xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Submission Dossier
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
                Required Document Checklist
              </h2>
              <p className="text-xs sm:text-sm text-[#647067]">
                Please ensure all documentation is saved in high-resolution PDF
                format before beginning your online submission.
              </p>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#17231D]">
                {APPLICATION_DOCUMENT_CHECKLIST.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#004B2A] font-bold">✓</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Evaluation Rubric */}
            <div className="bg-white p-8 rounded-2xl border border-[#DDE5DC] shadow-2xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Selection Framework
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
                Evaluation Scoring Rubric
              </h2>
              <p className="text-xs sm:text-sm text-[#647067]">
                Our Technical Evaluation Committee scores proposals across four
                equal weighted dimensions (total 100 points):
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-[#F8FAF7] border border-[#EAEFE8]">
                  <div className="flex justify-between items-center text-xs font-bold text-[#17231D]">
                    <span>1. Technological Novelty &amp; Deep-Tech IP</span>
                    <span className="text-[#004B2A]">25%</span>
                  </div>
                  <p className="text-[11px] text-[#647067] mt-1">
                    Uniqueness of patentable hardware, microbial formulations,
                    or proprietary edge algorithms.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAF7] border border-[#EAEFE8]">
                  <div className="flex justify-between items-center text-xs font-bold text-[#17231D]">
                    <span>2. Agricultural Relevance &amp; Farmer Need</span>
                    <span className="text-[#004B2A]">25%</span>
                  </div>
                  <p className="text-[11px] text-[#647067] mt-1">
                    Potential to tangibly enhance crop yield, lower input
                    expenses, or eliminate post-harvest distress.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAF7] border border-[#EAEFE8]">
                  <div className="flex justify-between items-center text-xs font-bold text-[#17231D]">
                    <span>3. Commercial Scalability &amp; Unit Economics</span>
                    <span className="text-[#004B2A]">25%</span>
                  </div>
                  <p className="text-[11px] text-[#647067] mt-1">
                    Clarity of business model canvas, customer acquisition
                    strategy, and market addressability.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAF7] border border-[#EAEFE8]">
                  <div className="flex justify-between items-center text-xs font-bold text-[#17231D]">
                    <span>
                      4. Founder Capability &amp; Campus Facility Leverage
                    </span>
                    <span className="text-[#004B2A]">25%</span>
                  </div>
                  <p className="text-[11px] text-[#647067] mt-1">
                    Complementary technical skills of founders and clear
                    necessity of Baramati&apos;s farm/lab testbeds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Official Frequently Asked Questions */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Common Inquiries
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#59665D] mt-2">
              Official answers addressing eligibility, equity policy, grants,
              and living farm testbeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {APPLICATION_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] space-y-2 shadow-2xs"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="botanical">{faq.category}</Badge>
                </div>
                <h3 className="text-base font-bold text-[#17231D] font-heading">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Bottom Support CTA */}
      <section className="bg-[#004B2A] text-white py-12">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold font-heading">
                Have a Specific Eligibility or Grant Question?
              </h3>
              <p className="text-xs sm:text-sm text-[#E8F0EB] mt-1">
                Reach out to our incubation management desk for personalized
                application assistance.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white text-[#004B2A] hover:bg-[#F3F7EC] transition-colors shrink-0 min-h-[44px]"
            >
              Contact Incubation Desk →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
