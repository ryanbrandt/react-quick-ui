import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import TextArea from "@stories/TextArea/TextArea";

const meta = {
  title: "Core/Inputs/TextArea",
  component: TextArea,
  args: { label: "This is a Label", onChange: fn() },
  // Typing updates the value arg (see syncArgs in .storybook/preview.ts).
  parameters: { syncArgs: { value: "onChange" } },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
