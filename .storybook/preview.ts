import type { Preview } from "@storybook/react-vite";

import "@styles/index.scss";

const preview: Preview = {
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default preview;
