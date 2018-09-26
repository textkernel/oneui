const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPreCss = require('precss')

const SOURCE_PATH = path.resolve(__dirname, '../../src')

const DIST_PATH = path.resolve(__dirname, '../../dist')

const plugins = {
    namedModulesPlugin: new webpack.NamedModulesPlugin(),
    hashedModuleIdsPlugin: new webpack.HashedModuleIdsPlugin({
        hashDigestLength: 6,
    }),
    htmlPlugin: new HtmlWebpackPlugin({
        title: 'Nice2 storybook',
        filename: 'index.html',
        template: 'storybook/index.html',
        inject: false,
    }),
    cssPlugin: new MiniCssExtractPlugin({
        filename: '[name].css',
    }),
}

const rules = {
    js: {
        test: /\.js$/,
        include: [ SOURCE_PATH ],
        use: [
            {
                loader: 'babel-loader',
            }
        ],
    },
    styles: {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[local]--[hash:base64:10]',
                    context: DIST_PATH, // https://github.com/webpack-contrib/css-loader/issues/464
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        postcssPreCss(),
                        // postcssAtImport({
                        //     path: `${SOURCE_PATH}`,
                        // }),
                        // postcssCustomProperties(),
                    ],
                },
            },
        ],
    },
}

const baseConfig = {

    context: SOURCE_PATH,

    entry: {
        main: './index.js',
        storybook: './storybook/storybook.js',
    },

    output: {
        filename: '[name].js',
        path: DIST_PATH,
    },

    resolve: {
        modules: [
            path.resolve(SOURCE_PATH, 'modules'),
            path.resolve(SOURCE_PATH, '../node_modules'),
        ],
        extensions: ['.js'],
    },

}

module.exports = {
    baseConfig,
    plugins,
    rules,
    DIST_PATH,
    SOURCE_PATH,
}
