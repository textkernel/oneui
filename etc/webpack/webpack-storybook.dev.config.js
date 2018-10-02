/* eslint import/no-extraneous-dependencies: [error, { devDependencies: true }] */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { baseConfig, PROJECT_ROOT_PATH, SOURCE_PATH, plugins, rules } = require('./webpack.config');
const { getRuleJS } = require('./utils');

const STORYBOOK_PORT = 8002;
const STORYBOOK_SOURCE_PATH = path.resolve(PROJECT_ROOT_PATH, 'storybook');
const STORYBOOK_DIST_PATH = path.resolve(PROJECT_ROOT_PATH, 'dist-storybook');

const htmlPlugin = new HtmlWebpackPlugin({
    title: 'Nice2 storybook',
    filename: 'index.html',
    template: 'index.html',
    inject: false
});

module.exports = {
    ...baseConfig,
    context: STORYBOOK_SOURCE_PATH,
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        storybook: './storybook.js'
    },
    output: {
        filename: '[name].js',
        path: STORYBOOK_DIST_PATH
    },
    plugins: [plugins.namedModulesPlugin, plugins.cssPlugin, htmlPlugin],
    module: {
        rules: [getRuleJS(SOURCE_PATH, STORYBOOK_SOURCE_PATH), rules.styles]
    },
    devServer: {
        contentBase: STORYBOOK_DIST_PATH,
        port: STORYBOOK_PORT,
        host: '0.0.0.0'
    },
    watch: true
};
