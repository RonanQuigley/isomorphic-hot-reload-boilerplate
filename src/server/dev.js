import setupApp from './express/app';
import devRouter from '../dev/router';

/* You can't import the express router at this point 
in dev as babel will attempt to compile it. */
setupApp(devRouter);