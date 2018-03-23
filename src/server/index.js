
import express from 'express';
import index from './routes/index';
import foo from './routes/foo';

const router = express.Router();

router.use(
    index, 
    foo
)

// export a function for hot server middleware purposes

export default () => router;