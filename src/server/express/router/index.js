import express from 'express';
import index from './views/index';
const router = express.Router();
import graphql from '../../graphql/index';

router.use('/graphql', graphql);

router.use(
    index
    // and any other pages you need
);

// export a function for hot server middleware purposes
export default () => router;
