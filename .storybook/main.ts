const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getRules, plugins } = require('../scripts/build/webpack.config');
const { oneui } = require('../package.json');

module.exports = {
    staticDirs: ['../stories/static'],

    stories: [
        '../stories/theme/*.@(js|jsx|ts|tsx)',
        '../stories/atoms/*.stories.@(js|jsx|ts|tsx)',
        '../stories/molecules/*.stories.@(js|jsx|ts|tsx)',
        '../stories/organisms/*.stories.@(js|jsx|ts|tsx)',
        '../stories/packages/*.stories.@(js|jsx|ts|tsx)',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)',
        '../stories/*.@(mdx)',
    ],

    // staticDirs: ['../stories/static'],

    // stories: [
    //     '../stories/theme/*.@(js|jsx|ts|tsx)',
    //     '../stories/atoms/*.@(js|jsx|ts|tsx)',
    //     '../stories/molecules/*.@(js|jsx|ts|tsx)',
    //     '../stories/organisms/*.@(js|jsx|ts|tsx)',
    //     '../stories/packages/*.@(js|jsx|ts|tsx)',
    //     '../stories/**/*.@(js|jsx|ts|tsx)',
    // ],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],

    // typescript: {
    //     reactDocgen: 'react-docgen',
    // },

    // features: {
    //     storyStoreV7: false, // 👈 Opt out of on-demand story loading
    // },

    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    },

    webpackFinal: async (config, { configType }) => {
        const type = configType === 'DEVELOPMENT' ? 'dev' : 'prod';
        const rules = getRules(type);

        config.resolve.alias['@textkernel/oneui'] = path.resolve(__dirname, '../src');
        // Make whatever fine-grained changes you need
        config.module.rules.push(rules.js, rules.ts, rules.scss);
        config.plugins.push(plugins.cssPlugin);

        // Return the altered config
        return config;
    },

    docs: {
        autodocs: true
    }
};
