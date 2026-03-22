"use client";

import { useParams, useRouter } from "next/navigation";
import { PROVIDERS } from "@/lib/mock-data";
import { useState, useEffect } from "react";

// ─── Icons ───────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OutletIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <rect x="4" y="4" width="28" height="28" rx="6" stroke="#321CB2" strokeWidth="1.8" />
    <circle cx="13" cy="16" r="2" stroke="#321CB2" strokeWidth="1.6" />
    <circle cx="23" cy="16" r="2" stroke="#321CB2" strokeWidth="1.6" />
    <path d="M15 22h6" stroke="#321CB2" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M20 8l-4 4h3l-4 4" stroke="#321CB2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShowerIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M8 12c0-5.5 4.5-8 9-8s9 2.5 9 8" stroke="#321CB2" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 12h20" stroke="#321CB2" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M10 16v2M14 16v2M18 16v2M22 16v2M26 16v2M10 22v2M14 22v2M18 22v2M22 22v2M26 22v2" stroke="#321CB2" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const BulbIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M18 6a9 9 0 016 15.7V24a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2.3A9 9 0 0118 6z" stroke="#321CB2" strokeWidth="1.8" />
    <path d="M14 28h8M15 31h6" stroke="#321CB2" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const AcIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <rect x="4" y="9" width="28" height="14" rx="3" stroke="#321CB2" strokeWidth="1.8" />
    <path d="M4 15h28" stroke="#321CB2" strokeWidth="1.6" />
    <path d="M12 23v4M18 23v4M24 23v4" stroke="#321CB2" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="26" cy="12" r="2" fill="#321CB2" />
  </svg>
);

const WrenchIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M10 26l12-12M22 8a5 5 0 100 10 5 5 0 000-10z" stroke="#321CB2" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 28l4-4" stroke="#321CB2" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ─── Mock data extensions ─────────────────────────────────────────────────────

const EXTENDED_SERVICES = [
  {
    name: "Reparo de tomadas",
    price: "R$ 70",
    priceType: "por hora",
    Icon: OutletIcon,
    includes: [
      "Troca de tomadas danificadas ou queimadas;",
      "Correção de mau contato em tomadas existentes;",
      "Substituição de espelhos ou módulos frouxos;",
      "Verificação básica de funcionamento da tomada.",
    ],
    excludes: [
      "Instalação de novos pontos de tomada;",
      "Alterações ou extensões na fiação elétrica;",
      "Serviços no quadro de energia ou disjuntores;",
      "Mudança de posição da tomada na parede;",
      "Adequações que exigem quebra de parede ou obra civil.",
    ],
  },
  {
    name: "Reparo de chuveiro",
    price: "R$ 90",
    priceType: "por hora",
    Icon: ShowerIcon,
    includes: [
      "Troca de resistência ou chuveiro completo;",
      "Verificação da fiação do chuveiro;",
      "Ajuste da pressão e temperatura;",
    ],
    excludes: [
      "Instalação de novos pontos hidráulicos;",
      "Obras de alvenaria ou reparos no banheiro;",
    ],
  },
  {
    name: "Instalação de iluminação",
    price: "R$ 70",
    priceType: "por hora",
    Icon: BulbIcon,
    includes: [
      "Instalação de luminárias e arandelas;",
      "Troca de lâmpadas e spots;",
      "Instalação de fitas de LED;",
    ],
    excludes: [
      "Passagem de fiação nova;",
      "Instalação de quadro de distribuição;",
    ],
  },
  {
    name: "Manutenção de ar-condicionado",
    price: "R$ 120",
    priceType: "por hora",
    Icon: AcIcon,
    includes: [
      "Limpeza dos filtros e evaporador;",
      "Verificação da carga de gás;",
      "Checagem do sistema elétrico do aparelho;",
    ],
    excludes: [
      "Recarga de gás refrigerante;",
      "Substituição de peças internas;",
      "Instalação de novo aparelho;",
    ],
  },
  {
    name: "Revisão elétrica",
    price: "R$ 90",
    priceType: "por hora",
    Icon: WrenchIcon,
    includes: [
      "Inspeção de tomadas e interruptores;",
      "Verificação do quadro de distribuição;",
      "Identificação de sobrecargas;",
    ],
    excludes: [
      "Substituição de fiação;",
      "Serviços que exijam abertura de paredes;",
    ],
  },
  {
    name: "Troca de disjuntor",
    price: "R$ 80",
    priceType: "por hora",
    Icon: WrenchIcon,
    includes: [
      "Substituição de disjuntores queimados;",
      "Verificação da bitola dos cabos;",
      "Teste após instalação;",
    ],
    excludes: [
      "Troca do quadro elétrico completo;",
      "Passagem de novos circuitos;",
    ],
  },
];

const COMPLIMENTS = [
  { label: "Amigável", count: 13, emoji: "😊" },
  { label: "Pontual", count: 13, emoji: "⏰" },
  { label: "Explica tudo", count: 13, emoji: "💬" },
  { label: "Bom papo", count: 13, emoji: "👍" },
];

// ─── Component ────────────────────────────────────────────────────────────────

type Service = (typeof EXTENDED_SERVICES)[0];

export default function ProviderPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const provider = PROVIDERS.find((p) => p.id === id);

  const [activeTab, setActiveTab] = useState<"elogios" | "recomendacoes" | "conquistas">("elogios");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [previewService, setPreviewService] = useState<Service | null>(null);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    fetch("/api/favorites")
      .then((r) => r.json())
      .then((data) => {
        const ids = (data.favorites ?? []).map((f: { providerId: string }) => f.providerId);
        setFavorited(ids.includes(id));
      })
      .catch(() => {});
  }, [id]);

  if (!provider) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="font-body text-neutral-dark">Prestador não encontrado.</p>
      </div>
    );
  }

  const toggleFavorite = async () => {
    setFavorited((prev) => !prev);
    await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ providerId: id }),
    });
  };

  const addService = (service: Service) => {
    if (!selectedServices.includes(service.name)) {
      setSelectedServices((prev) => [...prev, service.name]);
    }
    setPreviewService(null);
  };

  const toggleService = (name: string) => {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const totalPrice = selectedServices.reduce((sum, name) => {
    const s = EXTENDED_SERVICES.find((s) => s.name === name);
    return sum + (s ? parseInt(s.price.replace("R$ ", "")) : 0);
  }, 0);

  const firstName = provider.name.split(" ")[0];

  return (
    <div className="bg-neutral-light min-h-screen pb-32">
      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden" style={{ background: "#5A8FA0", minHeight: 200 }}>
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-12 left-4 z-10 w-9 h-9 flex items-center justify-center"
        >
          <BackIcon />
        </button>

        {/* Illustration */}
        <div className="absolute right-0 bottom-0 text-8xl pr-2 pb-0 opacity-90 select-none">
          👷
        </div>

        {/* Text */}
        <div className="px-4 pt-12 pb-6 pr-28">
          <p className="font-body text-sm text-white/80 mt-8">{provider.category}</p>
          <h1 className="font-display font-bold text-3xl text-white leading-tight mt-1">
            {provider.name}
          </h1>
        </div>
      </div>

      {/* ── Body — 8px gap via bg-neutral-light ── */}
      <div className="bg-white mt-2">

      {/* ── Stats ── */}
      <div className="px-4 py-3">
        <p className="font-body text-sm text-neutral-dark">
          300 serviços prestados · 2 anos de atuação
        </p>
      </div>

      {/* ── Info bar ── */}
      <div className="mx-4 rounded-xl px-4 py-3 flex items-center justify-between" style={{ background: "#1A1440" }}>
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">$</span>
          <span className="font-body text-sm text-white">a partir de {EXTENDED_SERVICES[0].price},00</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="font-body text-sm text-white">{provider.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-red-400">♥</span>
          <span className="font-body text-sm text-white">{provider.totalReviews}</span>
        </div>
        <button
          onClick={toggleFavorite}
          className="ml-1"
          aria-label="Favoritar"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 21C12 21 3 14 3 8.5A4.5 4.5 0 0112 6.5 4.5 4.5 0 0121 8.5C21 14 12 21 12 21z"
              stroke={favorited ? "#fff" : "#ffffff80"}
              strokeWidth="1.8"
              fill={favorited ? "#fff" : "none"}
            />
          </svg>
        </button>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-2 px-4 mt-4">
        {(["elogios", "recomendacoes", "conquistas"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`h-9 px-4 rounded-full text-sm font-body font-semibold border transition-colors capitalize ${
              activeTab === tab
                ? "border-primary-pure text-primary-pure bg-white"
                : "border-neutral-pure text-neutral-dark bg-white"
            }`}
          >
            {tab === "elogios" ? "Elogios" : tab === "recomendacoes" ? "Recomendações" : "Conquistas"}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className="px-4 mt-4">
        {activeTab === "elogios" && (
          <div>
            <div className="flex gap-5 justify-start">
              {COMPLIMENTS.map((c) => (
                <div key={c.label} className="flex flex-col items-center gap-1">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-primary-lightest flex items-center justify-center text-3xl">
                      {c.emoji}
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary-pure flex items-center justify-center">
                      <span className="font-body font-bold text-white text-xs">{c.count}</span>
                    </div>
                  </div>
                  <span className="font-body text-xs text-neutral-dark text-center">{c.label}</span>
                </div>
              ))}
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              <div className="h-1.5 w-5 rounded-full bg-primary-pure" />
              <div className="h-1.5 w-1.5 rounded-full bg-neutral-pure" />
            </div>
          </div>
        )}
        {activeTab === "recomendacoes" && (
          <p className="font-body text-sm text-neutral-dark py-8 text-center">
            Nenhuma recomendação ainda.
          </p>
        )}
        {activeTab === "conquistas" && (
          <p className="font-body text-sm text-neutral-dark py-8 text-center">
            Nenhuma conquista ainda.
          </p>
        )}
      </div>

      {/* ── Services grid ── */}
      <div className="px-4 mt-6">
        <h2 className="font-display font-bold text-base text-neutral-darkest mb-3">
          Todos os serviços prestados por {firstName}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {EXTENDED_SERVICES.map((service) => {
            const isSelected = selectedServices.includes(service.name);
            return (
              <button
                key={service.name}
                onClick={() => setPreviewService(service)}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? "bg-primary-pure border-primary-pure"
                    : "bg-white border-neutral-pure"
                }`}
              >
                <div className={isSelected ? "[&_path]:stroke-white [&_rect]:stroke-white [&_circle]:stroke-white [&_circle]:fill-white" : ""}>
                  <service.Icon />
                </div>
                <p className={`font-display font-bold text-sm mt-3 leading-tight ${isSelected ? "text-white" : "text-neutral-darkest"}`}>
                  {service.name}
                </p>
                <p className={`font-body text-xs mt-1 ${isSelected ? "text-white/80" : "text-neutral-dark"}`}>
                  A partir de {service.price},00 {service.priceType}.
                </p>
              </button>
            );
          })}
        </div>
      </div>

      </div>{/* end body */}

      {/* ── Bottom action bar ── */}
      {selectedServices.length > 0 && (
        <div
          className="fixed bottom-16 left-0 right-0 bg-white border-t border-neutral-pure px-4 py-3 flex items-center justify-between z-40"
        >
          <div>
            <p className="font-body text-xs text-neutral-dark">Total dos serviços</p>
            <p className="font-display font-bold text-base text-neutral-darkest">
              R$ {totalPrice},00 / por 1 hora
            </p>
          </div>
          <button
            onClick={() => router.push(`/sacola?providerId=${provider.id}&services=${selectedServices.join(",")}`)}
            className="h-11 px-6 rounded-full font-body font-bold text-sm text-white"
            style={{ background: "#321CB2" }}
          >
            Ver pedido
          </button>
        </div>
      )}

      {/* ── Bottom Sheet overlay ── */}
      {previewService && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setPreviewService(null)}
          />

          {/* Sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white rounded-t-3xl px-5 pt-4 pb-10">
            {/* Handle */}
            <div className="w-10 h-1 rounded-full bg-neutral-pure mx-auto mb-5" />

            {/* Service icon + name */}
            <div className="flex items-center gap-3 mb-5">
              <previewService.Icon />
              <h2 className="font-display font-bold text-xl text-neutral-darkest leading-tight">
                {previewService.name}
              </h2>
            </div>

            {/* Includes */}
            <p className="font-display font-bold text-sm text-neutral-darkest mb-2">
              O que configura um {previewService.name.toLowerCase()}?
            </p>
            <ul className="space-y-1 mb-4">
              {previewService.includes.map((item, i) => (
                <li key={i} className="flex gap-2 font-body text-sm text-neutral-dark">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Excludes */}
            <p className="font-display font-bold text-sm mb-2" style={{ color: "#E03A3A" }}>
              O que não configura um {previewService.name.toLowerCase()}?
            </p>
            <ul className="space-y-1 mb-6">
              {previewService.excludes.map((item, i) => (
                <li key={i} className="flex gap-2 font-body text-sm text-neutral-dark">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => addService(previewService)}
              className="w-full h-12 rounded-full font-body font-bold text-sm text-white"
              style={{ background: "#321CB2" }}
            >
              Adicionar serviço
            </button>
          </div>
        </>
      )}
    </div>
  );
}
