import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "कार्यक्रम आणि कार्यशाळा | एआयसी-एडीटी बारामती फाउंडेशन",
  description:
    "एआयसी-एडीटी बारामती फाउंडेशनच्या आगामी कृषी कार्यशाळा, प्रशिक्षण शिबिरे, डेमो डे आणि शासकीय अर्ज मुदती.",
};

export default function MarathiEventsPage() {
  const breadcrumbItems = [
    { label: "मुख्यपृष्ठ", href: "/mr" },
    { label: "कार्यक्रम", href: "/mr/events" },
  ];

  const events = [
    {
      title: "स्टार्टअप इंडिया सीड फंड (SISFS) कोहॉर्ट ४ अर्ज मुदत",
      date: "३० नोव्हेंबर २०२६",
      venue: "ऑनलाईन राष्ट्रीय पोर्टल (DPIIT)",
      status: "आगामी (सक्रिय)",
      desc: "₹२० लाखांपर्यंत प्रोटोटाइप अनुदान आणि ₹५० लाखांपर्यंत कर्ज. पात्र कृषी स्टार्टअप्सकडून अधिकृत पोर्टलवर अर्ज मागवण्यात येत आहेत.",
      actionLabel: "शासकीय पोर्टलवर अर्ज करा",
      actionUrl: "https://seedfund.startupindia.gov.in/",
      isExternal: true,
    },
    {
      title: "भरडधान्य (Millet) मूल्यवर्धन व एफएसएसएआय नियम कार्यशाळा",
      date: "०८ डिसेंबर २०२६",
      venue: "अन्न प्रक्रिया पायलट प्लांट, शारदानगर, बारामती",
      status: "आगामी",
      desc: "व्हॅक्यूम ड्रायिंग, पोषणमूल्य चाचण्या आणि अन्न सुरक्षा परवान्यांबाबत प्रात्यक्षिकासह सविस्तर तांत्रिक मार्गदर्शन.",
      actionLabel: "तपशील पहा (English)",
      actionUrl: "/events/millet-processing-workshop",
      isExternal: false,
    },
    {
      title: "कृषी-रोबोटिक्स व स्वयंचलित सेन्सर्स शेत प्रात्यक्षिक दिन",
      date: "१५ डिसेंबर २०२६",
      venue: "सेंटर ऑफ एक्सलन्स प्रात्यक्षिक शेत, बारामती",
      status: "आगामी",
      desc: "स्वयंचलित खुरपणी रोव्हर्स, इलेक्ट्रोस्टॅटिक ड्रोन फवारणी आणि मातीतील ओलावा सेन्सर्सचे थेट शेतावर प्रात्यक्षिक.",
      actionLabel: "तपशील पहा (English)",
      actionUrl: "/events/agri-robotics-demo-day",
      isExternal: false,
    },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold border border-[#73992A]/30">
            <span>📅</span>
            <span>कार्यक्रमांची दिनदर्शिका</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading leading-tight">
            कार्यक्रमांची दिनदर्शिका व कार्यशाळा
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            शेतकरी, कृषी संशोधक आणि नवउद्योजकांसाठी आयोजित केल्या जाणाऱ्या
            तांत्रिक कार्यशाळा, प्रात्यक्षिक दिवस आणि शासकीय योजनांच्या अर्ज
            मुदती.
          </p>
        </header>

        {/* Events Grid */}
        <section
          aria-label="आगामी कार्यक्रम यादी"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {events.map((ev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#DDE5DC] p-6 space-y-4 hover:border-[#73992A] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#004B2A] bg-[#E8F0EB] px-2.5 py-0.5 rounded-full">
                    {ev.status}
                  </span>
                  <span className="text-xs text-[#59665D] font-medium">
                    {ev.date}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-[#17231D] font-heading">
                  {ev.title}
                </h2>

                <p className="text-xs text-[#59665D] leading-relaxed">
                  {ev.desc}
                </p>

                <div className="pt-2 text-xs text-[#59665D] border-t border-[#E8F0EB]">
                  <strong>स्थळ:</strong> {ev.venue}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8F0EB]">
                {ev.isExternal ? (
                  <a
                    href={ev.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#004B2A] hover:underline"
                  >
                    <span>{ev.actionLabel}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <Link
                    href={ev.actionUrl}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#004B2A] hover:underline"
                  >
                    <span>{ev.actionLabel}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* English Full Calendar CTA */}
        <div className="p-6 bg-white rounded-xl border border-[#DDE5DC] text-center space-y-3">
          <p className="text-sm text-[#59665D]">
            संपूर्ण इंग्रजी दिनदर्शिका, संपन्न झालेले कार्यक्रम आणि तपशीलवार
            अभ्यासक्रम पाहण्यासाठी:
          </p>
          <Link
            href="/events"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#004B2A] text-white font-bold text-xs hover:bg-[#00643A] transition-colors"
          >
            Full Events Calendar &amp; Archive (English) →
          </Link>
        </div>
      </Container>
    </div>
  );
}
