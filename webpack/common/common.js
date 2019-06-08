import path from 'path';

const PROJECT_ROOT = path.join(__dirname, '../../');

export const aliases = {
    '@react-app': path.join(PROJECT_ROOT, './src/react')
};

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
