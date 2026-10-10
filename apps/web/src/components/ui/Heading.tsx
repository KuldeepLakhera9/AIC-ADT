import React from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  size?: HeadingSize;
  children: React.ReactNode;
  className?: string;
  color?: "primary" | "institutional" | "inverse" | "leaf";
}

export function Heading({
  level = 2,
  size,
  children,
  className = "",
  color = "primary",
  ...props
}: HeadingProps) {
  const Component = `h${level}` as const;
  const visualSize = size || (`h${level}` as HeadingSize);

  const sizeStyles: Record<HeadingSize, string> = {
    h1: "text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight",
    h2: "text-2xl sm:text-3xl font-bold leading-snug",
    h3: "text-xl sm:text-2xl font-bold leading-snug",
    h4: "text-lg sm:text-xl font-semibold leading-normal",
    h5: "text-base sm:text-lg font-semibold leading-normal",
    h6: "text-sm sm:text-base font-semibold leading-normal",
  };

  const colorStyles = {
    primary: "text-[#004B2A]",
    institutional: "text-[#063D27]",
    inverse: "text-white",
    leaf: "text-[#73992A]",
  };

  return (
    <Component
      className={`font-heading tracking-tight ${sizeStyles[visualSize]} ${colorStyles[color]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
