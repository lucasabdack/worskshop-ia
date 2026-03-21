import React from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: 32 | 40 | 48 | 56 | 64;
  badge?: boolean;
  className?: string;
}

export function Avatar({
  src,
  name = "U",
  size = 48,
  badge = false,
  className = "",
}: AvatarProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`relative inline-flex shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          width={size}
          height={size}
          className="rounded-full object-cover"
        />
      ) : (
        <span
          className="rounded-full bg-primary-lightest text-primary-pure font-display font-bold flex items-center justify-center w-full h-full"
          style={{ fontSize: size * 0.38 }}
        >
          {initials}
        </span>
      )}
      {badge && (
        <span
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-pure border-2 border-white flex items-center justify-center"
          aria-hidden
        />
      )}
    </div>
  );
}
