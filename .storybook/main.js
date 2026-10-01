const path = require("path");

module.exports = {
  stories: [
    "../src/stories/**/*.stories.tsx",
    "../src/assets/svgs/**/*.stories.tsx",
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },

  staticDirs: ["../src/assets"],

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      "@stories": [path.resolve("./src/stories")],
      "@hooks": [path.resolve("./src/hooks")],
      "@utilities": [path.resolve("./src/utilities")],
      "@styles": [path.resolve("./src/styles")],
      "@svgs": [path.resolve("./src/assets/svgs")],
    };

    return config;
  },

  docs: {
    autodocs: true
  }
};
