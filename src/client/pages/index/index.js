import ReactDOM from 'react-dom';
import React from 'react';
import App from '../../../common/react/app';
const root = document.getElementById('root');

ReactDOM.hydrate(<App />, root);

document.body.style.background = 'orange';

if (module.hot) {
    module.hot.accept();
}
