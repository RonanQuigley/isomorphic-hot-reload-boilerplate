import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../../common/app';
const root = document.getElementById('root');

// use render in development, hydrate in production
const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(<App />, root);

// change me to a different colour and see the changes reflected in browser
document.body.style.background = 'white';

if (module.hot) {
    module.hot.accept();
}

function foo() {
    return 'foo';
}

foo();
