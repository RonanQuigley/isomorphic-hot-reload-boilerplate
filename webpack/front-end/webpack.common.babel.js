import path from 'path';
import webpack from 'webpack';
import modules from '../webpack.modules.babel';
import merge from 'webpack-merge'
const outPath = path.join(__dirname, '../../build');

const common = {
  target: 'web',
  output: {
    path: outPath,
    pathinfo: true,
    filename: 'client.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NamedModulesPlugin()
  ],
}
export default merge(common, modules);