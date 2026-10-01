import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import EditAndConfirmInput from "@stories/EditAndConfirmInput/EditAndConfirmInput";

const meta = {
  title: "Core/Inputs/EditAndConfirmInput",
  component: EditAndConfirmInput,
  args: {
    value: "",
    size: "xlg",
    label: "Edit and Confirm Your Email",
    inputType: "email",
    onChange: fn(),
    onEditClick: fn(),
    onConfirmClick: fn(),
  },
} satisfies Meta<typeof EditAndConfirmInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
