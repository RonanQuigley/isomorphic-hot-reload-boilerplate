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
