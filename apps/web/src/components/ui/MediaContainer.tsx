import React from "react";

export type AspectRatio = "16/9" | "4/3" | "1/1" | "21/9" | "auto";
export type MediaRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface MediaContainerProps extends React.HTMLAttributes<HTMLElement> {
  aspectRatio?: AspectRatio;
  rounded?: MediaRadius;
  caption?: React.ReactNode;
  overlay?: boolean;
  bordered?: boolean;
  children: React.ReactNode;
}

const aspectClasses: Record<AspectRatio, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
  auto: "",
};

const radiusClasses: Record<MediaRadius, string> = {
  none: "rounded-none",
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export function MediaContainer({
  aspectRatio = "16/9",
  rounded = "lg",
  caption,
  overlay = false,
  bordered = true,
  children,
  className = "",
  ...props
}: MediaContainerProps) {
  const containerContent = (
    <div
      className={`relative overflow-hidden ${aspectClasses[aspectRatio]} ${
        radiusClasses[rounded]
      } ${
        bordered ? "border border-[#DDE5DC]" : ""
      } bg-[#F3F7EC] flex items-center justify-center ${className}`}
    >
      {children}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  );

  if (caption) {
    return (
      <figure className="space-y-2" {...props}>
        {containerContent}
        <figcaption className="text-xs text-[#59665D] text-center italic">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return containerContent;
}
