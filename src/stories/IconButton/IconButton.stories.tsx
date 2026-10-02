import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import IconButton from "@stories/IconButton/IconButton";

const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

const meta = {
  title: "Core/IconButton",
  component: IconButton,
  argTypes: { icon: { control: false } },
  args: {
    "aria-label": "Switch colour theme",
    icon: <MoonIcon />,
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Secondary: Story = {};

export const Ghost: Story = {
  args: { variant: "ghost" },
};
