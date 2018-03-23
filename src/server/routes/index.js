
import express from 'express';
import index from './views/index.hbs';
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send(index({
        title : 'Home Page'
    }));
});

export default router;