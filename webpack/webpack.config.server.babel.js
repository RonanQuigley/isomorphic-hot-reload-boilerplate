import webpack from 'webpack';
import DotEnv from 'dotenv-webpack';
import nodeExternals from 'webpack-node-externals';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import path from 'path';
const development = process.env.NODE_ENV === 'development';

const serverConfig = {
    name: 'server',
    mode: process.env.NODE_ENV,
    target: 'node',
    node: {
        __dirname: false
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                // cache the directory for faster rebuilds
                loader: 'babel-loader?cacheDirectory=true',
                sideEffects: false
            }
        ]
    },
    output: {
        path: path.join(__dirname, '../dist/server'),
        publicPath: '/',
        filename: 'server.js',
        // this module system is necessary for webpack hot server middleware
        libraryTarget: 'commonjs2',
        chunkFilename: '[chunkhash:8].server.js'
    },
    entry: development ? './src/server/server' : './src/server/app',
    devtool: development ? 'inline-module-source-map' : 'source-map',
    optimization: development
        ? {}
        : {
              usedExports: true,
              minimizer: [
                  new UglifyJsPlugin({
                      sourceMap: true,
                      uglifyOptions: {
                          output: {
                              comments: false
                          }
                      }
                  })
              ]
          },
    externals: nodeExternals({
        whitelist: ['react-universal-component', 'webpack-flush-chunks']
    }),
    plugins: [
        new DotEnv(),
        new LodashModuleReplacementPlugin(),
        new webpack.optimize.LimitChunkCountPlugin({
            // used due to react universal component chunking
            // in reality we only need one chunk on the server
            maxChunks: 1
        })
    ]
};

export default serverConfig;
