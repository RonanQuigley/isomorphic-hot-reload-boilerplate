import webpack from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
const dist = path.join(__dirname, '../dist');
const root = path.join(__dirname, '../');

export default {
    name: 'client',
    target: 'web',
    output: {
        path: dist,
        filename: 'client.js'
    },
    plugins : [
        new CleanWebpackPlugin(dist, {
            root: root,
        }),
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
}