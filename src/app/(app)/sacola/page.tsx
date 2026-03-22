"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PROVIDERS } from "@/lib/mock-data";

function SacolaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const providerId = searchParams.get("providerId") ?? "";
  const services = searchParams.get("services")?.split(",").filter(Boolean) ?? [];

  const provider = PROVIDERS.find((p) => p.id === providerId);

  if (!provider) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <p className="font-body text-neutral-dark text-sm mb-4">Sacola vazia.</p>
        <Link href="/home" className="font-body font-bold text-sm text-primary-pure">
          Ir para Home
        </Link>
      </div>
    );
  }

  const selectedServices = provider.services.filter((s) => services.includes(s.name));
  const total = selectedServices.reduce((acc, s) => {
    const num = parseFloat(s.price.replace("R$ ", "").replace(",", "."));
    return acc + num;
  }, 0);

  const formattedTotal = `R$ ${total.toFixed(0)}`;

  const handleClubePath = () => {
    router.push(
      `/agendamento?providerId=${providerId}&services=${services.join(",")}&path=clube`
    );
  };

  const handleAvulsePath = () => {
    router.push(
      `/agendamento?providerId=${providerId}&services=${services.join(",")}&path=avulso`
    );
  };

  return (
    <div className="bg-neutral-light min-h-screen pb-28">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="font-display font-bold text-xl text-neutral-darkest">Sacola</h1>
        </div>
      </div>

      {/* Provider */}
      <div className="mx-4 mt-4 card p-4 flex gap-3 items-center">
        <div className="w-10 h-10 rounded-full bg-primary-lightest flex items-center justify-center">
          <span className="font-display font-bold text-primary-pure">{provider.name[0]}</span>
        </div>
        <div>
          <p className="font-body font-semibold text-sm text-neutral-darkest">{provider.name}</p>
          <p className="font-body text-xs text-neutral-dark">{provider.category}</p>
        </div>
      </div>

      {/* Services summary */}
      <div className="mx-4 mt-3 card p-4 space-y-3">
        <h2 className="font-display font-bold text-base text-neutral-darkest">Serviços</h2>
        {selectedServices.map((s) => (
          <div key={s.name} className="flex items-center justify-between">
            <span className="font-body text-sm text-neutral-dark">{s.name}</span>
            <span className="font-body font-semibold text-sm text-neutral-darkest">{s.price}</span>
          </div>
        ))}
        <div className="border-t border-neutral-light pt-3 flex items-center justify-between">
          <span className="font-body font-bold text-sm text-neutral-darkest">Total</span>
          <span className="font-body font-bold text-base text-primary-pure">{formattedTotal}</span>
        </div>
      </div>

      {/* Path selector */}
      <div className="mx-4 mt-4 space-y-3">
        <h2 className="font-display font-bold text-base text-neutral-darkest">Como deseja pagar?</h2>

        {/* Clube Help path */}
        <button
          onClick={handleClubePath}
          className="w-full rounded-2xl overflow-hidden text-left"
          style={{ background: "#321CB2" }}
        >
          <div className="px-4 py-4 flex justify-between items-start">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-body text-xs text-white/70 font-semibold uppercase tracking-wide">
                  Clube Help
                </span>
                <span className="bg-white/20 text-white text-xs font-body font-bold px-2 py-0.5 rounded-full">
                  Economize
                </span>
              </div>
              <p className="font-display font-bold text-white text-base">
                Usar crédito do Clube
              </p>
              <p className="font-body text-xs text-white/70">
                Você tem 3 serviços disponíveis este mês
              </p>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        {/* Avulso path */}
        <button
          onClick={handleAvulsePath}
          className="w-full card px-4 py-4 flex justify-between items-center text-left"
        >
          <div>
            <p className="font-display font-bold text-base text-neutral-darkest">
              Pagar avulso
            </p>
            <p className="font-body text-xs text-neutral-dark mt-0.5">
              Cartão de crédito, débito ou Pix
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body font-bold text-sm text-primary-pure">{formattedTotal}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="#321CB2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}

export default function SacolaPage() {
  return (
    <Suspense>
      <SacolaContent />
    </Suspense>
  );
}
