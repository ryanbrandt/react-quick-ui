import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
    "../src/stories/**/*.stories.tsx",
    "../src/assets/svgs/**/*.stories.tsx",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],
  framework: "@storybook/react-vite",
  staticDirs: ["../src/assets"],
  // The default (react-docgen) can't expand types such as Modal's
  // PropsWithChildren<BaseProps>, and lists unions as "union" instead of
  // their options, so the prop tables and select controls would regress.
  typescript: { reactDocgen: "react-docgen-typescript" },
  // Resolve the tsconfig "paths" aliases (@stories, @styles, ...) with Vite's
  // built-in support. SCSS goes through Vite's built-in Sass support.
  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, { resolve: { tsconfigPaths: true } }),
};

export default config;
