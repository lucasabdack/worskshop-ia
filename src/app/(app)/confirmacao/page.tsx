"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PROVIDERS } from "@/lib/mock-data";

function ConfirmacaoContent() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get("providerId") ?? "";
  const services = searchParams.get("services")?.split(",").filter(Boolean) ?? [];
  const date = searchParams.get("date") ?? "";
  const time = searchParams.get("time") ?? "";
  const path = searchParams.get("path") ?? "avulso";

  const provider = PROVIDERS.find((p) => p.id === providerId);
  const selectedServices = provider?.services.filter((s) => services.includes(s.name)) ?? [];

  return (
    <div className="bg-neutral-light min-h-screen flex flex-col">
      {/* Success state */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-20 h-20 rounded-full bg-success-light flex items-center justify-center mb-5">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M10 20l7 7 13-14" stroke="#34C47C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="font-display font-bold text-2xl text-neutral-low">
          Pedido confirmado!
        </h1>
        <p className="font-body text-sm text-neutral-dark mt-2 leading-relaxed">
          {path === "clube"
            ? "Seu crédito do Clube Help foi utilizado."
            : "Pagamento processado com sucesso."}
        </p>

        {/* Order details */}
        {provider && (
          <div className="w-full mt-8 card p-4 text-left space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-lightest flex items-center justify-center">
                <span className="font-display font-bold text-primary-pure">{provider.name[0]}</span>
              </div>
              <div>
                <p className="font-body font-semibold text-sm text-neutral-low">{provider.name}</p>
                <p className="font-body text-xs text-neutral-dark">{provider.category}</p>
              </div>
            </div>

            {selectedServices.length > 0 && (
              <div className="space-y-1">
                {selectedServices.map((s) => (
                  <p key={s.name} className="font-body text-sm text-neutral-dark">
                    · {s.name}
                  </p>
                ))}
              </div>
            )}

            {date && time && (
              <div className="flex items-center gap-2 border-t border-neutral-light pt-3">
                <span className="text-base">📅</span>
                <p className="font-body text-sm text-neutral-low">
                  {date} às {time}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-base">📍</span>
              <p className="font-body text-sm text-neutral-low">
                Rua das Flores, 42 — Jardim Paulista
              </p>
            </div>
          </div>
        )}

        <p className="font-body text-xs text-neutral-dark mt-4">
          Você receberá uma notificação com detalhes.
        </p>
      </div>

      {/* CTAs */}
      <div className="px-4 pb-28 space-y-3">
        <Link
          href={`/feedback?providerId=${providerId}`}
          className="flex items-center justify-center w-full h-12 rounded-full bg-primary-pure text-white font-body font-bold text-sm"
        >
          Avaliar prestador
        </Link>
        <Link
          href="/pedidos"
          className="flex items-center justify-center w-full h-12 rounded-full border border-neutral-pure font-body font-semibold text-sm text-neutral-low"
        >
          Ver meus pedidos
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmacaoPage() {
  return (
    <Suspense>
      <ConfirmacaoContent />
    </Suspense>
  );
}
