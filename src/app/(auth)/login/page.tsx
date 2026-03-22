"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();
  const [dissolve, setDissolve] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setDissolve(true), 3200);
    const navTimer  = setTimeout(() => router.push("/home"), 4100);
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
          0%   { transform: translate(0px,   -110vh); opacity: 0; }
          12%  { opacity: 1; }
          25%  { transform: translate(14px,  -52vh); }
          42%  { transform: translate(-10px, -16vh); }
          57%  { transform: translate(6px,    6px);  }
          70%  { transform: translate(-3px,  -3px);  }
          82%  { transform: translate(1.5px,  1.5px);}
          91%  { transform: translate(-0.5px,-0.5px);}
          100% { transform: translate(0px,    0px);  opacity: 1; }
        }
        .logo-fall {
          animation: logoFall 2.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
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
