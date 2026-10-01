import type { Meta, StoryObj } from "@storybook/react-vite";

import PencilSvg from "@svgs/PencilSvg/PencilSvg";

const meta = {
  title: "SVG/PencilSvg",
  component: PencilSvg,
  args: { width: 20, height: 20 },
} satisfies Meta<typeof PencilSvg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  args: { fill: "#7ba4db" },
};
