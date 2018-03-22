import merge from 'webpack-merge';
import common from './webpack.common.babel';

const prod = {
    mode: 'production',
    entry: [
        './src/client',
    ],
    devtool: 'source-map',
};

export default merge(common, prod);