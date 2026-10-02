import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import Button from "@stories/Button/Button";

const meta = {
  title: "Core/Button",
  component: Button,
  argTypes: {
    iconLeft: { control: false },
    iconRight: { control: false },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { text: "Primary", variant: "primary" },
};

export const Success: Story = {
  args: { text: "Success", variant: "success" },
};

export const Danger: Story = {
  args: { text: "Danger", variant: "danger" },
};

export const Secondary: Story = {
  args: { text: "Secondary", variant: "secondary" },
};

// With `href`: a real link, styled as a button.
export const Link: Story = {
  args: { href: "#", text: "View résumé" },
};

// The spec's 48px calls to action: size="xlg" with width="auto". The render
// ignores `args`; `text` is only set because the story type requires it.
export const CallsToAction: Story = {
  args: { text: "View résumé" },
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Button href="#" size="xlg" width="auto" text="View résumé" />
      <Button
        href="#"
        size="xlg"
        width="auto"
        variant="secondary"
        text="Personal projects"
      />
    </div>
  ),
};
