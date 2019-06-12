module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                // only import the polyfills we need
                useBuiltIns: 'usage',
                corejs: '3.0.0',
                // https://github.com/browserslist/browserslist#best-practices
                targets: {
                    browsers: ['defaults', '>0.5%', 'IE 10']
                }
            }
        ],
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        'universal-import',
        '@loadable/babel-plugin',
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-styled-components',
        'babel-plugin-lodash',
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                root: ['./'],
                alias: {
                    '@dev-tools': './src/dev-tools',
                    '@react-app': './src/react',
                    '@webpack': './webpack'
                }
            }
        ]
    ],
    // set retainLines and sourceMaps to true for proper debugging
    // otherwise you will get debugger errors for chrome
    retainLines: true,
    sourceMaps: true,
    env: {
        development: {
            plugins: ['react-hot-loader/babel']
        },
        test: {},
        production: {}
    }
};
