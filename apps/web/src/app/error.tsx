"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors for diagnostic review
    console.error("AIC-ADT Application Error Boundary Caught:", error);
  }, [error]);

  return (
    <div className="py-20 text-center">
      <Container className="max-w-xl">
        <div className="w-16 h-16 rounded-full bg-[#FEE2E2] text-[#B91C1C] flex items-center justify-center font-bold text-2xl mx-auto mb-6">
          !
        </div>
        <h1 className="text-3xl font-bold text-[#004B2A] font-heading mb-3">
          Application Error Encountered
        </h1>
        <p className="text-[#647067] mb-8 leading-relaxed">
          An unexpected condition occurred while rendering this view. Our
          operational team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#004B2A] text-white font-medium hover:bg-[#0A2E1C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#73992A]"
        >
          Try Again
        </button>
      </Container>
    </div>
  );
}
