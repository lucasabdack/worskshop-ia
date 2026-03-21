import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "@/components/ds/Button";

const meta: Meta<typeof Button> = {
  title: "Helper DS / Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "ghost", "danger"],
      description: "Estilo visual do botão",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Confirmar agendamento",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Cancelar assinatura",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Excluir conta",
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    loading: true,
    children: "Ir para pagamento",
  },
};

export const FullWidth: Story = {
  args: {
    variant: "primary",
    fullWidth: true,
    children: "Assinar Clube Help",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Adicionar serviço",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <Button variant="primary">btn-primary</Button>
      <Button variant="ghost">btn-ghost</Button>
      <Button variant="danger">btn-danger</Button>
    </div>
  ),
};
