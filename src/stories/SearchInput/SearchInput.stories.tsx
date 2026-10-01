import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import SearchInput from "@stories/SearchInput/SearchInput";

const meta = {
  title: "Core/Inputs/SearchInput",
  component: SearchInput,
  args: { placeholder: "Placeholder Text", onChange: fn() },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
