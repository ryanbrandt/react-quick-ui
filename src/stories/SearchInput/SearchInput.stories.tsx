import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import SearchInput from "@stories/SearchInput/SearchInput";

const meta = {
  title: "Core/Inputs/SearchInput",
  component: SearchInput,
  args: {
    value: "",
    placeholder: "Placeholder Text",
    disabled: false,
    size: "xlg",
    onChange: fn(),
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
