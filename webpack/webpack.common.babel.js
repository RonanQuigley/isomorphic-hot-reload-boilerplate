import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';

export default {
    plugins: [
        new LodashModuleReplacementPlugin(),
        new LoadablePlugin({
            writeToDisk: true
        })
    ],
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js|jsx$/,
                // cache the directory for faster rebuilds
                loader: 'babel-loader?cacheDirectory=true',
                sideEffects: false
            }
        ]
    }
};
