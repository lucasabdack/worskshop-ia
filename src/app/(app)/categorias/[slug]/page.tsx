"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type SubCategory = { label: string; icon: string };
type DiscountService = { name: string; discountLabel: string; discountSub: string; emoji: string };
type Service = { name: string; emoji: string };
type CategoryConfig = {
  title: string;
  heroEmoji: string;
  subcategories: SubCategory[];
  discountServices: DiscountService[];
  services: Service[];
};

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  reparos: {
    title: "Manutenções\ne Reparos",
    heroEmoji: "🧑‍🔧",
    subcategories: [
      { label: "Hidráulicos", icon: "💧" },
      { label: "Elétricos", icon: "⚡" },
      { label: "Manutenção", icon: "🔧" },
      { label: "Reforma", icon: "🏠" },
    ],
    discountServices: [
      { name: "Reparos\nelétricos", discountLabel: "até 15%", discountSub: "em descontos", emoji: "⚡" },
      { name: "Reparos\nhidráulicos", discountLabel: "até 20%", discountSub: "em descontos", emoji: "💧" },
      { name: "Pintura\nresidencial", discountLabel: "até 10%", discountSub: "em descontos", emoji: "🎨" },
    ],
    services: [
      { name: "Instalação elétrica", emoji: "⚡" },
      { name: "Reparo hidráulico", emoji: "💧" },
      { name: "Pintura", emoji: "🎨" },
      { name: "Montagem de móveis", emoji: "🛠️" },
      { name: "Ar-condicionado", emoji: "❄️" },
      { name: "Desentupimento", emoji: "🚿" },
    ],
  },
  eletrica: {
    title: "Assistência\nTécnica",
    heroEmoji: "💻",
    subcategories: [
      { label: "Elétrica", icon: "⚡" },
      { label: "Rede", icon: "📡" },
      { label: "Informática", icon: "💻" },
      { label: "Eletrodomésticos", icon: "🏠" },
    ],
    discountServices: [
      { name: "Instalação\nelétrica", discountLabel: "até 10%", discountSub: "em descontos", emoji: "⚡" },
      { name: "Config.\nde rede", discountLabel: "até 15%", discountSub: "em descontos", emoji: "📡" },
      { name: "Manutenção\nde PC", discountLabel: "até 12%", discountSub: "em descontos", emoji: "💻" },
    ],
    services: [
      { name: "Instalação de tomada", emoji: "🔌" },
      { name: "Troca de disjuntor", emoji: "⚡" },
      { name: "Instalação de luminária", emoji: "💡" },
      { name: "Config. de Wi-Fi", emoji: "📡" },
      { name: "Manutenção de PC", emoji: "💻" },
      { name: "Câmeras de segurança", emoji: "📷" },
    ],
  },
  limpeza: {
    title: "Limpeza\ne Organização",
    heroEmoji: "🧹",
    subcategories: [
      { label: "Residencial", icon: "🏠" },
      { label: "Comercial", icon: "🏢" },
      { label: "Pós-obra", icon: "🧱" },
      { label: "Organização", icon: "📦" },
    ],
    discountServices: [
      { name: "Limpeza\nprofunda", discountLabel: "até 20%", discountSub: "em descontos", emoji: "✨" },
      { name: "Limpeza\npós-obra", discountLabel: "até 15%", discountSub: "em descontos", emoji: "🧱" },
      { name: "Higienização\nde estofado", discountLabel: "até 18%", discountSub: "em descontos", emoji: "🛋️" },
    ],
    services: [
      { name: "Limpeza básica", emoji: "🧹" },
      { name: "Limpeza profunda", emoji: "✨" },
      { name: "Limpeza pós-obra", emoji: "🧱" },
      { name: "Organização", emoji: "📦" },
      { name: "Limpeza de estofado", emoji: "🛋️" },
      { name: "Higienização", emoji: "🧴" },
    ],
  },
  jardinagem: {
    title: "Jardinagem\ne Paisagismo",
    heroEmoji: "🌿",
    subcategories: [
      { label: "Poda", icon: "✂️" },
      { label: "Plantio", icon: "🌱" },
      { label: "Paisagismo", icon: "🌿" },
      { label: "Irrigação", icon: "💧" },
    ],
    discountServices: [
      { name: "Poda e\nManutenção", discountLabel: "até 15%", discountSub: "em descontos", emoji: "✂️" },
      { name: "Projeto de\nPaisagismo", discountLabel: "até 25%", discountSub: "em descontos", emoji: "🌸" },
      { name: "Irrigação\nautomática", discountLabel: "até 12%", discountSub: "em descontos", emoji: "💧" },
    ],
    services: [
      { name: "Poda de árvores", emoji: "🌳" },
      { name: "Corte de grama", emoji: "🌿" },
      { name: "Plantio de flores", emoji: "🌸" },
      { name: "Paisagismo", emoji: "🏡" },
      { name: "Irrigação", emoji: "💧" },
      { name: "Adubação", emoji: "🌱" },
    ],
  },
};

const DEFAULT_CONFIG: CategoryConfig = {
  title: "Serviços",
  heroEmoji: "🛠️",
  subcategories: [],
  discountServices: [],
  services: [],
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const config = CATEGORY_CONFIG[slug] ?? DEFAULT_CONFIG;
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <div className="bg-neutral-light min-h-full">
      {/* Sticky header: back arrow + search bar */}
      <div
        style={{ background: "#5A8FA0" }}
        className="sticky top-0 z-50 flex items-center gap-3 px-4 pt-12 pb-3"
      >
        <button
          onClick={() => router.back()}
          className="shrink-0 flex items-center justify-center"
          aria-label="Voltar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1 flex items-center gap-2 h-11 px-4 rounded-full bg-white">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5.5" stroke="#5A8FA0" strokeWidth="1.5" />
            <path d="M12.5 12.5L16 16" stroke="#5A8FA0" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-body text-sm" style={{ color: "#8B9EAD" }}>
            Buscar em {config.title.replace("\n", " ")}
          </span>
        </div>
      </div>

      {/* Hero: title + illustration (scrolls) */}
      <div
        style={{ background: "#5A8FA0" }}
        className="flex items-end justify-between px-4 pt-3 pb-8"
      >
        <h1 className="font-display font-bold text-[28px] leading-tight text-white whitespace-pre-line">
          {config.title}
        </h1>
        <span className="text-8xl leading-none -mb-2">{config.heroEmoji}</span>
      </div>

      {/* Filter chips */}
      <div className="bg-white">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {config.subcategories.map((sub, i) => (
            <button
              key={i}
              onClick={() => setActiveFilter(i)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border font-body text-sm transition-colors duration-200 ${
                activeFilter === i
                  ? "border-primary-pure bg-primary-pure text-white"
                  : "border-neutral-pure bg-white text-neutral-darkest"
              }`}
            >
              <span>{sub.icon}</span>
              {sub.label}
            </button>
          ))}
        </div>
        <div className="h-px bg-neutral-pure" />
      </div>

      {/* Serviços com desconto */}
      <div className="bg-white mt-2 pt-4 pb-5">
        <h2 className="font-display font-bold text-base text-neutral-darkest px-4 mb-3">
          Serviços com desconto
        </h2>
        <div
          className="flex gap-3 px-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        >
          {config.discountServices.map((ds, i) => (
            <div
              key={i}
              className="shrink-0 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden"
              style={{ background: "#5A8FA0", width: "176px", minHeight: "130px" }}
            >
              <p className="font-display font-bold text-white text-base leading-tight whitespace-pre-line z-10 relative">
                {ds.name}
              </p>
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-5xl opacity-40 select-none"
                aria-hidden
              >
                {ds.emoji}
              </span>
              <div className="z-10 relative">
                <p className="font-display font-bold text-white text-sm">{ds.discountLabel}</p>
                <p className="font-body text-white/80 text-xs">{ds.discountSub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Serviços disponíveis */}
      <div className="bg-white mt-2 pt-4 pb-6 px-4">
        <h2 className="font-display font-bold text-base text-neutral-darkest mb-3">
          Serviços disponíveis
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {config.services.map((svc, i) => (
            <Link
              key={i}
              href={`/prestadores/1`}
              className="bg-white border border-neutral-pure rounded-2xl p-4 flex flex-col gap-3"
            >
              <span className="text-3xl">{svc.emoji}</span>
              <span className="font-body font-semibold text-sm text-neutral-darkest leading-tight">
                {svc.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
