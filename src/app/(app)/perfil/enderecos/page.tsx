import Link from "next/link";

const ADDRESSES = [
  { id: "1", label: "Casa", street: "Rua das Flores, 42", complement: "Ap 101 — Jardim Paulista", isDefault: true },
  { id: "2", label: "Trabalho", street: "Av. Paulista, 1000", complement: "5º andar — Bela Vista", isDefault: false },
];

export default function EnderecosPage() {
  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="sticky top-0 z-50 bg-white px-4 pt-12 pb-4 flex items-center gap-3">
        <Link href="/perfil">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="font-display font-bold text-xl text-neutral-low">Endereços</h1>
      </div>

      <div className="px-4 mt-4 space-y-4">
        <div className="space-y-2">
          {ADDRESSES.map((addr) => (
            <div key={addr.id} className="card px-4 py-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-lightest flex items-center justify-center text-xl shrink-0">
                📍
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-body font-semibold text-sm text-neutral-low">{addr.label}</p>
                  {addr.isDefault && (
                    <span className="bg-success-light text-success-low text-xs font-body font-bold px-2 py-0.5 rounded-full">
                      Padrão
                    </span>
                  )}
                </div>
                <p className="font-body text-sm text-neutral-dark mt-0.5">{addr.street}</p>
                <p className="font-body text-xs text-neutral-dark">{addr.complement}</p>
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
          + Novo endereço
        </button>
      </div>
    </div>
  );
}
