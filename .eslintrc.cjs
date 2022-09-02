"use strict";

module.exports = {
    env: {
        "browser": true,
        "es6": true,
        "jest": true,
        "node": true
    },
    extends: [
        'eslint:all',
        'prettier'
    ],
    globals: {
        'context': true,
        'cy': true,
    },
    ignorePatterns: ['build', 'node_modules', '*.config.js'],
    overrides: [
        {
          env: { 'jest/globals': true },
          extends: ['plugin:jest/recommended'],
          files: ['**/*.test.js'],
          plugins: ['jest'],
        },
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'jest'],
    root: true,
    rules: {
        'no-console': 'error',
        'require-unicode-regexp': 'off',
    }
};