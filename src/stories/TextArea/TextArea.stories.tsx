import type { StoryFn, Meta } from "@storybook/react";

import TextArea from "@stories/TextArea/TextArea";

export default {
  title: "Core/Inputs/TextArea",
  text: TextArea.name,
  component: TextArea,
  argTypes: {
    value: {
      defaultValue: "",
    },
    label: {
      defaultValue: "This is a Label",
    },
    required: {
      defaultValue: false,
    },
    disabled: {
      defaultValue: false,
    },
    onChange: {
      control: false,
      action: "onChange",
    },
    placeholder: {
      defaultValue: "",
    },
    error: {
      defaultValue: "",
    },
  },
} as Meta<typeof TextArea>;

export const Default = {};
