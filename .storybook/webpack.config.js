const path = require('path');
const { getRules, PACKAGES_PATH } = require('../scripts/build/webpack.config');

module.exports = ({ config: storybookBaseConfig }) => {

    // Resolve OneUI package
    storybookBaseConfig.resolve.alias['@textkernel/oneui'] = path.resolve(__dirname, '../src');

    // Add support to SASS
    storybookBaseConfig.module.rules.push(getRules('dev').styles);

    // Resolve BEM as Module
    storybookBaseConfig.resolve.modules.push(PACKAGES_PATH);

    // Return the altered config
    return storybookBaseConfig;
};
