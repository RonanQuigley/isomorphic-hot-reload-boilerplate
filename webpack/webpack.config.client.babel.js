import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import BrotliPlugin from 'brotli-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import path from 'path';

const development = process.env.NODE_ENV === 'development';

const clientConfig = {
    name: 'client',
    mode: process.env.NODE_ENV,
    target: 'web',
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
    entry: development
        ? [
              'webpack-hot-middleware/client',
              './src/dev-tools/client-dev-tools', // reloads in the event of server changes
              './src/client/client'
          ]
        : './src/client/client',
    devtool: development ? 'cheap-module-eval-source-map' : 'source-map',
    optimization: development
        ? {}
        : {
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
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/dist/client'
    },
    cache: development ? false : true,
    plugins: development
        ? [
              new webpack.HotModuleReplacementPlugin(),
              new webpack.NamedModulesPlugin(),
              new LodashModuleReplacementPlugin()
          ]
        : [
              new CleanWebpackPlugin(),
              /**
               * allows our vendor hashes to stay consistent
               * between builds => better long term browser caching
               */
              new webpack.HashedModuleIdsPlugin(),
              new ManifestPlugin(),
              new CompressionPlugin(),
              new BrotliPlugin(),
              new LodashModuleReplacementPlugin()
          ]
};

export default clientConfig;