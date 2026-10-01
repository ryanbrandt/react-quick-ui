import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { expect, fn, waitFor } from "storybook/test";

import Modal, { type Props as ModalProps } from "@stories/Modal/Modal";
import Button from "@stories/Button/Button";
import { FillerPage, fixedOverlayDocs } from "@stories/storyHelpers";

// Keeps the `open` arg in sync with the modal, so clicking the backdrop
// closes it and the "Open modal" button opens it again. Storybook hooks such
// as useArgs only work when this is the story's render function itself, not
// a component it renders.
const renderWithOpenArg = (args: ModalProps) => {
  const [, updateArgs] = useArgs<ModalProps>();
  const close = () => {
    args.onClose();
    updateArgs({ open: false });
  };

  return (
    <FillerPage
      before={
        <Modal {...args} onClose={close}>
          <div
            style={{
              padding: "25px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>This is where modal content would go</p>
          </div>
        </Modal>
      }
    >
      <Button text="Open modal" onClick={() => updateArgs({ open: true })} />
    </FillerPage>
  );
};

const meta = {
  title: "Core/Layout/Modal",
  component: Modal,
  args: {
    open: true,
    onClose: fn(),
    modalHeading: { text: "Its a Modal!", variant: "h1" },
  },
  parameters: fixedOverlayDocs,
  render: renderWithOpenArg,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Starts closed, opens through the button and waits for the scale-up
// animation to finish (the panel starts at opacity 0).
export const Animated: Story = {
  args: { open: false, animated: true },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open modal" }));
    const content = await canvas.findByText(
      "This is where modal content would go"
    );
    await waitFor(() => expect(content).toBeVisible());
  },
};
