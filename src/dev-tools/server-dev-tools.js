import express from 'express';
import logger from './logger';
import { find, keys } from 'lodash';
import {
    builtDevClient,
    builtDevServer,
    builtHotClient,
    builtHotServer,
    mergedCompilers
} from './webpack';

const devMiddlewareRouter = express.Router();

/**
 *  reload the browser each time the server has completed a rebuild
    of any server file except react files
 */
const handleClientReloading = () => {
    const windowsReactPath = '\\src\\react';
    const unixReactPath = 'src/react';
    const serverCompiler = find(mergedCompilers.compilers, {
        name: 'server'
    });

    serverCompiler.hooks.afterEmit.tap('AfterServerHasRebuilt', comp => {
        const hasReactFileChanged = keys(
            comp.compiler.watchFileSystem.watcher.mtimes
        ).some(
            file =>
                file.includes(windowsReactPath) || file.includes(unixReactPath)
        );
        if (!hasReactFileChanged) {
            logger.info('reloading due to server change');
            builtHotClient.publish({ reload: true });
        }
    });
};

export const setupDevApp = async baseApp => {
    // wrap dev middlewares in promises
    const waitUntilServerIsValid = () =>
        new Promise(resolve => builtDevServer.waitUntilValid(resolve));

    const waitUntilClientIsValid = () =>
        new Promise(resolve =>
            builtDevClient.waitUntilValid(() => {
                handleClientReloading();
                resolve();
            })
        );
    // built client middleware must come before the hot server
    devMiddlewareRouter
        .use(builtDevServer)
        .use(builtDevClient)
        .use(builtHotClient)
        .use(builtHotServer);

    await waitUntilServerIsValid();
    await waitUntilClientIsValid();

    return baseApp.use(devMiddlewareRouter);
};
