import type { Meta, StoryObj } from "@storybook/react-vite";

import MonitorSvg from "@svgs/MonitorSvg/MonitorSvg";

const meta = {
  title: "SVG/MonitorSvg",
  component: MonitorSvg,
} satisfies Meta<typeof MonitorSvg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {};
