import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "साधने आणि अहवाल | एआयसी-एडीटी बारामती फाउंडेशन",
  description:
    "एआयसी-एडीटी बारामती फाउंडेशनचे अधिकृत वार्षिक प्रगती अहवाल, संशोधन श्वेतपत्रिका, योजना मार्गदर्शक तत्त्वे आणि माहितीचा अधिकार (RTI) प्रकटीकरण.",
};

export default function MarathiResourcesPage() {
  const breadcrumbItems = [
    { label: "मुख्यपृष्ठ", href: "/mr" },
    { label: "साधने व अहवाल", href: "/mr/resources" },
  ];

  const pillars = [
    {
      title: "वार्षिक प्रगती अहवाल",
      desc: "नीती आयोग आणि अटल इनोव्हेशन मिशनकडे सादर केलेले अधिकृत वार्षिक अहवाल व आर्थिक माहिती.",
      href: "/resources/annual-reports",
      badge: "वैधानिक अहवाल",
    },
    {
      title: "संशोधन श्वेतपत्रिका (Whitepapers)",
      desc: "महाराष्ट्रातील कृषी-तंत्रज्ञान आणि लहान शेतकऱ्यांच्या यांत्रिकीकरणावर आधारित संशोधन अभ्यास.",
      href: "/resources/publications",
      badge: "वैज्ञानिक संशोधन",
    },
    {
      title: "योजनांची नियमावली व मार्गदर्शक तत्त्वे",
      desc: "स्टार्टअप इंडिया आणि मेईटी जेनेसिस योजनांचे अधिकृत नियम, पात्रता व करारपत्रे.",
      href: "/resources/program-guidelines",
      badge: "योजना नियम",
    },
    {
      title: "धोरणे व प्रकटीकरण (RTI & POSH)",
      desc: "माहितीचा अधिकार (RTI) अंतर्गत माहिती, कार्यस्थळी महिला सुरक्षा (POSH) आणि ब्रँड किट.",
      href: "/resources/policies-downloads",
      badge: "कायदेशीर माहिती",
    },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold border border-[#73992A]/30">
            <span>📚</span>
            <span>अधिकृत संस्थात्मक ज्ञानभांडार</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading leading-tight">
            संस्थात्मक साधने, अहवाल व धोरणे
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            पारदर्शकता आणि संशोधनाचा प्रसार करण्यासाठी एआयसी-एडीटी बारामती
            फाउंडेशनतर्फे प्रसिद्ध करण्यात आलेली अधिकृत प्रकाशने व वैधानिक
            माहिती.
          </p>
        </header>

        {/* 4 Pillars */}
        <section
          aria-label="दस्तऐवज स्तंभ"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-[#DDE5DC] hover:border-[#73992A] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#004B2A] bg-[#E8F0EB] px-2 py-0.5 rounded-full inline-block">
                  {p.badge}
                </span>
                <h2 className="text-lg font-bold text-[#17231D] font-heading">
                  {p.title}
                </h2>
                <p className="text-xs text-[#59665D] leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8F0EB]">
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#004B2A] hover:underline"
                >
                  <span>दस्तऐवज पहा (English)</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Translation Advisory Notice */}
        <div className="p-6 bg-white rounded-xl border border-[#DDE5DC] space-y-2">
          <h3 className="font-bold text-[#17231D] text-sm font-heading">
            अधिकृत दस्तऐवज भाषा टीप
          </h3>
          <p className="text-xs text-[#59665D] leading-relaxed">
            शासकीय नियमांनुसार सर्व कायदेशीर करार, लेखापरीक्षित वार्षिक अहवाल
            आणि योजनांची मूळ मार्गदर्शक तत्त्वे इंग्रजी भाषेत अंतिम मानली जातात.
            संशोधक व नागरिकांना संदर्भासाठी इंग्रजी प्रती उपलब्ध करून दिल्या
            आहेत.
          </p>
          <div className="pt-2">
            <Link
              href="/resources"
              className="text-xs font-bold text-[#004B2A] hover:underline"
            >
              Search English Knowledge Hub →
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
