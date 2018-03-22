import webpack from "webpack";
import path from "path";
import nodeExternals from "webpack-node-externals";
import CleanWebpackPlugin from 'clean-webpack-plugin';
const dist = path.join(__dirname, '../dist');
const root = path.join(__dirname, '../');
let entry = '';


if (process.env.NODE_ENV === 'development') {
    entry = './src/server';
}
else {
    entry = './src/index';
}

export default {
    name: 'server',
    mode: process.env.NODE_ENV,
    target: 'node',
    entry: entry,
    optimization: {
        minimize: false
    },
    externals: nodeExternals(),
    output: {
        path: dist,
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },
    node: {
        __dirname: false
    },
    plugins: [
        new CleanWebpackPlugin(dist, {
            root: root,
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: process.env.NODE_ENV
        })
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: [
                    'babel-loader?cacheDirectory=true'
                ],
            },
            {
                exclude: /node_modules|packages/,
                test: /\.hbs$/, use: [
                    "handlebars-loader"
                ]
            },
            { 
                sideEffects: false // tells webpack our code is pure for dead code elimination 
            } 
        ],
    },
};