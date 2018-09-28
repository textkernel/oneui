const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { baseConfig, PROJECT_ROOT_PATH, SOURCE_PATH, plugins, rules } = require('./webpack.config')
const { getRuleJS } = require('./utils')

const THEME_DEMO_PORT = 8003
const THEME_DEMO_SOURCE_PATH = path.resolve(PROJECT_ROOT_PATH, 'theme-demo')
const THEME_DEMO_DIST_PATH = path.resolve(PROJECT_ROOT_PATH, 'dist-theme-demo')

const htmlPlugin = new HtmlWebpackPlugin({
    title: 'Nice2 theme demo',
    filename: 'index.html',
    template: 'index.html',
    inject: false,
});

module.exports = {
    ...baseConfig,
    context: THEME_DEMO_SOURCE_PATH,
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        'theme-demo': [ '@babel/polyfill', './theme-demo.js' ],
        'css-vars-polyfill': './css-vars-polyfill.js',
        'product': './product.scss',
        'default': './themes/default.scss',
        'custom': './themes/custom.scss',
    },
    output: {
        filename: '[name].js',
        path: THEME_DEMO_DIST_PATH,
    },
    plugins: [
        plugins.namedModulesPlugin,
        plugins.cssPlugin,
        htmlPlugin,
    ],
    module: {
        rules: [
            getRuleJS(SOURCE_PATH, THEME_DEMO_SOURCE_PATH),
            rules.styles,
        ],
    },
    devServer: {
        contentBase: THEME_DEMO_DIST_PATH,
        port: THEME_DEMO_PORT,
        host: '0.0.0.0',
    },
    watch: true,
}
