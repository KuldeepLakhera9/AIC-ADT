import React from "react";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  const defaultIcon = (
    <div className="w-12 h-12 rounded-full bg-[#E8F0D9] text-[#004B2A] flex items-center justify-center">
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    </div>
  );

  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center text-center p-8 md:p-12 border border-dashed border-[#DDE5DC] rounded-xl bg-white/50 ${className}`}
    >
      <div className="mb-4">{icon || defaultIcon}</div>
      <h3 className="text-base font-semibold text-[#17231D] mb-1 font-heading">
        {title}
      </h3>
      <p className="text-sm text-[#59665D] max-w-md mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
