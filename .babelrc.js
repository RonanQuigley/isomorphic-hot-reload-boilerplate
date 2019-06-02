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
                    esmodules: false,
                    browsers: ['defaults', '>0.5%', 'IE 10']
                }
            }
        ],
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-styled-components'
    ],
    // set retainLines and sourceMaps to true for proper debugging
    // otherwise you will get debugger errors for chrome
    retainLines: true,
    sourceMaps: true,
    env: {
        development: {
            plugins: ['react-hot-loader/babel']
        },
        test: {
            plugins: [['istanbul']]
        },
        production: {
            // presets: [
            //     [
            //         '@babel/preset-env',
            //         {
            //             // only import the polyfills we need
            //             useBuiltIns: 'usage',
            //             corejs: '3.0.0',
            //             // https://github.com/browserslist/browserslist#best-practices
            //             targets: {
            //                 // let webpack deal with transpilation of modules
            //                 esmodules: false,
            //                 browsers: ['defaults', '>0.5%', 'IE 10']
            //             }
            //         }
            //     ]
            // ]
        }
    }
};
