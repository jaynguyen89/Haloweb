const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    presets: [
        ['@babel/preset-env',
            {
                targets: { node: 'current' },
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-transform-react-jsx',
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                memoryLimit: 8192,
            },
        }),
    ],
};
