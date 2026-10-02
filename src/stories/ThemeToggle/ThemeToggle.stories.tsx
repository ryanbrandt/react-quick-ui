import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor } from "storybook/test";

import ThemeToggle from "@stories/ThemeToggle/ThemeToggle";

const meta = {
  title: "Core/Inputs/ThemeToggle",
  component: ThemeToggle,
  args: { value: "system", onChange: fn() },
  // The value follows onChange (see syncArgs in .storybook/preview.ts).
  parameters: { syncArgs: { value: "onChange" } },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Picking an option checks it (through syncArgs); the arrow keys move on.
export const PickDark: Story = {
  args: { value: "light" },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("radio", { name: "Dark" }));
    // The arg update takes a round trip through Storybook.
    await waitFor(() =>
      expect(canvas.getByRole("radio", { name: "Dark" })).toBeChecked()
    );

    await userEvent.keyboard("{ArrowRight}");
    await waitFor(() =>
      expect(canvas.getByRole("radio", { name: "System" })).toBeChecked()
    );
  },
};
