import webpack from 'webpack';
import DotEnv from 'dotenv-webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import path from 'path';
import fs from 'fs';
const development = process.env.NODE_ENV === 'development';

const nodeModules = path.resolve(__dirname, '../node_modules');

// https://github.com/faceyspacey/universal-demo/blob/d661cfb6f3894f62747ef53d123ba8f5637f23fc/webpack/server.dev.js#L12
// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
    .readdirSync(nodeModules)
    .filter(
        x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x)
    )
    .reduce((externals, mod) => {
        externals[mod] = `commonjs ${mod}`;
        return externals;
    }, {});

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
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    output: {
        path: path.join(__dirname, '../dist/server'),
        publicPath: '/',
        filename: '[name].js',
        // this module system is necessary for webpack hot server middleware
        libraryTarget: 'commonjs2'
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
    externals,
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
