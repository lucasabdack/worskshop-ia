import type { Meta, StoryObj } from "@storybook/react";
import { Chip, ChipGroup } from "@/components/ds/Chip";

const meta: Meta<typeof Chip> = {
  title: "Helper DS / Chip",
  component: Chip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { label: "Pontual" },
};

export const Active: Story = {
  args: { label: "Agendado", active: true },
};

export const TimeSlots: StoryObj<typeof ChipGroup> = {
  render: () => (
    <div className="p-4">
      <p className="text-sm font-semibold text-neutral-dark mb-3">
        Horário disponível
      </p>
      <ChipGroup
        options={["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"]}
        value="10:00"
      />
    </div>
  ),
};

export const ServiceType: StoryObj<typeof ChipGroup> = {
  render: () => (
    <div className="p-4">
      <p className="text-sm font-semibold text-neutral-dark mb-3">
        Tipo de serviço
      </p>
      <ChipGroup options={["Pontual", "Recorrente"]} value="Pontual" />
    </div>
  ),
};
