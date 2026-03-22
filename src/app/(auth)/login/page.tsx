"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ds";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-neutral-light">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div
            className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center"
            style={{ background: "#321CB2" }}
          >
            <span className="font-display font-bold text-white text-2xl">H</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-neutral-darkest">
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
          className="w-full flex items-center justify-center gap-3 h-12 rounded-full border border-neutral-pure bg-white font-body font-semibold text-neutral-darkest text-sm hover:bg-neutral-light transition-colors disabled:opacity-50"
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
            className="w-full h-12 px-4 rounded-2xl border border-neutral-pure font-body text-sm text-neutral-darkest placeholder:text-neutral-dark outline-none focus:border-primary-pure transition-colors"
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
