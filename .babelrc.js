module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                // only import the polyfills we need
                useBuiltIns: 'usage',
                // https://github.com/browserslist/browserslist#best-practices
                targets: { browsers: ['defaults', '>0.5%', 'IE 10'] }
            }
        ],
        ['@babel/stage-0', { decoratorsLegacy: true }],
        '@babel/preset-react'
    ],
    // set retainLines and sourceMaps to true for proper debugging
    // otherwise you will get debugger errors for chrome
    retainLines: true,
    sourceMaps: true,
    env: {
        development: {
            plugins: ['react-hot-loader/babel', 'dynamic-import-node']
        },
        test: {
            plugins: [['istanbul']]
        },
        production: {
            plugins: ['dynamic-import-node']
        }
    }
};
