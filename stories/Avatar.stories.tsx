import type { Meta, StoryObj } from "@storybook/nextjs";
import { Avatar } from "@/components/ds/Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Helper DS / Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "white" } },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: { name: "João Silva", size: 48 },
};

export const WithBadge: Story = {
  args: { name: "Maria Souza", size: 56, badge: true },
};

export const PraiseSize: Story = {
  args: { name: "Carlos Pereira", size: 56, badge: true },
  name: "avatar-praise 56px (DS spec)",
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 p-4">
      <Avatar name="A" size={32} />
      <Avatar name="B" size={40} />
      <Avatar name="C" size={48} />
      <Avatar name="D" size={56} />
      <Avatar name="E" size={64} />
    </div>
  ),
};
