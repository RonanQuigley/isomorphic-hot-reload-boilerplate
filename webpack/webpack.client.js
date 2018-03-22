const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const dist = path.join(__dirname, '../dist');
const root = path.join(__dirname, '../');
module.exports = {
    name: 'client',
    mode: 'development',
    target: 'web',
    entry: [
        'webpack-hot-middleware/client',
        './src/client',
    ],
    output: {
        path: dist,
        filename: 'client.js'
    },
    devtool: 'cheap-eval-source-map',
    plugins: [
        new CleanWebpackPlugin(dist, {
            root: root,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),        
    ],
    module: {
        rules: [
            {
                exclude: /node_modules|packages/,
                test: /\.js$/,
                use: 'babel-loader',
            },
        ],
    },
};