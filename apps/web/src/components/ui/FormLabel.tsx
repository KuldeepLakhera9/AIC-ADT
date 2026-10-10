import React from "react";

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  isRequired?: boolean;
  required?: boolean;
  optionalText?: string;
  className?: string;
}

export function FormLabel({
  children,
  isRequired = false,
  required = false,
  optionalText,
  className = "",
  ...props
}: FormLabelProps) {
  const showAsterisk = isRequired || required;

  return (
    <label
      className={`block text-xs font-semibold uppercase tracking-wider text-[#17231D] mb-1.5 ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showAsterisk && (
        <span className="text-[#DC2626] ml-1" aria-hidden="true">
          *
        </span>
      )}
      {optionalText && (
        <span className="text-[#59665D] font-normal lowercase tracking-normal ml-1.5">
          {optionalText}
        </span>
      )}
    </label>
  );
}
