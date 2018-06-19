import webpack from "webpack";
import merge from "webpack-merge";
import common from "./webpack.common.babel";

const dev = {
    mode: "development",
    entry: ["webpack-hot-middleware/client", "./src/client"],
    devtool: "eval-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({
            // we use this for hot reloading the client
            NODE_ENV: "development"
        })
    ]
};

export default merge(common, dev);
