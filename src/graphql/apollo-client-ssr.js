import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const apolloClientSSR = req =>
    new ApolloClient({
        ssrMode: true,
        // Remember that this is the interface the SSR server will use to connect to the
        // API server, so we need to ensure it isn't firewalled, etc
        link: createHttpLink({
            fetch: fetch,
            uri: 'http://localhost:3000/graphql',
            credentials: 'same-origin',
            headers: {
                cookie: req.header('Cookie')
            }
        }),
        cache: new InMemoryCache()
    });

export default apolloClientSSR;
