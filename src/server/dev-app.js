import loadChrome from '@dev-tools/chrome';
import setupDevApp from '@dev-tools/server-dev-tools';
import logger from '@dev-tools/logger';
import baseApp, { listen } from './base-app';

logger.info('hello');

setupDevApp(baseApp).then(app => {
    listen(app);
    loadChrome();
});
