import React from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  variant?: AlertVariant;
  title?: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles: Record<
  AlertVariant,
  {
    container: string;
    title: string;
    text: string;
    defaultIcon: React.ReactNode;
  }
> = {
  info: {
    container: "bg-[#F3F7EC] border-[#73992A]/40 text-[#17231D]",
    title: "text-[#004B2A]",
    text: "text-[#17231D]",
    defaultIcon: (
      <svg
        className="w-5 h-5 text-[#004B2A] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  success: {
    container: "bg-[#ECFDF5] border-[#10B981]/50 text-[#064E3B]",
    title: "text-[#065F46]",
    text: "text-[#064E3B]",
    defaultIcon: (
      <svg
        className="w-5 h-5 text-[#059669] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  warning: {
    container: "bg-[#FFFBEB] border-[#F59E0B]/50 text-[#78350F]",
    title: "text-[#92400E]",
    text: "text-[#78350F]",
    defaultIcon: (
      <svg
        className="w-5 h-5 text-[#D97706] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
  },
  error: {
    container: "bg-[#FEF2F2] border-[#EF4444]/50 text-[#7F1D1D]",
    title: "text-[#991B1B]",
    text: "text-[#7F1D1D]",
    defaultIcon: (
      <svg
        className="w-5 h-5 text-[#DC2626] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
};

export function Alert({
  variant = "info",
  title,
  children,
  icon,
  action,
  onDismiss,
  className = "",
}: AlertProps) {
  const current = variantStyles[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${current.container} ${className}`}
    >
      <div className="pt-0.5">{icon || current.defaultIcon}</div>

      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={`text-sm font-semibold mb-1 ${current.title}`}>
            {title}
          </h4>
        )}
        <div className={`text-sm leading-relaxed ${current.text}`}>
          {children}
        </div>
        {action && <div className="mt-3">{action}</div>}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="p-1 rounded-md text-current opacity-70 hover:opacity-100 hover:bg-black/5 transition-opacity"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
