import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextInput from "@stories/TextInput/TextInput";

export default {
  title: "Core/Inputs/TextInput",
  text: TextInput.name,
  component: TextInput,
  argTypes: {
    value: {
      defaultValue: "",
    },
    size: {
      defaultValue: "md",
    },
    disabled: {
      defaultValue: false,
    },
    onChange: {
      control: false,
      action: "onChange",
    },
    error: {
      defaultValue: undefined,
    },
    placeholder: {
      defaultValue: "",
    },
    label: {
      defaultValue: "",
    },
    required: {
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof TextInput>;

const DefaultTemplate: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);
export const Default = DefaultTemplate.bind({});
