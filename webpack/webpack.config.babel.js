import webpack from 'webpack';
import merge from 'webpack-merge';
import commonConfig from './webpack.common.babel.js';
import ManifestPlugin from 'webpack-manifest-plugin';
import { promisify } from 'util';
import DotEnv from 'dotenv-webpack';
import {
    setNodeOutput,
    setWebOutput,
    setNodeDevTool,
    setWebDevTool
} from './utilities';
import nodeExternals from 'webpack-node-externals';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import BrotliPlugin from 'brotli-webpack-plugin';

const development = process.env.NODE_ENV === 'development';

const entryPoints = {
    node: {
        development: ['./src/server/server'],
        production: ['./src/server/app']
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

const commonWebPlugins = [new webpack.NamedModulesPlugin()];

const plugins = {
    node: {
        development: commonNodePlugins,
        production: [new CleanWebpackPlugin(), ...commonNodePlugins]
    },
    web: {
        development: [
            new webpack.HotModuleReplacementPlugin(),
            ...commonWebPlugins
        ],
        production: [
            new CleanWebpackPlugin(),
            /**
             * allows our vendor hashes to stay consistent
             * between builds => better long term browser caching
             */
            new webpack.HashedModuleIdsPlugin(),
            ...commonWebPlugins,
            new ManifestPlugin(),
            new CompressionPlugin(),
            new BrotliPlugin()
        ]
    }
};

// maintain source maps but strip comments
const uglifyConfig = new UglifyJsPlugin({
    sourceMap: true,
    uglifyOptions: {
        output: {
            comments: false
        }
    }
});

const optimization = {
    web: {
        development: {},
        production: {
            usedExports: true,
            runtimeChunk: 'single',
            splitChunks: {
                /**
                 * Extract all third party libraries to a single file;
                 * this is because they are less likely to change
                 */
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            },
            minimizer: [uglifyConfig]
        }
    },
    node: {
        development: {},
        production: {
            usedExports: true,
            minimizer: [uglifyConfig]
        }
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
    optimization: optimization[target][process.env.NODE_ENV],
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

const clientConfig = merge(webConfig, commonConfig);
const serverConfig = merge(nodeConfig, commonConfig);
const promisedWebpack = promisify(webpack);

const compile = async config => {
    try {
        const stats = await promisedWebpack(config);
        if (stats.hasErrors() || stats.hasWarnings()) {
            throw new Error(
                stats.toString({
                    errorDetails: true,
                    warnings: true,
                    colors: true
                })
            );
        }
        console.log(
            stats.toString({
                colors: true
            })
        );
        return stats;
    } catch (error) {
        throw error;
    }
};

const build = async () => {
    const clientStats = await compile(clientConfig);

    /**
     * Add the clientStats as an environment variable
     * so that our server code can read it
     */
    serverConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env.CLIENT_STATS': JSON.stringify(clientStats.toJson())
        })
    );

    await compile(serverConfig);
};

if (require.main === module) build();

export const configs = [clientConfig, serverConfig];
