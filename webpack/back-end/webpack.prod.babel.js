
import merge from 'webpack-merge'
import common from './webpack.common.babel'
import webpack from 'webpack'

const prod = {
    mode: 'production',
    devtool: 'source-map',
    optimization : {
        minimize : false, 
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            DEBUG: false, IS_BUILD : true
        })
    ]
}

export default merge(common, prod);