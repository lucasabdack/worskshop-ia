import Link from "next/link";
import { auth } from "@/lib/auth";
import { signOutAction } from "@/lib/actions";

export default async function ConfiguracoesPage() {
  const session = await auth();

  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="bg-white px-4 pt-12 pb-4 flex items-center gap-3">
        <Link href="/perfil">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="font-display font-bold text-xl text-neutral-darkest">Configurações</h1>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Account */}
        <div>
          <h2 className="font-body text-xs font-semibold text-neutral-dark uppercase tracking-wide mb-2 px-1">
            Conta
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden divide-y divide-neutral-light">
            <div className="flex items-center gap-4 px-4 py-3.5">
              <span className="font-body text-sm text-neutral-dark w-20">Nome</span>
              <span className="font-body font-semibold text-sm text-neutral-darkest flex-1">
                {session?.user?.name ?? "—"}
              </span>
            </div>
            <div className="flex items-center gap-4 px-4 py-3.5">
              <span className="font-body text-sm text-neutral-dark w-20">E-mail</span>
              <span className="font-body font-semibold text-sm text-neutral-darkest flex-1 truncate">
                {session?.user?.email ?? "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="font-body text-xs font-semibold text-neutral-dark uppercase tracking-wide mb-2 px-1">
            Notificações
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden divide-y divide-neutral-light">
            {[
              { label: "Confirmações de pedido", enabled: true },
              { label: "Promoções e novidades", enabled: false },
              { label: "Lembretes de agendamento", enabled: true },
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between px-4 py-3.5">
                <span className="font-body text-sm text-neutral-darkest">{setting.label}</span>
                <div
                  className={`w-11 h-6 rounded-full transition-colors ${
                    setting.enabled ? "bg-primary-pure" : "bg-neutral-pure"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm mt-0.5 transition-transform ${
                      setting.enabled ? "translate-x-5.5" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div>
          <h2 className="font-body text-xs font-semibold text-neutral-dark uppercase tracking-wide mb-2 px-1">
            Privacidade
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden divide-y divide-neutral-light">
            <button className="w-full flex items-center justify-between px-4 py-3.5 text-left">
              <span className="font-body text-sm text-neutral-darkest">Política de privacidade</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3.5 text-left">
              <span className="font-body text-sm text-error-pure">Excluir conta</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="#E03A3A" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Logout */}
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
