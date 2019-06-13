import multiConfig from '@webpack/webpack.config.babel.js';
import { find, keys } from 'lodash';
import webpack from 'webpack';
import wpDevMiddleware from 'webpack-dev-middleware';
import wphotClientMiddleware from 'webpack-hot-middleware';
import wphotServerMiddleware from 'webpack-hot-server-middleware';
import weblog from 'webpack-log';
import logger from './logger';

const windowsReactPath = '\\src\\react';
const unixReactPath = 'src/react';

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
    writeToDisk(filePath) {
        return (
            /dist\/server\//.test(filePath) || /loadable-stats/.test(filePath)
        );
    },
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
    writeToDisk(filePath) {
        return (
            /dist\/client\//.test(filePath) || /loadable-stats/.test(filePath)
        );
    },
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

const serverCompiler = find(mergedCompilers.compilers, {
    name: 'server'
});

// reload the browser each time the server has completed a rebuild
// of any file except react files
serverCompiler.hooks.afterEmit.tap('AfterServerHasRebuilt', comp => {
    const hasReactFileChanged = keys(
        comp.compiler.watchFileSystem.watcher.mtimes
    ).some(
        file => file.includes(windowsReactPath) || file.includes(unixReactPath)
    );
    if (!hasReactFileChanged) {
        logger.info('reloading due to server change');
        builtHotClient.publish({ reload: true });
    }
});
