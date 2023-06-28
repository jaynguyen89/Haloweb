module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "script",
    },
    extends: ["plugin:@typescript-eslint/recommended"],
    env: { node: true },
    rules: {
        semi: 1,
        "block-scoped-var": 2,
        "comma-dangle": 1,
        "default-case": 1,
        "max-params": 1,
        "no-dupe-args": 2,
        "no-dupe-class-members": 2,
        "no-dupe-keys": 2,
        "no-duplicate-case": 2,
        "no-duplicate-imports": 2,
        "no-extra-semi": 1,
        "no-shadow": 2,
        "no-unreachable": 2,
        "no-trailing-spaces": 1,
        "no-var": 1,
        "prefer-const": 1,
        "require-await": 1,
        "jsx-quotes": 1,
        eqeqeq: 2,
        indent: 1,
        quotes: 1
    }
}