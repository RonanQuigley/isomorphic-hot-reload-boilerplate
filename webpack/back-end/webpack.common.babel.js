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
                // we cannot cache the directory otherwise graphql
                // loader won't get new changes to our schema when
                // prisma deploy is ran
                loader: 'babel-loader?cacheDirectory=false',
                sideEffects: false
            },
            {
                exclude: /node_modules/,
                test: /\.(graphql|gql)$/,
                use: [{ loader: 'graphql-import-loader' }]
            }
        ]
    }
};

export default backEndCommon;
