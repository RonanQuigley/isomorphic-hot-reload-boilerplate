import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import logger from '@dev-tools/logger';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.ENABLE_LOGGING === 'true') {
    logger.info('EXPRESS LOGGING ENABLED');
    // morgan must be used by the app first
    app.use(morgan('dev'));
}

export const listen = app => {
    const port = process.env.PORT || 3000;
    app.listen(port);
    logger.info(`Server listening at port ${port}`);
};

export default app;
