import React from 'react';
import ReactDOM from 'react-dom/server';

export function render(req, res, next) {
    const App = () => <div>Hello from Place</div>;

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
            <div id="root"></div>
        </body>
        </html>
    `);
}
