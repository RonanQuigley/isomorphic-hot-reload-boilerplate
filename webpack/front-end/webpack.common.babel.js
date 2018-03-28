import webpack from "webpack";
import path from "path";
const dist = path.join(__dirname, "../../dist");

export default {
    name: "client",
    target: "web",
    output: {
        path: dist,
        filename: "client.js",
        // workaround for a bug with webpack :
        // https://github.com/webpack/webpack/issues/6642
        globalObject: "this"
    },
    plugins: [new webpack.NamedModulesPlugin()],
    module: {
        rules: [
            {
                exclude: /node_modules|packages/,
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                sideEffects: false // tells webpack our code is pure for dead code elimination
            }
        ]
    }
};
