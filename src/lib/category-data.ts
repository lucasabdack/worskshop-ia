// Metadados de categorias e serviços — fonte de verdade para nomes e slugs.
// Ícones ficam em src/components/ds/ServiceIcons.tsx

export const CATEGORY_TITLES: Record<string, string> = {
  reparos: "Manutenções e Reparos",
  eletrica: "Assistência Técnica",
  limpeza: "Limpeza e Organização",
  jardinagem: "Jardinagem e Paisagismo",
};

// Slugs de serviços por categoria — usado para lookup nome ↔ slug
export const CATEGORY_SERVICES: Record<string, { name: string; slug: string }[]> = {
  reparos: [
    { name: "Reparo de tomadas", slug: "reparo-de-tomadas" },
    { name: "Reparo de chuveiro", slug: "reparo-de-chuveiro" },
    { name: "Instalação de iluminação", slug: "instalacao-de-iluminacao" },
    { name: "Manutenção de ar-cond.", slug: "manutencao-de-ar-condicionado" },
    { name: "Montagem de móveis", slug: "montagem-de-moveis" },
    { name: "Pintura residencial", slug: "pintura-residencial" },
  ],
  eletrica: [
    { name: "Instalação de tomada", slug: "instalacao-de-tomada" },
    { name: "Troca de disjuntor", slug: "troca-de-disjuntor" },
    { name: "Instalação de luminária", slug: "instalacao-de-luminaria" },
    { name: "Config. de Wi-Fi", slug: "config-de-wi-fi" },
    { name: "Manutenção de PC", slug: "manutencao-de-pc" },
    { name: "Câmeras de segurança", slug: "cameras-de-seguranca" },
  ],
  limpeza: [
    { name: "Limpeza básica", slug: "limpeza-basica" },
    { name: "Limpeza profunda", slug: "limpeza-profunda" },
    { name: "Limpeza pós-obra", slug: "limpeza-pos-obra" },
    { name: "Organização", slug: "organizacao" },
    { name: "Limpeza de estofado", slug: "limpeza-de-estofado" },
    { name: "Higienização", slug: "higienizacao" },
  ],
  jardinagem: [
    { name: "Poda de árvores", slug: "poda-de-arvores" },
    { name: "Corte de grama", slug: "corte-de-grama" },
    { name: "Plantio de flores", slug: "plantio-de-flores" },
    { name: "Paisagismo", slug: "paisagismo" },
    { name: "Irrigação", slug: "irrigacao" },
    { name: "Adubação", slug: "adubacao" },
  ],
};

export function getServiceName(categorySlug: string, serviceSlug: string): string {
  const services = CATEGORY_SERVICES[categorySlug] ?? [];
  return services.find((s) => s.slug === serviceSlug)?.name ?? serviceSlug;
}
