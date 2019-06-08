import bodyParser from 'body-parser';
import { green } from 'colors';
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.ENABLE_LOGGING === 'true') {
    console.log(green('LOGGING ENABLED'));
    // morgan must be used by the app first
    app.use(morgan('dev'));
}

export const listen = app => {
    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log('Server listening at port: '.green + port.green);
};

export default app;
