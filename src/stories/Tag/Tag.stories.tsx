import type { Meta, StoryObj } from "@storybook/react-vite";

import Tag from "@stories/Tag/Tag";

const meta = {
  title: "Core/Tag",
  component: Tag,
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { text: "React" },
};

// The eyebrow above the hero heading.
export const Large: Story = {
  args: { text: "Senior Software Engineer at Biomeme", size: "lg" },
};

export const Variants: Story = {
  args: { text: "Primary" },
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Tag text="Primary" />
      <Tag text="Success" variant="success" />
      <Tag text="Danger" variant="danger" />
      <Tag text="Warning" variant="warning" />
      <Tag text="Neutral" variant="neutral" />
    </div>
  ),
};
