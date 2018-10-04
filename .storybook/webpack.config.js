const { rules, plugins, baseConfig, PACKAGES_PATH } = require('../etc/webpack/webpack.config');

module.exports = (storybookBaseConfig, configType) => {

    // Add support to SASS
    storybookBaseConfig.module.rules.push(rules.styles);

    // Add MiniCssExtractPlugin
    storybookBaseConfig.plugins.push(plugins.cssPlugin);

    // Resolve BEM as Module
    storybookBaseConfig.resolve.modules.push(PACKAGES_PATH);

    // Return the altered config
    return storybookBaseConfig;
};
