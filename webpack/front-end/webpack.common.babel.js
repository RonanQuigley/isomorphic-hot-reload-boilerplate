import webpack from 'webpack';
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
                loader: 'babel-loader?cacheDirectory=true',
                sideEffects: false
            }
        ]
    }
};

export default frontEndCommon;
