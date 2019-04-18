import setupApp from './express/setup-app';
import getRouter from './express/router/router';

/* webpack hot server middleware requires the router to be exported 
as a function so we need to call it in order to get the actual router */
const router = getRouter();

setupApp(router);
