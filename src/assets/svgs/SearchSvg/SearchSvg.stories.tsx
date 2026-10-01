import type { Meta, StoryObj } from "@storybook/react-vite";

import SearchSvg from "@svgs/SearchSvg/SearchSvg";

const meta = {
  title: "SVG/SearchSvg",
  component: SearchSvg,
} satisfies Meta<typeof SearchSvg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {};
