import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';

const dev = {
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client',
        './src/client',
    ],
    devtool: 'cheap-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),  
    ],
};

export default merge(common, dev);