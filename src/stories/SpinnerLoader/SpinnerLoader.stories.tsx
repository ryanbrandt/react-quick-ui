import { ComponentStory, ComponentMeta } from "@storybook/react";

import SpinnerLoader from "@stories/SpinnerLoader/SpinnerLoader";

export default {
  title: "Core/Loaders/SpinnerLoader",
  text: SpinnerLoader.name,
  component: SpinnerLoader,
} as ComponentMeta<typeof SpinnerLoader>;

const DefaultTemplate: ComponentStory<typeof SpinnerLoader> = (args) => (
  <SpinnerLoader {...args} />
);
export const Default = DefaultTemplate.bind({});
