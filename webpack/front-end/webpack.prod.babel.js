import merge from 'webpack-merge';
import { setOutput } from './utilities';
import common from './webpack.common.babel';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';
const prod = {
    // will set NODE_ENV to production
    mode: 'production',
    optimization: {
        usedExports: true,
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
    },
    output: setOutput()
};

export default merge(common, prod);
