import Link from "next/link";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="bg-[#004B2A] text-white border-b border-[#0A2E1C]">
      {/* Top Utility Bar */}
      <div className="bg-[#0A2E1C] py-1.5 text-xs text-[#E8F0EB]">
        <Container className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>Atal Incubation Centre — Supported by AIM, NITI Aayog</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline">
              Agricultural Development Trust, Baramati
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#73992A] text-white">
              Phase 3 Dev
            </span>
            <span className="text-white/80">EN | मराठी</span>
          </div>
        </Container>
      </div>

      {/* Main Navigation Bar */}
      <div className="py-4">
        <Container className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#73992A] rounded p-1"
          >
            <div className="w-10 h-10 rounded bg-white text-[#004B2A] font-bold flex items-center justify-center text-lg shadow-sm">
              AIC
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-white font-heading">
                AIC-ADT Baramati Foundation
              </div>
              <div className="text-xs text-[#E8F0EB]">
                Centre for AgTech, Biotech & Rural Innovation
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className="text-white hover:text-[#73992A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#73992A] rounded px-2 py-1"
            >
              Overview
            </Link>
            <a
              href="http://localhost:4000/api/v1/health"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8F0EB] hover:text-white transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#73992A] rounded px-2 py-1"
            >
              <span>API Health</span>
              <span className="w-2 h-2 rounded-full bg-[#86EFAC] inline-block animate-pulse" />
            </a>
          </nav>
        </Container>
      </div>
    </header>
  );
}
