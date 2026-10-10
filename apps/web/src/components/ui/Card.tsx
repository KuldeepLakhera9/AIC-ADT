import React from "react";

export type CardVariant =
  "default" | "elevated" | "institutional" | "light" | "botanical" | "bordered";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
  isHoverable?: boolean;
}

export function Card({
  variant = "default",
  children,
  className = "",
  isHoverable = false,
  ...props
}: CardProps) {
  const baseStyles = "rounded-lg transition-all duration-200 overflow-hidden";

  const variantStyles: Record<CardVariant, string> = {
    default:
      "bg-white border border-[#DDE5DC] text-[#17231D] shadow-[0_1px_3px_rgba(23,35,29,0.05)]",
    elevated:
      "bg-white border border-[#DDE5DC] text-[#17231D] shadow-[0_4px_12px_rgba(0,75,42,0.08)]",
    institutional:
      "bg-[#063D27] text-white border border-[#004B2A] shadow-[0_4px_12px_rgba(6,61,39,0.12)]",
    light: "bg-[#F3F7EC] border border-[#DDE5DC] text-[#17231D]",
    botanical: "bg-[#F3F7EC] border border-[#73992A]/30 text-[#17231D]",
    bordered: "bg-transparent border border-[#DDE5DC] text-[#17231D]",
  };

  const hoverStyles = isHoverable
    ? "hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(6,61,39,0.12)] hover:border-[#73992A] cursor-pointer"
    : "";

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 pb-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className = "",
  as: Component = "h3",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: "h2" | "h3" | "h4" }) {
  return (
    <Component
      className={`text-lg sm:text-xl font-bold font-heading tracking-tight leading-snug ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardDescription({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-[#647067] mt-1 leading-normal ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-6 pt-0 flex items-center gap-3 border-t border-[#DDE5DC]/60 mt-4 pt-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
