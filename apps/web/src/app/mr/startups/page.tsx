import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "इनक्युबेटेड स्टार्टअप्स | एआयसी-एडीटी बारामती फाउंडेशन",
  description:
    "एआयसी-एडीटी बारामती फाउंडेशनने पाठबळ दिलेले कृषी तंत्रज्ञान, जैविक निविष्ठा आणि काढणीपश्चात तंत्रज्ञान क्षेत्रातील यशस्वी स्टार्टअप्स.",
};

export default function MarathiStartupsPage() {
  const breadcrumbItems = [
    { label: "मुख्यपृष्ठ", href: "/mr" },
    { label: "स्टार्टअप्स", href: "/mr/startups" },
  ];

  const startups = [
    {
      name: "ग्रामहीट (GramHeet)",
      sector: "काढणीपश्चात व्यवस्थापन व गोदाम वित्त",
      desc: "शेतकऱ्यांसाठी गाव पातळीवर डिजिटल बाजारपेठ आणि शीतगृह सुविधा, ज्यामुळे शेतमालाची नासाडी टळते.",
      metric: "३५,०००+ शेतकऱ्यांपर्यंत प्रसार",
      slug: "gramheet",
    },
    {
      name: "इनोसेपियन ॲग्रो टेक (Innosapien Agro Tech)",
      sector: "प्रिसिजन शेती आणि आयओटी (IoT)",
      desc: "पॉलीहाऊससाठी सेन्सर्स आणि वनस्पती आरोग्य मोजण्याची अत्याधुनिक प्रणाली.",
      metric: "११० एकर शेतावर प्रत्यक्ष प्रमाणीकरण",
      slug: "innosapien",
    },
    {
      name: "बायोप्राइम ॲग्रीसॉल्यूशन्स (BioPrime AgriSolutions)",
      sector: "जैविक खते आणि जैविक निविष्ठा",
      desc: "हवामान बदलास तोंड देणाऱ्या जैविक फॉर्म्युलेशन आणि वनस्पती प्रतिकारशक्ती वाढवणारे घटक.",
      metric: "डीएबीएल प्रयोगशाळा सहकार्य",
      slug: "bioprime",
    },
    {
      name: "ॲगहब इनोव्हेशन्स (AgHub Innovations)",
      sector: "शेती यांत्रिकीकरण व रोबोटिक्स",
      desc: "छोट्या शेतकऱ्यांसाठी परवडणारी आंतरमशागत करणारी यंत्रे आणि स्वयंचलित खुरपणी रोव्हर.",
      metric: "फॅबलॅब प्रोटोटाइप विकास",
      slug: "aghub",
    },
    {
      name: "भारतरोहन (BharatRohan)",
      sector: "ड्रोन आणि हायपरस्पेक्ट्रल इमेजिंग",
      desc: "ड्रोन तंत्रज्ञानाद्वारे पिकांवरील रोग व कीड नियंत्रणासाठी आगाऊ सूचना प्रणाली.",
      metric: "कृषी विज्ञान केंद्र बारामती चाचण्या",
      slug: "bharatrohan",
    },
    {
      name: "किसानकनेक्ट (Kisankonnect)",
      sector: "शेत ते ग्राहक थेट पुरवठा साखळी",
      desc: "शेतकऱ्यांकडून थेट ताज्या फळे व भाजीपाल्याची खरेदी आणि ग्राहकांपर्यंत वितरण.",
      metric: "एफपीओ (FPO) बाजारपेठ जोडणी",
      slug: "kisankonnect",
    },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold border border-[#73992A]/30">
            <span>🚀</span>
            <span>सहकार्य लाभलेले नवउद्योजक</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading leading-tight">
            इनक्युबेटेड स्टार्टअप्स निर्देशिका
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            एआयसी-एडीटी बारामती फाउंडेशनच्या माध्यमातून बीजभांडवल, प्रयोगशाळा
            आणि मार्गदर्शनाचा लाभ घेत ग्रामीण अर्थव्यवस्थेत क्रांती घडवणारे
            नवउद्योजक.
          </p>
        </header>

        {/* Startups Grid */}
        <section
          aria-label="स्टार्टअप्स यादी"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {startups.map((st) => (
            <div
              key={st.slug}
              className="bg-white rounded-xl border border-[#DDE5DC] p-6 space-y-4 hover:border-[#73992A] transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#73992A] block">
                  {st.sector}
                </span>
                <h2 className="text-xl font-bold text-[#17231D] font-heading">
                  {st.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
                  {st.desc}
                </p>
                <div className="pt-2 text-xs font-semibold text-[#004B2A]">
                  ★ {st.metric}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8F0EB] flex items-center justify-between text-xs">
                <Link
                  href={`/startups/${st.slug}`}
                  className="font-bold text-[#004B2A] hover:underline"
                >
                  इंग्रजी प्रोफाइल पहा →
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Search & Full Directory CTA */}
        <div className="p-6 bg-white rounded-xl border border-[#DDE5DC] text-center space-y-3">
          <p className="text-sm text-[#59665D]">
            संपूर्ण शोध आणि फिल्टरिंग सुविधेसाठी इंग्रजी निर्देशिका पहा.
          </p>
          <Link
            href="/startups"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#004B2A] text-white font-bold text-xs hover:bg-[#00643A] transition-colors"
          >
            Interactive Searchable Directory (English) →
          </Link>
        </div>
      </Container>
    </div>
  );
}
