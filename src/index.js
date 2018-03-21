import express from 'express';
const app = express();

if (process.env.NODE_ENV === 'development') {
    // dont' try to import this; issue with webpack bundle
    const dev = require('./dev').default;
    app.use(dev);
}
else {
    app.use(
        express.static(__dirname),
        require('./server')().default
    );
}

app.listen(process.env.PORT || 3000, 'localhost', function (err) {
    if (err) throw err;
    const addr = this.address();
    console.log('Listening at http://%s:%d', addr.address, addr.port);
});