import express from 'express';
import morgan from 'morgan';
/*eslint no-unused-vars: [0]*/
import { green } from 'colors';
import bodyParser from 'body-parser';

export default function setupApp(middleware) {
    const app = express();

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: false }));

    if (process.env.ENABLE_LOGGING === 'true') {
        console.log('LOGGING ENABLED'.green);
        // morgan must be used by the app first
        app.use(morgan('dev'));
    }

    if (process.env.NODE_ENV === 'development') {
        app.use(middleware);
    } else {
        app.use(
            // allow express to access our public assets in the dist
            express.static(__dirname),
            middleware
        );
    }

    // let our unit tests handle listening
    if (process.env.NODE_ENV !== 'test') {
        const port = process.env.PORT || 3000;
        app.listen(port);
        console.log('Server listening at port: '.green + port.green);
    }
}
