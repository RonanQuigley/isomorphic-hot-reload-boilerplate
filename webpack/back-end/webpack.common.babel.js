import path from 'path';
import merge from  'webpack-merge';
import modules from  '../webpack.modules.babel';
import webpack from  'webpack';
import nodeExternals from  "webpack-node-externals";
import CleanWebpackPlugin from  'clean-webpack-plugin';
const outPath = path.join(__dirname, '../../build');
const root = path.join(__dirname, '../../');

const common = {
    target: 'node',
    entry: ["./index"],
    context: root, 
    node: {
        __dirname: false
    },
    output: {
        path: outPath,
        filename: 'server.js',
        publicPath: '/',
    },
    externals: nodeExternals(),
    plugins: [
        new CleanWebpackPlugin(outPath, {
            root: root,
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.BannerPlugin({
        //     banner: 'require("source-map-support").install();',
        //     raw: true,
        //     entryOnly: false
        // }),
    ],
}

export default merge(common, modules);