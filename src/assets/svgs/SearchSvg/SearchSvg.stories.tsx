import type { StoryFn, Meta } from "@storybook/react-webpack5";

import SearchSvg from "@svgs/SearchSvg/SearchSvg";

export default {
  title: "SVG/SearchSvg",
  text: SearchSvg.name,
  component: SearchSvg,
  argTypes: {},
} as Meta<typeof SearchSvg>;

export const Icon = {
  args: {},
};
