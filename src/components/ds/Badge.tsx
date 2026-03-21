import React from "react";

type BadgeVariant = "active" | "warning" | "error" | "info";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  active: "badge-active",
  warning:
    "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-warning-light text-warning-pure text-xs font-semibold font-body",
  error:
    "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-light text-error-pure text-xs font-semibold font-body",
  info: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info-light text-info-pure text-xs font-semibold font-body",
};

export function Badge({
  variant = "active",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span className={`${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
