import DotEnv from 'dotenv-webpack';
import nodeExternals from 'webpack-node-externals';
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
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js|jsx$/,
                // cache the directory for faster rebuilds
                loader: 'babel-loader?cacheDirectory=true',
                sideEffects: false
            }
        ]
    }
};

export default backEndCommon;
