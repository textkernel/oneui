const path = require('path');
const { getRules } = require('../scripts/build/webpack.config');
const devConfig = require('../scripts/build/webpack.dev.config');

const rules = getRules('dev');

module.exports = ({ config: storybookBaseConfig }) => {
    // Resolve OneUI package
    storybookBaseConfig.resolve.alias['@textkernel/oneui'] = path.resolve(__dirname, '../src');

    // Merge loader rules config
    storybookBaseConfig.module.rules = [
        ...storybookBaseConfig.module.rules,
        rules.js,
        rules.tsCommonJS, // Storybook supports only commonJS module
        rules.styles,
        rules.files,
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
