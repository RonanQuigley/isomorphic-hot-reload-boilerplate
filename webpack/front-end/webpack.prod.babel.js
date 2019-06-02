import merge from 'webpack-merge';
import common from './webpack.common.babel';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';
const prod = {
    // will set NODE_ENV to production
    mode: 'production',
    entry: {
        index: ['./src/client/pages/index']
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
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};

export default merge(common, prod);
