// do not import this file in your webpack entries in production

const webpackHotMiddleware = require('webpack-hot-middleware/client');

function checkForServerChanges() {
    webpackHotMiddleware.subscribe(message => {
        if (message.reload === true) {
            window.location.reload();
        }
    });
}

if (process.env.NODE_ENV === 'development') {
    checkForServerChanges();
}

if (module.hot) {
    module.hot.accept(error => console.error(error));
}
