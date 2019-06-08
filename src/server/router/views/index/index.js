import express from 'express';
import * as middleware from './render';
const router = express.Router();

router.get('/', middleware.render);

export default router;
