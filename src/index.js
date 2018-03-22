import express from 'express';
import dev from './dev'
import server from './server';
import morgan from 'morgan';
const debugFormat = 'dev';
const app = express();

function debug(format) {
    return morgan(format);
}

if (process.env.NODE_ENV === 'development') {
    if (process.env.DEBUG === "true") {
        // morgan must be used by the app first
        app.use(debug(debugFormat))
    }
    app.use(dev);
}
else {
    if (process.env.DEBUG === 'true') {
        // morgan must be used by the app first
        app.use(
            debug(debugFormat)
        )
    }
    app.use(
        // allow express to access our public assets in the dist
        express.static(__dirname),
        server
    );
}

app.listen(process.env.PORT || 3000, 'localhost', function (err) {
    if (err) throw err;
    const addr = this.address();
    console.log('Listening at http://%s:%d', addr.address, addr.port);
});