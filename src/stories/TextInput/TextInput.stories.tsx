import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import TextInput from "@stories/TextInput/TextInput";

const meta = {
  title: "Core/Inputs/TextInput",
  component: TextInput,
  args: { size: "md", label: "Name", onChange: fn() },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
