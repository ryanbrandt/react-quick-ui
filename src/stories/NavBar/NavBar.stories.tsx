import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, waitFor } from "storybook/test";

import NavBar from "@stories/NavBar/NavBar";
import ThemeToggle, {
  type ThemePreference,
} from "@stories/ThemeToggle/ThemeToggle";
import { FillerPage } from "@stories/storyHelpers";

// The D0 header's content. The monogram uses the accent fill (not the
// lighter brand colour) so its white text stays AA.
const Brand = () => (
  <a
    href="#home"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "var(--rq-space-3)",
      color: "inherit",
      textDecoration: "none",
      fontWeight: "var(--rq-font-weight-semibold)",
      fontSize: "var(--rq-font-size-xl)",
    }}
  >
    <span
      aria-hidden="true"
      style={{
        display: "grid",
        placeItems: "center",
        width: 36,
        height: 36,
        borderRadius: 10,
        background: "var(--rq-color-accent-fill)",
        color: "var(--rq-color-on-accent)",
        fontSize: "var(--rq-font-size-sm)",
        fontWeight: "var(--rq-font-weight-bold)",
      }}
    >
      RB
    </span>
    Ryan Brandt
  </a>
);

const Links = () => (
  <>
    <a href="#home" aria-current="page">
      Home
    </a>
    <a href="#resume">Résumé</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
  </>
);

// A story-local stand-in for the app's theme state.
const Theme = () => {
  const [theme, setTheme] = useState<ThemePreference>("system");
  return <ThemeToggle value={theme} onChange={setTheme} />;
};

const meta = {
  title: "Core/Menus/NavBar",
  component: NavBar,
  args: { brand: <Brand />, children: <Links />, actions: <Theme /> },
  parameters: { layout: "fullscreen" },
  render: (args) => (
    <>
      <NavBar {...args} />
      <FillerPage />
    </>
  ),
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// The bar adapts to its own width, so a 390px column shows the phone
// layout at any viewport.
const narrow: Story = {
  render: (args) => (
    <div style={{ width: 390 }}>
      <NavBar {...args} />
      <p style={{ padding: "0 var(--rq-space-5)" }}>
        Page content scrolls under the bar. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. In nec ipsum at nunc tempus bibendum. Etiam
        feugiat arcu eget eros vulputate, ac euismod mi dignissim.
      </p>
    </div>
  ),
};

export const Narrow: Story = { ...narrow };

// Opens the menu: the button reports it expanded and focus moves to the
// first link. (Esc needs a trusted key press: see
// e2e/interactions.spec.ts.)
export const NarrowMenuOpen: Story = {
  ...narrow,
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Menu" });
    await expect(button).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(button);

    await expect(button).toHaveAttribute("aria-expanded", "true");
    await waitFor(() =>
      expect(canvas.getByRole("link", { name: "Home" })).toHaveFocus()
    );
  },
};
