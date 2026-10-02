import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";

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
  // Typing updates the value arg (see syncArgs in .storybook/preview.ts).
  parameters: { syncArgs: { value: "onChange" } },
} satisfies Meta<typeof EditAndConfirmInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Starts editing, types an address and shows the confirm icon.
export const Editing: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    const input = canvas.getByLabelText("Edit and Confirm Your Email");
    await expect(input).toBeDisabled();

    // The icons are SVGs without a role, so find the pencil by its class.
    const pencil = canvasElement.querySelector(
      ".edit-and-confirm-input__edit-icon"
    );
    await userEvent.click(pencil as Element);
    await userEvent.type(input, "ryan@example.com");

    await expect(input).toHaveValue("ryan@example.com");
    await expect(
      canvasElement.querySelector(".edit-and-confirm-input__confirm-icon")
    ).toBeInTheDocument();
  },
};
