import type { Meta, StoryObj } from "@storybook/react-vite";

import SunSvg from "@svgs/SunSvg/SunSvg";

const meta = {
  title: "SVG/SunSvg",
  component: SunSvg,
} satisfies Meta<typeof SunSvg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {};
