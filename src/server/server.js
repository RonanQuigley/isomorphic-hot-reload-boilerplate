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

const extractor = new ChunkExtractor({
    statsFile: path.join(__dirname, '../client/loadable-stats.json')
});

/**
 * exports a function that returns a function for hot server middleware purposes
 */
const serverSideRender = clientStats => async (req, res) => {
    const sheet = new ServerStyleSheet();
    try {
        const client = apolloClientSSR(req);

        const app = sheet.collectStyles(
            <ChunkExtractorManager extractor={extractor}>
                <ApolloProvider client={client}>
                    <StaticRouter location={req.url} context={{}}>
                        <App />
                    </StaticRouter>
                </ApolloProvider>
            </ChunkExtractorManager>
        );
        /**
         * get the apollo client data setup before
         * rendering the app to a string
         */
        await getDataFromTree(app);

        const html = ReactDOMServer.renderToString(app);

        const initialState = client.extract();

        const styleTags = sheet.getStyleTags();

        // const { js } = flushChunks(clientStats, {
        //     chunkNames: flushChunkNames()
        // });

        if (process.env.NODE_ENV === 'development') {
            logger.info('rendering page to client');
        }
        console.log(
            'TCL: extractor.getScriptTags()',
            extractor.getScriptTags()
        );

        res.send(`
                <!doctype html>
                    <html>
                        <head>
                            ${styleTags}
                        </head>
                        <body>
                            <div id="root">${html}</div>          
                            ${extractor.getScriptTags()}                   
                            <script>window.__APOLLO_STATE__=${JSON.stringify(
                                initialState
                            ).replace(/</g, '\\u003c')};</script>
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
