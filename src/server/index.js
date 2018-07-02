import express from 'express';
import morgan from 'morgan';
/*eslint no-unused-vars: [0]*/
import { green } from 'colors';
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
    // tree shaking doesn't work properly so use dynamic import
    // to prevent the dev code showing up in production
    import('../middleware').then(dev => app.use(dev.default));
} else {
    app.use(
        // allow express to access our public assets in the dist
        express.static(__dirname),
        /* Router module can't be imported statically as babel register 
        will run the file once without webpack. As such, this will cause 
        errors on the first run of a program due to the absence of webpack 
        loaders */
        import('./router').then(router => router.default())
    );
}

// let our unit tests handle listening
if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log('Server will be listening at port: '.green + port.green);
}

export default app;
