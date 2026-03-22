"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PROVIDERS } from "@/lib/mock-data";
import { useState, useEffect } from "react";

export default function ProviderPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const provider = PROVIDERS.find((p) => p.id === id);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
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

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    setFavorited((prev) => !prev);
    await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ providerId: id }),
    });
  };

  if (!provider) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="font-body text-neutral-dark">Prestador não encontrado.</p>
      </div>
    );
  }

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleAddToCart = () => {
    const params = new URLSearchParams({
      providerId: provider.id,
      services: selectedServices.join(","),
    });
    router.push(`/sacola?${params.toString()}`);
  };

  return (
    <div className="bg-neutral-light min-h-screen pb-28">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-5">
        <div className="flex items-center justify-between mb-4">
          <Link href="/home" className="w-9 h-9 flex items-center justify-center">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <button onClick={toggleFavorite} className="w-9 h-9 flex items-center justify-center">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 21C12 21 3 14 3 8.5A4.5 4.5 0 0112 6.5 4.5 4.5 0 0121 8.5C21 14 12 21 12 21z"
                stroke={favorited ? "#321CB2" : "#5A5A5A"}
                strokeWidth="1.8"
                fill={favorited ? "#321CB2" : "none"}
                fillOpacity={favorited ? 0.15 : 0}
              />
            </svg>
          </button>
        </div>

        {/* Provider info */}
        <div className="flex gap-4 items-start">
          <div className="w-16 h-16 rounded-full bg-primary-lightest flex items-center justify-center shrink-0">
            <span className="font-display font-bold text-primary-pure text-xl">
              {provider.name[0]}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-lg text-neutral-darkest">
                {provider.name}
              </h1>
              {provider.verified && (
                <span className="bg-info-light text-info-pure text-xs font-body font-semibold px-2 py-0.5 rounded-full">
                  ✓ Verificado
                </span>
              )}
            </div>
            <p className="font-body text-sm text-neutral-dark">{provider.category}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-body text-sm text-neutral-darkest">
                ⭐ {provider.rating}
              </span>
              <span className="font-body text-xs text-neutral-dark">
                {provider.totalReviews} avaliações
              </span>
            </div>
          </div>
        </div>

        <p className="font-body text-sm text-neutral-dark mt-4 leading-relaxed">
          {provider.bio}
        </p>
      </div>

      {/* Elogios */}
      <div className="px-4 mt-4">
        <h2 className="font-display font-bold text-base text-neutral-darkest mb-2">
          Elogios
        </h2>
        <div className="flex gap-2 flex-wrap">
          {provider.compliments.map((c) => (
            <span
              key={c}
              className="px-3 py-1.5 bg-success-light rounded-full font-body text-xs text-success-low font-semibold"
            >
              👍 {c}
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="px-4 mt-6">
        <h2 className="font-display font-bold text-base text-neutral-darkest mb-3">
          Serviços
        </h2>
        <div className="space-y-2">
          {provider.services.map((service) => {
            const isSelected = selectedServices.includes(service.name);
            return (
              <button
                key={service.name}
                onClick={() => toggleService(service.name)}
                className={`w-full card p-4 flex items-center justify-between transition-all ${
                  isSelected ? "border-primary-pure border-2" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "border-primary-pure bg-primary-pure"
                        : "border-neutral-pure"
                    }`}
                  >
                    {isSelected && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="font-body text-sm text-neutral-darkest text-left">
                    {service.name}
                  </span>
                </div>
                <span className="font-body font-bold text-sm text-primary-pure shrink-0">
                  {service.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 bg-neutral-light/90 backdrop-blur-sm py-3">
        <button
          onClick={handleAddToCart}
          disabled={selectedServices.length === 0}
          className={`w-full h-12 rounded-full font-body font-bold text-sm transition-all ${
            selectedServices.length > 0
              ? "bg-primary-pure text-white"
              : "bg-neutral-pure text-neutral-dark cursor-not-allowed"
          }`}
        >
          {selectedServices.length > 0
            ? `Adicionar ${selectedServices.length} serviço${selectedServices.length > 1 ? "s" : ""} · Ver sacola`
            : "Selecione um serviço"}
        </button>
      </div>
    </div>
  );
}
