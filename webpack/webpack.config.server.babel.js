import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import externals from 'webpack-node-externals';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import path from 'path';
import webpackNodeExternals from 'webpack-node-externals';

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
                loader: 'babel-loader',
                options: {
                    /**
                     * Extend the babel config by also using dynamic import node on the server.
                     * This transpiles import() syntax to a Promise.resolve() call. The result
                     * is that code splitting is disabled and only one chunk i.e. the main bundle will be emitted.
                     *
                     * Using webpack's LimitChunkCountPlugin is another option to do this, but comes with a
                     * massive performance overhead. This is because it happens as a post-compilation step,
                     * meaning that a lot of time is wasted calculating code split bundles that were
                     * never going to be used on the server
                     */
                    plugins: ['dynamic-import-node']
                }
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
    devtool: development ? 'none' : 'source-map',
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
    externals: [webpackNodeExternals()],
    plugins: [new LodashModuleReplacementPlugin()]
};

export default serverConfig;
