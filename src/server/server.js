import React from 'react';
import express from 'express';
import App from '@react-app/app';
import { ServerStyleSheet } from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import logger from '@dev-tools/logger';
import apolloServer from '@graphql/apollo-server';
import apolloClientSSR from '@graphql/apollo-client-ssr';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ChunkExtractorManager, ChunkExtractor } from '@loadable/server';
import path from 'path';
const router = express.Router();

/**
 * exports a function that returns a function for hot server middleware purposes
 */
const serverSideRender = clientStats => async (req, res) => {
    const sheet = new ServerStyleSheet();
    try {
        const webExtractor = new ChunkExtractor({
            statsFile: path.join(__dirname, '../client/loadable-stats.json')
        });
        console.log('TCL: webExtractor', webExtractor);
        const jsx = webExtractor.collectChunks(<App />);

        const html = ReactDOMServer.renderToString(jsx);

        res.set('content-type', 'text/html');
        res.send(`
      <!DOCTYPE html>
      <html>
        <head>
        ${webExtractor.getLinkTags()}
        ${webExtractor.getStyleTags()}
        </head>
        <body>
          <div id="main">${html}</div>
          ${webExtractor.getScriptTags()}
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

export default ({ clientStats }) => {
    /**
     * apply apollo middleware first so we can access the playground
     * for every other route use the server side renderer
     */
    apolloServer.applyMiddleware({ app: router });
    /**
     * TO DO: Create a 404 page for anything that doesn't exist yet
     * e.g. favicon
     */
    router.get(/^\/(?!favicon|\/graphql).*/, serverSideRender(clientStats));
    return router;
};
