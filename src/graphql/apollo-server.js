import { ApolloServer, gql } from 'apollo-server-express';
import { query } from '@database/postgres';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        hello: String
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: async () => {
            const { rows } = await query();
            return rows[0].text;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

export default server;
