const { baseConfig, plugins, getRules } = require('./webpack.config');

module.exports = () => {
    const rules = getRules('dev');

    return {
        ...baseConfig,
        mode: 'development',
        devtool: 'eval-source-map',
        plugins: [plugins.namedModulesPlugin, plugins.cssPlugin],
        module: {
            rules: [rules.js, rules.styles]
        }
    };
};
