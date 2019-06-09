import DotEnv from 'dotenv-webpack';
import nodeExternals from 'webpack-node-externals';
import { modules } from '../common/common';
import { setDevTool, setOutput } from './utilities';

const backEndCommon = {
    name: 'server',
    target: 'node',
    devtool: setDevTool(),
    output: setOutput(),
    node: {
        __dirname: false
    },
    externals: nodeExternals(),
    plugins: [new DotEnv()],
    module: modules
};

export default backEndCommon;
