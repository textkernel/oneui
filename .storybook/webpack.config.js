const path = require('path');
const devConfig = require('../scripts/build/webpack.dev.config');

module.exports = ({ config: storybookBaseConfig }) => {
    // Resolve OneUI package
    storybookBaseConfig.resolve.alias['@textkernel/oneui'] = path.resolve(__dirname, '../src');

    // Merge loader rules config
    storybookBaseConfig.module.rules = [
        ...storybookBaseConfig.module.rules,
        ...devConfig.module.rules,
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
