import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "आमच्याबद्दल | एआयसी-एडीटी बारामती फाउंडेशन",
  description:
    "एआयसी-एडीटी बारामती फाउंडेशनची स्थापना, अटल इनोव्हेशन मिशनचा राष्ट्रीय जनादेश आणि ॲग्रिकल्चरल डेव्हलपमेंट ट्रस्टचा ५० वर्षांचा वारसा.",
};

export default function MarathiAboutPage() {
  const breadcrumbItems = [
    { label: "मुख्यपृष्ठ", href: "/mr" },
    { label: "आमच्याबद्दल", href: "/mr/about" },
  ];

  const sections = [
    {
      title: "ध्येय, उद्दिष्टे आणि मूल्ये",
      desc: "शाश्वत कृषी विकास आणि ग्रामीण आर्थिक सक्षमीकरणासाठीची दिशा.",
      href: "/about/mission-vision",
    },
    {
      title: "नेतृत्व आणि संचालक मंडळ",
      desc: "संस्थेचे नियामक मंडळ, सल्लागार समिती आणि कार्यकारी व्यवस्थापन.",
      href: "/about/leadership",
    },
    {
      title: "परिसर आणि पायाभूत सुविधा",
      desc: "११० एकर प्रात्यक्षिक शेत, एनएबीएल प्रयोगशाळा आणि फॅबलॅब मेकर्सपेस.",
      href: "/about/infrastructure",
    },
    {
      title: "संस्थात्मक भागीदार",
      desc: "केंद्र शासन, कॉर्पोरेट सीएसआर, विद्यापीठे आणि गुंतवणूकदार जाळे.",
      href: "/about/partners",
    },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold border border-[#73992A]/30">
            <span>🏛️</span>
            <span>संस्थात्मक ओळख आणि वारसा</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading leading-tight">
            एआयसी-एडीटी बारामती फाउंडेशन
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            अटल इनोव्हेशन मिशन (नीती आयोग, भारत सरकार) द्वारे मान्यताप्राप्त आणि
            ॲग्रिकल्चरल डेव्हलपमेंट ट्रस्ट, बारामती संचलित कृषी क्षेत्रातील
            अग्रगण्य इनक्युबेशन केंद्र.
          </p>
        </header>

        <section className="bg-white rounded-2xl border border-[#DDE5DC] p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl font-bold text-[#17231D] font-heading">
            संस्थेची पार्श्वभूमी
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#59665D] leading-relaxed">
            <p>
              ॲग्रिकल्चरल डेव्हलपमेंट ट्रस्ट (एडीटी), बारामती गेल्या पाच
              दशकांहून अधिक काळ कृषी शिक्षण, महिला सक्षमीकरण आणि ग्रामीण
              संशोधनात कार्यरत आहे. या भक्कम पायावर जून २०१९ मध्ये केंद्र
              शासनाच्या नीती आयोगांतर्गत &apos;एआयसी-एडीटी बारामती
              फाउंडेशन&apos; या सेक्शन ८ कंपनीची स्थापना करण्यात आली.
            </p>
            <p>
              संस्थेचा मुख्य उद्देश प्रयोगशाळेत निर्माण होणारे अत्याधुनिक
              तंत्रज्ञान प्रत्यक्ष शेतकऱ्यांच्या बांधापर्यंत पोहोचवणे आणि
              ग्रामीण भागातील तरुण नवउद्योजकांना स्वावलंबी बनवणे हा आहे.
            </p>
          </div>
        </section>

        <section
          aria-label="संबंधित विभाग"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {sections.map((sec, idx) => (
            <Link
              key={idx}
              href={sec.href}
              className="bg-white p-6 rounded-xl border border-[#DDE5DC] hover:border-[#73992A] hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#17231D] font-heading">
                  {sec.title}
                </h3>
                <p className="text-xs text-[#59665D] leading-relaxed">
                  {sec.desc}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#E8F0EB] text-xs font-bold text-[#004B2A] flex items-center justify-between">
                <span>सविस्तर पहा (English)</span>
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </section>
      </Container>
    </div>
  );
}
