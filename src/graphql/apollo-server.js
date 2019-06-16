import { ApolloServer, gql } from 'apollo-server-express';
import { query } from '@database/postgres';

const { promisify } = require('util');
const sleep = promisify(setTimeout);

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        ssrQuery: String
        nonSSRQuery: String
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        ssrQuery: async () => {
            const { rows } = await query();
            return rows[0].text;
        },
        nonSSRQuery: async () => {
            await sleep(2000);
            return 'query';
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

export default server;
