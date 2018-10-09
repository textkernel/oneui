const { baseConfig, plugins, getRules } = require('./webpack.config');

module.exports = () => {
    const rules = getRules('prod');

    return {
        ...baseConfig,
        mode: 'production',
        plugins: [plugins.hashedModuleIdsPlugin, plugins.cssPlugin],
        module: {
            rules: [rules.js, rules.styles]
        }
    };
};
