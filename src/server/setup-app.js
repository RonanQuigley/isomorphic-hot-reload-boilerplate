import bodyParser from 'body-parser';
import { green } from 'colors';
import express from 'express';
import morgan from 'morgan';
import loadChrome from '../../dev-tools/chrome';
import devTools from '../../dev-tools/server-dev-tools';
import router from './router/router';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.ENABLE_LOGGING === 'true') {
    console.log(green('LOGGING ENABLED'));
    // morgan must be used by the app first
    app.use(morgan('dev'));
}

const listen = () => {
    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log('Server listening at port: '.green + port.green);
};

if (process.env.NODE_ENV === 'development') {
    const { builtDevClient, builtDevServer, devMiddlewareRouter } = devTools;
    builtDevServer.waitUntilValid(() => {
        builtDevClient.waitUntilValid(() => {
            app.use(devMiddlewareRouter);
            listen();
            loadChrome();
        });
    });
} else {
    app.use(
        // allow express to access our public assets in the dist
        express.static(__dirname),
        /* webpack hot server middleware requires the router to be exported
        as a function so we need to call it in order to get the actual router */
        router()
    );
    // in tests we don't need to listen
    // as we're using superagent
    if (process.env.NODE_ENV !== 'test') {
        listen();
    }
}
