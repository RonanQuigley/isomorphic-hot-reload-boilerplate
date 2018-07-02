import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from '../../../../common/Html';
import { buildApp } from '../../../../common/react/api';
import { createServerContext } from '../../../api/react';

export function render(req, res, next) {
    const css = new Set();

    const context = createServerContext(css);

    const builtApp = buildApp(context);

    const app = ReactDOM.renderToString(builtApp);

    const styles = [...css].join('');

    const scripts = ['./index.js'];

    const title = 'Index Page';

    const content = {
        app: app,
        style: styles,
        title: title,
        scripts: scripts
    };

    const html = ReactDOM.renderToString(<Html {...content} />);

    res.send(html);
}
