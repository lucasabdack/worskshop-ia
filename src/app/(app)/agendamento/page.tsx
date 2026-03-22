"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { PROVIDERS } from "@/lib/mock-data";

const TIME_SLOTS = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function getDaysFromToday(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });
}

function AgendamentoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const providerId = searchParams.get("providerId") ?? "";
  const services = searchParams.get("services") ?? "";
  const path = searchParams.get("path") ?? "avulso";

  const provider = PROVIDERS.find((p) => p.id === providerId);
  const days = getDaysFromToday(14);

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selectedDay || !selectedTime) return;
    const dateStr = selectedDay.toISOString().split("T")[0];
    const next = path === "avulso" ? "/pagamento" : "/confirmacao";
    router.push(
      `${next}?providerId=${providerId}&services=${services}&date=${dateStr}&time=${selectedTime}&path=${path}`
    );
  };

  const dayLabels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const monthLabels = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

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
          <div>
            <h1 className="font-display font-bold text-xl text-neutral-darkest">Agendamento</h1>
            {provider && (
              <p className="font-body text-xs text-neutral-dark">{provider.name}</p>
            )}
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-4 mt-4">
        <h2 className="font-display font-bold text-base text-neutral-darkest mb-3">Escolha o dia</h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {days.map((day) => {
            const isSelected = selectedDay?.toDateString() === day.toDateString();
            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDay(day)}
                className={`shrink-0 w-14 rounded-2xl py-3 flex flex-col items-center gap-1 transition-all ${
                  isSelected
                    ? "bg-primary-pure text-white"
                    : "bg-white border border-neutral-pure text-neutral-darkest"
                }`}
              >
                <span className={`font-body text-xs ${isSelected ? "text-white/70" : "text-neutral-dark"}`}>
                  {dayLabels[day.getDay()]}
                </span>
                <span className="font-display font-bold text-base">{day.getDate()}</span>
                <span className={`font-body text-xs ${isSelected ? "text-white/70" : "text-neutral-dark"}`}>
                  {monthLabels[day.getMonth()]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDay && (
        <div className="px-4 mt-6">
          <h2 className="font-display font-bold text-base text-neutral-darkest mb-3">Escolha o horário</h2>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`h-11 rounded-xl font-body font-semibold text-sm transition-all ${
                    isSelected
                      ? "bg-primary-pure text-white"
                      : "bg-white border border-neutral-pure text-neutral-darkest"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Address note */}
      <div className="mx-4 mt-4 card p-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">📍</span>
          <div>
            <p className="font-body font-semibold text-sm text-neutral-darkest">Endereço de atendimento</p>
            <p className="font-body text-xs text-neutral-dark">Rua das Flores, 42 — Jardim Paulista</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 py-3 bg-neutral-light/90 backdrop-blur-sm">
        <button
          onClick={handleContinue}
          disabled={!selectedDay || !selectedTime}
          className={`w-full h-12 rounded-full font-body font-bold text-sm transition-all ${
            selectedDay && selectedTime
              ? "bg-primary-pure text-white"
              : "bg-neutral-pure text-neutral-dark cursor-not-allowed"
          }`}
        >
          {path === "avulso" ? "Continuar para pagamento" : "Confirmar agendamento"}
        </button>
      </div>
    </div>
  );
}

export default function AgendamentoPage() {
  return (
    <Suspense>
      <AgendamentoContent />
    </Suspense>
  );
}
