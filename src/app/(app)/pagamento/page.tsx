"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { PROVIDERS } from "@/lib/mock-data";

const PAYMENT_METHODS = [
  { id: "credit", label: "Cartão de crédito", icon: "💳", detail: "Final 4242" },
  { id: "debit", label: "Cartão de débito", icon: "🏦", detail: "Final 1234" },
  { id: "pix", label: "Pix", icon: "⚡", detail: "Aprovação imediata" },
];

function PagamentoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const providerId = searchParams.get("providerId") ?? "";
  const services = searchParams.get("services")?.split(",").filter(Boolean) ?? [];
  const date = searchParams.get("date") ?? "";
  const time = searchParams.get("time") ?? "";

  const provider = PROVIDERS.find((p) => p.id === providerId);
  const [selectedMethod, setSelectedMethod] = useState("credit");
  const [loading, setLoading] = useState(false);

  const selectedServices = provider?.services.filter((s) => services.includes(s.name)) ?? [];
  const total = selectedServices.reduce((acc, s) => {
    const num = parseFloat(s.price.replace("R$ ", "").replace(",", "."));
    return acc + num;
  }, 0);

  const handlePay = async () => {
    setLoading(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 1500));
    router.push(
      `/confirmacao?providerId=${providerId}&services=${services.join(",")}&date=${date}&time=${time}&path=avulso`
    );
  };

  return (
    <div className="bg-neutral-light min-h-screen pb-28">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="font-display font-bold text-xl text-neutral-darkest">Pagamento</h1>
        </div>
      </div>

      {/* Order summary */}
      <div className="mx-4 mt-4 card p-4 space-y-2">
        <h2 className="font-display font-bold text-base text-neutral-darkest">Resumo</h2>
        {provider && (
          <p className="font-body text-sm text-neutral-dark">{provider.name}</p>
        )}
        {selectedServices.map((s) => (
          <div key={s.name} className="flex items-center justify-between">
            <span className="font-body text-sm text-neutral-dark">{s.name}</span>
            <span className="font-body text-sm text-neutral-darkest">{s.price}</span>
          </div>
        ))}
        {date && time && (
          <p className="font-body text-xs text-neutral-dark pt-1">
            📅 {date} às {time}
          </p>
        )}
        <div className="border-t border-neutral-light pt-2 flex items-center justify-between">
          <span className="font-body font-bold text-sm text-neutral-darkest">Total</span>
          <span className="font-body font-bold text-base text-primary-pure">
            R$ {total.toFixed(0)}
          </span>
        </div>
      </div>

      {/* Payment methods */}
      <div className="mx-4 mt-4 space-y-2">
        <h2 className="font-display font-bold text-base text-neutral-darkest mb-3">
          Forma de pagamento
        </h2>
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full card px-4 py-3.5 flex items-center gap-3 text-left transition-all ${
                isSelected ? "border-primary-pure border-2" : ""
              }`}
            >
              <span className="text-2xl">{method.icon}</span>
              <div className="flex-1">
                <p className="font-body font-semibold text-sm text-neutral-darkest">
                  {method.label}
                </p>
                <p className="font-body text-xs text-neutral-dark">{method.detail}</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? "border-primary-pure bg-primary-pure" : "border-neutral-pure"
                }`}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Add card */}
      <button className="mx-4 mt-2 flex items-center gap-2 py-2">
        <span className="font-body text-sm text-primary-pure font-semibold">+ Adicionar cartão</span>
      </button>

      {/* CTA */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 py-3 bg-neutral-light/90 backdrop-blur-sm">
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full h-12 rounded-full bg-primary-pure text-white font-body font-bold text-sm disabled:opacity-60"
        >
          {loading ? "Processando..." : `Pagar R$ ${total.toFixed(0)}`}
        </button>
      </div>
    </div>
  );
}

export default function PagamentoPage() {
  return (
    <Suspense>
      <PagamentoContent />
    </Suspense>
  );
}
