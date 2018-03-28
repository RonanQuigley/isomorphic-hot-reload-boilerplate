import merge from "webpack-merge";
import server from "../back-end/webpack.prod.babel";
import client from "../front-end/webpack.prod.babel";
import { serverPlugin } from "./webpack.common.babel";
import { clientPlugin } from "./webpack.common.babel";

export default [merge(serverPlugin, server), merge(clientPlugin, client)];
