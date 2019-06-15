import express from 'express';
import server from './server';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import logger from '@dev-tools/logger';
import loadChrome from '@dev-tools/chrome';
import { setupDevApp } from '@dev-tools/server-dev-tools';
import expressStaticGzip from 'express-static-gzip';
import path from 'path';
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.ENABLE_LOGGING === 'true') {
    logger.info('EXPRESS LOGGING ENABLED');
    // morgan must be used by the app first
    app.use(morgan('dev'));
}

const listen = app => {
    const port = process.env.PORT || 3000;
    app.listen(port);
    logger.info(`Server listening at port ${port}`);
};

if (process.env.NODE_ENV === 'development') {
    setupDevApp(app).then(devApp => {
        listen(devApp);
        loadChrome();
    });
} else {
    const clientPath = path.join(__dirname, '../client');
    app.use(
        // allow exess to access our public assets in the dist
        // express.static(clientPath),
        expressStaticGzip(clientPath, {
            enableBrotli: true,
            orderPreference: ['br'], // prefer brotli to gzip assets
            setHeaders: (
                res // cache until ages in the future
            ) => res.setHeader('Cache-Control', 'public, max-age=31536000')
        }),
        /* webpack hot server middleware requires the router to be exported
        as a function so we need to call it in order to get the actual router */
        server({
            clientStats: process.env.CLIENT_STATS
        })
    );
    // // in tests we don't need to listen
    // as we're using superagent
    if (process.env.NODE_ENV !== 'test') {
        listen(app);
    }
}
