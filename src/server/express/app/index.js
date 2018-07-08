import express from 'express';
import morgan from 'morgan';
/*eslint no-unused-vars: [0]*/
import { green } from 'colors';
import bodyParser from 'body-parser';
import emitter from '../../dev/emitter';

export default function setupApp(middleware) {
    const app = express();

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: false }));

    if (process.env.ENABLE_LOGGING === 'true') {
        console.log('LOGGING ENABLED'.green);
        // morgan must be used by the app first
        app.use(morgan('dev'));
    }

    const listen = function() {
        const port = process.env.PORT || 3000;
        app.listen(port);
        console.log('Server listening at port: '.green + port.green);
    };

    if (process.env.NODE_ENV === 'development') {
        app.use(middleware);
        emitter.on('dev-middleware-built', () => {
            listen();
        });
    } else {
        app.use(
            // allow express to access our public assets in the dist
            express.static(__dirname),
            middleware
        );
        // in tests we don't need to listen
        // as we're using superagent
        if (process.env.NODE_ENV !== 'test') {
            listen();
        }
    }
}
