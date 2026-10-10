import React from "react";
import { FormLabel } from "./FormLabel";
import { ErrorMessage } from "./ErrorMessage";

export interface FormGroupProps {
  id: string;
  label: string;
  required?: boolean;
  optionalText?: string;
  helperText?: string;
  error?: string;
  children: (props: {
    id: string;
    isInvalid: boolean;
    errorId?: string;
    helperId?: string;
  }) => React.ReactNode;
  className?: string;
}

export function FormGroup({
  id,
  label,
  required = false,
  optionalText,
  helperText,
  error,
  children,
  className = "",
}: FormGroupProps) {
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <FormLabel htmlFor={id} required={required} optionalText={optionalText}>
        {label}
      </FormLabel>

      {children({
        id,
        isInvalid: Boolean(error),
        errorId,
        helperId,
      })}

      {helperText && !error && (
        <p id={helperId} className="text-xs text-[#59665D]">
          {helperText}
        </p>
      )}

      {error && <ErrorMessage id={errorId} message={error} />}
    </div>
  );
}
