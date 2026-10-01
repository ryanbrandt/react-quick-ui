import type { StoryFn, Meta } from "@storybook/react-webpack5";

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
} as Meta<typeof Button>;

export const Primary = {
  args: {
    size: "md",
    text: "Primary",
    variant: "primary",
  },
};

export const Success = {
  args: {
    size: "md",
    text: "Success",
    variant: "success",
  },
};

export const Danger = {
  args: {
    size: "md",
    text: "Danger",
    variant: "danger",
  },
};

export const Neutral = {
  args: {
    size: "md",
    text: "Neutral",
    variant: "neutral",
  },
};
