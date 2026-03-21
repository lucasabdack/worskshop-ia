import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = "",
  padding = true,
  onClick,
}: CardProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      className={[
        "card",
        padding ? "p-4" : "",
        onClick ? "w-full text-left cursor-pointer hover:shadow-level-2 transition-shadow" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
}
