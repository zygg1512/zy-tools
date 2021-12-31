module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:node/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'no-process-exit': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'node/no-missing-import': [
            'error',
            {
                tryExtensions: ['.ts', '.js', '.jsx', '.tsx', '.d.ts']
            }
        ]
    }
}
