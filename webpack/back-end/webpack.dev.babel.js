import webpack from 'webpack';
import common from './webpack.common.babel';
import merge from 'webpack-merge';

const dev = {
    mode: 'development',
    target: 'node',
    entry: './src/server',
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        }),
    ],
    devtool: 'cheap-eval-source-map',
};

export default merge(common, dev);