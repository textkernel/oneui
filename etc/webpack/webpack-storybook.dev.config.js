const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { baseConfig, PROJECT_ROOT_PATH, SOURCE_PATH, plugins, rules } = require('./webpack.config')

const STORYBOOK_PORT = 8002
const STORYBOOK_SOURCE_PATH = path.resolve(PROJECT_ROOT_PATH, 'storybook')
const STORYBOOK_DIST_PATH = path.resolve(PROJECT_ROOT_PATH, 'dist-storybook')

const htmlPlugin = new HtmlWebpackPlugin({
    title: 'Nice2 storybook',
    filename: 'index.html',
    template: 'index.html',
    inject: false,
});

module.exports = {
    ...baseConfig,
    context: STORYBOOK_SOURCE_PATH,
    mode: 'development',
    entry: {
        storybook: './storybook.js',
    },
    output: {
        filename: '[name].js',
        path: STORYBOOK_DIST_PATH,
    },
    plugins: [
        plugins.namedModulesPlugin,
        plugins.cssPlugin,
        htmlPlugin,
    ],
    module: {
        rules: [
            {
                ...rules.js,
                include: [
                    SOURCE_PATH,
                    STORYBOOK_SOURCE_PATH
                ],
            },
            rules.styles,
        ],
    },
    devServer: {
        contentBase: STORYBOOK_DIST_PATH,
        port: STORYBOOK_PORT,
        open: true,
    },
}
