import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "@/components/ds/Badge";
import { Button } from "@/components/ds/Button";
import { Infobar } from "@/components/ds/Infobar";
import { ProgressBar } from "@/components/ds/ProgressBar";

const meta: Meta = {
  title: "Helper DS / Clube Help",
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "neutral-light" } },
};

export default meta;

/** Estado: não assinante */
export const NaoAssinante: StoryObj = {
  render: () => (
    <div className="max-w-sm mx-auto">
      {/* Banner */}
      <div
        className="relative overflow-hidden p-6 rounded-2xl text-white mb-4"
        style={{ background: "#321CB2" }}
      >
        <h2 className="font-display font-bold text-2xl mb-1">Clube Help!</h2>
        <p className="font-body text-sm opacity-90 mb-4">
          Até 3 serviços por mês por uma mensalidade fixa. Sem surpresas.
        </p>
        <p className="font-display font-bold text-4xl mb-1">
          R$ 49<span className="text-lg font-body font-normal">/mês</span>
        </p>
        <p className="font-body text-xs opacity-70">Cancele quando quiser</p>
      </div>
      <Button variant="primary" fullWidth>
        Assinar Clube Help
      </Button>
    </div>
  ),
};

/** Estado: assinante ativo */
export const AssinanteAtivo: StoryObj = {
  render: () => (
    <div className="max-w-sm mx-auto space-y-4">
      {/* Banner */}
      <div
        className="relative overflow-hidden p-6 rounded-2xl text-white"
        style={{ background: "#321CB2" }}
      >
        <div className="flex items-start justify-between mb-3">
          <h2 className="font-display font-bold text-2xl">Clube Help!</h2>
          <Badge variant="active">Membro ativo</Badge>
        </div>
        <p className="font-body text-sm opacity-90 mb-4">
          Você tem serviços disponíveis este mês.
        </p>
        <ProgressBar current={1} total={3} />
        <p className="font-body text-xs mt-2" style={{ color: "#C8C2EB" }}>
          1 de 3 serviços usados
        </p>
      </div>
      {/* Renovação */}
      <div className="card p-4">
        <p className="font-body text-xs text-neutral-dark">Próxima renovação</p>
        <p className="font-body font-semibold text-neutral-darkest">
          01 de abril de 2026
        </p>
      </div>
      <Button variant="ghost" fullWidth>
        Cancelar assinatura
      </Button>
    </div>
  ),
};

/** Estado: cota esgotada */
export const CotaEsgotada: StoryObj = {
  render: () => (
    <div className="max-w-sm mx-auto space-y-4">
      <div
        className="relative overflow-hidden p-6 rounded-2xl text-white"
        style={{ background: "#321CB2" }}
      >
        <div className="flex items-start justify-between mb-3">
          <h2 className="font-display font-bold text-2xl">Clube Help!</h2>
          <Badge variant="active">Membro ativo</Badge>
        </div>
        <ProgressBar current={3} total={3} />
        <p className="font-body text-xs mt-2" style={{ color: "#C8C2EB" }}>
          3 de 3 serviços usados
        </p>
      </div>
      <Infobar variant="warning">
        Sua cota mensal foi esgotada. Próxima renovação em 01/04 — seus serviços
        estarão disponíveis novamente.
      </Infobar>
    </div>
  ),
};

/** Sacola — bifurcação Caminho A */
export const SacolaCaminhoA: StoryObj = {
  name: "Sacola — Caminho A (Clube)",
  render: () => (
    <div className="max-w-sm mx-auto space-y-4 p-4 bg-white rounded-2xl shadow-level-2">
      <h3 className="font-display font-bold text-xl">Resumo do pedido</h3>
      <div className="flex justify-between text-sm font-body">
        <span className="text-neutral-dark">Limpeza residencial</span>
        <span className="text-neutral-dark line-through">R$ 120,00</span>
      </div>
      <Infobar variant="success">
        Incluído no seu Clube Help · 2 serviços restantes este mês
      </Infobar>
      <Button variant="primary" fullWidth>
        Confirmar agendamento
      </Button>
    </div>
  ),
};

/** Sacola — bifurcação Caminho B */
export const SacolaCaminhoB: StoryObj = {
  name: "Sacola — Caminho B (Avulso)",
  render: () => (
    <div className="max-w-sm mx-auto space-y-4 p-4 bg-white rounded-2xl shadow-level-2">
      <h3 className="font-display font-bold text-xl">Resumo do pedido</h3>
      <div className="flex justify-between text-sm font-body">
        <span className="text-neutral-dark">Limpeza residencial</span>
        <span className="text-neutral-darkest font-semibold">R$ 120,00</span>
      </div>
      <Infobar variant="default">Total a pagar: R$ 120,00</Infobar>
      <Button variant="primary" fullWidth>
        Ir para pagamento
      </Button>
    </div>
  ),
};
