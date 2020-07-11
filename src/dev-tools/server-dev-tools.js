import express from 'express';
import logger from './logger';
import { find, keys } from 'lodash';
import weblog from 'webpack-log';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import clientConfig from '@webpack/webpack.config.client.babel.js';
import serverConfig from '@webpack/webpack.config.server.babel.js';

const { publicPath: clientPublicPath } = clientConfig.output;

const windowsReactPath = '\\src\\react';
const unixReactPath = 'src/react';

const devMiddlewareRouter = express.Router();

/**
 *  reload the browser each time the server has completed a rebuild
    of any server file except react files
 */
const handleClientReloading = (mergedCompilers, clientMiddleware) => {
    const serverCompiler = find(mergedCompilers.compilers, {
        name: 'server',
    });

    serverCompiler.hooks.afterEmit.tap('AfterServerHasRebuilt', (comp) => {
        const hasReactFileChanged = keys(
            comp.compiler.watchFileSystem.watcher.mtimes
        ).some(
            (file) =>
                file.includes(windowsReactPath) || file.includes(unixReactPath)
        );
        if (!hasReactFileChanged) {
            logger.info('reloading the browser due to server side change');
            clientMiddleware.publish({ reload: true });
        }
    });
};

export const setupDevApp = async (baseApp) => {
    const compilerInstance = webpack([clientConfig, serverConfig]);

    const devMiddleware = webpackDevMiddleware(compilerInstance, {
        publicPath: clientPublicPath,
        serverSideRender: true,
        stats: 'errors-only',
    });

    const clientCompiler = compilerInstance.compilers[0];

    /**
     * Hot reloading for the client bundle
     */
    const hotMiddleware = webpackHotMiddleware(clientCompiler, {
        stats: 'errors-only',
        log: weblog,
    });

    /**
     * Hot reloading for the server bundle.
     *
     * We also pass in both the client and server side config.
     * This makes the server aware of changes to the client side bundle
     * as it is a single compiler instance that runs in one process.
     * The result is that the server side render will serve the latest state of the bundle
     * and not the "stale" bundle generated when the application was initialised
     */
    const hotServerMiddleware = webpackHotServerMiddleware(compilerInstance);

    devMiddlewareRouter.use(devMiddleware);
    /**
     * Mounted before webpack-hot-server-middleware
     * to ensure client hot module replacement requests
     * are handled correctly
     */
    devMiddlewareRouter.use(hotMiddleware);
    devMiddlewareRouter.use(hotServerMiddleware);

    const waitUntilServerIsValid = () =>
        new Promise((resolve) => devMiddleware.waitUntilValid(resolve));

    await waitUntilServerIsValid();
    handleClientReloading(compilerInstance, hotMiddleware);

    return baseApp.use(devMiddlewareRouter);
};
