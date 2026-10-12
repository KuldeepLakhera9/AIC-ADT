import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <div className="py-20 lg:py-28 bg-[#F8FAF7] min-h-[60vh] flex items-center">
      <Container className="max-w-2xl text-center">
        <div className="w-16 h-16 rounded-full bg-[#E8F0EB] text-[#004B2A] flex items-center justify-center font-bold text-2xl mx-auto mb-6 shadow-2xs">
          404
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2 block">
          Error 404 • Resource Not Located
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17231D] font-heading mb-4">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-[#647067] mb-8 leading-relaxed max-w-lg mx-auto">
          The requested page could not be located on the official AIC-ADT
          Baramati Foundation portal. It may have been moved, renamed, or is
          temporarily unavailable.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#004B2A] text-white font-semibold text-sm hover:bg-[#00643A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#73992A] min-h-[44px]"
          >
            Return to Overview
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold text-sm hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
          >
            Contact Support
          </Link>
        </div>

        <div className="pt-8 border-t border-[#DDE5DC]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#59665D] block mb-4">
            Popular Institutional Sections
          </span>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            <Link
              href="/about"
              className="px-3.5 py-1.5 rounded-full bg-white border border-[#DDE5DC] text-[#004B2A] font-semibold hover:border-[#004B2A] transition-colors"
            >
              About the Foundation
            </Link>
            <Link
              href="/about/mission-vision"
              className="px-3.5 py-1.5 rounded-full bg-white border border-[#DDE5DC] text-[#004B2A] font-semibold hover:border-[#004B2A] transition-colors"
            >
              Mission &amp; Vision
            </Link>
            <Link
              href="/about/leadership"
              className="px-3.5 py-1.5 rounded-full bg-white border border-[#DDE5DC] text-[#004B2A] font-semibold hover:border-[#004B2A] transition-colors"
            >
              Leadership &amp; Team
            </Link>
            <Link
              href="/about/infrastructure"
              className="px-3.5 py-1.5 rounded-full bg-white border border-[#DDE5DC] text-[#004B2A] font-semibold hover:border-[#004B2A] transition-colors"
            >
              Campus Facilities
            </Link>
            <Link
              href="/about/partners"
              className="px-3.5 py-1.5 rounded-full bg-white border border-[#DDE5DC] text-[#004B2A] font-semibold hover:border-[#004B2A] transition-colors"
            >
              Partners Directory
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
