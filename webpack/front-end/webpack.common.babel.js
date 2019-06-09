import webpack from 'webpack';
import { setDevTool, setOutput } from '../front-end/utilities';
import { modules } from '../common/common';

const frontEndCommon = {
    name: 'client',
    target: 'web',
    entry: './src/client/client',
    devtool: setDevTool(),
    output: setOutput(),
    plugins: [new webpack.NamedModulesPlugin()],
    module: modules
};

export default frontEndCommon;
