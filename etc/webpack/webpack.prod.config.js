const TerserPlugin = require('terser-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const { baseConfig, plugins, getRules } = require('./webpack.config');

const rules = getRules('prod');

module.exports = {
    ...baseConfig,
    mode: 'production',
    plugins: [
        plugins.hashedModuleIdsPlugin,
        plugins.cssPlugin,
        plugins.styleLintPlugin,
        plugins.optimizeCssAssetsPlugin
    ],
    module: {
        rules: [rules.js, rules.styles]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: false
                }
            })
        ]
    }
};
