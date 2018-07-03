import express from 'express';
import * as middleware from './middleware';
const router = express.Router();

console.log(middleware);

router.get('/', middleware.render);

export default router;
