module.exports = {
    root: true,
    env: {
        browser: false,
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaVersion: 13,
    },
    plugins: ['@typescript-eslint'],
    ignorePatterns: ['.eslintrc.js', 'dist/', 'node_modules/', 'src/generated/', 'src/migrations/', 'src/drizzle/'],
    overrides: [
        {
            files: ['src/**/*.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 13,
                project: ['./tsconfig.json'],
            },
            rules: {
                '@typescript-eslint/no-floating-promises': ['error'],
                '@typescript-eslint/no-misused-promises': ['error'],
                // disable unused vars for now
                '@typescript-eslint/no-unused-vars': ['off'],
                // disable ban types for now
                '@typescript-eslint/ban-types': ['off'],
            },
        },
    ],
};
