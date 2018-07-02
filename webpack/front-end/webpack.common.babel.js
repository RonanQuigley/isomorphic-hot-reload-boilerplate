import webpack from 'webpack';
import merge from 'webpack-merge';
import common from '../webpack.common.babel';
import { setDevTool, setOutput } from '../front-end/utilities';

const frontEndCommon = {
    name: 'client',
    target: 'web',
    devtool: setDevTool(),
    output: setOutput(),
    plugins: [new webpack.NamedModulesPlugin()]
};

export default merge(common, frontEndCommon);
