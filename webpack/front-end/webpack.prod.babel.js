import merge from "webpack-merge";
import common from "./webpack.common.babel";

const prod = {
    mode: "production",
    entry: ["./src/client"],
    optimization: {
        minimizer: [
            // maintain source maps but strip comments
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
};

export default merge(common, prod);
