import merge from 'webpack-merge'
import common from './webpack.common.babel'
import webpack from 'webpack';

const dev = {
    mode: 'development',
    optimization: {
      minimize: false
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.EnvironmentPlugin({
            DEBUG: true, IS_BUILD : true
        })
    ]
}

export default merge(common, dev);