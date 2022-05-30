import { ComponentStory, ComponentMeta } from "@storybook/react";

import SearchSvg from "@svgs/SearchSvg/SearchSvg";

export default {
  title: "SVG/SearchSvg",
  text: SearchSvg.name,
  component: SearchSvg,
  argTypes: {},
} as ComponentMeta<typeof SearchSvg>;

const IconTemplate: ComponentStory<typeof SearchSvg> = (args) => (
  <SearchSvg {...args} />
);
export const Icon = IconTemplate.bind({});
Icon.args = {};
