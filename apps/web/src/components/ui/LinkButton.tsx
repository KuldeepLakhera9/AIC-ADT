import React from "react";
import Link from "next/link";
import { ButtonVariant, ButtonSize } from "./Button";

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: LinkButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-md select-none focus:outline-none focus:ring-2 focus:ring-[#73992A] focus:ring-offset-2 active:scale-[0.98]";

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "text-xs px-3 py-1.5 min-h-[36px] gap-1.5",
    md: "text-sm px-4 py-2.5 min-h-[44px] gap-2",
    lg: "text-base px-6 py-3 min-h-[48px] gap-2.5",
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-[#004B2A] text-white hover:bg-[#00643A] active:bg-[#063D27] shadow-sm",
    secondary:
      "bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] active:bg-[#E8F0D9]",
    institutional:
      "bg-[#063D27] text-white hover:bg-[#004B2A] active:bg-[#003820] shadow-sm",
    leaf: "bg-[#73992A] text-white hover:bg-[#628422] active:bg-[#526F1D] shadow-sm",
    botanical:
      "bg-[#E8F0D9] text-[#004B2A] hover:bg-[#D8E6C3] active:bg-[#C5DAAA] border border-[#73992A]/30",
    outline:
      "bg-transparent text-[#004B2A] border border-[#DDE5DC] hover:border-[#004B2A] hover:bg-white",
    ghost:
      "bg-transparent text-[#17231D] hover:bg-[#F3F7EC] hover:text-[#004B2A]",
    danger:
      "bg-[#DC2626] text-white hover:bg-[#B91C1C] active:bg-[#991B1B] shadow-sm",
    destructive:
      "bg-[#DC2626] text-white hover:bg-[#B91C1C] active:bg-[#991B1B] shadow-sm",
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </Link>
  );
}
