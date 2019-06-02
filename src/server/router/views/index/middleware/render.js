import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from '../../../../../react/app';

export function render(req, res, next) {
    const sheet = new ServerStyleSheet();

    try {
        const html = renderToString(sheet.collectStyles(<App />));
        const styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
        console.log('gerijgo');
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Hello World</title>
            ${styleTags}
            <script defer src="./index.js"></script>
        </head>
        <body>            
            <div id="root">${html}</div>
        </body>
        </html>
    `);
    } catch (error) {
        // handle error
        console.error(error);
    } finally {
        sheet.seal();
    }
}
