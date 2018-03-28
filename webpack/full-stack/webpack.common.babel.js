import CleanWebpackPlugin from "clean-webpack-plugin";
import path from "path";
const dist = path.join(__dirname, "../../dist");
const root = path.join(__dirname, "../../");

const clientPlugin = {
    plugins: [
        new CleanWebpackPlugin(dist, {
            root: root,
            exclude: ["server.js", "server.js.map"]
        })
    ]
};

const serverPlugin = {
    plugins: [
        new CleanWebpackPlugin(dist, {
            root: root,
            exclude: ["client.js", "client.js.map"]
        })
    ]
};

export { serverPlugin, clientPlugin };
