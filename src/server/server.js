import React from 'react';
import App from '@react-app/app';
import path from 'path';
import { ServerStyleSheet } from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import logger from '@dev-tools/logger';

/**
 * exports a curried function for hot server middleware purposes
 */
const serverSideRender = ({ clientStats }) => (req, res) => {
    const sheet = new ServerStyleSheet();
    try {
        const app = sheet.collectStyles(
            <StaticRouter location={req.url} context={{}}>
                <App />
            </StaticRouter>
        );

        const html = ReactDOMServer.renderToString(app);

        const styleTags = sheet.getStyleTags();

        const { js } = flushChunks(clientStats, {
            chunkNames: flushChunkNames()
        });

        res.send(`
                <!doctype html>
                    <html>
                        <head>
                            ${styleTags}
                        </head>
                        <body>
                            <div id="root">${html}</div>
                            ${js}
                        </body>
                </html>
          `);
    } catch (error) {
        // handle error
        logger.error(error);
    } finally {
        sheet.seal();
    }
};

export default serverSideRender;
