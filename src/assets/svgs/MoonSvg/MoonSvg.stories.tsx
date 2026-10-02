import type { Meta, StoryObj } from "@storybook/react-vite";

import MoonSvg from "@svgs/MoonSvg/MoonSvg";

const meta = {
  title: "SVG/MoonSvg",
  component: MoonSvg,
} satisfies Meta<typeof MoonSvg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {};
