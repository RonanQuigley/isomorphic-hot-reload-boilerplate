import setupApp from './express/app';
import getRouter from './express/router';

/* webpack hot server middleware requires router to be exported 
as a function so we need to call it in order to get the actual router */
const router = getRouter();

setupApp(router);
