module.exports = (api) => {
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    // only import the polyfills we need
                    useBuiltIns: 'usage',
                    corejs: '3.6.1',
                    // https://github.com/browserslist/browserslist#best-practices
                    targets: {
                        browsers: ['defaults', '>0.5%', 'IE 11'],
                    },
                },
            ],
            '@babel/preset-react',
        ],
        plugins: [
            'babel-plugin-styled-components',
            api.env('browser') ? require.resolve('react-refresh/babel') : {},
            '@babel/plugin-syntax-dynamic-import',
            '@loadable/babel-plugin',
            '@babel/plugin-proposal-class-properties',
            'babel-plugin-lodash',
            [
                require.resolve('babel-plugin-module-resolver'),
                {
                    root: ['./'],
                    alias: {
                        '@dev-tools': './src/dev-tools',
                        '@react-app': './src/react',
                        '@database': './src/database',
                        '@graphql': './src/graphql',
                        '@webpack': './webpack',
                    },
                },
            ],
        ],
        // set retainLines and sourceMaps to true for proper debugging
        // otherwise you will get debugger errors for chrome
        retainLines: true,
        sourceMaps: true,
        env: {
            development: {
                plugins: [],
            },
            test: {},
            production: {},
        },
    };
};
