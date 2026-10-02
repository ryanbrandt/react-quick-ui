import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import SearchInput from "@stories/SearchInput/SearchInput";

const meta = {
  title: "Core/Inputs/SearchInput",
  component: SearchInput,
  args: { placeholder: "Placeholder Text", onChange: fn() },
  // Typing updates the value arg (see syncArgs in .storybook/preview.ts).
  parameters: { syncArgs: { value: "onChange" } },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
