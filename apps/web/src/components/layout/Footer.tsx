import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-[#0A2E1C] text-[#E8F0EB] text-sm py-8 border-t border-[#004B2A] mt-auto">
      <Container className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div>
          <div className="font-semibold text-white font-heading">
            AIC-ADT Baramati Foundation
          </div>
          <p className="text-xs text-white/70 mt-1">
            Agricultural Development Trust Campus, Sharadanagar, Baramati,
            District Pune, Maharashtra — 413115
          </p>
        </div>
        <div className="text-xs text-white/60">
          © 2026 AIC-ADT Baramati Foundation. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
