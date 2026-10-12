import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "एआयसी-एडीटी बारामती फाउंडेशन | अधिकृत मराठी पोर्टल",
  description:
    "अटल इनक्युबेशन केंद्र - ॲग्रिकल्चरल डेव्हलपमेंट ट्रस्ट (एआयसी-एडीटी) बारामती फाउंडेशनचे अधिकृत मराठी पोर्टल. अटल इनोव्हेशन मिशन, नीती आयोग, भारत सरकार द्वारे समर्थित.",
};

export default function MarathiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      lang="mr"
      className="lang-mr font-devanagari min-h-screen flex flex-col"
    >
      {/* Institutional Translation Status Banner */}
      <div className="bg-[#E8F0EB] border-b border-[#73992A]/30 text-[#004B2A] py-2 px-4 text-xs">
        <Container className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold shrink-0" aria-hidden="true">
              📢 अधिकृत सूचना:
            </span>
            <span className="leading-relaxed">
              ही अधिकृत संकेतस्थळाची मराठी आवृत्ती आहे. काही तांत्रिक व वैधानिक
              कागदपत्रे संपादकीय पुनरावलोकन प्रक्रियेत आहेत.
            </span>
          </div>
          <Link
            href="/"
            className="font-bold underline text-[#004B2A] hover:text-[#00643A] shrink-0"
          >
            View Authoritative English Site →
          </Link>
        </Container>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}
