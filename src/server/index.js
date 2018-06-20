import express from 'express';
import morgan from 'morgan';
// colors modifies the string prototype
// this will prevent eslint throwing no-unused-var errors
import 'colors';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.ENABLE_LOGGING === 'true') {
    console.log('LOGGING ENABLED'.green);
    // morgan must be used by the app first
    app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'development') {
    // tree shaking doesn't work properly so use a require
    // to prevent the dev code showing up in production
    app.use(require('../middleware').default);
} else {
    app.use(
        // allow express to access our public assets in the dist
        express.static(__dirname),
        // call default as function as it is exported
        // that way for development purposes
        require('./router').default()
    );
}

// let our unit tests handle listening
if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log('Server now listening at port: '.green + port);
}

export default app;
