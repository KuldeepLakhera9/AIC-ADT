import React from "react";

export type TextVariant = "lead" | "body" | "small" | "muted" | "caption";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  children: React.ReactNode;
  as?: "p" | "span" | "div";
  className?: string;
  lang?: string;
}

export function Text({
  variant = "body",
  children,
  as: Component = "p",
  className = "",
  lang,
  ...props
}: TextProps) {
  const variantStyles: Record<TextVariant, string> = {
    lead: "text-lg sm:text-xl text-[#17231D] leading-relaxed",
    body: "text-base text-[#17231D] leading-normal",
    small: "text-sm text-[#647067] leading-normal",
    muted: "text-sm text-[#59665D] leading-normal",
    caption: "text-xs text-[#59665D] leading-tight",
  };

  return (
    <Component
      lang={lang}
      className={`${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
