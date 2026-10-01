import type { Meta, StoryObj } from "@storybook/react-vite";

import Heading from "@stories/Heading/Heading";

const meta = {
  title: "Core/Heading",
  component: Heading,
  args: { text: "Heading Text", variant: "h1" },
  render: (args) => (
    <div style={{ width: "60vw", height: "50vh" }}>
      <Heading {...args} />
    </div>
  ),
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
