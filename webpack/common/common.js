import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

export const modules = {
    rules: [
        {
            exclude: /node_modules/,
            test: /\.js|jsx$/,
            // cache the directory for faster rebuilds
            loader: 'babel-loader?cacheDirectory=true',
            sideEffects: false
        }
    ]
};

export const plugins = [new LodashModuleReplacementPlugin()];
