import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid?: boolean;
  errorId?: string;
}

export function Textarea({
  isInvalid = false,
  errorId,
  className = "",
  disabled,
  rows = 4,
  ...props
}: TextareaProps) {
  const baseStyles =
    "w-full px-3.5 py-2.5 text-sm text-[#17231D] bg-white border rounded-md transition-all duration-150 placeholder:text-[#59665D] focus:outline-none disabled:bg-[#F8FAF7] disabled:text-[#59665D] disabled:cursor-not-allowed resize-y";

  const stateStyles = isInvalid
    ? "border-[#DC2626] bg-[#FEE2E2]/10 focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626]"
    : "border-[#DDE5DC] hover:border-[#004B2A]/50 focus:ring-2 focus:ring-[#73992A] focus:border-[#004B2A]";

  return (
    <textarea
      rows={rows}
      aria-invalid={isInvalid ? true : undefined}
      aria-describedby={isInvalid && errorId ? errorId : undefined}
      disabled={disabled}
      className={`${baseStyles} ${stateStyles} ${className}`}
      {...props}
    />
  );
}
