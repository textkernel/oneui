const { baseConfig, DIST_PATH, plugins, rules } = require('./webpack.config')

module.exports = {
    ...baseConfig,
    mode: 'development',
    plugins: [
        plugins.namedModulesPlugin,
        plugins.htmlPlugin,
        plugins.cssPlugin,
    ],
    module: {
        rules: [
            rules.js,
            rules.styles,
        ],
    },
}
