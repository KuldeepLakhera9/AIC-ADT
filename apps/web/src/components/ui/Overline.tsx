import React from "react";

export interface OverlineProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  color?: "primary" | "leaf" | "inverse" | "muted";
}

export function Overline({
  children,
  className = "",
  color = "leaf",
  ...props
}: OverlineProps) {
  const colorStyles = {
    primary: "text-[#004B2A]",
    leaf: "text-[#73992A]",
    inverse: "text-[#E8F0D9]",
    muted: "text-[#59665D]",
  };

  return (
    <span
      className={`inline-block text-xs font-bold uppercase tracking-wider font-heading ${colorStyles[color]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
