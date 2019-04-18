import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../../../../../../common/react/app';

export function render(req, res, next) {
    const html = renderToString(<App />);
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <script defer src="./index.js"></script>
        </head>
        <body>
            <div id="root">${html}</div>
        </body>
        </html>
    `);
}
