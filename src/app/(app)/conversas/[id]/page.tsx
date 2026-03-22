"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { PROVIDERS } from "@/lib/mock-data";

type Message = {
  id: string;
  content: string;
  senderType: "USER" | "PROVIDER";
  createdAt: string | Date;
};

const PROVIDER_MAP: Record<string, string> = { "1": "0", "2": "1" };

const MOCK_MESSAGES: Message[] = [
  { id: "1", senderType: "PROVIDER", content: "Olá! Vi que você tem um pedido agendado. Posso confirmar?", createdAt: new Date() },
  { id: "2", senderType: "USER", content: "Sim! Pode confirmar.", createdAt: new Date() },
  { id: "3", senderType: "PROVIDER", content: "Tudo certo! Estarei lá às 14h.", createdAt: new Date() },
];

function formatTime(date: string | Date) {
  return new Date(date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const providerIdx = PROVIDER_MAP[id] ?? "0";
  const provider = PROVIDERS[parseInt(providerIdx)];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Try to fetch real messages; fall back to mock
    fetch(`/api/messages?conversationId=${id}`)
      .then((r) => r.json())
      .then((data) => {
        setMessages(data.messages?.length ? data.messages : MOCK_MESSAGES);
      })
      .catch(() => setMessages(MOCK_MESSAGES));
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || sending) return;
    const text = input;
    setInput("");
    const optimistic: Message = {
      id: String(Date.now()),
      senderType: "USER",
      content: text,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setSending(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: id, content: text }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages((prev) =>
          prev.map((m) => (m.id === optimistic.id ? data.message : m))
        );
      }
    } catch {
      // optimistic message stays
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-neutral-light flex flex-col h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-4 pt-12 pb-3 flex items-center gap-3 shrink-0">
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
            className={`flex ${msg.senderType === "USER" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                msg.senderType === "USER"
                  ? "bg-primary-pure text-white rounded-br-sm"
                  : "bg-white text-neutral-darkest rounded-bl-sm border border-neutral-pure"
              }`}
            >
              <p className="font-body text-sm leading-relaxed">{msg.content}</p>
              <p className={`font-body text-xs mt-1 ${msg.senderType === "USER" ? "text-white/60" : "text-neutral-dark"}`}>
                {formatTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
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
            disabled={!input.trim() || sending}
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
