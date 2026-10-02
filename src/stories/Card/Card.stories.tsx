import type { Meta, StoryObj } from "@storybook/react-vite";

import Card from "@stories/Card/Card";

const meta = {
  title: "Core/Card",
  component: Card,
  argTypes: {
    media: { control: false },
    footer: { control: false },
  },
  args: {
    title: "Open FEC GraphQL Server",
    children:
      "A GraphQL wrapper around the Open Federal Election Commission API " +
      "that simplifies retrieving deeply nested data.",
    tags: ["GraphQL", "Node.js"],
  },
  render: (args) => (
    <div style={{ width: "360px" }}>
      <Card {...args} />
    </div>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// The spec's project card: the whole card links to the project page, and
// the footer link stays clickable on its own.
export const Project: Story = {
  args: {
    href: "#project",
    media: <span aria-hidden="true">FEC</span>,
    footer: <a href="#github">View on GitHub →</a>,
  },
};

export const Plain: Story = {};
