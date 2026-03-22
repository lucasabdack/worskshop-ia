"use client";

import Link from "next/link";
import { useState } from "react";

const MOCK_FAVORITES = [
  {
    id: "1",
    providerName: "Antônio Carlos",
    category: "Manutenções e reparos",
    service: "Serviços Hidráulicos",
    lastService: "24/04/2024",
    bgColor: "#F5A623",
    categorySlug: "reparos",
  },
  {
    id: "2",
    providerName: "Bruna Almeida",
    category: "Serviços Domésticos",
    service: "Serviços de limpeza",
    lastService: "10/04/2024",
    bgColor: "#E8408A",
    categorySlug: "limpeza",
  },
  {
    id: "3",
    providerName: "Camila Silva",
    category: "Serviços Domésticos",
    service: "Serviços de limpeza",
    lastService: "03/01/2024",
    bgColor: "#E8408A",
    categorySlug: "limpeza",
  },
  {
    id: "4",
    providerName: "Daniel Soares",
    category: "Serviços Domésticos",
    service: "Serviços de limpeza",
    lastService: "10/04/2024",
    bgColor: "#E8408A",
    categorySlug: "limpeza",
  },
  {
    id: "5",
    providerName: "Eduardo Lima",
    category: "Manutenções e reparos",
    service: "Reparos elétricos",
    lastService: "15/03/2024",
    bgColor: "#F5A623",
    categorySlug: "reparos",
  },
];

const FILTERS = [
  { label: "Todos", value: "todos" },
  { label: "Manutenções e Reparos", value: "reparos" },
  { label: "Assistência Técnica", value: "tecnica" },
  { label: "Serviços Domésticos", value: "limpeza" },
];

const HeartFilled = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21C12 21 3 14 3 8.5A4.5 4.5 0 0112 6.5 4.5 4.5 0 0121 8.5C21 14 12 21 12 21z"
      fill="#321CB2"
      stroke="#321CB2"
      strokeWidth="1.5"
    />
  </svg>
);

export default function FavoritosPage() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);

  const filtered =
    activeFilter === "todos"
      ? favorites
      : favorites.filter((f) => f.categorySlug === activeFilter);

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="px-4 pt-14 pb-4 bg-white">
        <h1 className="font-display font-bold text-2xl text-neutral-darkest">Favoritos</h1>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-4 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`shrink-0 h-9 px-4 rounded-full text-sm font-body font-semibold border transition-colors ${
              activeFilter === f.value
                ? "border-primary-pure bg-primary-lightest text-primary-pure"
                : "border-neutral-pure bg-white text-neutral-dark"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-5 px-4">
        <p className="font-display font-bold text-base text-neutral-darkest mb-3">
          Prestadores favoritados
        </p>

        {filtered.length === 0 ? (
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
          <div className="space-y-3 pb-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="flex rounded-2xl overflow-hidden border border-neutral-pure bg-white"
                style={{ minHeight: "100px" }}
              >
                {/* Left image area */}
                <div
                  className="w-24 shrink-0 flex items-center justify-center text-4xl"
                  style={{ background: item.bgColor }}
                >
                  {item.categorySlug === "reparos" ? "👷" : "🧹"}
                </div>

                {/* Content */}
                <Link
                  href={`/prestadores/${item.id}`}
                  className="flex-1 px-4 py-3 flex flex-col justify-center min-w-0"
                >
                  <p className="font-body text-xs text-neutral-dark">{item.category}</p>
                  <p className="font-body text-sm text-neutral-darkest mt-0.5">{item.service}</p>
                  <p className="font-display font-bold text-base text-primary-pure mt-1">
                    {item.providerName}
                  </p>
                  <p className="font-body text-xs text-neutral-dark mt-0.5">
                    Ultimo serviço em {item.lastService}
                  </p>
                </Link>

                {/* Heart */}
                <button
                  onClick={() => removeFavorite(item.id)}
                  className="pr-4 flex items-center justify-center"
                >
                  <HeartFilled />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
