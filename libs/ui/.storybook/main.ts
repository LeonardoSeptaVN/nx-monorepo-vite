import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],

  addons: [],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  viteFinal: async (config) => {
    // penting agar vite baca tailwind dari library UI
    config.css = {
      postcss: {
        plugins: [
          require('tailwindcss')({
            config: path.join(__dirname, '../tailwind.config.js'),
          }),
          require('autoprefixer'),
        ],
      },
    };
    return config;
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
