import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import App from '../../../../common/example-app/App'
const router = express.Router();
var path = require('path');
router.get('/', (req, res) =>  {
    // res.send('Hello World');
    // res.sendFile(index);
    res.render('index', {
        React : renderToString(<App/>)
    });
    // res.send(index({
    //     React : renderToString(<App/>)
    // }))
})

// for babel-loader to correctly transplie, we need to use module.exports  
module.exports = router; 