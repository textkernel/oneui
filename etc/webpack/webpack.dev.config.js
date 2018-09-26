const { baseConfig, plugins, rules } = require('./webpack.config')

module.exports = {
    ...baseConfig,
    mode: 'development',
    plugins: [
        plugins.namedModulesPlugin,
        plugins.cssPlugin,
    ],
    module: {
        rules: [
            rules.js,
            rules.styles,
        ],
    },
}
