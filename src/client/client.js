import ReactDOM from 'react-dom';
import React from 'react';
import App from '@react-app/app';
import { BrowserRouter } from 'react-router-dom';
const root = document.getElementById('root');

ReactDOM.hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    root
);

// change me to another colour
document.body.style.background = 'white';

if (module.hot) {
    module.hot.accept();
}