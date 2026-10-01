import type { Meta, StoryObj } from "@storybook/react-vite";

import SpinnerLoader from "@stories/SpinnerLoader/SpinnerLoader";

const meta = {
  title: "Core/Loaders/SpinnerLoader",
  component: SpinnerLoader,
} satisfies Meta<typeof SpinnerLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
