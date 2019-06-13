import multiConfig from '@webpack/webpack.config.babel.js';
import { find } from 'lodash';
import webpack from 'webpack';
import wpDevMiddleware from 'webpack-dev-middleware';
import wphotClientMiddleware from 'webpack-hot-middleware';
import wphotServerMiddleware from 'webpack-hot-server-middleware';
import weblog from 'webpack-log';

const clientConfig = find(multiConfig, { name: 'client' });
const serverConfig = find(multiConfig, { name: 'server' });

const clientPath = clientConfig.output.publicPath;
const serverPath = serverConfig.output.publicPath;

const setDevMiddlewareConfig = target => ({
    publicPath: target === 'web' ? clientPath : serverPath,
    serverSideRender: true,
    stats: 'none',
    logger: weblog({
        level: 'info',
        name: target === 'web' ? 'client' : 'server',
        timestamp: false
    })
});

export const clientCompiler = webpack(clientConfig);

export const mergedCompilers = webpack([clientConfig, serverConfig]);

/* build the server side development middleware */
export const builtDevServer = wpDevMiddleware(
    mergedCompilers,
    setDevMiddlewareConfig('node')
);

/* build the client side development middleware */
export const builtDevClient = wpDevMiddleware(
    clientCompiler,
    setDevMiddlewareConfig('web')
);

/* hot reloading for server side code */
export const builtHotServer = wphotServerMiddleware(mergedCompilers, {
    // disables logging of build times
    log: false
});

/* hot reloading for client side code */
export const builtHotClient = wphotClientMiddleware(clientCompiler, {
    log: false
});
