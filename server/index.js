import routes from './src/routes';
import express from 'express';

const router = express.Router();

export default () => {
    // for the following conditional statements, we need to
    // use a dynamic require to prevent webpack bundling it unnecessarily   
    if (process.env.NODE_ENV === 'development' && !process.env.IS_BUILD) {     
        router.use(require('./dev'));
    }    
    if (process.env.DEBUG) {
        router.use(require('morgan')('dev'));
    }    
    router.use(routes);
    return router;
}