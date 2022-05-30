import { ComponentStory, ComponentMeta } from "@storybook/react";

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
} as ComponentMeta<typeof TextArea>;

const DefaultTemplate: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);
export const Default = DefaultTemplate.bind({});
