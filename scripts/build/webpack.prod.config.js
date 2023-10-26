const { baseConfig, LIBRARY_NAME, plugins, getRules } = require('./webpack.config');

const rules = getRules('prod');

module.exports = {
    ...baseConfig,
    mode: 'production',
    output: {
        ...baseConfig.output,
        filename: `${LIBRARY_NAME}.min.js`,
    },
    optimization: {
        ...baseConfig.optimization,
        usedExports: true,
    },
    plugins: [
        plugins.cssPlugin,
        plugins.styleLintPlugin,
        plugins.bundleAnalyzerPlugin,
        plugins.cleanWebpackPlugin,
    ],
    module: {
        rules: [rules.js, rules.ts, rules.externalCss, rules.scss, rules.files],
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
