"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { CATEGORY_TITLES, getServiceName } from "@/lib/category-data";

// ─── Mock providers ───────────────────────────────────────────────────────────

const MOCK_PROVIDERS = [
  { id: "1", name: "Camila Silva",           services: 300, years: 2, priceLabel: "a partir de R$70,00", rating: 4.8, favorites: 29 },
  { id: "2", name: "Antônio Carlos",         services: 300, years: 2, priceLabel: "R$75,00 por hora",    rating: 4.9, favorites: 12 },
  { id: "3", name: "Joarez da Silva Santos", services: 300, years: 2, priceLabel: "a partir de R$76,00", rating: 4.7, favorites: 30 },
  { id: "4", name: "Fernanda Almeida da Paz",services: 300, years: 2, priceLabel: "a partir de R$76,00", rating: 4.8, favorites: 19 },
  { id: "5", name: "Lucas Rodrigues",        services: 280, years: 3, priceLabel: "a partir de R$65,00", rating: 4.6, favorites: 44 },
];

const FILTERS = [
  { label: "Preço", icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4.5v1M8 10.5v1M6 6.5h2.5a1 1 0 010 2H7a1 1 0 000 2H9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )},
  { label: "Avaliação", icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2l1.5 3.5H13l-2.8 2 1 3.5L8 9.2 4.8 11l1-3.5L3 5.5h3.5L8 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )},
  { label: "Tempo de resposta", icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )},
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProvidersListPage() {
  const { slug, serviceSlug } = useParams<{ slug: string; serviceSlug: string }>();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categoryTitle = CATEGORY_TITLES[slug] ?? slug;
  const serviceName = getServiceName(slug, serviceSlug);

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="bg-neutral-light min-h-full">
      {/* Sticky teal header */}
      <div style={{ background: "#5A8FA0" }} className="sticky top-0 z-50 px-4 pt-12 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <button onClick={() => router.back()} aria-label="Voltar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="font-body text-sm text-white/80">{categoryTitle}</span>
        </div>
        <h1 className="font-display font-bold text-[22px] text-white leading-tight pl-8">
          {serviceName}
        </h1>
      </div>

      {/* Filter chips */}
      <div className="bg-white">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {FILTERS.map((f, i) => (
            <button
              key={i}
              onClick={() => setActiveFilter(i)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border font-body text-sm transition-colors duration-200 ${
                activeFilter === i
                  ? "border-primary-pure bg-primary-pure text-white"
                  : "border-neutral-pure bg-white text-neutral-darkest"
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>
        <div className="h-px bg-neutral-pure" />
      </div>

      {/* Providers list */}
      <div className="bg-white mt-2 pt-4 pb-6 px-4">
        <h2 className="font-display font-bold text-base text-neutral-darkest mb-3">Prestadores</h2>
        <div className="space-y-3">
          {MOCK_PROVIDERS.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-neutral-pure p-4">
              <div className="flex items-start justify-between gap-3">
                <Link
                  href={`/prestadores/${p.id}?service=${encodeURIComponent(serviceName)}&category=${encodeURIComponent(categoryTitle)}`}
                  className="flex-1 min-w-0"
                >
                  <p className="font-display font-bold text-base text-primary-pure leading-tight">
                    {p.name}
                  </p>
                  <p className="font-body text-xs text-neutral-dark mt-0.5">
                    {p.services} serviços prestados · {p.years} anos de atuação
                  </p>
                </Link>
                <button
                  onClick={() => toggleFavorite(p.id)}
                  className="shrink-0 mt-0.5"
                  aria-label="Favoritar"
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M11 19S3 13.5 3 8a4 4 0 018-1.2A4 4 0 0119 8c0 5.5-8 11-8 11z"
                      stroke="#321CB2"
                      strokeWidth="1.6"
                      fill={favorites.has(p.id) ? "#321CB2" : "none"}
                    />
                  </svg>
                </button>
              </div>

              <Link
                href={`/prestadores/${p.id}?service=${encodeURIComponent(serviceName)}&category=${encodeURIComponent(categoryTitle)}`}
              >
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-neutral-pure">
                  {/* Price */}
                  <div className="flex items-center gap-1.5">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="7.5" stroke="#321CB2" strokeWidth="1.4" />
                      <path d="M9 5v0.8M9 12.2V13M7 7.5h2.8a1.2 1.2 0 010 2.4H8.2a1.2 1.2 0 000 2.4H11" stroke="#321CB2" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    <span className="font-body text-xs text-neutral-dark">{p.priceLabel}</span>
                  </div>
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="#321CB2">
                      <path d="M7 1l1.5 3.5H12l-2.8 2 1 3.5L7 8.2 3.8 10l1-3.5L2 4.5h3.5L7 1z" />
                    </svg>
                    <span className="font-body text-xs text-neutral-dark">{p.rating}</span>
                  </div>
                  {/* Favorites count */}
                  <div className="flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="#321CB2">
                      <path d="M7 12S2 8.5 2 5.5a3 3 0 016-0.8A3 3 0 0113 5.5C13 8.5 7 12 7 12z" />
                    </svg>
                    <span className="font-body text-xs text-neutral-dark">{p.favorites}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
