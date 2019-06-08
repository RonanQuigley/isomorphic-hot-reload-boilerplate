import loadChrome from '../dev-tools/chrome';
import devTools from '../dev-tools/server-dev-tools';
import app, { listen } from './setup-base-app';

const { builtDevClient, builtDevServer, devMiddlewareRouter } = devTools;

builtDevServer.waitUntilValid(() => {
    builtDevClient.waitUntilValid(() => {
        app.use(devMiddlewareRouter);
        listen(app);
        loadChrome();
    });
});
