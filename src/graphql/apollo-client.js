import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const client = new ApolloClient({
    link: createHttpLink({
        uri: 'http://localhost:3000/graphql'
    }),
    ssrMode: true,
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});

export default client;
