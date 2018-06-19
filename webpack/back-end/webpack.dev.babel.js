import webpack from "webpack";
import common from "./webpack.common.babel";
import merge from "webpack-merge";

const dev = {
    mode: "development",
    /* in development we go straight to the express router 
    as the initial hot reloading setup is done outside webpack */
    entry: "./src/server/router",
    plugins: [
        // need to specify NODE_ENV otherwise it will show undefined in code
        new webpack.EnvironmentPlugin({
            NODE_ENV: "development"
        })
    ]
};
export default merge(common, dev);
