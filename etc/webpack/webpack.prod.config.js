const { baseConfig, plugins, getRules } = require('./webpack.config');
const rules = getRules('prod');

module.exports = {
    ...baseConfig,
    mode: 'production',
    plugins: [
        plugins.hashedModuleIdsPlugin,
        plugins.cssPlugin,
        plugins.styleLintPlugin
    ],
    module: {
        rules: [
            rules.js,
            rules.styles,
        ],
    },
}
