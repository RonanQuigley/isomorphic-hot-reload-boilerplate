import graphQLHTTP from 'express-graphql';
import schema from './schema/index';

export default graphQLHTTP({
    schema: schema,
    graphiql: true
});
