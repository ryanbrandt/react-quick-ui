import type { Decorator, Preview } from "@storybook/react-vite";

import "@styles/fonts.scss";
import "@styles/index.scss";
import "./preview.scss";

import { A11Y_TAGS } from "./a11yTags";

// The toolbar's theme sets data-theme on the preview's <html>; the --rq-*
// tokens follow it. Set while rendering, so the first paint is themed.
const withTheme: Decorator = (Story, { globals }) => {
  document.documentElement.dataset.theme =
    globals.theme === "dark" ? "dark" : "light";
  return Story();
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Colour theme (sets data-theme on the preview root)",
      toolbar: {
        title: "Theme",
        icon: "contrast",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [withTheme],
  parameters: {
    layout: "centered",
    a11y: {
      // Report violations as errors, not just in the panel.
      test: "error",
      options: { runOnly: { type: "tag", values: A11Y_TAGS } },
    },
  },
  tags: ["autodocs"],
};

export default preview;
