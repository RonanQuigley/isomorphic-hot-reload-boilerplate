import merge from 'webpack-merge';
import server from '../back-end/webpack.dev.babel';
import client from '../front-end/webpack.dev.babel';
import common from './webpack.common.babel';

export default merge([common, server, client]);