import webpack from "webpack";
import path from "path";
import nodeExternals from "webpack-node-externals";
import CleanWebpackPlugin from 'clean-webpack-plugin';
const dist = path.join(__dirname, '../dist');
const root = path.join(__dirname, '../');

export default {
    name: 'server',
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
    ],
    externals: nodeExternals(),
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
}