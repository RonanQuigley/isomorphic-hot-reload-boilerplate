import React from 'react'
import { render } from 'react-dom'
import App from './app'

const root = document.getElementById('root');

render(<App />, root)

document.body.style.background = 'yellow';

if (process.env.NODE_ENV === 'development') {
    const webpackHotMiddleware = require('webpack-hot-middleware/client');
    webpackHotMiddleware.subscribe((message) => {
        if (message.reload === true) {
            window.location.reload();
        }
    })
}

if(module.hot){
    module.hot.accept();
}