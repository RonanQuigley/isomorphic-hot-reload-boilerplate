import webpack from 'webpack'
import common from './webpack.common.babel'
import merge from 'webpack-merge'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
// const HappyPack = require('happypack');
const path = require('path');
console.log(common.output.publicPath);
const dev = {
  mode: 'development',
  // context : path.join(__dirname + '../../'),
  entry: [
    // the client side js file that webpack
    // hot middleware uses for hot reloading  
    'webpack-hot-middleware/client',
    './client/index'
  ],
  // for speedier reloading, disable source maps.
  // uncomment the line below in case you need it. 
  // devtool: 'cheap-eval-source-map',
  devtool : false, 
  plugins : [
    new webpack.HotModuleReplacementPlugin(),
    // faster builds; the initial rebuild will be slower
    new HardSourceWebpackPlugin(),
    // new HappyPack({
    //   loaders: [ 'babel-loader'],
    //   // verbose : true, 
    //   // debug : true
    //   // cache: true,
    //   // cacheContext: {
    //   //   env: process.env.NODE_ENV,
    //   // }
    // }),
    // new HappyPack({
    //   loaders: [ 'handlebars-loader'],
    //   // verbose : true, 
    //   // debug : true
    //   // cache: true,
    //   // cacheContext: {
    //   //   env: process.env.NODE_ENV,
    //   // }
    // })
  ]
}

export default merge(common, dev);