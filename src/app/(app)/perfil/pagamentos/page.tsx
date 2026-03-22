import Link from "next/link";

const CARDS = [
  { id: "1", brand: "Visa", last4: "4242", expires: "12/27", isDefault: true },
  { id: "2", brand: "Mastercard", last4: "1234", expires: "08/26", isDefault: false },
];

export default function PagamentosPage() {
  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="bg-white px-4 pt-12 pb-4 flex items-center gap-3">
        <Link href="/perfil">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="font-display font-bold text-xl text-neutral-darkest">Pagamentos</h1>
      </div>

      <div className="px-4 mt-4 space-y-4">
        <h2 className="font-display font-bold text-base text-neutral-darkest">Cartões salvos</h2>

        <div className="space-y-2">
          {CARDS.map((card) => (
            <div key={card.id} className="card px-4 py-3.5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-lightest flex items-center justify-center text-xl">
                💳
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-body font-semibold text-sm text-neutral-darkest">
                    {card.brand} •••• {card.last4}
                  </p>
                  {card.isDefault && (
                    <span className="bg-success-light text-success-low text-xs font-body font-bold px-2 py-0.5 rounded-full">
                      Padrão
                    </span>
                  )}
                </div>
                <p className="font-body text-xs text-neutral-dark">Expira {card.expires}</p>
              </div>
              <button>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5L5 15" stroke="#E03A3A" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        <button className="w-full h-12 rounded-2xl border-2 border-dashed border-neutral-pure font-body font-semibold text-sm text-neutral-dark">
          + Adicionar cartão
        </button>
      </div>
    </div>
  );
}
