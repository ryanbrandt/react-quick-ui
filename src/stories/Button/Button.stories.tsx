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

export const Neutral: Story = {
  args: { text: "Neutral", variant: "neutral" },
};

export const Secondary: Story = {
  args: { text: "Secondary", variant: "secondary" },
};

// A real link (`as="a"`), styled as a button.
export const Link: Story = {
  args: { as: "a", href: "#", text: "View résumé" },
};

// The spec's 48px calls to action: size="xlg" with width="auto".
export const CallsToAction: Story = {
  args: { text: "View résumé" },
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Button as="a" href="#" size="xlg" width="auto" text="View résumé" />
      <Button
        as="a"
        href="#"
        size="xlg"
        width="auto"
        variant="secondary"
        text="Personal projects"
      />
    </div>
  ),
};
