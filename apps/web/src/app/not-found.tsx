import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  const quickLinks = [
    { label: "About the Foundation", href: "/about" },
    { label: "Mission & Vision", href: "/about/mission-vision" },
    { label: "Leadership & Team", href: "/about/leadership" },
    { label: "Campus Infrastructure", href: "/about/infrastructure" },
    { label: "Institutional Partners", href: "/about/partners" },
    { label: "Incubation Programs", href: "/programs" },
    { label: "Startup Directory", href: "/startups" },
    { label: "Innovation Showcase", href: "/innovation" },
    { label: "Events & Workshops", href: "/events" },
    { label: "Resources & Reports", href: "/resources" },
    { label: "News & Announcements", href: "/news" },
    { label: "Contact & Helplines", href: "/contact" },
  ];

  return (
    <div className="py-20 lg:py-28 bg-[#F8FAF7] min-h-[65vh] flex items-center">
      <Container className="max-w-3xl text-center space-y-8">
        <div className="w-16 h-16 rounded-2xl bg-[#E8F0EB] text-[#004B2A] flex items-center justify-center font-bold text-2xl mx-auto shadow-2xs border border-[#73992A]/30">
          404
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#73992A] block">
            Error 404 • Resource Not Located
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17231D] font-heading">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-[#59665D] leading-relaxed max-w-lg mx-auto">
            The requested page could not be located on the official AIC-ADT
            Baramati Foundation portal. It may have been moved, renamed, or is
            temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#004B2A] text-white font-semibold text-sm hover:bg-[#00643A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#73992A] min-h-[44px] shadow-2xs"
          >
            <span>Return to Overview</span>
            <span aria-hidden="true" className="ml-1">
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold text-sm hover:bg-[#F8FAF7] hover:border-[#004B2A] transition-colors min-h-[44px]"
          >
            Contact Support
          </Link>
        </div>

        <div className="pt-8 border-t border-[#DDE5DC] space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#59665D] block">
            Popular Institutional Sections
          </span>
          <div className="flex flex-wrap justify-center gap-2.5 text-xs">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#DDE5DC] text-[#004B2A] font-semibold hover:border-[#004B2A] hover:bg-[#E8F0EB] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
