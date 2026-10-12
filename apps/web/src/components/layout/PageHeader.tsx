import React from "react";
import { Container } from "./Container";
import { Breadcrumbs, BreadcrumbItem } from "../ui/Breadcrumbs";
import { Badge } from "../ui/Badge";

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: "default" | "botanical" | "leaf" | "success" | "warning";
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  badge,
  badgeVariant = "default",
  breadcrumbs,
  actions,
  children,
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`bg-gradient-to-b from-[#F3F7EC] via-[#F8FAF7] to-white border-b border-[#DDE5DC] py-8 sm:py-10 md:py-12 ${className}`}
    >
      <Container>
        {/* Breadcrumb Navigation */}
        <div className="mb-4 sm:mb-5">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {badge && (
              <div>
                <Badge variant={badgeVariant}>{badge}</Badge>
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
              {title}
            </h1>
            {description && (
              <p className="text-base sm:text-lg text-[#647067] leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {actions && <div className="shrink-0 pt-2 md:pt-0">{actions}</div>}
        </div>

        {children && (
          <div className="mt-6 pt-6 border-t border-[#DDE5DC]">{children}</div>
        )}
      </Container>
    </div>
  );
}
