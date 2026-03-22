import Link from "next/link";

// Mock: user has no active subscription
const SUBSCRIPTION_STATE: "none" | "active" | "paused" = "none";

export default function ClubeHelpPage() {
  if (SUBSCRIPTION_STATE === "active") {
    return <ActiveState />;
  }
  if (SUBSCRIPTION_STATE === "paused") {
    return <PausedState />;
  }
  return <NoSubscriptionState />;
}

function NoSubscriptionState() {
  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="sticky top-0 z-50 bg-white px-4 pt-12 pb-4 flex items-center gap-3">
        <Link href="/perfil">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="font-display font-bold text-xl text-neutral-darkest">Clube Help</h1>
      </div>

      {/* Hero */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: "#321CB2" }}>
        <div className="px-5 py-6 text-center">
          <div className="text-5xl mb-3">⭐</div>
          <h2 className="font-display font-bold text-white text-2xl leading-tight">
            3 serviços<br />por mês
          </h2>
          <p className="font-body text-sm text-white/70 mt-2">
            Assine e use seus créditos em qualquer categoria
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="mx-4 mt-4 card p-4 space-y-3">
        {[
          { icon: "✅", title: "3 serviços por mês", desc: "Use em qualquer categoria" },
          { icon: "💰", title: "Economia garantida", desc: "Pague menos que o avulso" },
          { icon: "⚡", title: "Agendamento prioritário", desc: "Horários exclusivos para assinantes" },
          { icon: "🔄", title: "Cancele quando quiser", desc: "Sem multas ou taxas" },
        ].map((b) => (
          <div key={b.title} className="flex items-center gap-4">
            <span className="text-2xl">{b.icon}</span>
            <div>
              <p className="font-body font-semibold text-sm text-neutral-darkest">{b.title}</p>
              <p className="font-body text-xs text-neutral-dark">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div className="mx-4 mt-4 space-y-3">
        <h2 className="font-display font-bold text-base text-neutral-darkest">Escolha seu plano</h2>

        <div className="card px-4 py-4 border-2 border-primary-pure relative">
          <div className="absolute -top-2.5 left-4 bg-primary-pure rounded-full px-3 py-0.5">
            <span className="font-body text-xs text-white font-bold">Mais popular</span>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-display font-bold text-base text-neutral-darkest">Mensal</p>
              <p className="font-body text-xs text-neutral-dark">3 serviços / mês</p>
            </div>
            <div className="text-right">
              <p className="font-display font-bold text-xl text-primary-pure">R$ 89</p>
              <p className="font-body text-xs text-neutral-dark">/mês</p>
            </div>
          </div>
        </div>

        <div className="card px-4 py-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-display font-bold text-base text-neutral-darkest">Anual</p>
              <p className="font-body text-xs text-neutral-dark">36 serviços / ano · economize 20%</p>
            </div>
            <div className="text-right">
              <p className="font-display font-bold text-xl text-neutral-darkest">R$ 71</p>
              <p className="font-body text-xs text-neutral-dark">/mês</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 mt-4 mb-8">
        <button className="w-full h-12 rounded-full font-body font-bold text-sm text-white" style={{ background: "#321CB2" }}>
          Assinar agora
        </button>
      </div>
    </div>
  );
}

function ActiveState() {
  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="sticky top-0 z-50 bg-white px-4 pt-12 pb-4 flex items-center gap-3">
        <Link href="/perfil">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="font-display font-bold text-xl text-neutral-darkest">Clube Help</h1>
      </div>

      <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: "#321CB2" }}>
        <div className="px-5 py-5">
          <p className="font-body text-xs text-white/70 font-semibold uppercase tracking-wide mb-1">Assinante ativo</p>
          <h2 className="font-display font-bold text-white text-xl">Clube Help Mensal</h2>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: "33%" }} />
            </div>
            <span className="font-body text-xs text-white">1/3 usados</span>
          </div>
          <p className="font-body text-xs text-white/60 mt-1">Renova em 31/03/2026</p>
        </div>
      </div>

      <div className="mx-4 mt-4">
        <button className="w-full h-12 rounded-2xl border border-neutral-pure font-body font-semibold text-sm text-neutral-dark">
          Pausar assinatura
        </button>
      </div>
    </div>
  );
}

function PausedState() {
  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="sticky top-0 z-50 bg-white px-4 pt-12 pb-4 flex items-center gap-3">
        <Link href="/perfil">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="font-display font-bold text-xl text-neutral-darkest">Clube Help</h1>
      </div>

      <div className="mx-4 mt-8 text-center">
        <div className="text-5xl mb-4">⏸️</div>
        <h2 className="font-display font-bold text-xl text-neutral-darkest">Assinatura pausada</h2>
        <p className="font-body text-sm text-neutral-dark mt-2">
          Sua assinatura está pausada. Reative para usar seus créditos.
        </p>
        <button className="mt-6 px-8 py-3 rounded-full font-body font-bold text-sm text-white" style={{ background: "#321CB2" }}>
          Reativar assinatura
        </button>
      </div>
    </div>
  );
}
