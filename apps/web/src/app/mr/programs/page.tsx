import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "योजना व इनक्युबेशन कार्यक्रम | एआयसी-एडीटी बारामती फाउंडेशन",
  description:
    "एआयसी-एडीटीचे इनक्युबेशन टप्पे: प्री-इनक्युबेशन, कोर इनक्युबेशन आणि एक्सेलरेटर. स्टार्टअप इंडिया सीड फंड व मेईटी जेनेसिस योजना.",
};

export default function MarathiProgramsPage() {
  const breadcrumbItems = [
    { label: "मुख्यपृष्ठ", href: "/mr" },
    { label: "योजना व कार्यक्रम", href: "/mr/programs" },
  ];

  const tracks = [
    {
      stage: "टप्पा १: पूर्व-इनक्युबेशन (Pre-Incubation)",
      title: "संकल्पना व प्राथमिक नमुना प्रमाणीकरण",
      duration: "३ ते ६ महिने",
      grant: "₹१० लाखांपर्यंत नमुना अनुदान",
      desc: "सुरुवातीच्या टप्प्यातील संशोधक आणि विद्यार्थ्यांसाठी. फॅबलॅब तंत्रज्ञान आणि प्रोटोटाइप चाचणी.",
      href: "/programs/pre-incubation",
    },
    {
      stage: "टप्पा २: कोर इनक्युबेशन (Incubation)",
      title: "उत्पादन विकास व बाजारपेठ प्रवेश",
      duration: "१२ ते २४ महिने",
      grant: "₹२० लाख अनुदान / ₹५० लाख कर्ज (SISFS)",
      desc: "पूर्णवेळ मार्गदर्शन, ११० एकर प्रात्यक्षिक शेत, एनएबीएल लॅब चाचण्या आणि बीजभांडवल जोडणी.",
      href: "/programs/incubation",
    },
    {
      stage: "टप्पा ३: विस्तार व गती (Acceleration)",
      title: "व्यावसायिक वाढ आणि गुंतवणूक",
      duration: "६ ते १२ महिने",
      grant: "व्हेंचर कॅपिटल व एफपीओ नेटवर्क",
      desc: "महसूल टप्प्यातील स्टार्टअप्ससाठी राष्ट्रीय बाजारपेठ, ५०+ शेतकरी उत्पादक कंपन्यांशी थेट जोडणी.",
      href: "/programs/acceleration",
    },
  ];

  const schemes = [
    {
      title: "स्टार्टअप इंडिया सीड फंड (SISFS)",
      authority: "डीपीआयआयटी, वाणिज्य व उद्योग मंत्रालय",
      details:
        "प्रोटोटाइपसाठी ₹२० लाखांपर्यंत अनुदान आणि व्यापारीकरणासाठी ₹५० लाखांपर्यंत परिवर्तनीय कर्ज.",
      href: "/programs/schemes/startup-india",
    },
    {
      title: "मेईटी जेनेसिस (MeitY GENESIS)",
      authority: "इलेक्ट्रॉनिक्स आणि माहिती तंत्रज्ञान मंत्रालय",
      details:
        "टियर-२ आणि टियर-३ शहरांतील डीप-टेक स्टार्टअप्ससाठी ईआयआर (EiR) फेलोशिप आणि पायलट अनुदान.",
      href: "/programs/schemes/meity-genesis",
    },
    {
      title: "सीएसआर (CSR) कॉर्पोरेट भागीदारी",
      authority: "कॅपजेमिनी, एचडीएफसी बँक परिवर्तन, ईडी अँड एफ मॅन",
      details:
        "ग्रामीण उपजीविका आणि शेतकरी सक्षमीकरणासाठी कॉर्पोरेट सामाजिक जबाबदारी अनुदान.",
      href: "/programs/schemes/csr",
    },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#004B2A] text-xs font-bold border border-[#73992A]/30">
            <span>🌱</span>
            <span>इनक्युबेशन कार्यक्रम व शासकीय योजना</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17231D] font-heading leading-tight">
            इनक्युबेशन कार्यक्रम आणि बीजभांडवल योजना
          </h1>
          <p className="text-base sm:text-lg text-[#59665D] leading-relaxed">
            कृषी, जैवतंत्रज्ञान आणि ग्रामीण तंत्रज्ञान क्षेत्रातील
            नवसंशोधकांसाठी टप्प्याटप्प्याने रचना केलेले इनक्युबेशन कार्यक्रम आणि
            शासकीय आर्थिक पाठबळ.
          </p>
        </header>

        {/* 3 Tracks */}
        <section
          aria-label="इनक्युबेशन टप्पे"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {tracks.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#DDE5DC] p-6 space-y-4 hover:border-[#73992A] transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#73992A] block uppercase">
                  {t.stage}
                </span>
                <h2 className="text-lg font-bold text-[#17231D] font-heading">
                  {t.title}
                </h2>
                <div className="text-xs text-[#59665D] space-y-1 pt-1 border-t border-[#E8F0EB]">
                  <div>
                    <strong>कालावधी:</strong> {t.duration}
                  </div>
                  <div>
                    <strong>निधी:</strong> {t.grant}
                  </div>
                </div>
                <p className="text-xs text-[#59665D] leading-relaxed pt-1">
                  {t.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8F0EB]">
                <Link
                  href={t.href}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#004B2A] hover:underline"
                >
                  <span>तपशील पहा (English)</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Schemes Section */}
        <section
          aria-label="शासकीय योजना"
          className="bg-white rounded-2xl border border-[#DDE5DC] p-6 sm:p-10 space-y-6"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#73992A] uppercase">
              शासकीय व संस्थात्मक सहकार्य
            </span>
            <h2 className="text-2xl font-bold text-[#17231D] font-heading">
              मान्यताप्राप्त बीजभांडवल योजना
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schemes.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#F8FAF7] border border-[#DDE5DC] space-y-3"
              >
                <h3 className="font-bold text-[#17231D] font-heading text-base">
                  {s.title}
                </h3>
                <span className="text-xs font-semibold text-[#004B2A] block">
                  {s.authority}
                </span>
                <p className="text-xs text-[#59665D] leading-relaxed">
                  {s.details}
                </p>
                <div className="pt-2">
                  <Link
                    href={s.href}
                    className="text-xs font-bold text-[#004B2A] hover:underline"
                  >
                    योजनेचे नियम पहा →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
