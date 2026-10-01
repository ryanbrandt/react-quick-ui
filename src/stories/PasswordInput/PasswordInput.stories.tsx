import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import PasswordInput from "@stories/PasswordInput/PasswordInput";

const meta = {
  title: "Core/Inputs/PasswordInput",
  component: PasswordInput,
  args: {
    size: "md",
    disabled: false,
    error: { error: false, text: "" },
    onChange: fn(),
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
