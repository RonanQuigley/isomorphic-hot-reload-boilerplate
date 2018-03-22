import express from 'express';
import morgan from 'morgan';
import {green} from 'colors';
const debugFormat = 'dev';
const app = express();

function debug(format) {
    return morgan(format);
}

if (process.env.DEBUG === 'true') {
    console.log('DEBUGGING ENABLED'.green); // rainbow
    // morgan must be used by the app first
    app.use(debug(debugFormat))
}

if (process.env.NODE_ENV === 'development') {
    // tree shaking doesn't work properly so use a require 
    // to prevent the dev code showing up in production
    app.use(require('./dev').default);
}
else {
    app.use(
        // allow express to access our public assets in the dist
        express.static(__dirname),
        // call default as function as it is exported 
        // that way for development purposes 
        require('./server').default()
    );
}

app.listen(process.env.PORT || 3000, 'localhost', function (err) {
    if (err) throw err;
    const addr = this.address();
    console.log('Listening at http://%s:%d', addr.address, addr.port);
});