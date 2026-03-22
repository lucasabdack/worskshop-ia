"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/home",
    label: "Início",
    icon: (active: boolean) => (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
          d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
          stroke={active ? "#321CB2" : "#5A5A5A"}
          strokeWidth="1.8"
          fill={active ? "#321CB2" : "none"}
          fillOpacity={active ? 0.12 : 0}
        />
        <path
          d="M9 21V12h6v9"
          stroke={active ? "#321CB2" : "#5A5A5A"}
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    href: "/favoritos",
    label: "Favoritos",
    icon: (active: boolean) => (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 21C12 21 3 14 3 8.5A4.5 4.5 0 0112 6.5 4.5 4.5 0 0121 8.5C21 14 12 21 12 21z"
          stroke={active ? "#321CB2" : "#5A5A5A"}
          strokeWidth="1.8"
          fill={active ? "#321CB2" : "none"}
          fillOpacity={active ? 0.15 : 0}
        />
      </svg>
    ),
  },
  {
    href: "/pedidos",
    label: "Pedidos",
    icon: (active: boolean) => (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <rect
          x="3" y="3" width="18" height="18" rx="3"
          stroke={active ? "#321CB2" : "#5A5A5A"}
          strokeWidth="1.8"
          fill={active ? "#321CB2" : "none"}
          fillOpacity={active ? 0.12 : 0}
        />
        <path d="M7 8h10M7 12h7M7 16h5" stroke={active ? "#321CB2" : "#5A5A5A"} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: "/perfil",
    label: "Perfil",
    icon: (active: boolean) => (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <circle
          cx="12" cy="8" r="4"
          stroke={active ? "#321CB2" : "#5A5A5A"}
          strokeWidth="1.8"
          fill={active ? "#321CB2" : "none"}
          fillOpacity={active ? 0.12 : 0}
        />
        <path
          d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
          stroke={active ? "#321CB2" : "#5A5A5A"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-neutral-pure flex z-50">
      {tabs.map((tab) => {
        const active = pathname === tab.href || pathname.startsWith(tab.href + "/");
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 flex flex-col items-center gap-1 py-2 pt-3"
          >
            {tab.icon(active)}
            <span
              className="font-body text-[10px] font-semibold"
              style={{ color: active ? "#321CB2" : "#5A5A5A" }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
