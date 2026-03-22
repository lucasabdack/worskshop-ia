"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HomeBanner from "@/components/HomeBanner";

const CATEGORY_CARDS = [
  { name: "Manutenções\ne reparos", image: "/assets/card-manutencoes.png", slug: "reparos" },
  { name: "Assistência\ntécnica", image: "/assets/card-assistencia-tecnica.png", slug: "eletrica" },
  { name: "Limpeza\ne organização", image: "/assets/card-servicos-domesticos.png", slug: "limpeza" },
  { name: "Jardinagem\ne paisagismo", image: "/assets/card-reforma-de-imoveis.png", slug: "jardinagem" },
];

export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const onScroll = () => setCollapsed(main.scrollTop > 80);
    main.addEventListener("scroll", onScroll, { passive: true });
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-neutral-light min-h-full">
      {/* Sticky header: address + title + search bar */}
      <div
        className={`sticky top-0 z-50 bg-white px-4 pt-12 pb-4 space-y-3 transition-[box-shadow] duration-300 ease-in-out ${
          collapsed ? "shadow-level-1" : "shadow-none"
        }`}
      >
        <button className="flex items-center gap-1 font-body text-sm font-semibold text-neutral-low">
          Padre Leonel franca, 261
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <h1 className="font-display font-bold text-xl text-primary-pure leading-tight">
          Qual serviço você está precisando?
        </h1>
        <Link
          href="/busca"
          className="flex items-center gap-3 h-11 px-4 rounded-full bg-white border-2 border-primary-pure"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5.5" stroke="#321CB2" strokeWidth="1.5" />
            <path d="M12.5 12.5L16 16" stroke="#321CB2" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-body text-sm text-neutral-dark">Qual serviço você está precisando?</span>
        </Link>
      </div>

      {/* Banners: fluxo normal da página, logo abaixo do header, sem gap */}
      <div className="bg-white">
        <HomeBanner />
      </div>

      {/* Categorias: 8px de separação */}
      <div className="bg-white mt-2 pb-6">
        <div className="px-4">
          <h2 className="font-display font-bold text-lg text-neutral-low mb-3">Categorias</h2>
          <div className="space-y-3">
            {CATEGORY_CARDS.map((cat, i) => (
              <Link
                key={i}
                href={`/categorias/${cat.slug}`}
                className="relative flex rounded-2xl overflow-hidden items-end justify-between"
                style={{ background: "#5A8FA0", minHeight: "130px" }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <p className="relative z-10 font-display font-bold text-white text-xl leading-tight p-5 whitespace-pre-line drop-shadow-md">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
