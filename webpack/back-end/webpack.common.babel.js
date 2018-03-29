import path from "path";
import DotEnv from "dotenv-webpack";
import nodeExternals from "webpack-node-externals";
import merge from "webpack-merge";
import common from "../webpack.common";
const dist = path.join(__dirname, "../../dist");

const backEndCommon = {
    name: "server",
    output: {
        path: dist,
        filename: "server.js",
        libraryTarget: "commonjs2"
    },
    node: {
        __dirname: false
    },
    externals: nodeExternals(),
    plugins: [new DotEnv()],
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: ["babel-loader?cacheDirectory=true"]
            },
            {
                exclude: /node_modules|packages/,
                test: /\.hbs$/,
                loader: "handlebars-loader",
                query: {
                    partialDirs: [
                        path.join(
                            __dirname,
                            "../../src/server/routes/views",
                            "partials"
                        )
                    ]
                }
            },
            {
                sideEffects: false // tells webpack our code is pure for dead code elimination
            }
        ]
    }
};

export default merge(common, backEndCommon);
