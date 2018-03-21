import merge from 'webpack-merge'
import common from './webpack.common.babel'
import webpack from 'webpack';

const prod = {
    mode: 'production',
    devtool: 'source-map',
    entry: [
        './client/index'
    ],
    // optimization: {
    //     minimize: false,
    // },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};

export default merge(common, prod);