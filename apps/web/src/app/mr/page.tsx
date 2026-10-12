import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { mrDictionary } from "@/lib/i18n/dictionaries/mr";

export const metadata: Metadata = {
  title: "मुख्यपृष्ठ | एआयसी-एडीटी बारामती फाउंडेशन",
  description:
    "अटल इनक्युबेशन केंद्र - ॲग्रिकल्चरल डेव्हलपमेंट ट्रस्ट बारामती. कृषी-तंत्रज्ञान, अन्न प्रक्रिया आणि ग्रामीण नवउद्योगांसाठी राष्ट्रीय इनक्युबेटर.",
};

export default function MarathiHomePage() {
  const dict = mrDictionary;

  const pillars = [
    {
      title: dict.home.pillarScience.title,
      description: dict.home.pillarScience.desc,
      icon: "🔬",
      href: "/mr/innovation",
    },
    {
      title: dict.home.pillarFunding.title,
      description: dict.home.pillarFunding.desc,
      icon: "🌱",
      href: "/mr/programs",
    },
    {
      title: dict.home.pillarMentors.title,
      description: dict.home.pillarMentors.desc,
      icon: "👥",
      href: "/programs/mentorship",
    },
  ];

  const impactMetrics = [
    {
      value: "५०+",
      label: "इनक्युबेटेड आणि मार्गदर्शित स्टार्टअप्स",
      period: "सन २०२४-२५",
    },
    {
      value: "₹५.२ कोटी+",
      label: "एकत्रित बीजभांडवल आणि अनुदान",
      period: "सन २०२१–२५",
    },
    {
      value: "३५,०००+",
      label: "शेतकऱ्यांपर्यंत तंत्रज्ञानाचा थेट प्रसार",
      period: "सन २०२४-२५",
    },
    {
      value: "४२+",
      label: "सुलभ बौद्धिक संपदा आणि पेटंट अर्ज",
      period: "सन २०२४-२५",
    },
  ];

  const quickPillars = [
    {
      title: "आमच्याबद्दल",
      href: "/mr/about",
      desc: "संस्थेची पार्श्वभूमी आणि ५० वर्षांचा वारसा",
    },
    {
      title: "योजना व कार्यक्रम",
      href: "/mr/programs",
      desc: "प्री-इनक्युबेशन, इनक्युबेशन व एक्सेलरेटर",
    },
    {
      title: "स्टार्टअप्स निर्देशिका",
      href: "/mr/startups",
      desc: "ग्रामहीट, इनोसेपियन व इतर यशस्वी नवउद्योजक",
    },
    {
      title: "कृषी नवसंशोधन",
      href: "/mr/innovation",
      desc: "स्मार्ट शेती, ड्रोन, अन्न प्रक्रिया व हवामान तंत्रज्ञान",
    },
    {
      title: "कार्यक्रम व कार्यशाळा",
      href: "/mr/events",
      desc: "प्रशिक्षण शिबिरे आणि राष्ट्रीय अर्ज मुदती",
    },
    {
      title: "साधने व अहवाल",
      href: "/mr/resources",
      desc: "वार्षिक अहवाल, मार्गदर्शक तत्त्वे व कायदेशीर माहिती",
    },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12 space-y-12 sm:space-y-16">
      <Container className="space-y-12">
        {/* Hero Section */}
        <header className="space-y-6 max-w-4xl pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold tracking-wide border border-[#73992A]/30">
            <span>🌱</span>
            <span>{dict.home.overline}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading leading-[1.3] sm:leading-[1.25]">
            {dict.home.headline}
          </h1>

          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed max-w-3xl">
            {dict.home.body}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/mr/programs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#004B2A] text-white font-bold text-sm hover:bg-[#00643A] transition-colors shadow-2xs"
            >
              <span>{dict.common.explorePrograms}</span>
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
            <Link
              href="/mr/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-bold text-sm hover:bg-[#E8F0EB] hover:text-[#004B2A] hover:border-[#004B2A] transition-colors"
            >
              <span>{dict.nav.contact}</span>
            </Link>
          </div>

          {/* Credentials */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-[#DDE5DC]">
            {dict.home.credentials.map((cred, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#004B2A] bg-white px-3 py-1.5 rounded-full border border-[#DDE5DC]"
              >
                <span className="text-[#73992A]">✓</span>
                <span>{cred}</span>
              </span>
            ))}
          </div>
        </header>

        {/* 3 Core Pillars */}
        <section
          aria-label="मुख्य संस्थात्मक स्तंभ"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-xl border border-[#DDE5DC] shadow-xs space-y-4 flex flex-col justify-between hover:border-[#73992A] transition-all"
            >
              <div className="space-y-3">
                <span className="text-3xl" aria-hidden="true">
                  {pillar.icon}
                </span>
                <h2 className="text-xl font-bold text-[#17231D] font-heading">
                  {pillar.title}
                </h2>
                <p className="text-sm text-[#59665D] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href={pillar.href}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#004B2A] hover:underline"
                >
                  <span>{dict.common.learnMore}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Impact Metrics Banner */}
        <section
          aria-label="प्रमाणित संस्थात्मक आकडेवारी"
          className="bg-[#004B2A] text-white rounded-2xl p-8 sm:p-12 space-y-8"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
              नीती आयोग व केंद्र शासनाकडे प्रमाणित
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              संख्यात्मक प्रभाव आणि उपलब्धी
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-white/20">
            {impactMetrics.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#E8F0D9] font-heading">
                  {m.value}
                </div>
                <div className="text-xs font-semibold text-white/90">
                  {m.label}
                </div>
                <div className="text-[11px] text-white/60">{m.period}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 6 Thematic Section Hubs */}
        <section aria-label="प्रमुख विभाग" className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
              मार्गदर्शन
            </span>
            <h2 className="text-2xl font-bold text-[#17231D] font-heading">
              संकेतस्थळाचे प्रमुख विभाग
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickPillars.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="bg-white p-6 rounded-xl border border-[#DDE5DC] hover:border-[#73992A] hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#17231D] font-heading group-hover:text-[#004B2A] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#59665D] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E8F0EB] text-xs font-bold text-[#004B2A] flex items-center justify-between">
                  <span>पहा</span>
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
