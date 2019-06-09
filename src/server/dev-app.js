import loadChrome from '@dev-tools/chrome';
import setupDevApp from '@dev-tools/server-dev-tools';
import baseApp, { listen } from './base-app';

setupDevApp(baseApp).then(app => {
    listen(app);
    loadChrome();
});
