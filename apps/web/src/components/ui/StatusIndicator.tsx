import React from "react";

export type StatusType = "active" | "warning" | "error" | "neutral" | "offline";

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: StatusType;
  label: string;
  pulse?: boolean;
  className?: string;
}

export function StatusIndicator({
  status = "active",
  label,
  pulse = false,
  className = "",
  ...props
}: StatusIndicatorProps) {
  const dotColor: Record<StatusType, string> = {
    active: "bg-[#1B7340]",
    warning: "bg-[#B45309]",
    error: "bg-[#DC2626]",
    neutral: "bg-[#004B2A]",
    offline: "bg-[#59665D]",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium text-[#17231D] ${className}`}
      {...props}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor[status]}`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${dotColor[status]}`}
          aria-hidden="true"
        />
      </span>
      <span>{label}</span>
    </span>
  );
}
