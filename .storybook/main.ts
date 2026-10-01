import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
    "./docs/*.mdx",
    "../src/stories/**/*.stories.tsx",
    "../src/assets/svgs/**/*.stories.tsx",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: "@storybook/react-vite",
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
