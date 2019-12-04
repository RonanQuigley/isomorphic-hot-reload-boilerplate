import 'core-js';
import React from 'react';
import { hydrate } from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { loadableReady } from '@loadable/component';
import App from '../react/app';

loadableReady(() => {
    const root = document.getElementById('main');
    hydrate(<App />, root);
});

if (module.hot) {
    module.hot.accept();
}
