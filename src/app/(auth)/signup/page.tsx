"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ds";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (res.ok) {
      await signIn("credentials", { email, password: "demo", redirect: false });
      router.push("/home");
    } else {
      const data = await res.json();
      setError(data.error ?? "Erro ao criar conta");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-neutral-light">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-3">
          <div className="mx-auto flex items-center justify-center">
            <span className="font-display font-bold text-6xl" style={{ color: "#321CB2" }}>Help!</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-neutral-darkest">
              Criar conta
            </h1>
            <p className="font-body text-sm text-neutral-dark mt-1">
              Comece a contratar serviços hoje
            </p>
          </div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/home" })}
          className="w-full flex items-center justify-center gap-3 h-12 rounded-full border border-neutral-pure bg-white font-body font-semibold text-neutral-darkest text-sm hover:bg-neutral-light transition-colors"
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full h-12 px-4 rounded-2xl border border-neutral-pure font-body text-sm text-neutral-darkest placeholder:text-neutral-dark outline-none focus:border-primary-pure transition-colors"
          />
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 px-4 rounded-2xl border border-neutral-pure font-body text-sm text-neutral-darkest placeholder:text-neutral-dark outline-none focus:border-primary-pure transition-colors"
          />
          {error && <p className="text-error-pure text-sm font-body">{error}</p>}
          <Button type="submit" fullWidth loading={loading}>
            Criar conta
          </Button>
        </form>

        <p className="text-center font-body text-sm text-neutral-dark">
          Já tem conta?{" "}
          <a href="/login" className="text-primary-pure font-semibold">
            Entrar
          </a>
        </p>
      </div>
    </main>
  );
}
