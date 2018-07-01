import React from 'react';
import ReactDOM from 'react-dom/server';
import App from '../../../../common/app';
import ContextProvider from '../../../../common/context-provider';
import Html from '../../../../common/Html';

export function render(req, res, next) {
    const css = new Set(); // CSS for all rendered React components

    const context = {
        insertCss: (...styles) =>
            styles.forEach(style => css.add(style._getCss()))
    };

    const app = ReactDOM.renderToString(
        <ContextProvider context={context}>
            <App />
        </ContextProvider>
    );
    console.log(css);

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

    console.log(html);

    res.send(html);

    // res.send(`<!DOCTYPE html>
    // <html lang="en">
    // <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //     <title>Index Page</title>
    //     <style type="text/css">${styles}}</style>
    // </head>
    // <body>
    //     <div id="root">${body}</div>
    // </body>
    // <script src="index.js"></script>
    // <script src="dev.js"></script>
    // </html>`);
}
