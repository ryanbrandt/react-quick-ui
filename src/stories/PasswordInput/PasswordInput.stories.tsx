import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import PasswordInput from "@stories/PasswordInput/PasswordInput";

const meta = {
  title: "Core/Inputs/PasswordInput",
  component: PasswordInput,
  args: { label: "Password", onChange: fn() },
  // Typing updates the value arg (see syncArgs in .storybook/preview.ts).
  parameters: { syncArgs: { value: "onChange" } },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
