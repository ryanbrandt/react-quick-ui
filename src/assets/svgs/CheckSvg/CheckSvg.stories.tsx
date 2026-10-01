import type { Meta, StoryObj } from "@storybook/react-vite";

import CheckSvg from "@svgs/CheckSvg/CheckSvg";

const meta = {
  title: "SVG/CheckSvg",
  component: CheckSvg,
  args: { width: 33, height: 33 },
} satisfies Meta<typeof CheckSvg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {};
