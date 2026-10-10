import React from "react";

export type SkeletonVariant = "text" | "circular" | "rectangular" | "card";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  variant = "text",
  width,
  height,
  className = "",
  style,
  ...props
}: SkeletonProps) {
  const baseClasses =
    "bg-[#EAEFE8] animate-pulse motion-reduce:animate-none rounded";

  const variantClasses: Record<SkeletonVariant, string> = {
    text: "h-4 w-full rounded",
    circular: "rounded-full aspect-square",
    rectangular: "w-full rounded-md",
    card: "w-full h-48 rounded-lg",
  };

  const dynamicStyle: React.CSSProperties = {
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <div
      role="status"
      aria-label="Loading content..."
      aria-busy="true"
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={dynamicStyle}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading card content..."
      aria-busy="true"
      className="p-6 border border-[#DDE5DC] rounded-xl bg-white flex flex-col gap-4 animate-pulse motion-reduce:animate-none"
    >
      <div className="w-12 h-12 rounded-lg bg-[#EAEFE8]" />
      <div className="space-y-2">
        <div className="h-5 bg-[#EAEFE8] rounded w-3/4" />
        <div className="h-4 bg-[#EAEFE8] rounded w-1/2" />
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-3.5 bg-[#EAEFE8] rounded w-full" />
        <div className="h-3.5 bg-[#EAEFE8] rounded w-5/6" />
        <div className="h-3.5 bg-[#EAEFE8] rounded w-4/6" />
      </div>
      <div className="pt-4 flex justify-between items-center border-t border-[#EAEFE8]">
        <div className="h-6 w-20 bg-[#EAEFE8] rounded-full" />
        <div className="h-4 w-16 bg-[#EAEFE8] rounded" />
      </div>
      <span className="sr-only">Loading card...</span>
    </div>
  );
}
