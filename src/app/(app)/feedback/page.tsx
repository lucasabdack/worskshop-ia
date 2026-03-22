"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { PROVIDERS } from "@/lib/mock-data";

const COMPLIMENT_OPTIONS = [
  "Pontual", "Profissional", "Organizado", "Cuidadoso",
  "Eficiente", "Rápido", "Honesto", "Educado",
];

function FeedbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const providerId = searchParams.get("providerId") ?? "";
  const provider = PROVIDERS.find((p) => p.id === providerId);

  const [rating, setRating] = useState(0);
  const [selectedCompliments, setSelectedCompliments] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleCompliment = (c: string) => {
    setSelectedCompliments((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    setTimeout(() => router.push("/home"), 2000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="font-display font-bold text-2xl text-neutral-darkest">
          Obrigado!
        </h1>
        <p className="font-body text-sm text-neutral-dark mt-2">
          Sua avaliação ajuda outros usuários.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-light min-h-screen pb-28">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="font-display font-bold text-xl text-neutral-darkest">Avaliação</h1>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* Provider */}
        {provider && (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary-lightest flex items-center justify-center mb-2">
              <span className="font-display font-bold text-primary-pure text-xl">
                {provider.name[0]}
              </span>
            </div>
            <p className="font-display font-bold text-lg text-neutral-darkest">{provider.name}</p>
            <p className="font-body text-sm text-neutral-dark">{provider.category}</p>
          </div>
        )}

        {/* Star rating */}
        <div>
          <p className="font-display font-bold text-base text-neutral-darkest mb-3 text-center">
            Como foi o serviço?
          </p>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="text-4xl transition-transform active:scale-90"
              >
                {star <= rating ? "⭐" : "☆"}
              </button>
            ))}
          </div>
        </div>

        {/* Compliments */}
        {rating >= 4 && (
          <div>
            <p className="font-display font-bold text-base text-neutral-darkest mb-3">
              O que mais se destacou?
            </p>
            <div className="flex flex-wrap gap-2">
              {COMPLIMENT_OPTIONS.map((c) => {
                const isSelected = selectedCompliments.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() => toggleCompliment(c)}
                    className={`px-3 py-1.5 rounded-full font-body text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-primary-pure text-white"
                        : "bg-white border border-neutral-pure text-neutral-dark"
                    }`}
                  >
                    {isSelected ? "✓ " : ""}{c}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Comment */}
        {rating > 0 && (
          <div>
            <p className="font-display font-bold text-base text-neutral-darkest mb-2">
              Deixe um comentário (opcional)
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conta como foi sua experiência..."
              rows={4}
              className="w-full bg-white border border-neutral-pure rounded-2xl px-4 py-3 font-body text-sm text-neutral-darkest placeholder:text-neutral-dark outline-none resize-none focus:border-primary-pure"
            />
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 py-3 bg-neutral-light/90 backdrop-blur-sm">
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full h-12 rounded-full font-body font-bold text-sm transition-all ${
            rating > 0
              ? "bg-primary-pure text-white"
              : "bg-neutral-pure text-neutral-dark cursor-not-allowed"
          }`}
        >
          Enviar avaliação
        </button>
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense>
      <FeedbackContent />
    </Suspense>
  );
}
