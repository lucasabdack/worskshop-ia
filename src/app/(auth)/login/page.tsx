"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ds";

export default function LoginPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"splash" | "dissolving" | "login">("splash");
  const [email, setEmail]   = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dissolveTimer = setTimeout(() => setPhase("dissolving"), 3400);
    const loginTimer    = setTimeout(() => setPhase("login"),      4200);
    return () => { clearTimeout(dissolveTimer); clearTimeout(loginTimer); };
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

  /* ── splash ── */
  if (phase !== "login") {
    return (
      <main
        className="min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "var(--color-primary-pure)",
          transition: "opacity 0.8s ease",
          opacity: phase === "dissolving" ? 0 : 1,
        }}
      >
        <style>{`
          @keyframes logoFall {
            0%   { transform: translate(  0px, -115vh) rotate(  0deg); opacity: 0; }
            6%   { opacity: 1; }
            14%  { transform: translate(-60px,  -72vh) rotate(-14deg); }
            22%  { transform: translate( 70px,  -40vh) rotate( 16deg); }
            30%  { transform: translate(-50px,  -16vh) rotate(-12deg); }
            38%  { transform: translate( 44px,    6px) rotate( 10deg); }
            46%  { transform: translate(-30px,   -4px) rotate( -7deg); }
            53%  { transform: translate( 20px,    3px) rotate(  5deg); }
            60%  { transform: translate(-12px,   -2px) rotate( -3deg); }
            67%  { transform: translate(  7px,    1px) rotate(  2deg); }
            74%  { transform: translate( -4px,   -1px) rotate(-1.2deg);}
            81%  { transform: translate(  2px,  0.5px) rotate( 0.6deg);}
            88%  { transform: translate( -1px, -0.3px) rotate(-0.2deg);}
            100% { transform: translate(  0px,    0px) rotate(  0deg); opacity: 1; }
          }
          .logo-fall {
            animation: logoFall 2.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
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

  /* ── login ── */
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-neutral-light"
      style={{ animation: "fadeIn 0.5s ease both" }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
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
