import React from 'react'
import { render } from 'react-dom'
import { hydrate } from 'react-dom';
import App from './App';

// const root = document.createElement('div');
// root.setAttribute('id', 'root');
// document.body.appendChild(root);

const root = document.getElementById('root');

const renderApp = process.env.IS_BUILD ? hydrate : render;

hydrate(<App />, root);

if (module.hot) {
    module.hot.accept();
}