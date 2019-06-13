import webpack from 'webpack';
import merge from 'webpack-merge';
import commonConfig from './webpack.common.babel.js';
import DotEnv from 'dotenv-webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';

const development = process.env.NODE_ENV === 'development';

const entryPoints = {
    node: {
        development: ['./src/server/server'],
        production: ['./src/server/prod-app']
    },
    web: {
        development: [
            'webpack-hot-middleware/client?reload=true',
            './src/dev-tools/client-dev-tools', // reloads in the event of server changes
            './src/client/client'
        ],
        production: ['./src/client/client']
    }
};

const commonWebPlugins = [new webpack.NamedModulesPlugin()];

const commonNodePlugins = [
    new DotEnv(),
    new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
    })
];

const plugins = {
    node: {
        development: [...commonNodePlugins],
        production: [
            // need to specify NODE_ENV otherwise it will show undefined in code
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'production'
            }),
            ...commonNodePlugins
        ]
    },
    web: {
        development: [
            new webpack.HotModuleReplacementPlugin(),
            ...commonWebPlugins
        ],
        production: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            ...commonWebPlugins
        ]
    }
};

const getConfig = target => ({
    name: target === 'web' ? 'client' : 'server',
    mode: development ? 'development' : 'production',
    target,
    node: {
        __dirname: false
    },
    entry: entryPoints[target][process.env.NODE_ENV],
    devtool: target === 'node' ? setNodeDevTool() : setWebDevTool(),
    externals:
        target === 'node'
            ? nodeExternals({
                  whitelist: [
                      'react-universal-component',
                      'webpack-flush-chunks'
                  ]
              })
            : [],
    output: target == 'node' ? setNodeOutput() : setWebOutput(),
    plugins: plugins[target][process.env.NODE_ENV]
});

function setWebDevTool() {
    /* for vscode-chrome-debugger to work correctly we need to 
    change the devtool for testing and development. This is because 
    vscode-chrome debugger requires non-inline source maps whilst 
    mocha-webpack works best with cheap and inlined source maps
    */
    switch (process.env.NODE_ENV) {
        case 'test':
            return 'inline-cheap-module-source-map';
        case 'development':
            // using source-maps prevents "jumpy" breakpoints
            // try cheap-module-eval-source-map if rebuilds are slow
            // but be warned : it will jump all over the place
            // on successive rebuilds!
            // I've tried every possible combination at this point
            // to get around this, so don't waste your time future me!!!
            return 'cheap-module-eval-source-map';
        default:
            // production or undefined
            return 'source-map';
    }
}

function setNodeDevTool() {
    /* for our back end devtool, we want to switch our choice of source mapping
    to inline-module-source map when developing. This allows for proper debugging
    https://github.com/webpack/webpack/issues/6400#issuecomment-365412386
    */
    switch (process.env.NODE_ENV) {
        case 'test':
            return 'inline-cheap-module-source-map';
        case 'development':
            /* development mode
            use inline-module-source-map for better debugging
            DO NOT change it to any other type as you will get 
            a breakpoints set but not yet bound error */
            return 'inline-module-source-map';
        default:
            // production or undefined
            return 'source-map';
    }
}

function setNodeOutput() {
    const commonFields = {
        path: path.join(__dirname, '../dist/server'),
        publicPath: '/',
        filename: 'server.js',
        // this is necessary for webpack hot server middleware
        libraryTarget: 'commonjs2',
        chunkFilename: '[chunkhash:8].server.js'
    };
    if (process.env.NODE_ENV === 'development') {
        return {
            ...commonFields,
            /* fixes server side debugging issues for source maps */
            devtoolModuleFilenameTemplate(info) {
                return `file:///${info.absoluteResourcePath.replace(
                    /\\/g,
                    '/'
                )}`;
            }
        };
    } else {
        return commonFields;
    }
}

function setWebOutput() {
    const commonFields = {
        path: path.join(__dirname, '../dist/client'),
        chunkFilename: '[name].chunk.js',
        filename: '[hash:8].client.js',
        publicPath: '/'
    };
    if (process.env.NODE_ENV === 'development') {
        return {
            ...commonFields,
            filename: 'client.js',
            // fixes vscode chrome debugger stepping into unrelated webpack code
            // therefore: do not remove this!!!
            devtoolModuleFilenameTemplate(info) {
                return `file:///${info.absoluteResourcePath.replace(
                    /\\/g,
                    '/'
                )}`;
            }
        };
    } else {
        // testing and production
        return commonFields;
    }
}

export const clientConfig = merge(getConfig('web'), commonConfig);
console.log('TCL: clientConfig', clientConfig);
export const serverConfig = merge(getConfig('node'), commonConfig);
console.log('TCL: serverConfig', serverConfig);
