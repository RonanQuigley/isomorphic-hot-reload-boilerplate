import merge from 'webpack-merge';
import server from '../back-end/webpack.prod.babel.js';
import client from '../front-end/webpack.prod.babel';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const clientPlugin = {
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['index.js', 'index.js.map']
        })
    ]
};

const serverPlugin = {
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['server.js', 'server.js.map']
        })
    ]
};

if (process.env.ANALYZE === 'true') {
    clientPlugin.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerPort: 8888
        })
    );
    serverPlugin.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerPort: 9999
        })
    );
}

export default [merge(serverPlugin, server), merge(clientPlugin, client)];
