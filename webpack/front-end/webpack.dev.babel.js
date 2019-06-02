import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';
import { setDevTool } from './utilities';

// reload option reloads the browser in the event of a crash
const hotMiddlewareUtils = [
    'webpack-hot-middleware/client?reload=true',
    './dev-tools/client-dev-tools' // reloads in the event of server changes
];

const dev = {
    mode: 'development',
    entry: {
        index: ['./src/client/pages/index']
    },
    devtool: setDevTool(),
    plugins: [new webpack.HotModuleReplacementPlugin()]
};

// prepend the hot middleware to each page/file
Object.values(dev.entry).forEach(elem => elem.unshift(...hotMiddlewareUtils));

export default merge(common, dev);
