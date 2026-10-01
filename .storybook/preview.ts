/// <reference types="vite/client" />
import type { Preview } from "@storybook/react-vite";

import "@styles/index.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default preview;
