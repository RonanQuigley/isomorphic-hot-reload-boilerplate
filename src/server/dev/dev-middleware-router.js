import express from 'express';
import webpack from 'webpack';
import wpDevMiddleware from 'webpack-dev-middleware';
import wphotClientMiddleware from 'webpack-hot-middleware';
import wphotServerMiddleware from 'webpack-hot-server-middleware';
import clientConfig from '../../../webpack/front-end/webpack.dev.babel';
import serverConfig from '../../../webpack/back-end/webpack.dev.babel';
import emitter from './emitter';
import weblog from 'webpack-log';
import loadChrome from './chrome';

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

/* hot reloading for server side code */
const builtHotServer = wphotServerMiddleware(mergedCompilers, {
    // disables logging of build times
    log: false
});

/* hot reloading for client side code */
const builtHotClient = wphotClientMiddleware(clientCompiler, {
    log: false
});

builtDevServer.waitUntilValid(() => {
    loadChrome();
    builtDevClient.waitUntilValid(() => {
        emitter.emit('dev-middleware-built');
    });
});

// built client middleware must come before the hot server
devMiddlewareRouter
    .use(builtDevServer)
    .use(builtDevClient)
    .use(builtHotClient)
    .use(builtHotServer);

mergedCompilers.compilers[1].hooks.afterEmit.tap('AfterPluginCompletion', () =>
    builtHotClient.publish({ reload: true })
);

export default devMiddlewareRouter;
