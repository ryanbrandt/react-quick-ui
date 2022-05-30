import { ComponentStory, ComponentMeta } from "@storybook/react";

import Search from "@stories/SearchInput/SearchInput";

export default {
  title: "Core/Inputs/SearchInput",
  text: Search.name,
  component: Search,
  argTypes: {
    value: {
      defaultValue: "",
    },
    placeholder: {
      defaultValue: "Placeholder Text",
    },
    onChange: {
      control: false,
      action: "onChange",
    },
    disabled: {
      defaultValue: false,
    },
    size: {
      defaultValue: "xlg",
    },
  },
} as ComponentMeta<typeof Search>;

const DefaultTemplate: ComponentStory<typeof Search> = (args) => (
  <Search {...args} />
);
export const Default = DefaultTemplate.bind({});
