import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
const schema = require('./schema.graphql');

const resolvers = {
    Query: {
        name: () => {
            return 'test query';
        }
    }
};

export default new makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers
});
