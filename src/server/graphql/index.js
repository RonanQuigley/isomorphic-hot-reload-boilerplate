import schema from './schema/index';
import prisma from './prisma/index';
import graphQLHTTP from 'express-graphql';

export default graphQLHTTP(req => {
    return {
        schema: schema,
        graphiql: true,
        context: {
            ...req,
            prisma: prisma
        }
    };
});
