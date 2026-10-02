import type { Meta, StoryObj } from "@storybook/react-vite";

import CloseSvg from "@svgs/CloseSvg/CloseSvg";

const meta = {
  title: "SVG/CloseSvg",
  component: CloseSvg,
} satisfies Meta<typeof CloseSvg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {};
