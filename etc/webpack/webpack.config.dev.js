const { baseConfig, plugins } = require('./webpack.config')

module.exports = {
  ...baseConfig,
  mode: 'development',
  plugins: [
    plugins.namedModulesPlugin,
  ],
}