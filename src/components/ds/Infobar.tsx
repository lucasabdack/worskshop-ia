import React from "react";

type InfobarVariant = "default" | "success" | "warning" | "error";

interface InfobarProps {
  variant?: InfobarVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const variantClasses: Record<InfobarVariant, string> = {
  default: "infobar-default",
  success: "infobar-success",
  warning: "infobar-warning",
  error:
    "bg-error-light text-error-pure rounded-lg p-3 text-[13px]",
};

export function Infobar({
  variant = "default",
  children,
  icon,
  className = "",
}: InfobarProps) {
  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      <div className="flex items-start gap-2">
        {icon && <span className="shrink-0 mt-0.5">{icon}</span>}
        <span>{children}</span>
      </div>
    </div>
  );
}
