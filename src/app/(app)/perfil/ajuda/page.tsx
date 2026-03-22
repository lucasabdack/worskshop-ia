import Link from "next/link";

const FAQ = [
  { q: "Como agendar um serviço?", a: "Na Home, escolha uma categoria ou prestador, selecione os serviços desejados e clique em 'Ver sacola' para prosseguir com o agendamento." },
  { q: "Posso cancelar um pedido?", a: "Sim. Cancele até 2 horas antes do serviço sem cobrança. Após este prazo, pode ser cobrada uma taxa de 20%." },
  { q: "Como funciona o Clube Help?", a: "Você paga uma assinatura mensal e recebe 3 créditos para usar em qualquer serviço do app." },
  { q: "Os prestadores são verificados?", a: "Sim. Prestadores com o selo ✓ Verificado passaram por checagem de documentos e antecedentes." },
  { q: "Como entrar em contato com um prestador?", a: "Após contratar, você pode usar o chat dentro do pedido para se comunicar diretamente." },
];

export default function AjudaPage() {
  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="bg-white px-4 pt-12 pb-4 flex items-center gap-3">
        <Link href="/perfil">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="font-display font-bold text-xl text-neutral-darkest">Ajuda</h1>
      </div>

      <div className="px-4 mt-4 space-y-3">
        <h2 className="font-display font-bold text-base text-neutral-darkest">Perguntas frequentes</h2>

        <div className="space-y-2">
          {FAQ.map((item, i) => (
            <details key={i} className="card px-4 py-3.5 group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-body font-semibold text-sm text-neutral-darkest">{item.q}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-open:rotate-180 transition-transform shrink-0 ml-3">
                  <path d="M4 6l4 4 4-4" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </summary>
              <p className="font-body text-sm text-neutral-dark mt-3 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>

        {/* Contact */}
        <div className="card px-4 py-4 mt-4">
          <h3 className="font-display font-bold text-base text-neutral-darkest mb-3">
            Falar com suporte
          </h3>
          <div className="space-y-2">
            <button className="w-full h-11 rounded-xl border border-neutral-pure font-body font-semibold text-sm text-neutral-darkest flex items-center justify-center gap-2">
              💬 Chat ao vivo
            </button>
            <button className="w-full h-11 rounded-xl border border-neutral-pure font-body font-semibold text-sm text-neutral-darkest flex items-center justify-center gap-2">
              ✉️ Enviar e-mail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
