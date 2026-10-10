import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <Container className="max-w-xl">
        <div className="w-16 h-16 rounded-full bg-[#E8F0EB] text-[#004B2A] flex items-center justify-center font-bold text-2xl mx-auto mb-6">
          404
        </div>
        <h1 className="text-3xl font-bold text-[#004B2A] font-heading mb-3">
          Page Not Found
        </h1>
        <p className="text-[#647067] mb-8 leading-relaxed">
          The requested page could not be located on the AIC-ADT Baramati
          Foundation digital platform. Please verify the URL or return to the
          overview page.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#004B2A] text-white font-medium hover:bg-[#0A2E1C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#73992A]"
        >
          Return to Overview
        </Link>
      </Container>
    </div>
  );
}
