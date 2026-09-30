import type { ComponentStory, ComponentMeta } from "@storybook/react";

import CheckSvg from "@svgs/CheckSvg/CheckSvg";

export default {
  title: "SVG/CheckSvg",
  text: CheckSvg.name,
  component: CheckSvg,
  argTypes: {
    fill: {
      defaultValue: false,
    },
    width: {
      defaultValue: 33,
    },
    height: {
      defaultValue: 33,
    },
  },
} as ComponentMeta<typeof CheckSvg>;

const IconTemplate: ComponentStory<typeof CheckSvg> = (args) => (
  <CheckSvg {...args} />
);
export const Icon = IconTemplate.bind({});
Icon.args = {
  width: 33,
  height: 33,
};
