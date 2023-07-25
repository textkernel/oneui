module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // Sets the path that later can be referenced as a <rootDir> token
    rootDir: '../../',

    // A list of paths to directories that Jest should use to search for files in
    roots: ['<rootDir>/src'],

    // The glob patterns Jest uses to detect test files
    testMatch: [
        '**/__tests__/**/*.spec.js',
        '**/__tests__/**/*.spec.ts',
        '**/__tests__/**/*.spec.tsx',
    ],

    // A map from regular expressions to paths to transformers.
    // A transformer is a module that provides a synchronous function for transforming source files.
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.scss$': 'jest-css-modules-transform',
    },

    // An array of glob patterns indicating a set of files for which coverage information should be
    // collected. If a file matches the specified glob pattern, coverage information will be
    // collected for it even if no tests exist for this file and it's never required in the test
    // suite.
    collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}'],

    // A map from regular expressions to module names that allow to stub out resources with a single module
    moduleNameMapper: {
        '.+\\.(svg|png|jpe?g|gif)$': '<rootDir>/src/__mocks__/testFileMock.js',
        '.+\\.css\\?external$': 'jest-css-modules-transform',
    },

    preset: 'ts-jest/presets/js-with-ts',

    testEnvironment: 'jsdom',
};
