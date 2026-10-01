import type { Meta, StoryObj } from "@storybook/react-vite";

import LoadingOverlay from "@stories/LoadingOverlay/LoadingOverlay";
import { FillerPage, fixedOverlayDocs } from "@stories/storyHelpers";

const meta = {
  title: "Core/Loaders/LoadingOverlay",
  component: LoadingOverlay,
  args: { show: true, message: "Loading some content..." },
  parameters: fixedOverlayDocs,
  render: (args) => <FillerPage after={<LoadingOverlay {...args} />} />,
} satisfies Meta<typeof LoadingOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
