"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PROVIDERS } from "@/lib/mock-data";

type Provider = (typeof PROVIDERS)[0];

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/favorites");
        const data = await res.json();
        if (data.favorites?.length) {
          // enrich with mock provider data (replace with DB join when available)
          const enriched = data.favorites
            .map((f: { providerId: string }) => PROVIDERS.find((p) => p.id === f.providerId))
            .filter(Boolean) as Provider[];
          setFavorites(enriched);
        } else {
          // fallback: show nothing (user has no favorites yet)
          setFavorites([]);
        }
      } catch {
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const removeFavorite = async (providerId: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== providerId));
    await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ providerId }),
    });
  };

  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="bg-white px-4 pt-12 pb-4">
        <h1 className="font-display font-bold text-xl text-neutral-darkest">Favoritos</h1>
      </div>

      <div className="px-4 py-4 space-y-3">
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="card p-4 h-20 animate-pulse bg-neutral-light" />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🤍</div>
            <p className="font-display font-bold text-lg text-neutral-darkest">
              Nenhum favorito ainda
            </p>
            <p className="font-body text-sm text-neutral-dark mt-2">
              Salve prestadores que você gostou para encontrá-los rápido.
            </p>
            <Link
              href="/home"
              className="inline-flex mt-6 px-6 py-3 bg-primary-pure rounded-full font-body font-bold text-sm text-white"
            >
              Explorar prestadores
            </Link>
          </div>
        ) : (
          favorites.map((p) => (
            <Link key={p.id} href={`/prestadores/${p.id}`}>
              <div className="card p-4 flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full bg-primary-lightest flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-primary-pure">{p.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-body font-semibold text-sm text-neutral-darkest truncate">
                      {p.name}
                    </span>
                    {p.verified && <span className="text-info-pure text-xs">✓</span>}
                  </div>
                  <p className="font-body text-xs text-neutral-dark">{p.category}</p>
                  <span className="font-body text-xs text-neutral-dark">
                    ⭐ {p.rating} · {p.totalReviews} avaliações
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFavorite(p.id);
                  }}
                  className="shrink-0"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M12 21C12 21 3 14 3 8.5A4.5 4.5 0 0112 6.5 4.5 4.5 0 0121 8.5C21 14 12 21 12 21z"
                      stroke="#321CB2"
                      strokeWidth="1.8"
                      fill="#321CB2"
                      fillOpacity="0.15"
                    />
                  </svg>
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
