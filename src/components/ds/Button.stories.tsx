import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "DS/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Entrar",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Criar conta",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Excluir",
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    loading: true,
    children: "Salvar",
  },
};

export const FullWidth: Story = {
  args: {
    variant: "primary",
    fullWidth: true,
    children: "Continuar",
  },
};
