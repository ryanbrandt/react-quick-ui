import type { StoryFn, Meta } from "@storybook/react-webpack5";

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
} as Meta<typeof Search>;

export const Default = {};
