import express from 'express';
import * as middleware from './middleware';
const router = express.Router();

router.get('/', middleware.render);

export default router;
