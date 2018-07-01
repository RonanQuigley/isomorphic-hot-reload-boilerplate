import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';
import { setDevTool } from './utilities';

const dev = {
    mode: 'development',
    entry: {
        dev: ['./src/client/dev/index'],
        index: ['webpack-hot-middleware/client', './src/client/pages/index/']
    },
    devtool: setDevTool(),
    plugins: [new webpack.HotModuleReplacementPlugin()]
};

export default merge(common, dev);
