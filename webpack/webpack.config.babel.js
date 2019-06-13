import webpack from 'webpack';
import merge from 'webpack-merge';
import commonConfig from './webpack.common.babel.js';
import DotEnv from 'dotenv-webpack';
import {
    setNodeOutput,
    setWebOutput,
    setNodeDevTool,
    setWebDevTool
} from './utilities';
import nodeExternals from 'webpack-node-externals';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

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

const commonNodePlugins = [
    new DotEnv(),
    new webpack.optimize.LimitChunkCountPlugin({
        // used due to react universal component chunking
        // in reality we only need one chunk on the server
        maxChunks: 1
    })
];

const plugins = {
    node: {
        development: commonNodePlugins,
        production: [...commonNodePlugins, new CleanWebpackPlugin()]
    },
    web: {
        development: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        ],
        production: [new CleanWebpackPlugin()]
    }
};

const optimization = {
    development: {},
    production: {
        usedExports: true,
        minimizer: [
            // maintain source maps but strip comments
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
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
    optimization: optimization[process.env.NODE_ENV],
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

const webConfig = getConfig('web');
const nodeConfig = getConfig('node');

if (process.env.ANALYZE === 'true') {
    webConfig.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerPort: 8888
        })
    );
    nodeConfig.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerPort: 9999
        })
    );
}

export default [
    merge(webConfig, commonConfig),
    merge(nodeConfig, commonConfig)
];
