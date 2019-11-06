const path = require('path');
const { baseConfig, getRules } = require('../scripts/build/webpack.config');

module.exports = ({ config: storybookBaseConfig }) => {

    // Resolve OneUI package
    storybookBaseConfig.resolve.alias['@textkernel/oneui'] = path.resolve(__dirname, '../src');

    // Add support to SASS
    storybookBaseConfig.module.rules.push(getRules('dev').styles);

    // Merge resolvers setup
    storybookBaseConfig.resolve.modules = [
        ...storybookBaseConfig.resolve.modules,
        ...baseConfig.resolve.modules,
    ];

    // Return the altered config
    return storybookBaseConfig;
};
