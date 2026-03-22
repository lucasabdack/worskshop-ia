"use client";

import Link from "next/link";
import { useState } from "react";
import { PROVIDERS, CATEGORIES } from "@/lib/mock-data";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = query.length >= 2
    ? PROVIDERS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="bg-neutral-light min-h-screen">
      {/* Search Header */}
      <div className="sticky top-0 z-50 bg-white px-4 pt-12 pb-3 space-y-3">
        <div className="flex items-center gap-3">
          <Link href="/home">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <div className="flex-1 flex items-center gap-3 h-11 px-4 rounded-full bg-neutral-light border border-neutral-pure">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="#5A5A5A" strokeWidth="1.5"/>
              <path d="M12.5 12.5L16 16" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar serviços..."
              className="flex-1 bg-transparent font-body text-sm text-neutral-low outline-none placeholder:text-neutral-dark"
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Empty state: show categories */}
      {query.length < 2 && (
        <div className="px-4 mt-5">
          <h2 className="font-display font-bold text-base text-neutral-low mb-3">
            Navegar por categoria
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/categorias/${cat.slug}`}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-neutral-pure flex items-center justify-center shadow-level-1 text-2xl">
                  {cat.icon}
                </div>
                <span className="font-body text-xs text-neutral-dark text-center leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {query.length >= 2 && (
        <div className="px-4 py-4 space-y-3">
          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-body text-neutral-dark text-sm">
                Nenhum resultado para &quot;{query}&quot;
              </p>
            </div>
          ) : (
            results.map((p) => (
              <Link key={p.id} href={`/prestadores/${p.id}`}>
                <div className="card p-4 flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-lightest flex items-center justify-center shrink-0">
                    <span className="font-display font-bold text-primary-pure">
                      {p.name[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-body font-semibold text-sm text-neutral-low truncate">
                        {p.name}
                      </span>
                      {p.verified && <span className="text-info-pure text-xs">✓</span>}
                    </div>
                    <p className="font-body text-xs text-neutral-dark">{p.category}</p>
                    <span className="font-body text-xs text-neutral-dark">
                      ⭐ {p.rating} · {p.totalReviews} avaliações
                    </span>
                  </div>
                  <span className="font-body font-bold text-sm text-primary-pure shrink-0">
                    {p.price}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
