import CleanWebpackPlugin from 'clean-webpack-plugin';
import path from 'path';
const dist = path.join(__dirname, '../../dist');
const root = path.join(__dirname, '../../');

export default {
    plugins: [
        new CleanWebpackPlugin(dist, {
            root: root,
        }),
    ],
}