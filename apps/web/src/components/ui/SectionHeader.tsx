import React from "react";
import { Heading } from "./Heading";
import { Overline } from "./Overline";
import { Text } from "./Text";

export interface SectionHeaderProps {
  overline?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  overline,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignStyles = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl mb-10 sm:mb-14 ${alignStyles} ${className}`}>
      {overline && <Overline className="mb-2">{overline}</Overline>}
      <Heading level={2} size="h2" className="mb-3">
        {title}
      </Heading>
      {description && (
        <Text variant="lead" className="text-[#647067]">
          {description}
        </Text>
      )}
    </div>
  );
}
