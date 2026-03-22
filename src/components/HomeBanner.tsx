"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const BANNERS = [
  {
    title: "Manutenções e Reparos",
    discount: "até 15%",
    discountText: "em descontos",
    image: "/assets/card-manutencoes.png",
    bg: "var(--color-cat-manutencoes-reparos)",
    href: "/categorias/manutencoes-reparos",
  },
  {
    title: "Assistência Técnica",
    discount: "até 20%",
    discountText: "em descontos",
    image: "/assets/card-assistencia-tecnica.png",
    bg: "var(--color-cat-assistencia-tecnica)",
    href: "/categorias/assistencia-tecnica",
  },
];

export default function HomeBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth - 32 - 24;
    const step = cardWidth + 12;
    const index = Math.min(
      Math.round(el.scrollLeft / step),
      BANNERS.length - 1
    );
    setActiveIndex(index);
  };

  return (
    <div className="pb-5">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 px-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [scroll-padding-left:16px]"
      >
        {BANNERS.map((b, i) => (
          <Link
            key={i}
            href={b.href}
            className="snap-start shrink-0 rounded-2xl overflow-hidden relative"
            style={{ background: b.bg, width: "calc(100% - 24px)", minHeight: "160px" }}
          >
            {/* Text content */}
            <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
              <p className="font-display font-bold text-white text-xl leading-tight max-w-[48%]">
                {b.title}
              </p>
              <div>
                <p className="font-display font-bold text-white text-base">{b.discount}</p>
                <p className="font-body text-xs text-white/80">{b.discountText}</p>
              </div>
            </div>

            {/* Illustration */}
            <div className="absolute right-0 bottom-0 w-[58%] h-full">
              <Image
                src={b.image}
                alt={b.title}
                fill
                className="object-contain object-right-bottom"
                sizes="(max-width: 768px) 58vw"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {BANNERS.map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? 20 : 6,
              background: i === activeIndex ? "#321CB2" : "#E5E3E3",
            }}
          />
        ))}
      </div>
    </div>
  );
}
