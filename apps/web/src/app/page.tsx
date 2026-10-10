import { Container } from "@/components/layout/Container";

export default function HomePage() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        {/* Institutional Hero Banner */}
        <div className="bg-[#004B2A] text-white rounded-xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#73992A] text-white mb-4">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Phase 3 Monorepo Baseline Initialized
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading leading-tight mb-4">
              AIC-ADT Baramati Foundation
            </h1>
            <p className="text-base sm:text-lg text-[#E8F0EB] leading-relaxed mb-8">
              Atal Incubation Centre — Agricultural Development Trust (AIC-ADT).
              Production workspace initialized with Next.js App Router, NestJS
              Modular Monolith, and strict TypeScript.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="http://localhost:4000/api/v1/health"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg font-medium text-sm bg-white text-[#004B2A] hover:bg-[#F0F5F2] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#73992A]"
              >
                Inspect Backend API Health (/api/v1/health) →
              </a>
              <span className="px-5 py-2.5 rounded-lg font-medium text-sm border border-white/30 text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#86EFAC]" />
                Next.js App Router Active
              </span>
            </div>
          </div>
        </div>

        {/* Workspace Verification Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#DDE5DC] shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-[#59665D] mb-1">
              Frontend Application
            </div>
            <div className="text-xl font-bold text-[#004B2A] font-heading mb-2">
              apps/web
            </div>
            <p className="text-sm text-[#647067] leading-relaxed mb-4">
              Next.js App Router with TypeScript, Tailwind CSS, Outfit & Inter
              typography, and responsive layout primitives.
            </p>
            <div className="text-xs text-[#59665D] bg-[#F0F5F2] p-2 rounded">
              Port: <code>http://localhost:3000</code>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#DDE5DC] shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-[#59665D] mb-1">
              Backend API Engine
            </div>
            <div className="text-xl font-bold text-[#004B2A] font-heading mb-2">
              apps/api
            </div>
            <p className="text-sm text-[#647067] leading-relaxed mb-4">
              NestJS Modular Monolith with TypeScript, global validation pipe,
              consistent error filter, and <code>/api/v1</code> prefix.
            </p>
            <div className="text-xs text-[#59665D] bg-[#F0F5F2] p-2 rounded">
              Port: <code>http://localhost:4000</code>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#DDE5DC] shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-[#59665D] mb-1">
              Architecture & Baseline
            </div>
            <div className="text-xl font-bold text-[#004B2A] font-heading mb-2">
              pnpm Monorepo
            </div>
            <p className="text-sm text-[#647067] leading-relaxed mb-4">
              Single unified lockfile, workspace filtering (
              <code>@aic/web</code> and <code>@aic/api</code>), and Vitest test
              runner.
            </p>
            <div className="text-xs text-[#59665D] bg-[#F0F5F2] p-2 rounded">
              pnpm v11.16+ Workspace
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
