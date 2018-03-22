import React from 'react';
import { render } from 'react-dom';
import App from './app';
import webpackHotMiddleware from 'webpack-hot-middleware/client';

const root = document.getElementById('root');

render(<App />, root)

document.body.style.background = 'red';

if (process.env.NODE_ENV === 'development') {
    webpackHotMiddleware.subscribe((message) => {
        if (message.reload === true) {
            window.location.reload();
        }
    })
}

if(module.hot){
    module.hot.accept();
}