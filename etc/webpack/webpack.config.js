const path = require('path')
const webpack = require('webpack')

const SRC_PATH = path.resolve(__dirname, '../../src')
const DIST_PATH = path.resolve(__dirname, '../../dist')

const plugins = {
  namedModulesPlugin: new webpack.NamedModulesPlugin(),
  hashedModuleIdsPlugin: new webpack.HashedModuleIdsPlugin({
    hashDigestLength: 6,
  }),
}

const baseConfig = {
  
  context: SRC_PATH,
  
  entry: './index.js',
  
  output: {
    filename: 'index.js',
    path: DIST_PATH,
  },

  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ]
  }
}

module.exports = {
  plugins,
  baseConfig,
}