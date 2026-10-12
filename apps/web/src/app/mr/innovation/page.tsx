import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "कृषी नवसंशोधन आणि तंत्रज्ञान | एआयसी-एडीटी बारामती फाउंडेशन",
  description:
    "एआयसी-एडीटी बारामती फाउंडेशनचे ६ प्रमुख संशोधन क्षेत्र: कृषी यांत्रिकीकरण, स्मार्ट शेती, अन्न प्रक्रिया, हवामान तंत्रज्ञान आणि कृषी एआय.",
};

export default function MarathiInnovationPage() {
  const breadcrumbItems = [
    { label: "मुख्यपृष्ठ", href: "/mr" },
    { label: "नवसंशोधन", href: "/mr/innovation" },
  ];

  const domains = [
    {
      title: "कृषी तंत्रज्ञान आणि यांत्रिकीकरण",
      desc: "स्वयंचलित खुरपणी यंत्रे, इलेक्ट्रोस्टॅटिक ड्रोन फवारणी आणि लहान शेतांसाठी उपयुक्त अवजारे.",
      href: "/innovation/agri-tech",
      icon: "🚜",
    },
    {
      title: "स्मार्ट शेती आणि आयओटी सेन्सर्स",
      desc: "मातीतील ओलावा मोजणारे सेन्सर्स, सूक्ष्म हवामान टॉवर्स आणि स्वयंचलित सिंचन नियंत्रक.",
      href: "/innovation/smart-farming",
      icon: "📡",
    },
    {
      title: "अन्न प्रक्रिया आणि भरडधान्ये (Millets)",
      desc: "व्हॅक्यूम डिहायड्रेशन, मूल्यवर्धन, रिटॉर्ट पॅकेजिंग आणि एनएबीएल पोषणमूल्य चाचण्या.",
      href: "/innovation/food-processing",
      icon: "🌾",
    },
    {
      title: "कृषी व्यवसाय आणि बाजारपेठ जोडणी",
      desc: "गाव पातळीवरील शीतगृहे, गोदाम पावती वित्तपुरवठा आणि डिजिटल शेतमाल प्रतवारी.",
      href: "/innovation/agribusiness",
      icon: "🏪",
    },
    {
      title: "हवामान-अनुकूल शेती (Climate Tech)",
      desc: "सौरऊर्जेवर चालणारी यंत्रे, बायोचार निर्मिती, पिकांचे अवशेष व्यवस्थापन आणि सेंद्रिय खते.",
      href: "/innovation/climate-tech",
      icon: "☀️",
    },
    {
      title: "डिजिटल शेती आणि कृत्रिम बुद्धिमत्ता (AI)",
      desc: "मोबाईल कॅमेऱ्याद्वारे कीड व रोग निदान, उपग्रह आधारित पीक निरीक्षण आणि स्थानिक भाषेतील सल्ला.",
      href: "/innovation/digital-agri-ai",
      icon: "🤖",
    },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold border border-[#73992A]/30">
            <span>🔬</span>
            <span>अत्याधुनिक कृषी संशोधन</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading leading-tight">
            कृषी नवसंशोधन आणि तंत्रज्ञान क्षेत्रे
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            ग्रामीण महाराष्ट्रातील शेती अधिक फायदेशीर आणि पर्यावरणपूरक
            करण्यासाठी ६ प्रमुख प्राधान्य क्षेत्रांमध्ये विकसित होत असलेली
            आधुनिक तंत्रज्ञाने.
          </p>
        </header>

        {/* 6 Domains Grid */}
        <section
          aria-label="संशोधन क्षेत्रे"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {domains.map((d, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#DDE5DC] p-6 space-y-4 hover:border-[#73992A] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-3xl" aria-hidden="true">
                  {d.icon}
                </span>
                <h2 className="text-xl font-bold text-[#17231D] font-heading">
                  {d.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
                  {d.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8F0EB]">
                <Link
                  href={d.href}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#004B2A] hover:underline"
                >
                  <span>तांत्रिक तपशील पहा (English)</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </section>
      </Container>
    </div>
  );
}
