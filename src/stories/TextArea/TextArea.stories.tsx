import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import TextArea from "@stories/TextArea/TextArea";

const meta = {
  title: "Core/Inputs/TextArea",
  component: TextArea,
  args: { label: "This is a Label", onChange: fn() },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
