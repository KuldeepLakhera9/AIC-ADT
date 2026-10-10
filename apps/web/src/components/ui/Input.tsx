import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  errorId?: string;
}

export function Input({
  isInvalid = false,
  leftAddon,
  rightAddon,
  errorId,
  className = "",
  disabled,
  ...props
}: InputProps) {
  const baseStyles =
    "w-full px-3.5 py-2.5 min-h-[44px] text-sm text-[#17231D] bg-white border rounded-md transition-all duration-150 placeholder:text-[#59665D] focus:outline-none disabled:bg-[#F8FAF7] disabled:text-[#59665D] disabled:cursor-not-allowed";

  const stateStyles = isInvalid
    ? "border-[#DC2626] bg-[#FEE2E2]/10 focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626]"
    : "border-[#DDE5DC] hover:border-[#004B2A]/50 focus:ring-2 focus:ring-[#73992A] focus:border-[#004B2A]";

  const inputElement = (
    <input
      aria-invalid={isInvalid ? true : undefined}
      aria-describedby={isInvalid && errorId ? errorId : undefined}
      disabled={disabled}
      className={`${baseStyles} ${stateStyles} ${leftAddon ? "pl-10" : ""} ${rightAddon ? "pr-10" : ""} ${className}`}
      {...props}
    />
  );

  if (!leftAddon && !rightAddon) {
    return inputElement;
  }

  return (
    <div className="relative flex items-center w-full">
      {leftAddon && (
        <div className="absolute left-3.5 flex items-center pointer-events-none text-[#59665D]">
          {leftAddon}
        </div>
      )}
      {inputElement}
      {rightAddon && (
        <div className="absolute right-3.5 flex items-center pointer-events-none text-[#59665D]">
          {rightAddon}
        </div>
      )}
    </div>
  );
}
