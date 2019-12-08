import webpack from 'webpack';
import DotEnv from 'dotenv-webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import externals from 'webpack-node-externals';
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
    externals: undefined,
    plugins: [
        new DotEnv(),
        new webpack.optimize.LimitChunkCountPlugin({
            // used due to react universal component chunking
            // in reality we only need one chunk on the server
            maxChunks: 1
        })
    ]
};

export default serverConfig;
