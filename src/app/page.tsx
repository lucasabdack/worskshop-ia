import Link from "next/link";
import { Button } from "@/components/ds/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-neutral-light">
      <div className="max-w-sm w-full text-center space-y-6">
        {/* Logo */}
        <div
          className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
          style={{ background: "#321CB2" }}
        >
          <span className="font-display font-bold text-white text-2xl">H</span>
        </div>

        <div>
          <h1 className="font-display font-bold text-3xl text-neutral-darkest">
            Help
          </h1>
          <p className="font-body text-sm text-neutral-dark mt-2">
            Serviços residenciais para a sua primeira moradia
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <Button variant="primary" fullWidth>
            Entrar
          </Button>
          <Button variant="ghost" fullWidth>
            Criar conta
          </Button>
        </div>

        {/* Links */}
        <div className="flex gap-4 justify-center text-xs font-body text-neutral-dark">
          <span className="text-primary-pure font-semibold">Helper DS 2026</span>
        </div>
      </div>
    </main>
  );
}
