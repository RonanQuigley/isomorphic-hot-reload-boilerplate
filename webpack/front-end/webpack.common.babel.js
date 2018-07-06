import webpack from 'webpack';
import merge from 'webpack-merge';
import common from '../webpack.common.babel';
import { setDevTool, setOutput } from '../front-end/utilities';

const frontEndCommon = {
    name: 'client',
    target: 'web',
    devtool: setDevTool(),
    output: setOutput(),
    plugins: [new webpack.NamedModulesPlugin()],
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js|jsx$/,
                // for the front end, we can cache the directory
                // as we aren't using prisma
                loader: 'babel-loader?cacheDirectory=true',
                sideEffects: false
            },
            {
                exclude: /node_modules/,
                test: /\.(graphql|gql)$/,
                use: [{ loader: 'graphql-tag/loader' }]
            }
        ]
    }
};

export default merge(common, frontEndCommon);
