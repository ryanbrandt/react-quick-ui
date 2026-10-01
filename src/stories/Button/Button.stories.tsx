import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import Button from "@stories/Button/Button";

const meta = {
  title: "Core/Button",
  component: Button,
  argTypes: {
    iconLeft: { control: false },
    iconRight: { control: false },
  },
  args: { size: "md", disabled: false, onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { text: "Primary", variant: "primary" },
};

export const Success: Story = {
  args: { text: "Success", variant: "success" },
};

export const Danger: Story = {
  args: { text: "Danger", variant: "danger" },
};

export const Neutral: Story = {
  args: { text: "Neutral", variant: "neutral" },
};
