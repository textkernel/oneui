const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getRules } = require('../scripts/build/webpack.config');
const { oneui } = require('../package.json');

const { libraryName: LIBRARY_NAME } = oneui;

module.exports = {
    staticDirs: ['../stories.new/static'],

    stories: [
        '../stories.new/atoms/*.@(js|jsx|ts|tsx)',
        '../stories.new/**/*.@(js|jsx|ts|tsx)',
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
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],

    typescript: {
        reactDocgen: 'react-docgen',
    },

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

        const PROJECT_ROOT_PATH = path.resolve(__dirname, '../');
        const SOURCE_PATH = path.resolve(PROJECT_ROOT_PATH, 'src');
        const NODE_MODULES_PATH = path.resolve(SOURCE_PATH, '../node_modules');

        config.resolve.alias['@textkernel/oneui'] = path.resolve(__dirname, '../src');
        // Make whatever fine-grained changes you need
        config.module.rules.push(rules.js, rules.ts, {
            test: /\.css$/i,
            exclude: [NODE_MODULES_PATH],
            use: [MiniCssExtractPlugin.loader, {
                loader: 'css-loader',
            },],
          },
          rules.scss);
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: `${LIBRARY_NAME}.min.css`,
            })
        );

        // Return the altered config
        return config;
    },

    docs: {
        autodocs: true
    }
};
