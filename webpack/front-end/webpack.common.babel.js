import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import { setDevTool, setOutput } from '../front-end/utilities';
import { modules, plugins } from '../common/common';

const nodeModules = path.join(__dirname, '../../node_modules');

const frontEndCommon = {
    name: 'client',
    target: 'web',
    entry: ['./src/client/client'],
    devtool: setDevTool(),
    output: setOutput(),
    plugins: [new webpack.NamedModulesPlugin(), ...plugins],
    externals: [],
    module: modules
};

export default frontEndCommon;
