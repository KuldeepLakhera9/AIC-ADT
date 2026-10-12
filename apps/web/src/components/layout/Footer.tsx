import React from "react";
import Link from "next/link";
import { Container } from "./Container";
import { FOOTER_SECTIONS, INSTITUTIONAL_INFO } from "@/config/navigation";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#063D27] text-[#E8F0EB] text-sm border-t border-[#0A2E1C] mt-auto">
      {/* 1. Main Directory Links Grid */}
      <div className="py-12 lg:py-16 border-b border-white/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 xl:gap-10">
            {/* Column 1 & 2: Institutional Heritage, Identity & Physical Address */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white text-[#004B2A] font-extrabold flex flex-col items-center justify-center font-heading shadow-xs">
                  <span className="text-sm leading-none">AIC</span>
                  <span className="text-[8px] tracking-wider text-[#73992A] leading-none mt-0.5">
                    ADT
                  </span>
                </div>
                <div>
                  <div className="font-bold text-white font-heading text-base leading-tight">
                    {INSTITUTIONAL_INFO.name}
                  </div>
                  <div className="text-xs text-[#73992A] font-medium leading-tight">
                    Atal Incubation Centre — AIM, NITI Aayog
                  </div>
                </div>
              </div>

              <p className="text-xs text-white/80 leading-relaxed">
                Catalyzing deep-tech agriculture, food processing,
                biotechnology, and rural enterprise innovation. Hosted within
                the 110-acre demonstration campus of the Agricultural
                Development Trust, Baramati.
              </p>

              <div className="pt-2 text-xs text-white/80 space-y-1.5 border-t border-white/10">
                <div className="font-semibold text-white">
                  Campus Headquarters:
                </div>
                <address className="not-italic text-white/70 leading-relaxed">
                  {INSTITUTIONAL_INFO.address.line1},<br />
                  {INSTITUTIONAL_INFO.address.city},{" "}
                  {INSTITUTIONAL_INFO.address.district},<br />
                  {INSTITUTIONAL_INFO.address.state} —{" "}
                  {INSTITUTIONAL_INFO.address.pincode},{" "}
                  {INSTITUTIONAL_INFO.address.country}
                </address>
                <div className="pt-1">
                  <Link
                    href="/contact/directions"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#73992A] hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-[#73992A] rounded"
                  >
                    <span>View Transit Guide & Directions</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 3, 4, 5, 6: Programmatic Navigation Columns */}
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                  {section.title}
                </div>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xs text-white/70 hover:text-white hover:underline transition-colors focus:outline-none focus:ring-1 focus:ring-[#73992A] rounded inline-block"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Institutional Contact Bar */}
          <div className="mt-12 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-white/50 block">Official Landline:</span>
              <a
                href={`tel:${INSTITUTIONAL_INFO.helplines.landline}`}
                className="font-semibold text-white hover:text-[#73992A] transition-colors"
              >
                {INSTITUTIONAL_INFO.helplines.landline} / 255518
              </a>
            </div>
            <div>
              <span className="text-white/50 block">Incubation Helpline:</span>
              <a
                href={`tel:${INSTITUTIONAL_INFO.helplines.incubationMobile.replace(/\s+/g, "")}`}
                className="font-semibold text-white hover:text-[#73992A] transition-colors"
              >
                {INSTITUTIONAL_INFO.helplines.incubationMobile}
              </a>
            </div>
            <div>
              <span className="text-white/50 block">
                Primary Institutional Email:
              </span>
              <a
                href={`mailto:${INSTITUTIONAL_INFO.emails.primary}`}
                className="font-semibold text-white hover:text-[#73992A] transition-colors"
              >
                {INSTITUTIONAL_INFO.emails.primary}
              </a>
            </div>
            <div>
              <span className="text-white/50 block">Incubation Hours:</span>
              <span className="font-semibold text-white">
                {INSTITUTIONAL_INFO.hours}
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* 2. Bottom Statutory, Compliance & Copyright Bar */}
      <div className="py-6 bg-[#042A1A] text-xs text-white/60">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p>
              © {currentYear}{" "}
              <strong className="font-semibold text-white">
                AIC-ADT Baramati Foundation
              </strong>
              . All rights reserved.
            </p>
            <p className="text-[11px] text-white/50">
              Supported by Atal Innovation Mission, NITI Aayog, Government of
              India | Hosted by Agricultural Development Trust, Baramati.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-[11px]">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/resources/policies-downloads"
              className="hover:text-white transition-colors"
            >
              RTI Disclosures
            </Link>
            <Link
              href="/resources/policies-downloads"
              className="hover:text-white transition-colors"
            >
              Accessibility Statement
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contact Desk
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
