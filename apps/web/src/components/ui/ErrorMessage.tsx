import React from "react";

export interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  message?: React.ReactNode;
  id?: string;
  className?: string;
}

export function ErrorMessage({
  children,
  message,
  id,
  className = "",
  ...props
}: ErrorMessageProps) {
  const content = children || message;
  if (!content) return null;

  return (
    <div
      id={id}
      role="alert"
      aria-live="polite"
      className={`flex items-center gap-1.5 text-xs text-[#DC2626] font-medium mt-1.5 ${className}`}
      {...props}
    >
      <svg
        className="w-3.5 h-3.5 shrink-0"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      <span>{content}</span>
    </div>
  );
}
