import type { Meta, StoryObj } from "@storybook/nextjs";
import { Infobar } from "@/components/ds/Infobar";

const meta: Meta<typeof Infobar> = {
  title: "Helper DS / Infobar",
  component: Infobar,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "white" } },
};

export default meta;
type Story = StoryObj<typeof Infobar>;

/** Caminho B — Avulso (bg primary-pure) */
export const Avulso: Story = {
  args: {
    variant: "default",
    children: "Total: R$ 120,00",
  },
};

/** Caminho A — Clube Help com cota ativa */
export const ClubeAtivo: Story = {
  args: {
    variant: "success",
    children: "Incluído no seu Clube Help · 2 serviços restantes este mês",
  },
};

/** Cota esgotada */
export const CotaEsgotada: Story = {
  args: {
    variant: "warning",
    children:
      "Sua cota mensal foi esgotada. Assine o Clube Help para os próximos meses.",
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <Infobar variant="default">Total: R$ 120,00</Infobar>
      <Infobar variant="success">
        Incluído no Clube Help · 2 serviços restantes este mês
      </Infobar>
      <Infobar variant="warning">
        Cota esgotada. Próxima renovação: 01/04.
      </Infobar>
      <Infobar variant="error">Pagamento recusado. Tente novamente.</Infobar>
    </div>
  ),
};
