import Link from "next/link";
import { PROVIDERS } from "@/lib/mock-data";

const CONVERSATIONS = [
  {
    id: "1",
    provider: PROVIDERS[0],
    lastMessage: "Tudo certo! Estarei lá às 14h.",
    time: "14:32",
    unread: 0,
  },
  {
    id: "2",
    provider: PROVIDERS[1],
    lastMessage: "Pode confirmar o endereço?",
    time: "Ontem",
    unread: 1,
  },
];

export default function ConversasPage() {
  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="bg-white px-4 pt-12 pb-4 flex items-center gap-3">
        <Link href="/perfil">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="font-display font-bold text-xl text-neutral-darkest">Conversas</h1>
      </div>

      <div className="divide-y divide-neutral-light bg-white">
        {CONVERSATIONS.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="text-5xl mb-4">💬</div>
            <p className="font-display font-bold text-lg text-neutral-darkest">
              Sem conversas ainda
            </p>
            <p className="font-body text-sm text-neutral-dark mt-2">
              Suas conversas com prestadores aparecerão aqui.
            </p>
          </div>
        ) : (
          CONVERSATIONS.map((conv) => (
            <Link key={conv.id} href={`/conversas/${conv.id}`} className="flex items-center gap-4 px-4 py-3.5">
              <div className="w-12 h-12 rounded-full bg-primary-lightest flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-primary-pure">
                  {conv.provider.name[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-body font-semibold text-sm text-neutral-darkest">
                    {conv.provider.name}
                  </p>
                  <p className="font-body text-xs text-neutral-dark shrink-0 ml-2">{conv.time}</p>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="font-body text-xs text-neutral-dark truncate">{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-primary-pure flex items-center justify-center shrink-0 ml-2">
                      <span className="font-body text-xs text-white font-bold">{conv.unread}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
