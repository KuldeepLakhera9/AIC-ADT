import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CAMPUS_HEADQUARTERS } from "@/data/contact";

export const metadata: Metadata = {
  title: "संपर्क आणि संस्थात्मक निर्देशिका | एआयसी-एडीटी बारामती फाउंडेशन",
  description:
    "एआयसी-एडीटी बारामती फाउंडेशनशी संपर्क: संकुल पत्ता, इनक्युबेशन हेल्पलाइन, विभागनिहाय संपर्क आणि कामकाजाची वेळ.",
};

const MARATHI_DEPARTMENT_DESKS = [
  {
    id: "incubation-admissions",
    name: "इनक्युबेशन आणि स्टार्टअप सहाय्य कक्ष",
    leadRole: "इनक्युबेशन व्यवस्थापक",
    hours: "सकाळी १०:०० ते संध्याकाळी ५:३० (सोम-शुक्र)",
    focus:
      "स्टार्टअप प्रवेश, इनक्युबेशन अर्ज पडताळणी, सिड फंडिंग मार्गदर्शन आणि मेंटॉरशिप समन्वय.",
    phone: "+91 94049 84566",
    email: "incubation@aicadt.com",
  },
  {
    id: "nabl-testing-lab",
    name: "एनएबीएल प्रयोगशाळा आणि चाचणी विभाग",
    leadRole: "मुख्य विश्लेषक व प्रयोगशाळा प्रमुख",
    hours: "सकाळी ९:३० ते दुपारी ४:३० (सोम-शनि)",
    focus:
      "माती, पाणी, खते आणि शेती उत्पादनांचे रासायनिक परीक्षण, एनएबीएल प्रमाणपत्र सेवा.",
    phone: "+91 02112 255518",
    email: "lab@aicadt.com",
  },
  {
    id: "corporate-partnerships",
    name: "कॉर्पोरेट भागीदारी व सीएसआर कक्ष",
    leadRole: "सीएसआर आणि धोरणात्मक भागीदारी प्रमुख",
    hours: "सकाळी १०:०० ते संध्याकाळी ६:०० (सोम-शुक्र)",
    focus:
      "उद्योग भागीदारी, सीएसआर प्रकल्प, शेतकरी उत्पादन संस्था (एफपीओ) सहयोग आणि तंत्रज्ञान हस्तांतरण.",
    phone: "+91 94049 84566",
    email: "partnerships@aicadt.com",
  },
  {
    id: "general-administration",
    name: "प्रशासन आणि संकुल स्वागत कक्ष",
    leadRole: "प्रशासकीय अधिकारी",
    hours: "सकाळी ९:३० ते संध्याकाळी ६:०० (सोम-शनि)",
    focus:
      "संकुल भेट नियोजन, परिसरातील सुविधांची माहिती, सर्वसाधारण चौकशी आणि औपचारिक पत्रव्यवहार.",
    phone: "02112 255517",
    email: "info@aicadt.com",
  },
];

export default function MarathiContactPage() {
  const breadcrumbItems = [
    { label: "मुख्यपृष्ठ", href: "/mr" },
    { label: "संपर्क", href: "/mr/contact" },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold tracking-wide uppercase border border-[#73992A]/30">
            <span>📞</span>
            <span>संस्थात्मक हेल्पलाइन व संपर्क निर्देशिका</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
            एआयसी-एडीटी बारामतीशी संपर्क साधा
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            इनक्युबेशन प्रवेश कक्ष, एनएबीएल मान्यताप्राप्त प्रयोगशाळा, कॉर्पोरेट
            सीएसआर विभाग किंवा संकुल स्वागत कक्षाशी अधिकृत संस्थात्मक
            माध्यमांद्वारे थेट संपर्क साधा.
          </p>
        </header>

        {/* Quick Route Switchers */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-4 py-2 rounded-lg bg-[#004B2A] text-white font-bold shadow-2xs">
            सर्वसाधारण संपर्क व निर्देशिका
          </span>
          <Link
            href="/contact/partnerships"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            कॉर्पोरेट सीएसआर व भागीदारी कक्ष
          </Link>
          <Link
            href="/contact/directions"
            className="px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold hover:border-[#004B2A] hover:text-[#004B2A] transition-colors"
          >
            प्रवास मार्गदर्शक व पत्ता
          </Link>
        </div>

        {/* Primary Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Campus Headquarters */}
          <section className="bg-white rounded-2xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#E8F0EB] text-[#004B2A] flex items-center justify-center font-bold text-lg">
              📍
            </div>
            <h2 className="text-xl font-bold text-[#17231D] font-heading">
              संकुल मुख्यालय
            </h2>
            <address className="not-italic text-sm text-[#59665D] leading-relaxed space-y-1">
              <strong className="text-[#17231D] block font-semibold">
                {CAMPUS_HEADQUARTERS.institution}
              </strong>
              <span>ॲग्रिकल्चरल डेव्हलपमेंट ट्रस्ट संकुल,</span>
              <br />
              <span>{CAMPUS_HEADQUARTERS.address.line1},</span>
              <br />
              <span>
                {CAMPUS_HEADQUARTERS.address.city}, जिल्हा पुणे, महाराष्ट्र —{" "}
                {CAMPUS_HEADQUARTERS.address.pincode}
              </span>
            </address>

            <div className="pt-2 text-xs text-[#59665D] border-t border-[#E8F0EB] space-y-1">
              <div>
                <span className="font-semibold text-[#17231D]">
                  जीपीएस निर्देशांक:
                </span>{" "}
                {CAMPUS_HEADQUARTERS.coordinates.latitude},{" "}
                {CAMPUS_HEADQUARTERS.coordinates.longitude}
              </div>
              <div className="pt-1">
                <Link
                  href="/contact/directions"
                  className="font-bold text-[#004B2A] hover:underline"
                >
                  प्रवास मार्गदर्शक आणि नकाशे पहा →
                </Link>
              </div>
            </div>
          </section>

          {/* Card 2: Helpline Numbers */}
          <section className="bg-white rounded-2xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#E8F0EB] text-[#004B2A] flex items-center justify-center font-bold text-lg">
              ☎️
            </div>
            <h2 className="text-xl font-bold text-[#17231D] font-heading">
              अधिकृत हेल्पलाइन
            </h2>
            <div className="space-y-3 text-sm text-[#59665D]">
              <div>
                <span className="text-xs text-[#59665D] block">
                  इनक्युबेशन मोबाइल हेल्पलाइन:
                </span>
                <a
                  href={`tel:${CAMPUS_HEADQUARTERS.helplines.incubationMobile.replace(/\s+/g, "")}`}
                  className="text-base font-bold text-[#004B2A] hover:underline block"
                >
                  {CAMPUS_HEADQUARTERS.helplines.incubationMobile}
                </a>
              </div>

              <div>
                <span className="text-xs text-[#59665D] block">
                  संकुल लँडलाइन (स्वागत कक्ष):
                </span>
                <a
                  href={`tel:${CAMPUS_HEADQUARTERS.helplines.landlinePrimary.replace(/\s+/g, "")}`}
                  className="font-bold text-[#17231D] hover:text-[#004B2A] hover:underline block"
                >
                  {CAMPUS_HEADQUARTERS.helplines.landlinePrimary} / 255518
                </a>
              </div>

              <div className="pt-2 border-t border-[#E8F0EB] text-xs">
                <span className="font-semibold text-[#17231D] block">
                  कामाची वेळ:
                </span>
                <span>सोमवार ते शनिवार: सकाळी ९:३० ते संध्याकाळी ६:००</span>
              </div>
            </div>
          </section>

          {/* Card 3: Institutional Email */}
          <section className="bg-white rounded-2xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#E8F0EB] text-[#004B2A] flex items-center justify-center font-bold text-lg">
              ✉️
            </div>
            <h2 className="text-xl font-bold text-[#17231D] font-heading">
              संस्थात्मक ईमेल
            </h2>
            <div className="space-y-3 text-sm text-[#59665D]">
              <div>
                <span className="text-xs text-[#59665D] block">
                  मुख्य ईमेल पत्ता:
                </span>
                <a
                  href={`mailto:${CAMPUS_HEADQUARTERS.emails.general}`}
                  className="text-base font-bold text-[#004B2A] hover:underline block break-all"
                >
                  {CAMPUS_HEADQUARTERS.emails.general}
                </a>
              </div>

              <p className="text-xs text-[#59665D] leading-relaxed">
                प्राप्त झालेल्या सर्व चौकशी संदेशांची एका व्यावसायिक दिवसाच्या
                आत संबंधित अधिकाऱ्यांकडे वर्गवारी केली जाते.
              </p>

              <div className="pt-2 border-t border-[#E8F0EB]">
                <a
                  href={`mailto:${CAMPUS_HEADQUARTERS.emails.general}?subject=AIC-ADT%20Inquiry%20from%20Marathi%20Portal`}
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-[#004B2A] text-white font-bold text-xs hover:bg-[#00643A] transition-colors"
                >
                  <span>केंद्रीय कक्षाला ईमेल पाठवा</span>
                  <span aria-hidden="true" className="ml-1">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Specialized Departmental Desks Section */}
        <section
          aria-labelledby="department-desks-heading"
          className="space-y-6"
        >
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
              विभागनिहाय संपर्क व्यवस्था
            </span>
            <h2
              id="department-desks-heading"
              className="text-2xl sm:text-3xl font-bold text-[#17231D] font-heading"
            >
              विशेष विभाग आणि संपर्क कक्ष
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MARATHI_DEPARTMENT_DESKS.map((desk) => (
              <div
                key={desk.id}
                className="bg-white rounded-xl border border-[#DDE5DC] p-6 space-y-4 hover:border-[#73992A] transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#004B2A] bg-[#E8F0EB] px-2.5 py-0.5 rounded-full">
                      {desk.leadRole}
                    </span>
                    <span className="text-xs text-[#59665D]">{desk.hours}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#17231D] font-heading">
                    {desk.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
                    {desk.focus}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8F0EB] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[#59665D] mr-1">फोन:</span>
                    <a
                      href={`tel:${desk.phone.replace(/\s+/g, "")}`}
                      className="font-bold text-[#17231D] hover:text-[#004B2A]"
                    >
                      {desk.phone}
                    </a>
                  </div>
                  <a
                    href={`mailto:${desk.email}?subject=चौकशी:%20${encodeURIComponent(desk.name)}`}
                    className="font-bold text-[#004B2A] hover:underline"
                  >
                    थेट ईमेल पाठवा →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Direct Action Notice */}
        <section className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-[#17231D] font-heading">
            थेट संप्रेषण आणि पडताळणी धोरण
          </h2>
          <p className="text-xs sm:text-sm text-[#59665D] leading-relaxed">
            संस्थेच्या डेटा सुरक्षा धोरणानुसार, सर्व संवाद केवळ अधिकृत ईमेल आणि
            दूरध्वनी वाहिन्यांद्वारे केला जातो. कोणत्याही अनधिकृत फॉर्म किंवा
            मध्यस्थांवर विश्वास ठेवू नये. संकुलातील प्रयोगशाळा किंवा इनक्युबेटर
            कार्यालयांना प्रत्यक्ष भेट देण्यासाठी कृपया पूर्वसूचना द्यावी.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
            <Link
              href="/about/infrastructure"
              className="text-[#004B2A] hover:underline"
            >
              संकुलातील सुविधांची माहिती पहा →
            </Link>
            <Link
              href="/programs/apply-instructions"
              className="text-[#004B2A] hover:underline"
            >
              इनक्युबेशन अर्ज प्रक्रिया वाचा →
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
