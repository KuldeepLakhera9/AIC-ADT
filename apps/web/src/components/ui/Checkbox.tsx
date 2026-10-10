import React from "react";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: React.ReactNode;
  description?: React.ReactNode;
  isInvalid?: boolean;
}

export function Checkbox({
  id,
  label,
  description,
  isInvalid = false,
  disabled,
  className = "",
  checked,
  ...props
}: CheckboxProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div
      className={`relative flex items-start gap-3 min-h-[44px] py-1 ${className}`}
    >
      <div className="flex items-center h-6">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          aria-invalid={isInvalid ? true : undefined}
          className={`w-5 h-5 rounded border transition-colors cursor-pointer disabled:cursor-not-allowed
            accent-[#004B2A] text-[#004B2A]
            focus:ring-2 focus:ring-[#73992A] focus:outline-none focus:ring-offset-2
            ${isInvalid ? "border-[#DC2626]" : "border-[#DDE5DC]"}`}
          {...props}
        />
      </div>
      <div className="flex flex-col text-sm select-none">
        <label
          htmlFor={inputId}
          className={`font-medium cursor-pointer ${
            disabled ? "text-[#59665D] cursor-not-allowed" : "text-[#17231D]"
          }`}
        >
          {label}
        </label>
        {description && (
          <span className="text-xs text-[#59665D] mt-0.5">{description}</span>
        )}
      </div>
    </div>
  );
}
