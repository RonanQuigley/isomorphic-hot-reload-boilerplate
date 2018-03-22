import chokidar from 'chokidar';
import express from 'express';
import webpack from 'webpack';
import clientConfig from '../../webpack/front-end/webpack.dev.babel';
import serverConfig from '../../webpack/back-end/webpack.dev.babel';
import hotMiddleware from 'webpack-hot-middleware';
import devMiddleware from 'webpack-dev-middleware';
import hotServerMiddleware from 'webpack-hot-server-middleware';
import open from 'opn';
import path from 'path';

const router = express.Router();
const clientCompiler = webpack(clientConfig);
const mergedCompilers = webpack([clientConfig, serverConfig]);

const builtDevServer = devMiddleware(mergedCompilers, {
    serverSideRender: true, stats: 'none'
});

const builtDevClient = devMiddleware(clientCompiler, {
    noInfo: true, publicPath: clientConfig.output.publicPath, stats: 'none'
});

const serverMiddleware = hotServerMiddleware(mergedCompilers);

const builtHotClient = hotMiddleware(clientCompiler);

builtDevServer.waitUntilValid(() => {
    open("http://localhost:" + (process.env.PORT || 3000), {
        // app: ['chrome', '--incognito'] 
    });
});

const watcher = chokidar.watch(
    path.resolve(__dirname, '../server'),
);

// watch our server side files for changes
watcher.on('ready', () => {
    watcher.on('all', () => {
        // tell the client to reload the current page
        builtHotClient.publish({ reload: true });
    })
});

router.use(builtDevServer);

router.use(builtDevClient);

router.use(builtHotClient)

router.use(serverMiddleware);

export default router;