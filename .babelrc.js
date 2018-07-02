module.exports = {
    presets: [
        ['@babel/preset-env'],
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
