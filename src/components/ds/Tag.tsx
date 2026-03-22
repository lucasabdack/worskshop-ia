import React from "react";

type TagVariant = "default" | "primary" | "success" | "warning" | "error";

interface TagProps {
  variant?: TagVariant;
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

const variantClasses: Record<TagVariant, string> = {
  default: "tag-default",
  primary: "tag-default tag-primary",
  success: "tag-default tag-success",
  warning: "tag-default tag-warning",
  error: "tag-default tag-error",
};

export function Tag({
  variant = "default",
  children,
  onRemove,
  className = "",
}: TagProps) {
  return (
    <span className={`${variantClasses[variant]} ${className}`}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remover"
          className="ml-1 leading-none opacity-60 hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      )}
    </span>
  );
}
