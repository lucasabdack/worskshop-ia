"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const CARD_BG = "#5A8FA0";

const BANNERS = [
  {
    title: "Reparos elétricos",
    discount: "até 15%",
    discountText: "em descontos",
    illustration: "🔌👷🪑🪴",
    href: "/categorias/eletrica",
  },
  {
    title: "Hidráulica",
    discount: "até 20%",
    discountText: "em descontos",
    illustration: "🚿🔧🪣🌿",
    href: "/categorias/hidraulica",
  },
  {
    title: "Limpeza",
    discount: "até 10%",
    discountText: "em descontos",
    illustration: "🧹🧴🧺🌸",
    href: "/categorias/limpeza",
  },
];

export default function HomeBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.85 + 12; // 85% width + 12px gap
    const index = Math.min(
      Math.round(el.scrollLeft / cardWidth),
      BANNERS.length - 1
    );
    setActiveIndex(index);
  };

  return (
    <div className="pb-5">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 px-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
      >
        {BANNERS.map((b, i) => (
          <Link
            key={i}
            href={b.href}
            className="snap-start shrink-0 rounded-2xl overflow-hidden relative"
            style={{ background: CARD_BG, width: "85%", minHeight: "160px" }}
          >
            {/* Text content */}
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <p className="font-display font-bold text-white text-xl leading-tight max-w-[48%]">
                {b.title}
              </p>
              <div>
                <p className="font-display font-bold text-white text-base">{b.discount}</p>
                <p className="font-body text-xs text-white/80">{b.discountText}</p>
              </div>
            </div>

            {/* Illustration area */}
            <div className="absolute right-0 bottom-0 w-[58%] h-full flex items-end justify-center pb-2 pr-3">
              <div className="flex flex-wrap justify-end gap-1 text-4xl leading-none">
                {b.illustration.split("").map((char, ci) => (
                  <span key={ci}>{char}</span>
                ))}
              </div>
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
