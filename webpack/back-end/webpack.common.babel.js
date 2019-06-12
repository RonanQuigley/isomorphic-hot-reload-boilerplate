import DotEnv from 'dotenv-webpack';
import nodeExternals from 'webpack-node-externals';
import { modules, plugins } from '../common/common';
import { setDevTool, setOutput } from './utilities';

const backEndCommon = {
    name: 'server',
    target: 'node',
    stats: 'verbose',
    devtool: setDevTool(),
    output: setOutput(),
    node: {
        __dirname: false
    },
    externals: nodeExternals({
        whitelist: ['react-universal-component', 'webpack-flush-chunks']
    }),
    plugins: [new DotEnv(), ...plugins],
    module: modules
};

export default backEndCommon;
