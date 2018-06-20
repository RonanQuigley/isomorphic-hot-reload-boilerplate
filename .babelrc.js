module.exports = {
    presets: [
        ['@babel/preset-env'],
        ['@babel/stage-0', { decoratorsLegacy: true }],
        '@babel/preset-react'
    ],
    plugins: ['react-hot-loader/babel'],
    // set retainLines and sourceMaps to true for proper debugging
    // otherwise you will get debugger errors for chrome
    retainLines: true,
    sourceMaps: true,
    env: {
        test: {
            presets: [['@babel/preset-env', { modules: false }]],
            plugins: [['istanbul']]
        }
    }
};
