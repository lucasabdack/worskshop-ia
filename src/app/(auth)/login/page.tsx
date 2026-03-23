"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ds";

type Phase = "expand" | "full" | "contract" | "done" | "login";

export default function LoginPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("expand");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("full"),      800);
    const t2 = setTimeout(() => setPhase("contract"), 1000);
    const t3 = setTimeout(() => setPhase("done"),     1800);
    const t4 = setTimeout(() => setPhase("login"),    2000);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  async function handleGoogle() {
    setLoading(true);
    await signIn("google", { callbackUrl: "/home" });
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password: "demo",
      redirect: false,
    });
    if (res?.ok) router.push("/home");
    else setLoading(false);
  }

  /* ─────────── splash ─────────── */
  if (phase !== "login") {
    return (
      <main style={{ position: "fixed", inset: 0, overflow: "hidden", background: "white" }}>
        <style>{`
          /*
           * Phase 1 (0→800ms): circle starts 20px, centered-X at 80%Y.
           * Expands via scale to cover 250% viewport + slides right 60vw.
           * Easing: cubic-bezier(0.4,0,1,1) — aggressive ease-in.
           */
          @keyframes splashExpand {
            from { transform: translateX(0)    scale(1);   }
            to   { transform: translateX(60vw) scale(120); }
          }

          /*
           * Phase 3 (1000→1800ms): circle at bottom-left, collapses to 0.
           * Easing: cubic-bezier(0,0,0.6,1) — smooth ease-out.
           */
          @keyframes splashContract {
            from { transform: scale(120); }
            to   { transform: scale(0);   }
          }

          @keyframes logoFadeIn  { from { opacity: 0; } to { opacity: 1; } }
          @keyframes logoFadeOut { from { opacity: 1; } to { opacity: 0; } }
          @keyframes loginFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: none; }
          }
        `}</style>

        {/*
         * Phases 1+2 — Expand circle
         * 20px dot, centered-X, at 80%Y.
         * Animates once (800ms); fill-mode:both freezes it at the `to` state
         * during Phase 2 (full-screen pause, 800→1000ms).
         */}
        {(phase === "expand" || phase === "full") && (
          <div
            style={{
              position: "fixed",
              left: "calc(50% - 10px)",
              top: "calc(80% - 10px)",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "var(--color-primary-pure)",
              transformOrigin: "center center",
              animation: "splashExpand 800ms cubic-bezier(0.4, 0, 1, 1) both",
            }}
          />
        )}

        {/*
         * Phase 3 — Contract circle
         * 20px dot at bottom-left corner, transform-origin: bottom left.
         * fill-mode:both keeps it at scale(120) on first frame before
         * the animation starts, avoiding any flash of the default scale(1).
         */}
        {phase === "contract" && (
          <div
            style={{
              position: "fixed",
              left: "0",
              bottom: "0",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "var(--color-primary-pure)",
              transformOrigin: "bottom left",
              animation: "splashContract 800ms cubic-bezier(0, 0, 0.6, 1) both",
            }}
          />
        )}

        {/* Phase 2 — Logo fades in (200ms pause window) */}
        {phase === "full" && (
          <div
            style={{
              position: "fixed", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 20,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(56px, 18vw, 96px)",
                color: "white",
                animation: "logoFadeIn 0.25s ease both",
              }}
            >
              Help!
            </span>
          </div>
        )}

        {/* Phase 3 — Logo fades out as circle contracts */}
        {phase === "contract" && (
          <div
            style={{
              position: "fixed", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 20,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(56px, 18vw, 96px)",
                color: "white",
                animation: "logoFadeOut 0.4s ease both",
              }}
            >
              Help!
            </span>
          </div>
        )}
      </main>
    );
  }

  /* ─────────── login ─────────── */
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-neutral-light"
      style={{ animation: "loginFadeIn 0.5s ease both" }}
    >
      <style>{`
        @keyframes loginFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>

      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex items-center justify-center">
            <span className="font-display font-bold text-6xl" style={{ color: "#321CB2" }}>Help!</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-neutral-low">
              Bem-vindo de volta
            </h1>
            <p className="font-body text-sm text-neutral-dark mt-1">
              Entre na sua conta Help
            </p>
          </div>
        </div>

        {/* Google */}
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

        {/* Email */}
        <form onSubmit={handleEmail} className="space-y-4">
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 px-4 rounded-2xl border border-neutral-pure font-body text-sm text-neutral-low placeholder:text-neutral-dark outline-none focus:border-primary-pure transition-colors"
          />
          <Button type="submit" fullWidth loading={loading}>
            Entrar
          </Button>
        </form>

        <p className="text-center font-body text-sm text-neutral-dark">
          Não tem conta?{" "}
          <a href="/signup" className="text-primary-pure font-semibold">
            Criar conta
          </a>
        </p>
      </div>
    </main>
  );
}
