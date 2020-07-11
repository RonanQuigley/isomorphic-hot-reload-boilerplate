import webpack from "webpack";
import { promisify } from "util";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import clientConfig from "./webpack.config.client.babel";
import serverConfig from "./webpack.config.server.babel";

if (process.env.ANALYZE === "true") {
  clientConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerPort: 8888
    })
  );
  serverConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerPort: 9999
    })
  );
}

clientConfig.plugins.push(new CleanWebpackPlugin());
serverConfig.plugins.push(new CleanWebpackPlugin());

const promisedWebpack = promisify(webpack);

const compile = async (config) => {
  const stats = await promisedWebpack(config);
  if (stats.hasErrors()) {
    throw new Error(
      stats.toString({
        errorDetails: true,
        colors: true
      })
    );
  }
  if (stats.hasWarnings()) {
    console.warn(
      stats.toString({
        warnings: true,
        colors: true
      })
    );
    return stats;
  }

  return stats;
};

const build = async () => {
  console.log("building client...");
  const clientStats = await compile(clientConfig);
  console.log("client build complete");
  if (!clientStats.toJson)
    throw new Error(
      "Unable to convert client stats to json! We need this for Server Side Rendering."
    );
  console.log("building server...");
  await compile(serverConfig);
  console.log("server build complete");
};

if (require.main === module) build().catch((err) => console.error(err));
