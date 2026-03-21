import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "@/components/ds/Badge";

const meta: Meta<typeof Badge> = {
  title: "Helper DS / Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "white" } },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Active: Story = {
  args: { variant: "active", children: "Membro ativo" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Cota esgotada" },
};

export const Error: Story = {
  args: { variant: "error", children: "Pagamento pendente" },
};

export const Info: Story = {
  args: { variant: "info", children: "Aguardando confirmação" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <Badge variant="active">Membro ativo</Badge>
      <Badge variant="warning">Cota esgotada</Badge>
      <Badge variant="error">Pagamento pendente</Badge>
      <Badge variant="info">Aguardando confirmação</Badge>
    </div>
  ),
};
