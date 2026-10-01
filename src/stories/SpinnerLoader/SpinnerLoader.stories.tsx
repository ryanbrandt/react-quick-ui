import type { StoryFn, Meta } from "@storybook/react-webpack5";

import SpinnerLoader from "@stories/SpinnerLoader/SpinnerLoader";

export default {
  title: "Core/Loaders/SpinnerLoader",
  text: SpinnerLoader.name,
  component: SpinnerLoader,
} as Meta<typeof SpinnerLoader>;

export const Default = {};
