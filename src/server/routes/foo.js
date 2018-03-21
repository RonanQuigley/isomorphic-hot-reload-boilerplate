
import express from 'express';
import foo from './foo.hbs';
const router = express.Router();

router.get('/foo', (req, res, next) => {
    res.send(foo({

    }));
});


export default router;