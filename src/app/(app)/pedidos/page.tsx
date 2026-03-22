"use client";

import Link from "next/link";
import { useState } from "react";

// ─── Mock data (flat array, sorted correctly) ─────────────────────────────────
// Today = 2026-03-22. Future dates → "por vir". Past → "realizados" newest first.

type Order = {
  id: string;
  isoDate: string;
  dateLabel: string;
  category: string;
  service: string;
  providerName: string;
  status: "CONFIRMED" | "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  duration?: string;
  scheduledTime?: string;
  price: string;
  avatarBg: string;
  categorySlug: string;
};

const ALL_ORDERS: Order[] = [
  // ── Upcoming (ascending) ──
  {
    id: "u1",
    isoDate: "2026-03-25",
    dateLabel: "25 de Março • 2026",
    category: "Serviços Domésticos",
    service: "Serviços de limpeza",
    providerName: "Ana Lima",
    status: "CONFIRMED",
    scheduledTime: "09:00",
    price: "R$120,00",
    avatarBg: "#E8408A",
    categorySlug: "limpeza",
  },
  {
    id: "u2",
    isoDate: "2026-03-28",
    dateLabel: "28 de Março • 2026",
    category: "Manutenções e reparos",
    service: "Reparos elétricos",
    providerName: "Carlos Mendes",
    status: "PENDING",
    scheduledTime: "14:00",
    price: "R$70,00",
    avatarBg: "#321CB2",
    categorySlug: "reparos",
  },
  // ── Past (newest first) ──
  {
    id: "o1",
    isoDate: "2024-04-30",
    dateLabel: "30 de abril • 2024",
    category: "Serviços Domésticos",
    service: "Serviços de limpeza",
    providerName: "Daniel Soares",
    status: "COMPLETED",
    duration: "3h 30min",
    price: "R$124,90",
    avatarBg: "#F5A623",
    categorySlug: "limpeza",
  },
  {
    id: "o2",
    isoDate: "2024-04-30",
    dateLabel: "30 de abril • 2024",
    category: "Serviços Domésticos",
    service: "Serviços de limpeza",
    providerName: "Daniel Soares",
    status: "COMPLETED",
    duration: "3h 30min",
    price: "R$124,90",
    avatarBg: "#F5A623",
    categorySlug: "limpeza",
  },
  {
    id: "o3",
    isoDate: "2024-03-03",
    dateLabel: "03 de Março • 2024",
    category: "Manutenções e reparos",
    service: "Reparos elétricos",
    providerName: "Carlos Mendes",
    status: "COMPLETED",
    duration: "2h 00min",
    price: "R$80,00",
    avatarBg: "#321CB2",
    categorySlug: "reparos",
  },
];

const TODAY = "2026-03-22";

const FILTERS = [
  { label: "Todos", value: "todos" },
  { label: "Manutenções e Reparos", value: "reparos" },
  { label: "Assistência Técnica", value: "tecnica" },
  { label: "Serviços Domésticos", value: "limpeza" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function groupByDate(orders: Order[]) {
  const map = new Map<string, Order[]>();
  for (const o of orders) {
    if (!map.has(o.dateLabel)) map.set(o.dateLabel, []);
    map.get(o.dateLabel)!.push(o);
  }
  return Array.from(map.entries()).map(([date, orders]) => ({ date, orders }));
}

const STATUS_LABEL: Record<Order["status"], string> = {
  CONFIRMED: "Serviço confirmado",
  PENDING: "Aguardando confirmação",
  IN_PROGRESS: "Em andamento",
  COMPLETED: "Serviço concluído",
  CANCELLED: "Cancelado",
};

const STATUS_DOT: Record<Order["status"], string> = {
  CONFIRMED: "#4A90D9",
  PENDING: "#F5A623",
  IN_PROGRESS: "#4A90D9",
  COMPLETED: "#34C47C",
  CANCELLED: "#E03A3A",
};

const STATUS_TEXT: Record<Order["status"], string> = {
  CONFIRMED: "#4A90D9",
  PENDING: "#7A4800",
  IN_PROGRESS: "#4A90D9",
  COMPLETED: "#0F5C33",
  CANCELLED: "#E03A3A",
};

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.5 8A5.5 5.5 0 112.5 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13.5 4v4h-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function PedidosPage() {
  const [activeFilter, setActiveFilter] = useState("todos");

  const applyFilter = (orders: Order[]) =>
    activeFilter === "todos" ? orders : orders.filter((o) => o.categorySlug === activeFilter);

  const upcoming = applyFilter(ALL_ORDERS.filter((o) => o.isoDate >= TODAY && o.status !== "COMPLETED" && o.status !== "CANCELLED"));
  const past = applyFilter(ALL_ORDERS.filter((o) => o.isoDate < TODAY || o.status === "COMPLETED" || o.status === "CANCELLED"));

  const upcomingGroups = groupByDate(upcoming);
  const pastGroups = groupByDate(past);

  const isEmpty = upcoming.length === 0 && past.length === 0;

  const OrderCard = ({ order }: { order: Order }) => (
    <div className="rounded-2xl border border-neutral-pure bg-white overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <p className="font-body text-xs text-neutral-dark">{order.category}</p>
        <Link href="/perfil/ajuda" className="font-body text-xs font-semibold text-primary-pure">
          Ajuda
        </Link>
      </div>
      <p className="font-body text-sm text-neutral-low px-4 pb-3">{order.service}</p>

      <div className="border-t border-neutral-pure mx-4" />

      {/* Provider row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div
          className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center"
          style={{ background: order.avatarBg }}
        >
          <span className="font-display font-bold text-white">{order.providerName[0]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: STATUS_DOT[order.status] }} />
            <span className="font-body text-xs" style={{ color: STATUS_TEXT[order.status] }}>
              {STATUS_LABEL[order.status]}
            </span>
          </div>
          <p className="font-display font-bold text-base text-primary-pure leading-tight">
            {order.providerName}
          </p>
          {order.status === "COMPLETED" ? (
            <p className="font-body text-xs text-neutral-dark">
              Duração: {order.duration} • {order.price}
            </p>
          ) : (
            <p className="font-body text-xs text-neutral-dark">
              {order.scheduledTime ? `Às ${order.scheduledTime} • ` : ""}{order.price}
            </p>
          )}
        </div>
      </div>

      {/* Action button */}
      <div className="px-4 pb-4">
        {order.status === "COMPLETED" ? (
          <button
            className="w-full h-11 rounded-full flex items-center justify-center gap-2 font-body font-bold text-sm text-white"
            style={{ background: "#321CB2" }}
          >
            <RefreshIcon />
            Contratar novamente
          </button>
        ) : (
          <button
            className="w-full h-11 rounded-full flex items-center justify-center gap-2 font-body font-semibold text-sm border border-neutral-pure text-neutral-dark"
          >
            Cancelar agendamento
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-neutral-light min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-4 pt-14 pb-3">
        <h1 className="font-display font-bold text-2xl text-neutral-low mb-3">Pedidos</h1>
        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-1">
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
      </div>

      {/* Body — 8px gap via bg-neutral-light */}
      <div className="bg-white mt-2 px-4 pb-6">
      {/* Content */}
      <div className="pt-5 space-y-8">
        {isEmpty ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📋</div>
            <p className="font-display font-bold text-lg text-neutral-low">Nenhum pedido ainda</p>
            <p className="font-body text-sm text-neutral-dark mt-2">
              Contrate seu primeiro serviço e acompanhe aqui.
            </p>
            <Link
              href="/home"
              className="inline-flex mt-6 px-6 py-3 bg-primary-pure rounded-full font-body font-bold text-sm text-white"
            >
              Buscar serviços
            </Link>
          </div>
        ) : (
          <>
            {/* ── Por vir ── */}
            {upcomingGroups.length > 0 && (
              <div>
                <p className="font-display font-bold text-base text-neutral-low mb-4">
                  Pedidos por vir
                </p>
                <div className="space-y-6">
                  {upcomingGroups.map((group) => (
                    <div key={group.date}>
                      <p className="font-body text-xs text-neutral-dark mb-3">{group.date}</p>
                      <div className="space-y-3">
                        {group.orders.map((o) => <OrderCard key={o.id} order={o} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Realizados ── */}
            {pastGroups.length > 0 && (
              <div>
                <p className="font-display font-bold text-base text-neutral-low mb-4">
                  Pedidos realizados
                </p>
                <div className="space-y-6">
                  {pastGroups.map((group) => (
                    <div key={group.date}>
                      <p className="font-body text-xs text-neutral-dark mb-3">{group.date}</p>
                      <div className="space-y-3">
                        {group.orders.map((o) => <OrderCard key={o.id} order={o} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>{/* end content */}
      </div>{/* end body */}
    </div>
  );
}
