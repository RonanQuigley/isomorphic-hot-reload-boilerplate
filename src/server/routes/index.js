
import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send(`
    <!doctype html>
    <html>
    <head>
        <title></title>
    </head>
    <body>       
        Hello People
        <div id="root"></div>
        <script src="/client.js"></script>
    </body>
    </html>
`);
})


export default router;