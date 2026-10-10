import React from "react";

export type BadgeVariant =
  | "default"
  | "botanical"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral"
  | "leaf"
  | "institutional";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  children,
  className = "",
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide select-none";

  const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-[#E8F0D9] text-[#004B2A] border border-[#73992A]/30",
    botanical: "bg-[#E8F0D9] text-[#004B2A] border border-[#73992A]/30",
    success: "bg-[#EAF5EE] text-[#1B7340] border border-[#1B7340]/20",
    warning: "bg-[#FEF3C7] text-[#B45309] border border-[#B45309]/20",
    error: "bg-[#FEE2E2] text-[#DC2626] border border-[#DC2626]/20",
    info: "bg-[#E0F2FE] text-[#0369A1] border border-[#0369A1]/20",
    neutral: "bg-[#F8FAF7] text-[#17231D] border border-[#DDE5DC]",
    leaf: "bg-[#73992A] text-white",
    institutional: "bg-[#063D27] text-white",
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
