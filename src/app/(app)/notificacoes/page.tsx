import Link from "next/link";
import { auth } from "@/lib/auth";
import { getNotificationsByUser } from "@/lib/db";

const ICON_MAP: Record<string, string> = {
  ORDER_CONFIRMED: "✅",
  ORDER_REMINDER: "📅",
  ORDER_COMPLETED: "🎉",
  PAYMENT_RECEIVED: "💳",
  REVIEW_REQUEST: "⭐",
  CLUB_RENEWAL: "🔄",
  CLUB_QUOTA_LOW: "⚠️",
  SYSTEM: "🔔",
};

const STATIC_FALLBACK = [
  {
    id: "1",
    type: "ORDER_CONFIRMED",
    title: "Pedido confirmado",
    body: "Ana Lima confirmou sua limpeza para 25/03 às 09:00.",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: "2",
    type: "CLUB_QUOTA_LOW",
    title: "Clube Help",
    body: "Você tem 3 serviços disponíveis este mês. Use antes de 31/03.",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: false,
  },
];

function timeAgo(date: Date) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60) return "agora";
  if (diff < 3600) return `há ${Math.floor(diff / 60)}min`;
  if (diff < 86400) return `há ${Math.floor(diff / 3600)}h`;
  return `há ${Math.floor(diff / 86400)}d`;
}

export default async function NotificacoesPage() {
  const session = await auth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session?.user as any)?.id ?? "mock";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawNotifications: any[] = await getNotificationsByUser(userId);
  const notifications = rawNotifications.length > 0 ? rawNotifications : STATIC_FALLBACK;

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
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex gap-4 px-4 py-4 ${n.read ? "bg-neutral-light" : "bg-white"}`}
          >
            <div className="w-10 h-10 rounded-full bg-primary-lightest flex items-center justify-center shrink-0 text-lg">
              {ICON_MAP[n.type] ?? "🔔"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-body font-semibold text-sm text-neutral-darkest">{n.title}</p>
                {!n.read && (
                  <div className="w-2 h-2 rounded-full bg-primary-pure shrink-0 ml-2" />
                )}
              </div>
              <p className="font-body text-xs text-neutral-dark mt-0.5 leading-relaxed">{n.body}</p>
              <p className="font-body text-xs text-neutral-dark mt-1">{timeAgo(n.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
