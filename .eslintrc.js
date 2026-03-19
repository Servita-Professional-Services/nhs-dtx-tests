module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'playwright'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:playwright/recommended',
    ],
    env: {
        node: true,
    },
    ignorePatterns: [
        'node_modules/',
        'allure-report/',
        'playwright-report/',
        'test-results/',
        'coverage/',
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
        '@typescript-eslint/consistent-type-imports': 'warn',
        'no-console': 'off',
    },
    overrides: [
        {
            files: ['src/tests/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
    ],
};