import type { StorybookConfig } from "@storybook/nextjs";

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
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    const aliases = (config.resolve?.alias ?? {}) as Record<string, string | boolean>;
    // Next.js 16's internal webpack cannot be compiled by the storybook webpack build.
    // Excluding it prevents the "Cannot read properties of undefined (reading 'tap')" error.
    aliases["next/dist/compiled/webpack"] = false;
    aliases["next/dist/compiled/webpack/bundle5"] = false;
    config.resolve = { ...config.resolve, alias: aliases };
    return config;
  },
};

export default config;
