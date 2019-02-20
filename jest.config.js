module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: ['node_modules', 'src/packages'],

    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy'
    },

    // The path to a module that runs some code to configure or set up the testing framework before each test
    setupTestFrameworkScriptFile: '<rootDir>etc/test/enzyme.setup.js',

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/__tests__/**/*.spec.js'],

    coveragePathIgnorePatterns: ['/node_modules/', 'dummy-components']
};
