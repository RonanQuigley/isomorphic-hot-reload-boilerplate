import chokidar from "chokidar";
import express from "express";
import webpack from "webpack";
import open from "opn";
import path from "path";
import devMiddleware from "webpack-dev-middleware";
import hotClientMiddleware from "webpack-hot-middleware";
import hotServerMiddleware from "webpack-hot-server-middleware";
// import clientConfig from "../../webpack/front-end/webpack.dev.babel";
import clientConfig from "../../webpack/front-end/webpack.dev.babel";
import serverConfig from "../../webpack/back-end/webpack.dev.babel";

const router = express.Router();
const clientCompiler = webpack(clientConfig);
const mergedCompilers = webpack([clientConfig, serverConfig]);
const serverDir = path.resolve(__dirname, "../server");
const watcher = chokidar.watch(serverDir);

const builtDevServer = devMiddleware(mergedCompilers, {
    serverSideRender: true,
    stats: "errors-only"
});

const builtDevClient = devMiddleware(clientCompiler, {
    noInfo: true,
    publicPath: clientConfig.output.publicPath,
    stats: "errors-only"
});

const builtHotServer = hotServerMiddleware(mergedCompilers);

const builtHotClient = hotClientMiddleware(clientCompiler);

// watch our server side files for changes
watcher.on("ready", () => {
    watcher.on("all", () => {
        builtHotClient.publish({ reload: true });
    });
});

builtDevServer.waitUntilValid(() => {
    open("http://localhost:" + (process.env.PORT || 3000), {
        // app: ['chrome', '--incognito']
    });
});

router.use(builtDevServer);

// built client middleware must come before the hot server
router.use(builtDevClient);

router.use(builtHotClient);

router.use(builtHotServer);

export default router;
