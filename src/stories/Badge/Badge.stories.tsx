import { ComponentStory, ComponentMeta } from "@storybook/react";

import Badge from "@stories/Badge/Badge";

export default {
  title: "Core/Badge",
  text: Badge.name,
  component: Badge,
} as ComponentMeta<typeof Badge>;

const PrimaryTemplate: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args} />
);
export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  text: "Primary",
  size: "md",
  variant: "primary",
};

const WarningTemplate: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args} />
);
export const Warning = WarningTemplate.bind({});
Warning.args = {
  text: "Warning",
  size: "md",
  variant: "warning",
};

const DangerTemplate: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args} />
);
export const Danger = DangerTemplate.bind({});
Danger.args = {
  text: "Danger",
  size: "md",
  variant: "danger",
};

const SuccessTemplate: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args} />
);
export const Success = SuccessTemplate.bind({});
Success.args = {
  text: "Success",
  size: "md",
  variant: "success",
};

const NeutralTemplate: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args} />
);
export const Neutral = NeutralTemplate.bind({});
Neutral.args = {
  text: "Neutral",
  size: "md",
  variant: "neutral",
};
