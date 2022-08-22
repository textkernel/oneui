const path = require('path');
const { getRules } = require('../scripts/build/webpack.config');

module.exports = {
    stories: [
        '../stories/theme/*.@(js|jsx|ts|tsx)',
        '../stories/atoms/*.@(js|jsx|ts|tsx)',
        '../stories/molecules/*.@(js|jsx|ts|tsx)',
        '../stories/organisms/*.@(js|jsx|ts|tsx)',
        '../stories/packages/*.@(js|jsx|ts|tsx)',
        '../stories/**/*.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react',
    webpackFinal: async (config, { configType }) => {
        const type = configType === 'DEVELOPMENT' ? 'dev' : 'prod';
        const rules = getRules(type);

        config.resolve.alias['@textkernel/oneui'] = path.resolve(__dirname, '../src');
        // Make whatever fine-grained changes you need
        config.module.rules.push(rules.js, rules.scss);

        // Return the altered config
        return config;
    },
};
