import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "@stories/Button/Button";

export default {
  title: "Core/Button",
  text: Button.name,
  component: Button,
  argTypes: {
    disabled: {
      defaultValue: false,
    },
    iconLeft: {
      control: false,
    },
    iconRight: {
      control: false,
    },
    onClick: {
      control: false,
      action: "onClick",
    },
  },
} as ComponentMeta<typeof Button>;

const PrimaryTemplate: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);
export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  size: "md",
  text: "Primary",
  variant: "primary",
};

const SuccessTemplate: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);
export const Success = SuccessTemplate.bind({});
Success.args = {
  size: "md",
  text: "Success",
  variant: "success",
};

const DangerTemplate: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);
export const Danger = DangerTemplate.bind({});
Danger.args = {
  size: "md",
  text: "Danger",
  variant: "danger",
};

const NeutralTemplate: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);
export const Neutral = NeutralTemplate.bind({});
Neutral.args = {
  size: "md",
  text: "Neutral",
  variant: "neutral",
};
