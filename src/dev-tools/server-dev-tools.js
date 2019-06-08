import { promisify } from 'util';
import express from 'express';
import { find, keys } from 'lodash';
import webpack from 'webpack';
import wpDevMiddleware from 'webpack-dev-middleware';
import wphotClientMiddleware from 'webpack-hot-middleware';
import wphotServerMiddleware from 'webpack-hot-server-middleware';
import weblog from 'webpack-log';
import serverConfig from '../../webpack/back-end/webpack.dev.babel';
import clientConfig from '../../webpack/front-end/webpack.dev.babel';

const windowsReactPath = '\\src\\react';
const unixReactPath = 'src/react';

const setupDevApp = async baseApp => {
    const devMiddlewareRouter = express.Router();

    /* compile our webpack bundles */
    const clientCompiler = webpack(clientConfig);
    const mergedCompilers = webpack([clientConfig, serverConfig]);

    /* build the server side development middleware */
    const builtDevServer = wpDevMiddleware(mergedCompilers, {
        noInfo: true,
        serverSideRender: true,
        stats: 'errors-only',
        logger: weblog({
            level: 'info',
            name: 'wp-server',
            timestamp: false
        })
    });

    /* build the client side development middleware */
    const builtDevClient = wpDevMiddleware(clientCompiler, {
        noInfo: true,
        publicPath: clientConfig.output.publicPath,
        stats: 'errors-only',
        logger: weblog({
            level: 'info',
            name: 'wp-client',
            timestamp: false
        })
    });

    // wrap dev middlewares in promises
    const waitUntilServerIsValid = () =>
        new Promise(resolve => builtDevServer.waitUntilValid(resolve));

    const waitUntilClientIsValid = () =>
        new Promise(resolve => builtDevClient.waitUntilValid(resolve));

    /* hot reloading for server side code */
    const builtHotServer = wphotServerMiddleware(mergedCompilers, {
        // disables logging of build times
        log: false
    });

    /* hot reloading for client side code */
    const builtHotClient = wphotClientMiddleware(clientCompiler, {
        log: false
    });

    // built client middleware must come before the hot server
    devMiddlewareRouter
        .use(builtDevServer)
        .use(builtDevClient)
        .use(builtHotClient)
        .use(builtHotServer);

    const compiledServer = find(mergedCompilers.compilers, { name: 'server' });

    // reload the browser each time the server has completed a rebuild
    // of any file except react files
    compiledServer.hooks.afterEmit.tap('AfterServerHasRebuilt', comp => {
        const hasReactFileChanged = keys(
            comp.compiler.watchFileSystem.watcher.mtimes
        ).some(
            file =>
                file.includes(windowsReactPath) || file.includes(unixReactPath)
        );
        if (!hasReactFileChanged) {
            console.log('reloading due to server change');
            builtHotClient.publish({ reload: true });
        }
    });

    await waitUntilServerIsValid();
    await waitUntilClientIsValid();

    return baseApp.use(devMiddlewareRouter);
};

module.exports = setupDevApp;
