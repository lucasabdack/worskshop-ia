"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { PROVIDERS } from "@/lib/mock-data";

const MOCK_MESSAGES = [
  { id: "1", from: "provider", text: "Olá! Vi que você tem um pedido agendado. Posso confirmar?", time: "14:00" },
  { id: "2", from: "user", text: "Sim! Pode confirmar.", time: "14:05" },
  { id: "3", from: "provider", text: "Tudo certo! Estarei lá às 14h.", time: "14:32" },
];

const PROVIDER_MAP: Record<string, string> = { "1": "0", "2": "1" };

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const providerIdx = PROVIDER_MAP[id] ?? "0";
  const provider = PROVIDERS[parseInt(providerIdx)];
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), from: "user", text: input, time: "agora" },
    ]);
    setInput("");
  };

  return (
    <div className="bg-neutral-light flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-3 flex items-center gap-3 shrink-0">
        <Link href="/conversas">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <div className="w-9 h-9 rounded-full bg-primary-lightest flex items-center justify-center">
          <span className="font-display font-bold text-primary-pure text-sm">
            {provider?.name[0] ?? "?"}
          </span>
        </div>
        <div>
          <p className="font-body font-semibold text-sm text-neutral-darkest">
            {provider?.name ?? "Prestador"}
          </p>
          <p className="font-body text-xs text-success-low">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-24">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                msg.from === "user"
                  ? "bg-primary-pure text-white rounded-br-sm"
                  : "bg-white text-neutral-darkest rounded-bl-sm border border-neutral-pure"
              }`}
            >
              <p className="font-body text-sm leading-relaxed">{msg.text}</p>
              <p className={`font-body text-xs mt-1 ${msg.from === "user" ? "text-white/60" : "text-neutral-dark"}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 py-2 bg-white border-t border-neutral-pure">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Escreva uma mensagem..."
            className="flex-1 h-10 px-4 rounded-full bg-neutral-light font-body text-sm text-neutral-darkest outline-none placeholder:text-neutral-dark"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-primary-pure flex items-center justify-center disabled:opacity-40"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M16 2L2 7l6 2 2 6 6-13z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
