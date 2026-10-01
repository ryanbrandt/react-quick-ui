import type { StoryFn, Meta } from "@storybook/react";

import Badge from "@stories/Badge/Badge";

export default {
  title: "Core/Badge",
  text: Badge.name,
  component: Badge,
} as Meta<typeof Badge>;

export const Primary = {
  args: {
    text: "Primary",
    size: "md",
    variant: "primary",
  },
};

export const Warning = {
  args: {
    text: "Warning",
    size: "md",
    variant: "warning",
  },
};

export const Danger = {
  args: {
    text: "Danger",
    size: "md",
    variant: "danger",
  },
};

export const Success = {
  args: {
    text: "Success",
    size: "md",
    variant: "success",
  },
};

export const Neutral = {
  args: {
    text: "Neutral",
    size: "md",
    variant: "neutral",
  },
};
