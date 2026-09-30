import { ComponentStory, ComponentMeta } from "@storybook/react";

import Heading from "@stories/Heading/Heading";

export default {
  title: "Core/Heading",
  text: Heading.name,
  component: Heading,
  argTypes: {
    text: {
      defaultValue: "Heading Text",
    },
    variant: {
      defaultValue: "h1",
    },
    className: {
      defaultValue: undefined,
    },
  },
} as ComponentMeta<typeof Heading>;

const DefaultTemplate: ComponentStory<typeof Heading> = (args) => (
  <div style={{ width: "60vw", height: "50vh" }}>
    <Heading {...args} />
  </div>
);
export const Default = DefaultTemplate.bind({});
