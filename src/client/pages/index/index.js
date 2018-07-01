import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../../common/app';
import ContextProvider from '../../../common/context-provider';
import { createClientContext } from '../../api/react';
import { buildApp } from '../../../common/api';
const root = document.getElementById('root');

const context = createClientContext();

const app = buildApp(context);

ReactDOM.hydrate(app, root);

// change me to a different colour and see the changes reflected in browser
document.body.style.background = 'white';

if (module.hot) {
    module.hot.accept();
}
