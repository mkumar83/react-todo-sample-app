// eslint-disable-next-line no-undef
module.exports = {
    env: {
        "browser": true,
        "es6": true,
        "jest": true,
    },
    extends: [
        'eslint:all',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'jest'],
    root: true,
    ignorePatterns: ['build', 'node_modules', '*.config.js'],
    overrides: [
        {
          files: ['**/*.test.js'],
          env: { 'jest/globals': true },
          plugins: ['jest'],
          extends: ['plugin:jest/recommended'],
        },
    ],
    rules: {
        'no-console': 'error',
        'require-unicode-regexp': 'off',
    }
};