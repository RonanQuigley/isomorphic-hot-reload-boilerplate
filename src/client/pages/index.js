import ReactDOM from 'react-dom';
import React from 'react';
import App from '../../react/app';
const root = document.getElementById('root');

ReactDOM.hydrate(<App />, root);

// change me to another colour
document.body.style.background = 'blue';

if (module.hot) {
    module.hot.accept();
}
