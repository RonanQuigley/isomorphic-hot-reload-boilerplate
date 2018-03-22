import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';

const prod = {
    mode: 'production',
    target: 'node',
    entry: './src/index',
    // optimization: {
    //     minimize: false
    // },
    devtool: 'source-map',
};

export default merge(common, prod);