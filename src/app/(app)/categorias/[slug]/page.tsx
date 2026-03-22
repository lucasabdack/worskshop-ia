import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, PROVIDERS } from "@/lib/mock-data";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const providers = PROVIDERS.filter((p) => p.categorySlug === slug);

  return (
    <div className="bg-neutral-light min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/home" className="w-9 h-9 flex items-center justify-center">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{category.icon}</span>
            <h1 className="font-display font-bold text-xl text-neutral-darkest">
              {category.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white px-4 pb-3 flex gap-2 overflow-x-auto border-b border-neutral-pure">
        {["Melhor avaliados", "Mais próximos", "Menor preço"].map((filter) => (
          <button
            key={filter}
            className="shrink-0 px-3 py-1.5 rounded-full border border-neutral-pure font-body text-xs text-neutral-dark bg-white"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Providers list */}
      <div className="px-4 py-4 space-y-3">
        {providers.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-body text-neutral-dark text-sm">
              Nenhum prestador disponível nesta categoria.
            </p>
          </div>
        ) : (
          providers.map((p) => (
            <Link key={p.id} href={`/prestadores/${p.id}`}>
              <div className="card p-4 flex gap-3 items-center">
                <div className="w-14 h-14 rounded-full bg-primary-lightest flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-primary-pure text-lg">
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
                    <div className="text-right">
                      <span className="font-body font-bold text-sm text-primary-pure">
                        {p.price}
                      </span>
                      <span className="font-body text-xs text-neutral-dark ml-1">
                        / {p.priceType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
