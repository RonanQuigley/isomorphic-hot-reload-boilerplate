import setupApp from './express/setup-app';
import devMiddlewareRouter from './dev/dev-middleware-router';
/* You can't import the express router at this point 
in dev as babel will attempt to compile it. */
setupApp(devMiddlewareRouter);
