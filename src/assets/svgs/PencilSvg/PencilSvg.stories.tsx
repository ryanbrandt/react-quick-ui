import type { Meta, StoryObj } from "@storybook/react-vite";

import PencilSvg from "@svgs/PencilSvg/PencilSvg";

const meta = {
  title: "SVG/PencilSvg",
  component: PencilSvg,
} satisfies Meta<typeof PencilSvg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  args: { fill: "#7ba4db" },
};
