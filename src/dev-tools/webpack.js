import multiConfig from '@webpack/webpack.config.babel.js';
import { find } from 'lodash';
import webpack from 'webpack';
import wpDevMiddleware from 'webpack-dev-middleware';
import wphotClientMiddleware from 'webpack-hot-middleware';
import wphotServerMiddleware from 'webpack-hot-server-middleware';
import weblog from 'webpack-log';

const clientConfig = find(multiConfig, { target: 'web' });
const serverConfig = find(multiConfig, { target: 'node' });

export const clientCompiler = webpack(clientConfig);

export const mergedCompilers = webpack(multiConfig);

/* build the server side development middleware */
export const builtDevServer = wpDevMiddleware(mergedCompilers, {
    noInfo: true,
    publicPath: serverConfig.output.publicPath,
    serverSideRender: true,
    stats: 'errors-only',
    logger: weblog({
        level: 'info',
        name: 'wp-server',
        timestamp: false
    })
});

/* build the client side development middleware */
export const builtDevClient = wpDevMiddleware(clientCompiler, {
    noInfo: true,
    publicPath: clientConfig.output.publicPath,
    stats: 'errors-only',
    logger: weblog({
        level: 'info',
        name: 'wp-client',
        timestamp: false
    })
});

/* hot reloading for server side code */
export const builtHotServer = wphotServerMiddleware(mergedCompilers, {
    // disables logging of build times
    log: false
});

/* hot reloading for client side code */
export const builtHotClient = wphotClientMiddleware(clientCompiler, {
    log: false
});
