import webpack from 'webpack';
import common from './webpack.common.babel';
import merge from 'webpack-merge';

const dev = {
    mode: 'development',
    target: 'node',
    entry: './src/server',
    devtool: 'cheap-eval-source-map',
    plugins : [
    ]
};

export default merge(common, dev);