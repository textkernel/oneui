module.exports = {
  presets: [
    ["@babel/preset-env", { modules: "commonjs" }], 
    "@babel/preset-react"
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties", { loose: true } ],
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }]
  ],
}
