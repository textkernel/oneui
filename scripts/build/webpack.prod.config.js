const TerserPlugin = require('terser-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
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
    ],
    module: {
        rules: [rules.js, rules.ts, rules.styles, rules.files],
    },
    optimization: {
        usedExports: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: false,
                },
            }),
        ],
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
