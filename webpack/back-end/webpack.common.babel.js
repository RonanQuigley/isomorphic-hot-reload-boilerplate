import DotEnv from 'dotenv-webpack';
import nodeExternals from 'webpack-node-externals';
import { modules, aliases } from '../common/common';
import { setDevTool, setOutput } from './utilities';

const backEndCommon = {
    name: 'server',
    target: 'node',
    devtool: setDevTool(),
    output: setOutput(),
    node: {
        __dirname: false
    },
    resolve: {
        alias: aliases
    },
    externals: nodeExternals(),
    plugins: [new DotEnv()],
    module: modules
};

export default backEndCommon;
