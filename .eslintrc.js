module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script',
    },
    extends: ['plugin:@typescript-eslint/recommended'],
    env: { node: true },
    rules: {
        '@typescript-eslint/ban-types': ['error', {
                'types': {
                    'String': true,
                    'Boolean': true,
                    'Number': true,
                    'Symbol': true,
                    '{}': true,
                    'object': false,
                    'Object': true,
                    'Function': false,
                },
                extendDefaults: true,
            },
        ],
        '@typescript-eslint/no-array-constructor': ['off'],
        '@typescript-eslint/no-explicit-any': ['error', {
            fixToUnknown: false,
            ignoreRestArgs: true,
        }],
        '@typescript-eslint/no-inferrable-types': ['error', {
            ignoreParameters: true,
            ignoreProperties: true,
        }],
        '@typescript-eslint/no-unused-vars': ['warn'],
        'block-scoped-var': 'error',
        'comma-dangle': ['error', 'always-multiline'],
        'default-case': 'error',
        'default-param-last': 'error',
        'dot-notation': ['error', { allowPattern: '^[a-z]+(_[a-z]+)+$' }],
        'func-style': ['error', 'expression'],
        'max-depth': ['error', 3],
        'max-len': ['error', {
            code: 150,
            tabWidth: 4,
            ignoreComments: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
        }],
        'max-params': ['error', 5],
        'no-await-in-loop': 'error',
        'no-class-assign': 'error',
        'no-compare-neg-zero': 'error',
        'no-dupe-args': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': ['error', { includeExports: true }],
        'no-extra-semi': 'error',
        'no-floating-decimal': 'error',
        'no-lonely-if': 'error',
        'no-new': 'error',
        'no-new-object': 'error',
        'no-unneeded-ternary': 'error',
        'no-unreachable': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-escape': 'error',
        'no-useless-rename': ['error', {
            ignoreDestructuring: false,
            ignoreImport: false,
            ignoreExport: false,
        }],
        'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
        'no-var': 'error',
        'prefer-const': 'error',
        'quotes': ['error', 'single', {
            avoidEscape: true,
            allowTemplateLiterals: true,
        }],
        'require-await': 'error',
        'jsx-quotes': ['error', 'prefer-single'],
        eqeqeq: ['error', 'always'],
        indent: 'off',
        semi: 'error',
    },
    ignorePatterns: [
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
    ],
};