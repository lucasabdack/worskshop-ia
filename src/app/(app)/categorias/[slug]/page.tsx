"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  OutletIcon, BulbIcon, CircuitBreakerIcon, WifiIcon, ComputerIcon, CameraIcon,
  FaucetIcon, ShowerIcon, DrainIcon,
  AcIcon, WrenchIcon, PaintRollerIcon, AssemblyIcon,
  BroomIcon, SparkleIcon, BoxIcon, SofaIcon, SprayIcon, ShovelIcon,
  TreeIcon, ScissorsIcon, FlowerIcon, LandscapeIcon, WaterDropIcon, SeedlingIcon,
} from "@/components/ds/ServiceIcons";

import { CATEGORY_SERVICES } from "@/lib/category-data";

type SubCategory = { label: string; icon: string };
type DiscountService = { name: string; discountLabel: string; discountSub: string; Icon: () => React.ReactElement };
type Service = { name: string; slug: string; Icon: () => React.ReactElement };
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
      { name: "Reparos\nelétricos", discountLabel: "até 15%", discountSub: "em descontos", Icon: OutletIcon },
      { name: "Reparos\nhidráulicos", discountLabel: "até 20%", discountSub: "em descontos", Icon: FaucetIcon },
      { name: "Pintura\nresidencial", discountLabel: "até 10%", discountSub: "em descontos", Icon: PaintRollerIcon },
    ],
    services: [
      { name: "Reparo de tomadas", slug: "reparo-de-tomadas", Icon: OutletIcon },
      { name: "Reparo de chuveiro", slug: "reparo-de-chuveiro", Icon: ShowerIcon },
      { name: "Instalação de iluminação", slug: "instalacao-de-iluminacao", Icon: BulbIcon },
      { name: "Manutenção de ar-cond.", slug: "manutencao-de-ar-condicionado", Icon: AcIcon },
      { name: "Montagem de móveis", slug: "montagem-de-moveis", Icon: AssemblyIcon },
      { name: "Pintura residencial", slug: "pintura-residencial", Icon: PaintRollerIcon },
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
      { name: "Instalação\nelétrica", discountLabel: "até 10%", discountSub: "em descontos", Icon: OutletIcon },
      { name: "Config.\nde rede", discountLabel: "até 15%", discountSub: "em descontos", Icon: WifiIcon },
      { name: "Manutenção\nde PC", discountLabel: "até 12%", discountSub: "em descontos", Icon: ComputerIcon },
    ],
    services: [
      { name: "Instalação de tomada", slug: "instalacao-de-tomada", Icon: OutletIcon },
      { name: "Troca de disjuntor", slug: "troca-de-disjuntor", Icon: CircuitBreakerIcon },
      { name: "Instalação de luminária", slug: "instalacao-de-luminaria", Icon: BulbIcon },
      { name: "Config. de Wi-Fi", slug: "config-de-wi-fi", Icon: WifiIcon },
      { name: "Manutenção de PC", slug: "manutencao-de-pc", Icon: ComputerIcon },
      { name: "Câmeras de segurança", slug: "cameras-de-seguranca", Icon: CameraIcon },
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
      { name: "Limpeza\nprofunda", discountLabel: "até 20%", discountSub: "em descontos", Icon: SparkleIcon },
      { name: "Limpeza\npós-obra", discountLabel: "até 15%", discountSub: "em descontos", Icon: ShovelIcon },
      { name: "Higienização\nde estofado", discountLabel: "até 18%", discountSub: "em descontos", Icon: SofaIcon },
    ],
    services: [
      { name: "Limpeza básica", slug: "limpeza-basica", Icon: BroomIcon },
      { name: "Limpeza profunda", slug: "limpeza-profunda", Icon: SparkleIcon },
      { name: "Limpeza pós-obra", slug: "limpeza-pos-obra", Icon: ShovelIcon },
      { name: "Organização", slug: "organizacao", Icon: BoxIcon },
      { name: "Limpeza de estofado", slug: "limpeza-de-estofado", Icon: SofaIcon },
      { name: "Higienização", slug: "higienizacao", Icon: SprayIcon },
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
      { name: "Poda e\nManutenção", discountLabel: "até 15%", discountSub: "em descontos", Icon: ScissorsIcon },
      { name: "Projeto de\nPaisagismo", discountLabel: "até 25%", discountSub: "em descontos", Icon: LandscapeIcon },
      { name: "Irrigação\nautomática", discountLabel: "até 12%", discountSub: "em descontos", Icon: WaterDropIcon },
    ],
    services: [
      { name: "Poda de árvores", slug: "poda-de-arvores", Icon: TreeIcon },
      { name: "Corte de grama", slug: "corte-de-grama", Icon: ScissorsIcon },
      { name: "Plantio de flores", slug: "plantio-de-flores", Icon: FlowerIcon },
      { name: "Paisagismo", slug: "paisagismo", Icon: LandscapeIcon },
      { name: "Irrigação", slug: "irrigacao", Icon: WaterDropIcon },
      { name: "Adubação", slug: "adubacao", Icon: SeedlingIcon },
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
        <div className="flex gap-3 px-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {config.discountServices.map((ds, i) => (
            <div
              key={i}
              className="shrink-0 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden"
              style={{ background: "#5A8FA0", width: "176px", minHeight: "130px" }}
            >
              <p className="font-display font-bold text-white text-base leading-tight whitespace-pre-line z-10 relative">
                {ds.name}
              </p>
              {/* Icon tinted white/translucent in top-right */}
              <div className="absolute right-3 top-4 opacity-30 [&_path]:stroke-white [&_rect]:stroke-white [&_circle]:stroke-white [&_ellipse]:stroke-white [&_circle[fill]]:fill-white">
                <ds.Icon />
              </div>
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
              href={`/categorias/${slug}/${svc.slug}`}
              className="bg-white border border-neutral-pure rounded-2xl p-4 flex flex-col gap-3 shadow-level-1"
            >
              <svc.Icon />
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
