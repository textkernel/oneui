const path = require('path');
const webpack = require('webpack');
const postcssPreCss = require('precss');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getRuleJS } = require('./utils');

const PROJECT_ROOT_PATH = path.resolve(__dirname, '../../');
const SOURCE_PATH = path.resolve(PROJECT_ROOT_PATH, 'src');
const DIST_PATH = path.resolve(PROJECT_ROOT_PATH, 'dist');
const PACKAGES_PATH = path.resolve(SOURCE_PATH, 'packages');
const NODE_MODULES_PATH = path.resolve(SOURCE_PATH, '../node_modules');

const plugins = {
    namedModulesPlugin: new webpack.NamedModulesPlugin(),
    hashedModuleIdsPlugin: new webpack.HashedModuleIdsPlugin({
        hashDigestLength: 6
    }),
    cssPlugin: new MiniCssExtractPlugin({
        filename: '[name].css'
    })
};

const getRules = (env = 'prod') => ({
    js: getRuleJS(env === 'prod', SOURCE_PATH),
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
                    context: DIST_PATH // https://github.com/webpack-contrib/css-loader/issues/464
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [postcssPreCss()]
                }
            }
        ]
    }
});

const baseConfig = {
    context: SOURCE_PATH,

    entry: {
        main: './index.js'
    },

    output: {
        filename: '[name].js',
        path: DIST_PATH
    },

    resolve: {
        modules: [PACKAGES_PATH, NODE_MODULES_PATH],
        extensions: ['.js']
    }
};

module.exports = {
    baseConfig,
    plugins,
    getRules,
    PROJECT_ROOT_PATH,
    SOURCE_PATH,
    DIST_PATH,
    PACKAGES_PATH,
    NODE_MODULES_PATH
};
