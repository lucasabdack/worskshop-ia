"use client";

import React from "react";

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Chip({
  label,
  active = false,
  onClick,
  disabled = false,
  className = "",
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "chip-default",
        active ? "chip-active" : "",
        disabled ? "opacity-40 cursor-not-allowed" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </button>
  );
}

interface ChipGroupProps {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function ChipGroup({
  options,
  value,
  onChange,
  className = "",
}: ChipGroupProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((opt) => (
        <Chip
          key={opt}
          label={opt}
          active={value === opt}
          onClick={() => onChange?.(opt)}
        />
      ))}
    </div>
  );
}
