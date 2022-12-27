const { baseConfig, plugins, getRules } = require('./webpack.config');

const rules = getRules('dev');

module.exports = {
    ...baseConfig,
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        plugins.namedModulesPlugin,
        plugins.cssPlugin,
        plugins.styleLintPlugin,
        plugins.bundleAnalyzerPlugin,
        plugins.cleanWebpackPlugin,
        plugins.copyWebpackPlugin,
    ],
    module: {
        rules: [rules.js, rules.ts, rules.externalCss, rules.scss, rules.files],
    },
};
