"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

export function Input({
  label,
  helperText,
  error,
  fullWidth = false,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={fullWidth ? "w-full" : "inline-block"}>
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-1 font-body text-sm font-semibold text-neutral-low"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          "input-base",
          error ? "input-error" : "",
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {(error || helperText) && (
        <p
          className={`mt-1 text-xs font-body ${
            error ? "text-error-pure" : "text-neutral-dark"
          }`}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
