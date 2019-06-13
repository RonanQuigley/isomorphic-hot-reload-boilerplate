import DotEnv from 'dotenv-webpack';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { modules, plugins } from '../common/common';
import { setDevTool, setOutput } from './utilities';

const backEndCommon = {
    name: 'server',
    target: 'node',
    devtool: setDevTool(),
    output: setOutput(),
    node: {
        __dirname: false
    },
    externals: nodeExternals({
        whitelist: ['react-universal-component', 'webpack-flush-chunks']
    }),
    plugins: [
        new DotEnv(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        ...plugins
    ],
    module: modules
};

export default backEndCommon;
