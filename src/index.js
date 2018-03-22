import express from 'express';
import dev from './dev'
import server from './server';
const app = express();

if (process.env.NODE_ENV === 'development') {
    // dont' try to import this; issue with webpack bundle
    app.use(
        dev
    );
}
else {
    app.use(
        express.static(__dirname),
        server
    );
}

app.listen(process.env.PORT || 3000, 'localhost', function (err) {
    if (err) throw err;
    const addr = this.address();
    console.log('Listening at http://%s:%d', addr.address, addr.port);
});