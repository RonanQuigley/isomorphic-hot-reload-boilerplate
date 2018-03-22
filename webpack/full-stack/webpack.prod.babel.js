import merge from 'webpack-merge';
import server from '../back-end/webpack.prod.babel';
import client from '../front-end/webpack.prod.babel';
import common from './webpack.common.babel';

export default [
    merge(common, server),
    merge(common, client)
]
