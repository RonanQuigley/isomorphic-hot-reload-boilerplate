import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const plugins = process.env.ANALYZE ? [new BundleAnalyzerPlugin] : [];

export default {
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
            }
            // { test: /\.html$/, loader: "html" },
        ],
    },
    plugins : plugins
}