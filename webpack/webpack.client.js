var webpack = require('webpack');
const path = require('path');

const dist = path.join(__dirname, '../dist');
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
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
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