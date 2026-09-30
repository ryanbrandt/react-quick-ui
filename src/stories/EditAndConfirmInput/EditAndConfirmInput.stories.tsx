import type { ComponentStory, ComponentMeta } from "@storybook/react";

import EditAndConfirmInput from "@stories/EditAndConfirmInput/EditAndConfirmInput";

export default {
  title: "Core/Inputs/EditAndConfirmInput",
  text: EditAndConfirmInput.name,
  component: EditAndConfirmInput,
  argTypes: {
    value: {
      defaultValue: "",
    },
    size: {
      defaultValue: "xlg",
    },
    editDisabled: {
      defaultValue: false,
    },
    confirmDisabled: {
      defaultValue: false,
    },
    onChange: {
      control: false,
      action: "onChange",
    },
    onEditClick: {
      control: false,
      action: "onEditClick",
    },
    onConfirmClick: {
      control: false,
      action: "onConfirmClick",
    },
    error: {
      defaultValue: undefined,
    },
    label: {
      defaultValue: "Edit and Confirm Your Email",
    },
    inputType: {
      defaultValue: "email",
    },
  },
} as ComponentMeta<typeof EditAndConfirmInput>;

const DefaultTemplate: ComponentStory<typeof EditAndConfirmInput> = (args) => (
  <EditAndConfirmInput {...args} />
);
export const Default = DefaultTemplate.bind({});
