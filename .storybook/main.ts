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

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],

    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    },

    docs: {
        autodocs: true,
    },

    webpackFinal: async (config, { configType }) => {
        const type = configType === 'DEVELOPMENT' ? 'dev' : 'prod';
        const rules = getRules(type);

        config.resolve.alias['@textkernel/oneui'] = path.resolve(__dirname, '../src');
        // remove built in SVG rules
        config.module.rules
            .filter((rule) => rule && rule.test && rule.test.test('.svg'))
            .forEach((rule) => (rule.exclude = /\.svg$/i));

        // Make whatever fine-grained changes you need
        config.module.rules.push(rules.js, rules.ts, rules.scss, rules.svg);
        config.plugins.push(plugins.cssPlugin);

        // Return the altered config
        return config;
    },
};
