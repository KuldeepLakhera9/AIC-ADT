import React from "react";

export type SectionSpacing = "none" | "sm" | "md" | "lg";
export type SectionBackground =
  "main" | "botanical" | "white" | "dark" | "forest";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  background?: SectionBackground;
  children: React.ReactNode;
}

const spacingClasses: Record<SectionSpacing, string> = {
  none: "py-0",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
};

const backgroundClasses: Record<SectionBackground, string> = {
  main: "bg-[#F8FAF7] text-[#17231D]",
  botanical: "bg-[#F3F7EC] text-[#17231D]",
  white: "bg-white text-[#17231D]",
  dark: "bg-[#063D27] text-white",
  forest: "bg-[#004B2A] text-white",
};

export function Section({
  spacing = "md",
  background = "main",
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={`${spacingClasses[spacing]} ${backgroundClasses[background]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
