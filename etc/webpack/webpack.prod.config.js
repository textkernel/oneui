const { baseConfig, plugins } = require('./webpack.config')

module.exports = {
    ...baseConfig,
    mode: 'production',
    plugins: [
        plugins.hashedModuleIdsPlugin,
        plugins.cssPlugin,
    ],
    module: {
        rules: [
            rules.js,
            rules.styles,
        ],
    },
}
