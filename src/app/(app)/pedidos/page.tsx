"use client";

import Link from "next/link";
import { useState } from "react";

const MOCK_ORDERS_GROUPED = [
  {
    date: "30 de abril • 2024",
    orders: [
      {
        id: "o1",
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
        category: "Serviços Domésticos",
        service: "Serviços de limpeza",
        providerName: "Daniel Soares",
        status: "COMPLETED",
        duration: "3h 30min",
        price: "R$124,90",
        avatarBg: "#F5A623",
        categorySlug: "limpeza",
      },
    ],
  },
  {
    date: "03 de Março • 2024",
    orders: [
      {
        id: "o3",
        category: "Manutenções e reparos",
        service: "Reparos elétricos",
        providerName: "Carlos Mendes",
        status: "COMPLETED",
        duration: "2h 00min",
        price: "R$80,00",
        avatarBg: "#321CB2",
        categorySlug: "reparos",
      },
    ],
  },
];

const FILTERS = [
  { label: "Todos", value: "todos" },
  { label: "Manutenções e Reparos", value: "reparos" },
  { label: "Assistência Técnica", value: "tecnica" },
  { label: "Serviços Domésticos", value: "limpeza" },
];

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M13.5 8A5.5 5.5 0 112.5 8"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M13.5 4v4h-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PedidosPage() {
  const [activeFilter, setActiveFilter] = useState("todos");

  const filtered = MOCK_ORDERS_GROUPED
    .map((group) => ({
      ...group,
      orders:
        activeFilter === "todos"
          ? group.orders
          : group.orders.filter((o) => o.categorySlug === activeFilter),
    }))
    .filter((group) => group.orders.length > 0);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="px-4 pt-14 pb-4 bg-white">
        <h1 className="font-display font-bold text-2xl text-neutral-darkest">Pedidos</h1>
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

      {/* Orders */}
      <div className="mt-5 px-4 pb-6">
        <p className="font-display font-bold text-base text-neutral-darkest mb-4">
          Pedidos realizados
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📋</div>
            <p className="font-display font-bold text-lg text-neutral-darkest">
              Nenhum pedido ainda
            </p>
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
          <div className="space-y-6">
            {filtered.map((group) => (
              <div key={group.date}>
                {/* Date heading */}
                <p className="font-body text-xs text-neutral-dark mb-3">{group.date}</p>

                <div className="space-y-3">
                  {group.orders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-2xl border border-neutral-pure bg-white overflow-hidden"
                    >
                      {/* Card header */}
                      <div className="flex items-center justify-between px-4 pt-4 pb-3">
                        <p className="font-body text-xs text-neutral-dark">{order.category}</p>
                        <Link href="/perfil/ajuda" className="font-body text-xs font-semibold text-primary-pure">
                          Ajuda
                        </Link>
                      </div>
                      <p className="font-body text-sm text-neutral-darkest px-4 pb-3">
                        {order.service}
                      </p>

                      {/* Divider */}
                      <div className="border-t border-neutral-pure mx-4" />

                      {/* Provider row */}
                      <div className="flex items-center gap-3 px-4 py-3">
                        <div
                          className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center text-lg"
                          style={{ background: order.avatarBg }}
                        >
                          <span className="font-display font-bold text-white">
                            {order.providerName[0]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-success-pure shrink-0" />
                            <span className="font-body text-xs text-success-low">Serviço concluído</span>
                          </div>
                          <p className="font-display font-bold text-base text-primary-pure leading-tight">
                            {order.providerName}
                          </p>
                          <p className="font-body text-xs text-neutral-dark">
                            Duração: {order.duration} • {order.price}
                          </p>
                        </div>
                      </div>

                      {/* Action button */}
                      <div className="px-4 pb-4">
                        <button
                          className="w-full h-11 rounded-full flex items-center justify-center gap-2 font-body font-bold text-sm text-white"
                          style={{ background: "#321CB2" }}
                        >
                          <RefreshIcon />
                          Contratar novamente
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
