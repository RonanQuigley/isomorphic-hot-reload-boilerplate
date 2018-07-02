import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from '../../../../../common/react/components/html/index';
import { buildApp } from '../../../../../common/react/api/index';
import { createServerContext } from '../../../../api/react/index';

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
        styles: styles,
        title: title,
        scripts: scripts
    };

    const html = ReactDOM.renderToString(<Html {...content} />);

    res.send(html);
}
