const { baseConfig, LIBRARY_NAME, plugins, getRules } = require('./webpack.config');

const rules = getRules('prod');

module.exports = {
    ...baseConfig,
    mode: 'production',
    output: {
        ...baseConfig.output,
        filename: `${LIBRARY_NAME}.min.js`,
    },
    plugins: [
        plugins.hashedModuleIdsPlugin,
        plugins.cssPlugin,
        plugins.styleLintPlugin,
        plugins.optimizeCssAssetsPlugin,
        plugins.bundleAnalyzerPlugin,
        plugins.cleanWebpackPlugin,
        plugins.copyWebpackPlugin,
    ],
    module: {
        rules: [rules.js, rules.ts, rules.externalCss, rules.scss, rules.files],
    },
    optimization: {
        usedExports: true,
    },
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'ReactDOM',
            root: 'ReactDOM',
        },
    },
};
