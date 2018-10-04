const { baseConfig, plugins, rules } = require('./webpack.config')

module.exports = {
    ...baseConfig,
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        plugins.namedModulesPlugin,
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
