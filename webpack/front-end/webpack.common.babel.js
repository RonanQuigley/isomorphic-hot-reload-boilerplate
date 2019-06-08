import webpack from 'webpack';
import { setDevTool, setOutput } from '../front-end/utilities';
import { modules, aliases } from '../common/common';

const frontEndCommon = {
    name: 'client',
    target: 'web',
    entry: {
        index: ['./src/client/pages/index']
    },
    resolve: {
        alias: aliases
    },
    devtool: setDevTool(),
    output: setOutput(),
    plugins: [new webpack.NamedModulesPlugin()],
    module: modules
};

export default frontEndCommon;
