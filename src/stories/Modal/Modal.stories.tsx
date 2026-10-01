import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { expect, fn, waitFor } from "storybook/test";

import Modal from "@stories/Modal/Modal";
import Button from "@stories/Button/Button";

type ModalProps = ComponentProps<typeof Modal>;

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
    <div
      style={{
        height: "100%",
        width: "90vw",
        backgroundColor: "white",
        display: "flex",
      }}
    >
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
      <div style={{ padding: "25px" }}>
        <Button text="Open modal" onClick={() => updateArgs({ open: true })} />
        <h3>Lorem ipsum</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum
          at nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac
          euismod mi dignissim. Ut commodo, magna eget hendrerit condimentum,
          risus nisi mollis ipsum, et malesuada diam eros non metus. Praesent id
          ligula ullamcorper, vulputate felis sed, feugiat nulla. Quisque
          commodo rhoncus massa sed imperdiet. Etiam rhoncus porttitor felis, ut
          porta nibh auctor quis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec eget mattis turpis.
        </p>
      </div>
    </div>
  );
};

const meta = {
  title: "Core/Layout/Modal",
  component: Modal,
  argTypes: {
    onClose: { control: false },
  },
  args: {
    open: true,
    animated: false,
    onClose: fn(),
    modalHeading: { text: "Its a Modal!", variant: "h1" },
  },
  parameters: {
    // The modal is position: fixed; render it in its own iframe on the docs
    // page so it doesn't cover the whole page.
    docs: { story: { inline: false, iframeHeight: 400 } },
  },
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
