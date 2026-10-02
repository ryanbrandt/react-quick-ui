import type { Meta, StoryObj } from "@storybook/react-vite";

import MenuSvg from "@svgs/MenuSvg/MenuSvg";

const meta = {
  title: "SVG/MenuSvg",
  component: MenuSvg,
} satisfies Meta<typeof MenuSvg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {};
