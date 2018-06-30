export function render(req, res, next) {
    const css = require('./test.scss')._getCss();
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style type="text/css">${css}</style>
    </head>
    <body>
        <div id="root"></div>
        <script src="index.js"></script>
    </body>
    </html>`);
}
