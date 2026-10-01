import type { Meta, StoryObj } from "@storybook/react-vite";

import TopBar from "@stories/TopBar/TopBar";
import Button from "@stories/Button/Button";
import { FillerPage } from "@stories/storyHelpers";

const meta = {
  title: "Core/Menus/TopBar",
  component: TopBar,
  render: (args) => (
    <FillerPage
      layout="column"
      before={
        <TopBar {...args}>
          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              padding: "0px 20px",
              justifyContent: "space-between",
            }}
          >
            <Button text="Sign Out" variant="danger" />
          </div>
        </TopBar>
      }
    />
  ),
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
