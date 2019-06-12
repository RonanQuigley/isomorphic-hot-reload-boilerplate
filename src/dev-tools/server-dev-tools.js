import express from 'express';
import {
    builtDevClient,
    builtDevServer,
    builtHotClient,
    builtHotServer
} from './webpack';

const devMiddlewareRouter = express.Router();

export const setupDevApp = async baseApp => {
    // wrap dev middlewares in promises
    const waitUntilServerIsValid = () =>
        new Promise(resolve => builtDevServer.waitUntilValid(resolve));

    const waitUntilClientIsValid = () =>
        new Promise(resolve => builtDevClient.waitUntilValid(resolve));
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
