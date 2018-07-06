// do not import this file in your webpack entries in production

import webpackHotMiddleware from 'webpack-hot-middleware/client';

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
    module.hot.accept(error => {
        console.log(error);
    });
}

console.log('hey');
