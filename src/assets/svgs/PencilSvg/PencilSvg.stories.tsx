import type { StoryFn, Meta } from "@storybook/react";

import PencilSvg from "@svgs/PencilSvg/PencilSvg";

export default {
  title: "SVG/PencilSvg",
  text: PencilSvg.name,
  component: PencilSvg,
  argTypes: {
    fill: {
      defaultValue: false,
    },
    width: {
      defaultValue: 20,
    },
    height: {
      defaultValue: 20,
    },
  },
} as Meta<typeof PencilSvg>;

export const Icon = {
  args: {
    fill: "#7ba4db",
    width: 20,
    height: 20,
  },
};
