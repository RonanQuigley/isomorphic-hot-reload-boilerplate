import React from 'react';
import { render } from 'react-dom';
import App from './app';
const root = document.getElementById('root');

render(<App />, root);

// change me to a different colour and see the changes reflected in browser
document.body.style.background = 'white';

function checkForServerChanges() {
    // do not try to import this as it'll show up in production builds
    const webpackHotMiddleware = require('webpack-hot-middleware/client');
    webpackHotMiddleware.subscribe((message) => {
        if (message.reload === true) {
            window.location.reload();
        }
    });
}

if (process.env.NODE_ENV === 'development') {
    checkForServerChanges();
}

if (module.hot) {
    module.hot.accept();
}