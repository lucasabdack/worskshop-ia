"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ds";

type Phase = "dots" | "expand" | "full" | "contract" | "login";

export default function LoginPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("dots");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // letras: H(0ms) e(200) l(400) p(600) !(900) — cada uma ~700ms
    // última letra assenta em: 2000 + 900 + 700 = 3600ms
    // segura 500ms → contrai em 4100ms
    const t1 = setTimeout(() => setPhase("expand"),   1200);
    const t2 = setTimeout(() => setPhase("full"),     2000);
    const t3 = setTimeout(() => setPhase("contract"), 4100);
    const t4 = setTimeout(() => setPhase("login"),    5100); // 4100 + 800ms contração + 200ms buffer
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  async function handleGoogle() {
    setLoading(true);
    await signIn("google", { callbackUrl: "/home" });
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password: "demo",
      redirect: false,
    });
    if (res?.ok) router.push("/home");
    else setLoading(false);
  }

  /* ─────────── splash ─────────── */
  if (phase !== "login") {
    const isContracting = phase === "contract";

    return (
      <main style={{ position: "fixed", inset: 0, background: "white" }}>
        <style>{`
          /* ── Dots ── */
          @keyframes dotBounce {
            0%, 55%, 100% { transform: translateY(0);     }
            30%            { transform: translateY(-12px); }
          }
          .dot { width: 12px; height: 12px; border-radius: 50%; }
          .d0  { animation: dotBounce 0.9s ease-in-out 0s    infinite; }
          .d1  { animation: dotBounce 0.9s ease-in-out 0.16s infinite; }
          .d2  { animation: dotBounce 0.9s ease-in-out 0.32s infinite; }

          /* ── Background splash ── */
          @keyframes splashExpand {
            from { clip-path: circle(6px     at 50% 80%); }
            to   { clip-path: circle(150vmax at 50% 80%); }
          }
          @keyframes splashContract {
            from { clip-path: circle(150vmax at 0% 100%); }
            to   { clip-path: circle(0px     at 0% 100%); }
          }

          /* ── Queda das letras: cada uma vem do topo com zigzag lateral ── */
          /*    H: entra pela direita, bate à esquerda, assenta            */
          @keyframes fall-H {
            0%   { transform: translate(38vw, -110vh); opacity: 0; }
            12%  { opacity: 1; }
            38%  { transform: translate(-28vw, -35vh); }
            58%  { transform: translate(14vw,  0);     }
            72%  { transform: translate(-5vw,  0);     }
            84%  { transform: translate(2vw,   0);     }
            100% { transform: translate(0, 0);         }
          }
          /*    e: entra pela esquerda, bate à direita                     */
          @keyframes fall-e {
            0%   { transform: translate(-42vw, -110vh); opacity: 0; }
            12%  { opacity: 1; }
            38%  { transform: translate(30vw, -30vh); }
            58%  { transform: translate(-16vw, 0);    }
            72%  { transform: translate(6vw,   0);    }
            84%  { transform: translate(-2vw,  0);    }
            100% { transform: translate(0, 0);        }
          }
          /*    l: cai reto com bounce vertical                            */
          @keyframes fall-l {
            0%   { transform: translateY(-110vh); opacity: 0; }
            12%  { opacity: 1; }
            60%  { transform: translateY(12px); }
            74%  { transform: translateY(-7px); }
            86%  { transform: translateY(3px);  }
            100% { transform: translateY(0);    }
          }
          /*    p: entra pela esquerda                                     */
          @keyframes fall-p {
            0%   { transform: translate(-36vw, -110vh); opacity: 0; }
            12%  { opacity: 1; }
            38%  { transform: translate(26vw, -40vh); }
            58%  { transform: translate(-13vw, 0);    }
            72%  { transform: translate(5vw,   0);    }
            84%  { transform: translate(-2vw,  0);    }
            100% { transform: translate(0, 0);        }
          }
          /*    !: cai do topo com escala e bounce duplo — mais dramático  */
          @keyframes fall-excl {
            0%   { transform: translateY(-130vh) scale(2.5); opacity: 0; }
            12%  { opacity: 1; }
            52%  { transform: translateY(18px) scale(1.15); }
            67%  { transform: translateY(-9px) scale(0.94); }
            79%  { transform: translateY(5px)  scale(1.04); }
            89%  { transform: translateY(-2px) scale(0.99); }
            100% { transform: translateY(0)    scale(1);    }
          }

          /* ── Saída das letras junto com a contração ── */
          @keyframes logoFadeOut {
            from { opacity: 1; }
            to   { opacity: 0; }
          }

          @keyframes loginFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: none; }
          }
        `}</style>

        {/* Três dots pulsando */}
        <div
          style={{
            position: "fixed",
            bottom: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            zIndex: 5,
            opacity: phase === "dots" ? 1 : 0,
            transition: "opacity 0.15s ease",
          }}
        >
          <div className="dot d0" style={{ background: "var(--color-primary-light)" }} />
          <div className="dot d1" style={{ background: "var(--color-primary-pure)"  }} />
          <div className="dot d2" style={{ background: "var(--color-primary-dark)"  }} />
        </div>

        {/* Fundo roxo — expande ou contrai via clip-path */}
        {(phase === "expand" || phase === "full") && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--color-primary-pure)",
              animation: "splashExpand 800ms cubic-bezier(0.4, 0, 1, 1) both",
              zIndex: 10,
            }}
          />
        )}
        {phase === "contract" && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--color-primary-pure)",
              animation: "splashContract 800ms cubic-bezier(0, 0, 0.6, 1) both",
              zIndex: 10,
            }}
          />
        )}

        {/* Letras caindo — aparecem na fase "full", somem na "contract" */}
        {(phase === "full" || phase === "contract") && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
              animation: isContracting ? "logoFadeOut 0.5s ease both" : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(56px, 18vw, 96px)",
                color: "white",
                lineHeight: 1,
              }}
            >
              {/* Cada letra tem sua própria animação de queda + delay */}
              {[
                { char: "H", anim: "fall-H",    delay: "0ms",   dur: "700ms" },
                { char: "e", anim: "fall-e",    delay: "200ms", dur: "700ms" },
                { char: "l", anim: "fall-l",    delay: "400ms", dur: "650ms" },
                { char: "p", anim: "fall-p",    delay: "600ms", dur: "700ms" },
                { char: "!", anim: "fall-excl", delay: "900ms", dur: "800ms" },
              ].map(({ char, anim, delay, dur }) => (
                <span
                  key={char + anim}
                  style={{
                    display: "inline-block",
                    opacity: isContracting ? undefined : 0, // começa invisível; a keyframe seta opacity:1
                    animation: isContracting
                      ? "none"
                      : `${anim} ${dur} cubic-bezier(0.23, 1, 0.32, 1) ${delay} both`,
                    willChange: "transform, opacity",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    );
  }

  /* ─────────── login ─────────── */
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-neutral-light"
      style={{ animation: "loginFadeIn 0.5s ease both" }}
    >
      <style>{`
        @keyframes loginFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>

      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-3">
          <div className="mx-auto flex items-center justify-center">
            <span className="font-display font-bold text-6xl" style={{ color: "#321CB2" }}>Help!</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-neutral-low">
              Bem-vindo de volta
            </h1>
            <p className="font-body text-sm text-neutral-dark mt-1">
              Entre na sua conta Help
            </p>
          </div>
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 h-12 rounded-full border border-neutral-pure bg-white font-body font-semibold text-neutral-low text-sm hover:bg-neutral-light transition-colors disabled:opacity-50"
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path fill="#4285F4" d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.41a4.63 4.63 0 01-2.01 3.04v2.52h3.25c1.9-1.75 3-4.33 3-7.35z"/>
            <path fill="#34A853" d="M10 20c2.7 0 4.96-.9 6.62-2.42l-3.25-2.52c-.9.6-2.05.96-3.37.96-2.6 0-4.8-1.75-5.59-4.11H1.07v2.6A10 10 0 0010 20z"/>
            <path fill="#FBBC04" d="M4.41 11.91A6.03 6.03 0 014.1 10c0-.66.12-1.3.31-1.91V5.49H1.07A10 10 0 000 10c0 1.61.39 3.14 1.07 4.51l3.34-2.6z"/>
            <path fill="#EA4335" d="M10 3.98c1.46 0 2.77.5 3.8 1.49l2.85-2.85A9.98 9.98 0 0010 0 10 10 0 001.07 5.49l3.34 2.6C5.2 5.74 7.4 3.98 10 3.98z"/>
          </svg>
          Continuar com Google
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-neutral-pure" />
          <span className="font-body text-xs text-neutral-dark">ou</span>
          <div className="flex-1 h-px bg-neutral-pure" />
        </div>

        <form onSubmit={handleEmail} className="space-y-4">
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 px-4 rounded-2xl border border-neutral-pure font-body text-sm text-neutral-low placeholder:text-neutral-dark outline-none focus:border-primary-pure transition-colors"
          />
          <Button type="submit" fullWidth loading={loading}>
            Entrar
          </Button>
        </form>

        <p className="text-center font-body text-sm text-neutral-dark">
          Não tem conta?{" "}
          <a href="/signup" className="text-primary-pure font-semibold">
            Criar conta
          </a>
        </p>
      </div>
    </main>
  );
}
