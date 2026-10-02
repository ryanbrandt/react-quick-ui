import type { Meta, StoryObj } from "@storybook/react-vite";

import Card from "@stories/Card/Card";

const meta = {
  title: "Core/Card",
  component: Card,
  argTypes: {
    media: { control: false },
    footer: { control: false },
  },
  args: {
    title: "Open FEC GraphQL Server",
    children:
      "A GraphQL wrapper around the Open Federal Election Commission API " +
      "that simplifies retrieving deeply nested data.",
    tags: ["GraphQL", "Node.js"],
  },
  render: (args) => (
    <div style={{ width: "360px" }}>
      <Card {...args} />
    </div>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// The spec's project card: the whole card links to the project page, and
// the footer link stays clickable on its own.
export const Project: Story = {
  args: {
    href: "#project",
    media: <span aria-hidden="true">FEC</span>,
    footer: <a href="#github">View on GitHub →</a>,
  },
};

export const Plain: Story = {};

// Linked cards scrolled under a sticky bar (z-index 1), as on a page with a
// sticky top bar; the first card's footer link is under the bar. The card is its own stacking context, so its link cover
// and footer link (z-index 1 and 2) stay beneath the bar.
export const UnderAStickyBar: Story = {
  args: Project.args,
  render: (args) => (
    <div
      data-testid="scroller"
      style={{
        width: "400px",
        height: "480px",
        overflowY: "auto",
        border: "1px solid var(--rq-color-border)",
      }}
    >
      <div
        data-testid="sticky-bar"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          height: "64px",
          padding: "0 16px",
          borderBottom: "1px solid var(--rq-color-border)",
          backgroundColor: "var(--rq-color-surface)",
          color: "var(--rq-color-text)",
        }}
      >
        Sticky bar
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: "16px 20px",
        }}
      >
        <Card {...args} />
        <Card {...args} title="react-quick-ui" footer={undefined} />
      </div>
    </div>
  ),
  // Scroll the footer link up under the bar.
  play: async ({ canvas }) => {
    const scroller = canvas.getByTestId("scroller");
    const footerLink = await canvas.findByRole("link", {
      name: "View on GitHub →",
    });
    scroller.scrollTop +=
      footerLink.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top -
      24;
  },
};
