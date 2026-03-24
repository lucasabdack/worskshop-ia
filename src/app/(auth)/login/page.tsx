"use client";

import { signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ds";

type Phase = "dots" | "expand" | "logo" | "dissolving" | "login";

export default function LoginPage() {
  const router  = useRouter();
  const [phase, setPhase] = useState<Phase>("dots");
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const centerDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("expand"),     1700);
    const t2 = setTimeout(() => setPhase("logo"),       3800);  // 1700 + 2000ms half-arc + 100ms buffer
    const t3 = setTimeout(() => setPhase("dissolving"), 5150);  // logo: 50ms appear + 1000ms stay + 300ms buffer
    const t4 = setTimeout(() => setPhase("login"),      7400);  // 5150 + 2000ms exit + 250ms buffer
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  async function handleGoogle() {
    setLoading(true);
    await signIn("google", { callbackUrl: "/home" });
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", { email, password: "demo", redirect: false });
    if (res?.ok) router.push("/home");
    else setLoading(false);
  }

  /* ─────────── splash ─────────── */
  if (phase !== "login") {
    const dotsHidden  = phase === "expand" || phase === "logo" || phase === "dissolving";
    const logoVisible = phase === "logo" || phase === "dissolving";

    return (
      <main className="min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
        <style>{`
          @keyframes dotBounce {
            0%, 55%, 100% { transform: translateY(0);    }
            30%            { transform: translateY(-12px); }
          }
          .dot { width: 12px; height: 12px; border-radius: 50%; }
          .d0 { animation: dotBounce 0.9s ease-in-out 0s    infinite; }
          .d1 { animation: dotBounce 0.9s ease-in-out 0.16s infinite; }
          .d2 { animation: dotBounce 0.9s ease-in-out 0.32s infinite; }

          /* entra de fora (baixo-esquerda) → dot → direita → topo */
          @keyframes expandHalfArc {
            0%   { transform: translate(-52vw,  12vh) scale(1);   }
            18%  { transform: translate(0,       0)   scale(1);   }
            58%  { transform: translate(42vw,  -38vh) scale(125); }
            100% { transform: translate(0,     -78vh) scale(250); }
          }

          /* segunda metade + saída: topo → esquerda → dot → abaixo da tela */
          @keyframes exitArc {
            0%   { transform: translate(0,     -78vh) scale(250); }
            40%  { transform: translate(-42vw, -38vh) scale(140); }
            75%  { transform: translate(0,       0)   scale(25);  }
            100% { transform: translate(0,      18vh) scale(1);   }
          }

          @keyframes logoFadeIn  { from { opacity: 0; } to { opacity: 1; } }
          @keyframes logoFadeOut { from { opacity: 1; } to { opacity: 0; } }
          .logo-in  { animation: logoFadeIn  0.05s ease both; }
          .logo-out { animation: logoFadeOut 0.3s  ease both; }
        `}</style>

        {/* bola que cresce e faz o arco circular */}
        <div
          ref={centerDotRef}
          style={{
            position: "fixed",
            bottom: "8%",
            left: "calc(50% - 6px)",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "var(--color-primary-pure)",
            transformOrigin: "center center",
            zIndex: 10,
            opacity: phase === "dots" ? 0 : 1,
            transform: phase === "logo" ? "translate(0, -78vh) scale(250)" : "scale(1)",
            animation:
              phase === "expand"     ? "expandHalfArc 2s ease-in-out forwards" :
              phase === "dissolving" ? "exitArc 2s ease-in-out forwards" :
              "none",
          }}
        />

        {/* logo — overlay separado, não afetado pelo scale */}
        {logoVisible && (
          <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 11 }}>
            <span
              className={`font-display font-bold text-white select-none ${phase === "dissolving" ? "logo-out" : "logo-in"}`}
              style={{ fontSize: "clamp(56px, 18vw, 96px)" }}
            >
              Help!
            </span>
          </div>
        )}

        {/* dots */}
        <div
          style={{
            position: "fixed",
            bottom: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            zIndex: 5,
            opacity: dotsHidden ? 0 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          <div className="dot d0" style={{ background: "var(--color-primary-light)" }} />
          <div className="dot d1" style={{ background: "var(--color-primary-pure)"  }} />
          <div className="dot d2" style={{ background: "var(--color-primary-dark)"  }} />
        </div>
      </main>
    );
  }

  /* ─────────── login ─────────── */
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-neutral-light"
      style={{ animation: "fadeIn 0.5s ease both" }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-3">
          <div className="mx-auto flex items-center justify-center">
            <span className="font-display font-bold text-6xl" style={{ color: "#321CB2" }}>Help!</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-neutral-low">Bem-vindo de volta</h1>
            <p className="font-body text-sm text-neutral-dark mt-1">Entre na sua conta Help</p>
          </div>
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 h-12 rounded-full border border-neutral-pure bg-white font-body font-semibold text-neutral-low text-sm hover:bg-neutral-light transition-colors disabled:opacity-50"
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path fill="#4285F4" d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.41a4.63 4.63 0 01-2.01 3.04v2.52h3.25c1.9-1.75 3-4.33 3-7.35z"/>
            <path fill="#34A853" d="M10 20c2.7 0 4.96-.9 6.62-2.42l-3.25-2.52c-.9.6-2.05.96-3.37.96-2.6 0-4.8-1.75-5.59-4.11H1.07v2.6A10 10 0 0010 20z"/>
            <path fill="#FBBC04" d="M4.41 11.91A6.03 6.03 0 014.1 10c0-.66.12-1.3.31-1.91V5.49H1.07A10 10 0 000 10c0 1.61.39 3.14 1.07 4.51l3.34-2.6z"/>
            <path fill="#EA4335" d="M10 3.98c1.46 0 2.77.5 3.8 1.49l2.85-2.85A9.98 9.98 0 0010 0 10 10 0 001.07 5.49l3.34 2.6C5.2 5.74 7.4 3.98 10 3.98z"/>
          </svg>
          Continuar com Google
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-neutral-pure" />
          <span className="font-body text-xs text-neutral-dark">ou</span>
          <div className="flex-1 h-px bg-neutral-pure" />
        </div>

        <form onSubmit={handleEmail} className="space-y-4">
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 px-4 rounded-2xl border border-neutral-pure font-body text-sm text-neutral-low placeholder:text-neutral-dark outline-none focus:border-primary-pure transition-colors"
          />
          <Button type="submit" fullWidth loading={loading}>Entrar</Button>
        </form>

        <p className="text-center font-body text-sm text-neutral-dark">
          Não tem conta?{" "}
          <a href="/signup" className="text-primary-pure font-semibold">Criar conta</a>
        </p>
      </div>
    </main>
  );
}
