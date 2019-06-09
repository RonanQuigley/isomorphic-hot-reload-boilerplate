import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const prod = {
    mode: 'production',
    entry: ['./src/server/prod-app'],
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
        // need to specify NODE_ENV otherwise it will show undefined in code
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production'
        })
    ]
};

export default merge(common, prod);
