import Link from "next/link";
import { auth } from "@/lib/auth";
import { CATEGORIES, PROVIDERS } from "@/lib/mock-data";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="bg-neutral-light min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-xs text-neutral-dark">Entregando em</p>
            <button className="flex items-center gap-1 font-body font-semibold text-sm text-neutral-darkest">
              Rua das Flores, 42
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <Link href="/perfil">
            <div className="w-9 h-9 rounded-full bg-primary-lightest flex items-center justify-center">
              <span className="font-display font-bold text-primary-pure text-sm">
                {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
              </span>
            </div>
          </Link>
        </div>

        {/* Search */}
        <Link href="/busca" className="flex items-center gap-3 h-11 px-4 rounded-full bg-neutral-light border border-neutral-pure">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5.5" stroke="#5A5A5A" strokeWidth="1.5"/>
            <path d="M12.5 12.5L16 16" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="font-body text-sm text-neutral-dark">Buscar serviços...</span>
        </Link>
      </div>

      {/* Banner Clube Help */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: "#321CB2" }}>
        <div className="px-5 py-4 flex justify-between items-center">
          <div className="space-y-1">
            <span className="font-body text-xs text-white/70 font-semibold uppercase tracking-wide">
              Clube Help
            </span>
            <p className="font-display font-bold text-white text-lg leading-tight">
              Assine e tenha 3<br />serviços por mês
            </p>
            <Link
              href="/perfil/clube-help"
              className="inline-flex mt-2 px-4 py-1.5 bg-white rounded-full font-body font-bold text-xs text-primary-pure"
            >
              Conhecer →
            </Link>
          </div>
          <div className="text-5xl opacity-80">🏠</div>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-6 px-4">
        <h2 className="font-display font-bold text-lg text-neutral-darkest mb-3">
          O que você precisa?
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categorias/${cat.slug}`}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-neutral-pure flex items-center justify-center shadow-sm text-2xl">
                {cat.icon}
              </div>
              <span className="font-body text-xs text-neutral-dark text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Providers */}
      <div className="mt-6 px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg text-neutral-darkest">
            Destaques
          </h2>
          <Link href="/prestadores" className="font-body text-sm text-primary-pure font-semibold">
            Ver todos
          </Link>
        </div>
        <div className="space-y-3">
          {PROVIDERS.slice(0, 3).map((p) => (
            <Link key={p.id} href={`/prestadores/${p.id}`}>
              <div className="card p-4 flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full bg-primary-lightest flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-primary-pure">
                    {p.name[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-body font-semibold text-sm text-neutral-darkest truncate">
                      {p.name}
                    </span>
                    {p.verified && (
                      <span className="text-info-pure text-xs">✓</span>
                    )}
                  </div>
                  <p className="font-body text-xs text-neutral-dark">{p.category}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-body text-xs text-neutral-dark">
                      ⭐ {p.rating} · {p.totalReviews} avaliações
                    </span>
                    <span className="font-body font-bold text-sm text-primary-pure">
                      {p.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
