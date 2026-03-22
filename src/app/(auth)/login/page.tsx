"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();
  const [dissolve, setDissolve] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setDissolve(true), 2200);
    const navTimer  = setTimeout(() => router.push("/home"), 2900);
    return () => { clearTimeout(fadeTimer); clearTimeout(navTimer); };
  }, [router]);

  return (
    <main
      className="min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "var(--color-primary-pure)",
        transition: "opacity 0.7s ease",
        opacity: dissolve ? 0 : 1,
      }}
    >
      <style>{`
        @keyframes logoFall {
          0%   { transform: translate(0px,  -110vh); opacity: 0; }
          18%  { transform: translate(28px, -55vh);  opacity: 1; }
          34%  { transform: translate(-22px,-18vh);  opacity: 1; }
          50%  { transform: translate(14px,  10px);  opacity: 1; }
          63%  { transform: translate(-8px,  -5px);  opacity: 1; }
          75%  { transform: translate(4px,   3px);   opacity: 1; }
          85%  { transform: translate(-2px,  -1px);  opacity: 1; }
          100% { transform: translate(0px,   0px);   opacity: 1; }
        }
        .logo-fall {
          animation: logoFall 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s both;
        }
      `}</style>

      <span
        className="logo-fall font-display font-bold text-white select-none"
        style={{ fontSize: "clamp(40px, 13vw, 72px)" }}
      >
        Help!
      </span>
    </main>
  );
}
