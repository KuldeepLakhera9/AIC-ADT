import React from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  isInvalid?: boolean;
  errorId?: string;
}

export function Select({
  options,
  placeholder,
  isInvalid = false,
  errorId,
  className = "",
  disabled,
  ...props
}: SelectProps) {
  const baseStyles =
    "w-full px-3.5 py-2.5 min-h-[44px] text-sm text-[#17231D] bg-white border rounded-md transition-all duration-150 appearance-none pr-10 focus:outline-none disabled:bg-[#F8FAF7] disabled:text-[#59665D] disabled:cursor-not-allowed";

  const stateStyles = isInvalid
    ? "border-[#DC2626] bg-[#FEE2E2]/10 focus:ring-2 focus:ring-[#DC2626]"
    : "border-[#DDE5DC] hover:border-[#004B2A]/50 focus:ring-2 focus:ring-[#73992A] focus:border-[#004B2A]";

  return (
    <div className="relative w-full">
      <select
        aria-invalid={isInvalid ? true : undefined}
        aria-describedby={isInvalid && errorId ? errorId : undefined}
        disabled={disabled}
        className={`${baseStyles} ${stateStyles} ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#59665D]">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
