import chokidar from 'chokidar';
import express from 'express';
import webpack from 'webpack';
import open from 'opn';
import path from 'path';
import wpDevMiddleware from 'webpack-dev-middleware';
import wphotClientMiddleware from 'webpack-hot-middleware';
import wphotServerMiddleware from 'webpack-hot-server-middleware';
import clientConfig from '../../../webpack/front-end/webpack.dev.babel';
import serverConfig from '../../../webpack/back-end/webpack.dev.babel';
import emitter from '../emitter';
import weblog from 'webpack-log';

const router = express.Router();

/* compile our webpack bundles */
const clientCompiler = webpack(clientConfig);
const mergedCompilers = webpack([clientConfig, serverConfig]);

/* watch files on the server for changes; this is 
used on the client side by webpack hot middleware 
to automatically refresh the page */
const serverDir = path.resolve(__dirname, '../../server');
const watcher = chokidar.watch(serverDir);

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

/* watch our server side files for changes
this is used by webpack hot middleware on 
the client to trigger page refreshes */
watcher.on('ready', () => {
    watcher.on('all', () => {
        // publish a reload flag
        builtHotClient.publish({ reload: true });
    });
});

builtDevServer.waitUntilValid(() => {
    // open('http://localhost:' + (process.env.PORT || 3000), {
    //     app: ['chrome', '--remote-debugging-port=9222']
    // });
    console.log('valid');
    builtDevClient.waitUntilValid(() => {
        emitter.emit('dev-middleware-built');
    });
});

// built client middleware must come before the hot server
router
    .use(builtDevServer)
    .use(builtDevClient)
    .use(builtHotClient)
    .use(builtHotServer);

export default router;
