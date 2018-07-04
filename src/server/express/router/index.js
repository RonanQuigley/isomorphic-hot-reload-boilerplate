import express from 'express';
import index from './views/index';
import ApolloServer from '../../graphql/apollo';
import graphql from '../../graphql/index';

const router = express.Router();

// ApolloServer.applyMiddleware({ app: router });

router.use('/graphql', graphql);

router.use(
    index
    // and any other pages you need
);

// export a function for hot server middleware purposes
export default () => router;
