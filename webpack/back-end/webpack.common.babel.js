import webpack from "webpack";
import path from "path";
import DotEnv from 'dotenv-webpack';
import nodeExternals from "webpack-node-externals";
const dist = path.join(__dirname, '../../dist');

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
    externals: nodeExternals(),
    plugins: [
        new DotEnv({
            path: path.join(__dirname, '../../.env'),
            systemvars: true
        }),
    ],
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