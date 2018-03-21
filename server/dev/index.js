import webpack from 'webpack';
import config from '../../webpack/front-end/webpack.dev.babel';
import middleware from './middleware';
import watcher from './watcher';
import express from 'express';
const router = express.Router();
const compiler = webpack(config);
const builtMiddleware = middleware(compiler, config);

watcher(compiler, builtMiddleware.hot);

router.use(
    builtMiddleware.dev, 
    builtMiddleware.hot
)

// for babel-loader to correctly transplie, we need to use module.exports  
module.exports = router;