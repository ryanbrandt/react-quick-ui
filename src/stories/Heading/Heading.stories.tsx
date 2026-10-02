import type { Meta, StoryObj } from "@storybook/react-vite";

import Heading from "@stories/Heading/Heading";

const meta = {
  title: "Core/Heading",
  component: Heading,
  args: { text: "Heading Text" },
  render: (args) => (
    <div style={{ width: "60vw", height: "50vh" }}>
      <Heading {...args} />
    </div>
  ),
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hero: Story = {
  args: { variant: "hero" },
};

// `<strong>` in the spec's variants is semibold in the accent colour.
export const HeroWithName: Story = {
  render: () => (
    <Heading variant="hero">
      Hello, World! I'm <strong>Ryan Brandt</strong>.
    </Heading>
  ),
};

export const Section: Story = {
  args: { variant: "section" },
};

export const Title: Story = {
  args: { variant: "title" },
};
