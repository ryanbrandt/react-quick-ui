import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import TextArea from "@stories/TextArea/TextArea";

const meta = {
  title: "Core/Inputs/TextArea",
  component: TextArea,
  args: {
    value: "",
    label: "This is a Label",
    disabled: false,
    placeholder: "",
    error: "",
    onChange: fn(),
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
