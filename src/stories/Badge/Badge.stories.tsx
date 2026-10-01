import type { Meta, StoryObj } from "@storybook/react-vite";

import Badge from "@stories/Badge/Badge";

const meta = {
  title: "Core/Badge",
  component: Badge,
  args: { size: "md" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { text: "Primary", variant: "primary" },
};

export const Warning: Story = {
  args: { text: "Warning", variant: "warning" },
};

export const Danger: Story = {
  args: { text: "Danger", variant: "danger" },
};

export const Success: Story = {
  args: { text: "Success", variant: "success" },
};

export const Neutral: Story = {
  args: { text: "Neutral", variant: "neutral" },
};
