import merge from "webpack-merge";
import server from "../back-end/webpack.prod.babel";
import client from "../front-end/webpack.prod.babel";
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

export default [merge(serverPlugin, server), merge(clientPlugin, client)];
