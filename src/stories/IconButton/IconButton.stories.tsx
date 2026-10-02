import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import IconButton from "@stories/IconButton/IconButton";
import SearchSvg from "@svgs/SearchSvg/SearchSvg";

const meta = {
  title: "Core/IconButton",
  component: IconButton,
  argTypes: { icon: { control: false } },
  args: {
    "aria-label": "Search",
    icon: <SearchSvg />,
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Secondary: Story = {};

export const Ghost: Story = {
  args: { variant: "ghost" },
};
