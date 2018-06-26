import merge from 'webpack-merge';
import common from './webpack.common.babel';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
const prod = {
    mode: 'production',
    entry: {
        index: ['./src/client/pages/index/']
    },
    optimization: {
        minimizer: [
            // maintain source maps but strip comments
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
};

export default merge(common, prod);
