import Link from "next/link";
import { auth } from "@/lib/auth";
import { signOutAction } from "@/lib/actions";

const MENU_ITEMS = [
  { href: "/conversas", icon: "💬", label: "Conversas", description: "Histórico de mensagens" },
  { href: "/notificacoes", icon: "🔔", label: "Notificações", description: "Avisos e atualizações" },
  { href: "/perfil/pagamentos", icon: "💳", label: "Pagamentos", description: "Cartões e histórico" },
  { href: "/perfil/enderecos", icon: "📍", label: "Endereços", description: "Seus endereços salvos" },
  { href: "/perfil/clube-help", icon: "⭐", label: "Clube Help", description: "Assinatura e benefícios" },
  { href: "/perfil/ajuda", icon: "❓", label: "Ajuda", description: "Central de suporte" },
  { href: "/perfil/configuracoes", icon: "⚙️", label: "Configurações", description: "Conta e privacidade" },
];

export default async function PerfilPage() {
  const session = await auth();
  const name = session?.user?.name ?? "Usuário";
  const email = session?.user?.email ?? "";
  const initial = name[0]?.toUpperCase() ?? "U";

  return (
    <div className="bg-neutral-light min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-lightest flex items-center justify-center">
            <span className="font-display font-bold text-primary-pure text-2xl">{initial}</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-neutral-darkest">{name}</h1>
            <p className="font-body text-sm text-neutral-dark">{email}</p>
          </div>
        </div>
      </div>

      {/* Clube Help CTA */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: "#321CB2" }}>
        <Link href="/perfil/clube-help" className="px-5 py-4 flex justify-between items-center">
          <div>
            <p className="font-body text-xs text-white/70 font-semibold uppercase tracking-wide">
              Clube Help
            </p>
            <p className="font-display font-bold text-white text-base mt-0.5">
              3 serviços por mês
            </p>
            <span className="inline-flex mt-2 px-3 py-1 bg-white rounded-full font-body font-bold text-xs text-primary-pure">
              Assinar agora →
            </span>
          </div>
          <div className="text-4xl opacity-80">⭐</div>
        </Link>
      </div>

      {/* Menu items */}
      <div className="mx-4 mt-4 bg-white rounded-2xl overflow-hidden divide-y divide-neutral-light">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-4 px-4 py-3.5"
          >
            <span className="text-xl w-7 text-center">{item.icon}</span>
            <div className="flex-1">
              <p className="font-body font-semibold text-sm text-neutral-darkest">{item.label}</p>
              <p className="font-body text-xs text-neutral-dark">{item.description}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="mx-4 mt-3 mb-4">
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
