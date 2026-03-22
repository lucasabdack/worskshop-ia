import Link from "next/link";
import { ORDERS_MOCK } from "@/lib/mock-data";

const STATUS_LABEL: Record<string, string> = {
  COMPLETED: "Concluído",
  CONFIRMED: "Confirmado",
  PENDING: "Aguardando",
  CANCELLED: "Cancelado",
};

const STATUS_COLOR: Record<string, string> = {
  COMPLETED: "bg-success-light text-success-low",
  CONFIRMED: "bg-info-light text-info-pure",
  PENDING: "bg-warning-light text-warning-low",
  CANCELLED: "bg-error-light text-error-pure",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PedidosPage() {
  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="bg-white px-4 pt-12 pb-4">
        <h1 className="font-display font-bold text-xl text-neutral-darkest">Pedidos</h1>
      </div>

      <div className="px-4 py-4 space-y-3">
        {ORDERS_MOCK.length === 0 ? (
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
          ORDERS_MOCK.map((order) => (
            <div key={order.id} className="card p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-lightest flex items-center justify-center shrink-0">
                    <span className="font-display font-bold text-primary-pure text-sm">
                      {order.provider.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm text-neutral-darkest">
                      {order.provider.name}
                    </p>
                    <p className="font-body text-xs text-neutral-dark">{order.service}</p>
                  </div>
                </div>
                <span
                  className={`font-body text-xs font-semibold px-2 py-1 rounded-full ${
                    STATUS_COLOR[order.status] ?? "bg-neutral-light text-neutral-dark"
                  }`}
                >
                  {STATUS_LABEL[order.status] ?? order.status}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-light pt-3">
                <span className="font-body text-xs text-neutral-dark">
                  📅 {formatDate(order.scheduledAt)}
                </span>
                <div className="flex items-center gap-2">
                  {order.paidViaClub && (
                    <span className="font-body text-xs font-semibold text-primary-pure bg-primary-lightest px-2 py-0.5 rounded-full">
                      Clube Help
                    </span>
                  )}
                  <span className="font-body font-bold text-sm text-neutral-darkest">
                    {order.total}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
