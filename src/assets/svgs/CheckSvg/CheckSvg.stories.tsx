import type { StoryFn, Meta } from "@storybook/react-webpack5";

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
} as Meta<typeof CheckSvg>;

export const Icon = {
  args: {
    width: 33,
    height: 33,
  },
};
