import type { StorybookConfig } from "storybook/types";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react",
    options: {},
  },
  core: {
    builder: "@storybook/builder-webpack5",
  },
  staticDirs: ["../public"],
  docs: {
    autodocs: "tag",
  },
};

export default config;
