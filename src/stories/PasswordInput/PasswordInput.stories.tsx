import { ComponentStory, ComponentMeta } from "@storybook/react";

import PasswordInput from "@stories/PasswordInput/PasswordInput";

export default {
  title: "Core/Inputs/PasswordInput",
  text: PasswordInput.name,
  component: PasswordInput,
  argTypes: {
    value: {
      defaultValue: undefined,
    },
    size: {
      defaultValue: "md",
    },
    label: {
      defaultValue: undefined,
    },
    required: {
      defaultValue: false,
    },
    disabled: {
      defaultValue: false,
    },
    error: {
      defaultValue: { error: false, text: "" },
    },
    onChange: {
      control: false,
      action: "onChange",
    },
    className: {
      defaultValue: undefined,
    },
  },
} as ComponentMeta<typeof PasswordInput>;

const DefaultTemplate: ComponentStory<typeof PasswordInput> = (args) => (
  <PasswordInput {...args} />
);
export const Default = DefaultTemplate.bind({});
