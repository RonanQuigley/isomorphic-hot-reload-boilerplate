import express from 'express';
const router = express.Router();

router.get('/foo', (req, res) =>  {
    res.send('blue');
})

// for babel-loader to correctly transplie, we need to use module.exports  
module.exports = router; 