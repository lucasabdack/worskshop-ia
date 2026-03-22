"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 2600);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main
      className="min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--color-primary-pure)" }}
    >
      <style>{`
        @keyframes logoFall {
          0%   { transform: translateY(-110vh) rotate(-6deg); opacity: 0; }
          55%  { transform: translateY(18px)  rotate(2deg);  opacity: 1; }
          72%  { transform: translateY(-10px) rotate(-1deg); opacity: 1; }
          85%  { transform: translateY(6px)   rotate(0.5deg); opacity: 1; }
          100% { transform: translateY(0)     rotate(0deg);  opacity: 1; }
        }
        .logo-fall {
          animation: logoFall 1.4s cubic-bezier(0.23, 1, 0.32, 1) 0.2s both;
        }
      `}</style>

      <span
        className="logo-fall font-display font-bold text-white select-none"
        style={{ fontSize: "clamp(56px, 18vw, 96px)" }}
      >
        Help!
      </span>
    </main>
  );
}
