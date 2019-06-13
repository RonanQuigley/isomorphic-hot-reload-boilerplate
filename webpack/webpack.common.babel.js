import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

export default {
    plugins: [new LodashModuleReplacementPlugin()],
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
