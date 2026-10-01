import type { StoryFn, Meta } from "@storybook/react";

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
