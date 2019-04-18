import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';
import { setDevTool } from './utilities';
import util from 'util';

// reload option reloads the browser in the event of a crash
const hotMiddleware = 'webpack-hot-middleware/client?reload=true';

const dev = {
    mode: 'development',
    entry: {
        dev: ['./src/client/dev'],
        index: ['./src/client/pages/index-page']
    },
    devtool: setDevTool(),
    plugins: [new webpack.HotModuleReplacementPlugin()]
};

// prepend the hot middleware to each page/file
Object.values(dev.entry).forEach(elem => elem.unshift(hotMiddleware));

export default merge(common, dev);
