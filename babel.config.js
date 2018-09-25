module.exports = {
  presets: [
    "@babel/preset-env", 
    "@babel/preset-react"
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties", { loose: true } ],
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }]
  ],
}
