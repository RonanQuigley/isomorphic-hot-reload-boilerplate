import common from './webpack.common.babel';
import merge from 'webpack-merge';

const dev = {
    mode: 'development',
    /* in development we go straight to the express router 
    as the initial hot reloading setup is done outside webpack */
    entry: './src/server/server'
};

export default merge(common, dev);
