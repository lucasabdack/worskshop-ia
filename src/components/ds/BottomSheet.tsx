"use client";

import React, { useEffect } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: BottomSheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
        aria-hidden
      />
      {/* Sheet */}
      <div
        role="dialog"
        aria-modal
        className="fixed bottom-0 left-0 right-0 z-50 bottom-sheet max-w-lg mx-auto w-full"
        style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
      >
        {/* Handle */}
        <div className="flex justify-center mb-4">
          <span className="w-10 h-1 rounded-full bg-neutral-pure" />
        </div>
        {title && (
          <h2 className="font-display font-bold text-xl text-neutral-low mb-4">
            {title}
          </h2>
        )}
        {children}
      </div>
    </>
  );
}
