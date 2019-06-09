import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';
import { setDevTool } from './utilities';

// reload option reloads the browser in the event of a crash
const hotMiddlewareUtils = [
    'webpack-hot-middleware/client?reload=true',
    './src/dev-tools/client-dev-tools' // reloads in the event of server changes
];

const dev = {
    mode: 'development',
    devtool: setDevTool(),
    plugins: [new webpack.HotModuleReplacementPlugin()]
};

const mergedConfigs = merge(common, dev);

// prepend the hot middleware to each page/file
// Object.values(mergedConfigs.entry).forEach(elem =>
//     elem.unshift(...hotMiddlewareUtils)
// );

mergedConfigs.entry = mergedConfigs.entry.concat(hotMiddlewareUtils);

export default mergedConfigs;
