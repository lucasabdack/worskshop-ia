import Link from "next/link";

const NOTIFICATIONS = [
  {
    id: "1",
    icon: "✅",
    title: "Pedido confirmado",
    body: "Ana Lima confirmou sua limpeza para 25/03 às 09:00.",
    time: "há 2h",
    read: false,
  },
  {
    id: "2",
    icon: "⭐",
    title: "Clube Help",
    body: "Você tem 3 serviços disponíveis este mês. Use antes de 31/03.",
    time: "há 1d",
    read: false,
  },
  {
    id: "3",
    icon: "💬",
    title: "Nova mensagem",
    body: "Carlos Mendes enviou uma mensagem sobre seu pedido.",
    time: "há 2d",
    read: true,
  },
];

export default function NotificacoesPage() {
  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="bg-white px-4 pt-12 pb-4 flex items-center gap-3">
        <Link href="/perfil">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="font-display font-bold text-xl text-neutral-darkest">Notificações</h1>
      </div>

      <div className="divide-y divide-neutral-light">
        {NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            className={`flex gap-4 px-4 py-4 ${n.read ? "bg-neutral-light" : "bg-white"}`}
          >
            <div className="w-10 h-10 rounded-full bg-primary-lightest flex items-center justify-center shrink-0 text-lg">
              {n.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-body font-semibold text-sm text-neutral-darkest">{n.title}</p>
                {!n.read && (
                  <div className="w-2 h-2 rounded-full bg-primary-pure shrink-0 ml-2" />
                )}
              </div>
              <p className="font-body text-xs text-neutral-dark mt-0.5 leading-relaxed">{n.body}</p>
              <p className="font-body text-xs text-neutral-dark mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
