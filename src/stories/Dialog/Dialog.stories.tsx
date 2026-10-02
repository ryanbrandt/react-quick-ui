import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { expect, fn, waitFor } from "storybook/test";

import Dialog, { type DialogProps } from "@stories/Dialog/Dialog";
import Button from "@stories/Button/Button";
import { FillerPage, fixedOverlayDocs } from "@stories/storyHelpers";

const DESCRIPTION_ID = "dialog-story-description";

// Keeps the `open` arg in sync with the dialog, so Esc, the close button and
// the backdrop close it and the "Open dialog" button opens it again.
// Storybook hooks such as useArgs only work in the story's render function.
const renderWithOpenArg = (args: DialogProps) => {
  const [, updateArgs] = useArgs<DialogProps>();
  const close = () => {
    args.onClose();
    updateArgs({ open: false });
  };

  return (
    <FillerPage>
      <Button text="Open dialog" onClick={() => updateArgs({ open: true })} />
      <Dialog {...args} onClose={close}>
        <p id={DESCRIPTION_ID}>
          Unsaved changes to this page will be lost if you leave now.
        </p>
        <Button text="Keep editing" onClick={close} />
      </Dialog>
    </FillerPage>
  );
};

const meta = {
  title: "Core/Layout/Dialog",
  component: Dialog,
  args: {
    open: true,
    onClose: fn(),
    title: "Leave this page?",
    "aria-describedby": DESCRIPTION_ID,
  },
  parameters: fixedOverlayDocs,
  render: renderWithOpenArg,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Opens from the button, closes with the close button, and checks that focus
// moves into the dialog and back to the button. (Esc needs a trusted key
// press, which a play function can't make: e2e/interactions.spec.ts covers
// it.)
export const OpenAndClose: Story = {
  args: { open: false },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Open dialog" });
    await userEvent.click(trigger);

    const dialog = await canvas.findByRole("dialog", {
      name: "Leave this page?",
    });
    await expect(dialog).toHaveAccessibleDescription(
      "Unsaved changes to this page will be lost if you leave now."
    );
    await expect(dialog).toContainElement(
      document.activeElement as HTMLElement
    );

    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
    await expect(trigger).toHaveFocus();
  },
};
