/** @type { import('storybook-framework-astro').StorybookConfig } */
const config = {
  stories: ["../packages/wiki/src/components/ui/**/*.stories.@(js|jsx|ts|tsx|astro)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "storybook-framework-astro",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../packages/wiki/public"],
};

export default config;
