import Link from "next/link";
import { auth } from "@/lib/auth";
import { signOutAction } from "@/lib/actions";

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4l4 4-4 4" stroke="#BEBEBE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MAIN_MENU = [
  {
    href: "/conversas",
    label: "Conversas",
    description: "Meu histórico de conversas",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="18" height="14" rx="3" stroke="#1A1A1A" strokeWidth="1.5" />
        <path d="M6 18l2.5-2.5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 8h10M6 11.5h6" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/notificacoes",
    label: "Notificações",
    description: "Minha central de notificações",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2.5A5.5 5.5 0 005.5 8v3l-1.5 3h14l-1.5-3V8A5.5 5.5 0 0011 2.5z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 17a2 2 0 004 0" stroke="#1A1A1A" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: "/perfil/pagamentos",
    label: "Pagamentos",
    description: "Meus cartões e formas de pagamento",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="5" width="18" height="13" rx="2.5" stroke="#1A1A1A" strokeWidth="1.5" />
        <path d="M2 9.5h18" stroke="#1A1A1A" strokeWidth="1.5" />
        <path d="M6 14h4" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/perfil/enderecos",
    label: "Endereços",
    description: "Meus endereços",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2a7 7 0 017 7c0 5-7 12-7 12S4 14 4 9a7 7 0 017-7z" stroke="#1A1A1A" strokeWidth="1.5" />
        <circle cx="11" cy="9" r="2.5" stroke="#1A1A1A" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: "/perfil/clube-help",
    label: "Clube Help!",
    description: "Meus benefícios do clube Help!",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 10L11 3l8 7v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8.5 21V13.5h5V21" stroke="#1A1A1A" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const SECONDARY_MENU = [
  {
    href: "/perfil/ajuda",
    label: "Ajuda",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="#9CA3AF" strokeWidth="1.5" />
        <path d="M11 14v.5" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 12c0-2 2.5-2 2.5-4a2.5 2.5 0 00-5 0" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/perfil/configuracoes",
    label: "Configurações",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="3" stroke="#9CA3AF" strokeWidth="1.5" />
        <path d="M11 2v2M11 18v2M2 11h2M18 11h2M4.9 4.9l1.4 1.4M15.7 15.7l1.4 1.4M4.9 17.1l1.4-1.4M15.7 6.3l1.4-1.4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default async function PerfilPage() {
  const session = await auth();
  const name = session?.user?.name ?? "Usuário";
  const initial = name[0]?.toUpperCase() ?? "U";

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="px-4 pt-14 pb-5 bg-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-lightest flex items-center justify-center shrink-0">
            <span className="font-display font-bold text-primary-pure text-2xl">{initial}</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-neutral-low">{name}</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#F5A623">
                <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.1l-3.7 2.2.7-4.1L1 5.3l4.2-.7L7 1z" />
              </svg>
              <span className="font-body text-sm text-neutral-low font-semibold">4.93</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clube Help Banner */}
      <div className="mx-4 rounded-2xl overflow-hidden" style={{ background: "#321CB2" }}>
        <Link href="/perfil/clube-help" className="flex justify-between items-center px-5 py-5">
          <div>
            <p className="font-display font-bold text-white text-2xl leading-tight">Clube Help!</p>
            <p className="font-body text-sm text-white/80 mt-1">Sua assinatura mensal</p>
          </div>
          <div className="text-5xl opacity-90">🏠</div>
        </Link>
      </div>

      {/* Main menu */}
      <div className="mt-6 px-4">
        <div className="divide-y divide-neutral-light">
          {MAIN_MENU.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-4 py-4">
              <div className="w-8 shrink-0 flex justify-center">{item.icon}</div>
              <div className="flex-1">
                <p className="font-body font-semibold text-sm text-neutral-low">{item.label}</p>
                <p className="font-body text-xs text-neutral-dark mt-0.5">{item.description}</p>
              </div>
              <ChevronRight />
            </Link>
          ))}
        </div>
      </div>

      {/* Secondary menu */}
      <div className="mt-4 px-4">
        <div className="divide-y divide-neutral-light">
          {SECONDARY_MENU.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-4 py-4">
              <div className="w-8 shrink-0 flex justify-center">{item.icon}</div>
              <div className="flex-1">
                <p className="font-body text-sm text-neutral-dark">{item.label}</p>
              </div>
              <ChevronRight />
            </Link>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mt-6 pb-6">
        <form action={signOutAction}>
          <button
            type="submit"
            className="w-full h-12 rounded-2xl border border-error-pure font-body font-semibold text-sm text-error-pure"
          >
            Sair da conta
          </button>
        </form>
      </div>
    </div>
  );
}
