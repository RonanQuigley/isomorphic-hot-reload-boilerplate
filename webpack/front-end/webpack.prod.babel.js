import merge from "webpack-merge";
import common from "./webpack.common.babel";

const prod = {
    mode: "production",
    entry: ["./src/client"],
    // if you need source maps, use eval-source-map
    // chrome doesn't seem to work with source-map
    devtool: false
};

export default merge(common, prod);
