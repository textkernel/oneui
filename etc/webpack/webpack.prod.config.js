const { baseConfig, plugins } =  require('./webpack.config')

module.exports = {
    ...baseConfig,
    mode: 'production',
    plugins: [
        plugins.hashedModuleIdsPlugin,
    ],
    module: {
        rules: [
            rules.js,
            rules.styles,
        ],
    },
}
