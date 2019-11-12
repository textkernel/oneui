const path = require('path');
const devConfig = require('../scripts/build/webpack.dev.config');
const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin");

module.exports = ({ config: storybookBaseConfig }) => {
    const tsDocgenPlugin = new TSDocgenPlugin();

    // Resolve OneUI package
    storybookBaseConfig.resolve.alias['@textkernel/oneui'] = path.resolve(__dirname, '../src');

    // Merge loader rules config
    storybookBaseConfig.module.rules = [
        ...storybookBaseConfig.module.rules,
        ...devConfig.module.rules,
    ];

    // Merge plugins
    storybookBaseConfig.plugins = [
        tsDocgenPlugin,
        ...storybookBaseConfig.plugins,
    ];

    // Merge resolvers config
    storybookBaseConfig.resolve.modules = [
        ...storybookBaseConfig.resolve.modules,
        ...devConfig.resolve.modules,
    ];

    // Merge resolver extensions config
    storybookBaseConfig.resolve.extensions = [
        ...storybookBaseConfig.resolve.extensions,
        ...devConfig.resolve.extensions
    ];

    // Return the altered config
    return storybookBaseConfig;
};
